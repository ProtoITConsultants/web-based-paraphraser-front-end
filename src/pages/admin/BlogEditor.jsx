import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogsAPI, normalizeDate } from "../../api/blogs";
import { ArrowLeft, Save, Upload, Check } from "lucide-react";
import SEOStats from "../../components/admin/SEOStats";
import TipTapEditor from "../../components/admin/TipTapEditor";

const BLANK = {
  id: "",
  slug: "",
  title: "",
  subtitle: "",
  date: "",
  category: "",
  img: "",
  excerpt: "",
  metaTitle: "",
  metaDescription: "",
  keyword: "",
  content: "",
};

export default function BlogEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [blog, setBlog] = useState(BLANK);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [keywordSaved, setKeywordSaved] = useState(false);
  const [previousKeyword, setPreviousKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await BlogsAPI.get(id);
        console.log("Loaded blog data:", data); // Debug log
        const deserialized = deserialize(data);
        console.log("Deserialized blog data:", deserialized); // Debug log
        setBlog(deserialized);
        setPreviousKeyword(deserialized.keyword || "");
        setKeywordSaved(!!deserialized.keyword);
      } catch (e) {
        console.error("Error loading blog:", e); // Debug log
        setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const title = useMemo(() => (isEdit ? "Edit Blog" : "Create Blog"), [isEdit]);

  const updateField = (k, v) => {
    if (k === 'content') {
      console.log('=== CONTENT FIELD UPDATED ===');
      console.log('Field:', k);
      console.log('New Value Length:', v?.length || 0);
      console.log('New Value:', v);
      console.log('=== END CONTENT UPDATE ===');
    }
    setBlog((b) => ({ ...b, [k]: v }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErr("");
      
      console.log('=== SUBMITTING BLOG ===');
      console.log('Blog state:', blog);
      console.log('Blog content field:', blog.content);
      console.log('Content length:', blog.content?.length || 0);
      
      // Create clean payload
      const payload = { 
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        subtitle: blog.subtitle || '',
        date: blog.date || new Date().toISOString(),
        category: blog.category || '',
        img: blog.img || '',
        excerpt: blog.excerpt || '',
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        keyword: blog.keyword || '',
        body: blog.content || '<p></p>', // Ensure body is never empty
        published: true 
      };
      
      // Remove _id and other MongoDB fields
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.content; // Remove content field, we use body
      
      console.log('=== FINAL PAYLOAD ===');
      console.log(JSON.stringify(payload, null, 2));
      console.log('Payload.body:', payload.body);
      console.log('Payload.body type:', typeof payload.body);
      console.log('=== END PAYLOAD ===');
      
      let response;
      if (isEdit) {
        response = await BlogsAPI.update(blog._id || id, payload);
      } else {
        response = await BlogsAPI.create(payload);
      }
      
      console.log('=== API RESPONSE ===');
      console.log('Full response:', response);
      if (response.data) {
        console.log('Response data.body:', response.data.body);
        console.log('Response data.body length:', response.data.body?.length || 0);
      }
      console.log('=== END RESPONSE ===');
      
      navigate("/admin");
    } catch (e2) {
      console.error("=== SAVE ERROR ===", e2);
      console.error('Error response:', e2.response);
      console.error('Error details:', e2.response?.data || e2.message);
      setErr(e2.response?.data?.error || e2.response?.data?.message || e2.message || "Publish failed");
    } finally {
      setSaving(false);
    }
  };

  const onSaveDraft = async () => {
    try {
      setSaving(true);
      setErr("");
      
      console.log("=== DRAFT SAVE ===");
      console.log("Draft content:", blog.content);
      
      const payload = { 
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        subtitle: blog.subtitle || '',
        date: blog.date || new Date().toISOString(),
        category: blog.category || '',
        img: blog.img || '',
        excerpt: blog.excerpt || '',
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        keyword: blog.keyword || '',
        body: blog.content || '<p></p>',
        published: false 
      };
      
      // Remove MongoDB fields
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.content;
      
      console.log("Draft payload:", payload);
      console.log("Draft payload.body:", payload.body);
      
      if (isEdit) {
        await BlogsAPI.update(blog._id || id, payload);
      } else {
        await BlogsAPI.create(payload);
      }
      navigate("/admin");
    } catch (e2) {
      console.error("Draft save error:", e2);
      console.error('Error details:', e2.response?.data || e2.message);
      setErr(e2.response?.data?.error || e2.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleKeywordChange = (value) => {
    updateField("keyword", value);
    if (value !== previousKeyword) {
      setKeywordSaved(false);
    }
  };

  const saveKeyword = () => {
    if (!blog.keyword || blog.keyword.trim() === "") {
      alert("Please enter a keyword before saving.");
      return;
    }
    setPreviousKeyword(blog.keyword);
    setKeywordSaved(true);
    setBlog({ ...blog });
  };

  if (loading) return <div className="px-4 pt-24">Loading...</div>;

  return (
    <form className="max-w-7xl pt-24 mx-auto px-4 w-full pb-12" onSubmit={onSubmit}>
      <div className="flex items-center gap-2 md:gap-4 py-4">
        <button
          type="button"
          className="p-2 md:p-3 rounded-full bg-gray-100 dark:bg-[#17191C] hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors flex-shrink-0"
          onClick={() => navigate(-1)}
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</h1>
        <div className="flex-1" />
        
        {/* Save as Draft */}
        <button
          type="button"
          className="py-2 px-3 md:py-3 md:px-5 text-sm rounded-full bg-gray-100 dark:bg-[#17191C] text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors font-medium disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
          onClick={onSaveDraft}
          disabled={saving}
          title="Save as Draft"
        >
          <Save className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline">{saving ? "Saving..." : "Save as Draft"}</span>
        </button>
        
        {/* Publish Button */}
        <button
          type="submit"
          className="bg-[#D2F159] cursor-pointer hover:bg-lime-500 text-gray-900 font-semibold py-2 px-3 md:py-3 md:px-5 rounded-full transition-colors duration-200 disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
          disabled={saving}
          title="Publish"
        >
          <Upload className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">{saving ? "Publishing..." : "Publish"}</span>
        </button>
      </div>

      {err && <div className="text-red-600 mb-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-full text-sm">{err}</div>}

      {/* SEO Keyword Section */}
      <div className={`mb-6 border-l-4 rounded-3xl p-4 md:p-6 transition-all ${
        keywordSaved 
          ? "bg-gradient-to-r from-green-100/50 to-transparent dark:from-green-900/20 border-green-500" 
          : "bg-gradient-to-r from-[#D2F159]/10 to-transparent dark:from-[#D2F159]/5 border-[#D2F159]"
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full mt-1 transition-colors ${
            keywordSaved ? "bg-green-500" : "bg-[#D2F159]"
          }`}>
            {keywordSaved ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Focus Keyword {keywordSaved && <span className="text-green-500 text-sm ml-2">✓ Saved</span>}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {keywordSaved 
                ? "Your focus keyword has been set. All SEO metrics are calculated based on this keyword."
                : "Enter your primary keyword to analyze SEO optimization across all content sections. This helps ensure optimal keyword density (0.5-2.5%)."
              }
            </p>
            <div className="flex gap-2">
              <div className="flex-1 bg-white dark:bg-[#101214] rounded-full p-4">
                <input
                  className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2"
                  value={blog.keyword || ""}
                  onChange={(e) => handleKeywordChange(e.target.value)}
                  placeholder="e.g., paraphrasing tool, AI writing assistant"
                />
              </div>
              <button
                type="button"
                onClick={saveKeyword}
                disabled={keywordSaved && blog.keyword === previousKeyword}
                className={`px-4 md:px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  keywordSaved && blog.keyword === previousKeyword
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-[#D2F159] hover:bg-lime-500 text-gray-900 cursor-pointer"
                }`}
                title={keywordSaved && blog.keyword === previousKeyword ? "Keyword already saved" : "Save and recalculate"}
              >
                {keywordSaved && blog.keyword === previousKeyword ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="hidden md:inline">Saved</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span className="hidden md:inline">Save Keyword</span>
                  </>
                )}
              </button>
            </div>
            {keywordSaved && blog.keyword && (
              <div className="flex items-center gap-2 mt-3 px-2">
                <div className="flex-1">
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Active Keyword: <span className="text-[#D2F159]">{blog.keyword}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    All content sections are being analyzed for this keyword.
                  </p>
                </div>
              </div>
            )}
            {!keywordSaved && blog.keyword && blog.keyword !== previousKeyword && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2 px-2">
                ⚠ Keyword changed. Click "Save Keyword" to recalculate all SEO metrics.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Only show SEO stats if keyword is saved */}
      {!keywordSaved && blog.keyword && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-3xl p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-300 text-center">
            💡 Save your keyword to see SEO analysis for all content sections
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-full p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">ID</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2"
            value={blog.id || ""}
            onChange={(e) => updateField("id", e.target.value)}
            placeholder="quillbot-alternatives-2025"
            required
          />
        </div>
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-full p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Slug</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2"
            value={blog.slug || ""}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="quillbot-alternatives-paraphrasing-tools"
            required
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Title</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2 mb-2"
            value={blog.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Enter blog title"
            required
          />
          {keywordSaved && <SEOStats content={blog.title} keyword={blog.keyword} type="title" darkMode={true} />}
        </div>
        
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Subtitle</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2 mb-2"
            value={blog.subtitle || ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
            placeholder="Enter blog subtitle"
          />
          {keywordSaved && <SEOStats content={blog.subtitle} keyword={blog.keyword} type="title" darkMode={true} />}
        </div>
        
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-full p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Date</label>
          <input
            type="date"
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2"
            value={toDateInput(blog.date)}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </div>
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-full p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Category</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2"
            value={blog.category || ""}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Insights"
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Image URL</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2"
            value={blog.img || ""}
            onChange={(e) => updateField("img", e.target.value)}
            placeholder="Please enter image url"
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Excerpt</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2 mb-2"
            value={blog.excerpt || ""}
            onChange={(e) => updateField("excerpt", e.target.value)}
            placeholder="Brief description of the blog"
          />
          {keywordSaved && <SEOStats content={blog.excerpt} keyword={blog.keyword} type="meta" darkMode={true} />}
        </div>
        
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Meta Title</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base px-2 mb-2"
            value={blog.metaTitle || ""}
            onChange={(e) => updateField("metaTitle", e.target.value)}
            placeholder="SEO title"
          />
          {keywordSaved && <SEOStats content={blog.metaTitle} keyword={blog.keyword} type="title" darkMode={true} />}
        </div>
        
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4 md:p-5">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Meta Description</label>
          <textarea
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 resize-none text-sm md:text-base px-2 mb-2"
            rows={3}
            value={blog.metaDescription || ""}
            onChange={(e) => updateField("metaDescription", e.target.value)}
            placeholder="SEO description"
          />
          {keywordSaved && <SEOStats content={blog.metaDescription} keyword={blog.keyword} type="meta" darkMode={true} />}
        </div>
      </div>

      {/* Content Editor Section */}
      <div className="mt-6 md:mt-8">
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 dark:text-gray-100">Blog Content</h2>
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-3xl p-4 md:p-6">
          {!loading && (
            <TipTapEditor
              content={blog.content || ""}
              onChange={(html) => updateField("content", html)}
            />
          )}
        </div>
        
        {/* Content Stats */}
        {keywordSaved && blog.content && (
          <div className="mt-4">
            <SEOStats 
              content={blog.content.replace(/<[^>]*>/g, '')} // Strip HTML tags for analysis
              title={blog.title}
              keyword={blog.keyword}
              type="content"
              darkMode={true}
            />
          </div>
        )}
      </div>
    </form>
  );
}

function toDateInput(d) {
  const nd = normalizeDate(d);
  if (!nd || isNaN(nd)) return "";
  return nd.toISOString().slice(0, 10);
}

function deserialize(data) {
  const out = { ...BLANK, ...data };
  
  // Map 'body' from database to 'content' for editor
  if (data.body !== undefined) {
    out.content = data.body;
    console.log("Mapped body to content:", out.content?.length || 0, "chars");
  }
  
  if (out.date) {
    const nd = normalizeDate(out.date);
    if (nd && !isNaN(nd)) out.date = nd.toISOString();
  }
  
  return out;
}