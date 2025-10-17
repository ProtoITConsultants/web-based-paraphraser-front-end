import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogsAPI, normalizeDate } from "../../api/blogs";
import SectionEditor from "../../components/admin/SectionEditor";
import { ArrowLeft, Save, Upload, ChevronDown, ChevronUp, Trash2, Plus, Minimize2, Maximize2, Check } from "lucide-react";
import SEOStats from "../../components/admin/SEOStats";

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
  keyword: "", // Add keyword field
  sections: [],
};

export default function BlogEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [blog, setBlog] = useState(BLANK);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [collapsed, setCollapsed] = useState({}); // { [index]: true }
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
        const deserialized = deserialize(data);
        setBlog(deserialized);
        setPreviousKeyword(deserialized.keyword || "");
        setKeywordSaved(!!deserialized.keyword);
      } catch (e) {
        setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const title = useMemo(() => (isEdit ? "Edit Blog" : "Create Blog"), [isEdit]);

  const updateField = (k, v) => setBlog((b) => ({ ...b, [k]: v }));

  const toggleCollapse = (idx) => {
    setCollapsed((c) => ({ ...c, [idx]: !c[idx] }));
  };
  const collapseAll = () => {
    setCollapsed(Object.fromEntries((blog.sections || []).map((_, i) => [i, true])));
  };
  const expandAll = () => setCollapsed({});

  const addSection = (type) => {
    const s = makeSection(type);
    if (!s) return;
    setBlog((b) => ({ ...b, sections: [...(b.sections || []), s] }));
    setCollapsed((c) => c); // keep current collapse states
  };
  const updateSection = (idx, next) => {
    setBlog((b) => {
      const sections = b.sections.slice();
      sections[idx] = next;
      return { ...b, sections };
    });
  };
  const removeSection = (idx) => {
    setBlog((b) => ({ ...b, sections: b.sections.filter((_, i) => i !== idx) }));
    setCollapsed((c) => {
      const next = {};
      const len = (blog.sections || []).length - 1;
      for (let i = 0; i < len; i++) {
        next[i] = c[i < idx ? i : i + 1] || false;
      }
      return next;
    });
  };
  const moveSection = (idx, dir) => {
    setBlog((b) => {
      const sections = b.sections.slice();
      const ni = idx + dir;
      if (ni < 0 || ni >= sections.length) return b;
      [sections[idx], sections[ni]] = [sections[ni], sections[idx]];
      return { ...b, sections };
    });
    setCollapsed((c) => {
      const ni = idx + dir;
      if (ni < 0 || ni >= (blog.sections || []).length) return c;
      const next = { ...c };
      const a = !!next[idx];
      next[idx] = !!next[ni];
      next[ni] = a;
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErr("");
      const payload = { ...blog, published: true };
      if (isEdit) {
        await BlogsAPI.update(blog._id || id, payload);
      } else {
        await BlogsAPI.create(payload);
      }
      navigate("/admin");
    } catch (e2) {
      setErr(e2.message || "Publish failed");
    } finally {
      setSaving(false);
    }
  };

  const onSaveDraft = async () => {
    try {
      setSaving(true);
      setErr("");
      const payload = { ...blog, published: false };
      if (isEdit) {
        await BlogsAPI.update(blog._id || id, payload);
      } else {
        await BlogsAPI.create(payload);
      }
      navigate("/admin");
    } catch (e2) {
      setErr(e2.message || "Save failed");
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
    // Trigger re-render to recalculate all SEO stats
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

      {/* Content Stats - Show overall blog statistics */}
      {keywordSaved && blog.sections && blog.sections.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Content Overview</h3>
          <SEOStats 
            content={blog.sections.map(s => s.content || "").join(" ")} 
            title={blog.title}
            keyword={blog.keyword}
            type="content"
            darkMode={true}
          />
        </div>
      )}

      <h2 className="text-lg md:text-xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4 text-gray-900 dark:text-gray-100">Sections</h2>
      
      {/* Sticky Section Selector */}
        <div className="flex sticky top-20 flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-gray-50 dark:bg-[#17191C] rounded-full p-3 md:p-4 mb-10">
          <select 
            id="admin-section-type" 
            className="flex-1 p-3 md:p-4 bg-white dark:bg-[#101214] border-none outline-none text-gray-900 dark:text-gray-300 rounded-full text-sm md:text-base"
          >
            <option value="">Add section…</option>
            <option value="paragraph">Paragraph</option>
            <option value="heading">Heading</option>
            <option value="bullet-list">Bullet list</option>
            <option value="quote">Quote</option>
            <option value="table">Table</option>
            <option value="faq">FAQ</option>
          </select>
          <div className="flex gap-2">
            <button 
              type="button" 
              className="flex-1 sm:flex-none p-3 md:p-4 bg-[#D2F159] hover:bg-lime-500 rounded-full text-gray-900 font-medium transition-colors text-sm md:text-base flex items-center justify-center gap-2" 
              onClick={() => {
                const el = document.getElementById("admin-section-type");
                if (el && el.value) addSection(el.value);
              }}
              title="Add Section"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden md:inline">Add</span>
            </button>
            <button 
              type="button" 
              className="hidden lg:flex items-center justify-center gap-2 px-4 md:px-5 py-3 md:py-4 bg-gray-100 dark:bg-[#101214] hover:bg-gray-200 dark:hover:bg-[#1a1c1f] rounded-full text-gray-900 dark:text-gray-300 font-medium transition-colors text-sm md:text-base" 
              onClick={expandAll}
              title="Expand All"
            >
              <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden xl:inline">Expand all</span>
            </button>
            <button 
              type="button" 
              className="hidden lg:flex items-center justify-center gap-2 px-4 md:px-5 py-3 md:py-4 bg-gray-100 dark:bg-[#101214] hover:bg-gray-200 dark:hover:bg-[#1a1c1f] rounded-full text-gray-900 dark:text-gray-300 font-medium transition-colors text-sm md:text-base" 
              onClick={collapseAll}
              title="Collapse All"
            >
              <Minimize2 className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden xl:inline">Collapse all</span>
            </button>
          </div>
        </div>

      <ol className="flex flex-col gap-3 md:gap-4">
        {(blog.sections || []).map((sec, idx) => (
          <li key={idx} className="bg-gray-50 dark:bg-[#17191C] rounded-3xl overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="p-2 md:p-3 bg-white dark:bg-[#101214] hover:bg-gray-100 dark:hover:bg-[#1a1c1f] rounded-full text-gray-900 dark:text-gray-300 transition-colors flex items-center justify-center"
                onClick={() => toggleCollapse(idx)}
                aria-expanded={!collapsed[idx]}
                title={collapsed[idx] ? "Expand" : "Collapse"}
              >
                {collapsed[idx] ? <ChevronDown className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
              <strong className="flex-1 text-gray-900 dark:text-gray-100 text-sm md:text-base min-w-0 truncate">{labelFor(sec.type)}</strong>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  className="p-2 md:p-3 bg-white dark:bg-[#101214] hover:bg-gray-100 dark:hover:bg-[#1a1c1f] rounded-full text-gray-900 dark:text-gray-300 transition-colors disabled:opacity-30 flex items-center justify-center" 
                  disabled={idx === 0} 
                  onClick={() => moveSection(idx, -1)}
                  title="Move Up"
                >
                  <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button 
                  type="button" 
                  className="p-2 md:p-3 bg-white dark:bg-[#101214] hover:bg-gray-100 dark:hover:bg-[#1a1c1f] rounded-full text-gray-900 dark:text-gray-300 transition-colors disabled:opacity-30 flex items-center justify-center" 
                  disabled={idx === (blog.sections.length - 1)} 
                  onClick={() => moveSection(idx, 1)}
                  title="Move Down"
                >
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button 
                  type="button" 
                  className="p-2 md:p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-600 transition-colors flex items-center justify-center" 
                  onClick={() => removeSection(idx)}
                  title="Remove Section"
                >
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {collapsed[idx] ? (
              <div className="p-3 md:p-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {renderCollapsedPreview(sec)}
              </div>
            ) : (
              <div className="p-3 md:p-4">
                <SectionEditor 
                  section={sec} 
                  onChange={(next) => updateSection(idx, next)}
                  keyword={keywordSaved ? blog.keyword : ""}
                  showStats={keywordSaved}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </form>
  );
}

function labelFor(t) {
  return ({
    "paragraph": "Paragraph",
    "heading": "Heading",
    "bullet-list": "Bullet list",
    "quote": "Quote",
    "table": "Table",
    "faq": "FAQ",
  })[t] || t;
}

function toDateInput(d) {
  const nd = normalizeDate(d);
  if (!nd || isNaN(nd)) return "";
  return nd.toISOString().slice(0, 10);
}

function deserialize(data) {
  const out = { ...BLANK, ...data };
  if (out.date) {
    const nd = normalizeDate(out.date);
    if (nd && !isNaN(nd)) out.date = nd.toISOString();
  }
  return out;
}

function makeSection(type) {
  switch (type) {
    case "paragraph": return { type, content: "", links: [] };
    case "heading": return { type, content: "" };
    case "bullet-list": return { type, items: [""] };
    case "quote": return { type, content: "", author: "" };
    case "table": return { type, title: "", headers: [""], rows: [[""]] };
    case "faq": return { type, title: "", items: [{ question: "", answer: "" }] };
    default: return null;
  }
}

function renderCollapsedPreview(sec) {
  switch (sec.type) {
    case "paragraph":
      return (sec.content || "").slice(0, 120) + ((sec.content || "").length > 120 ? "…" : "");
    case "heading":
      return sec.content || "";
    case "bullet-list":
      return `${(sec.items || []).length} bullet(s)`;
    case "quote":
      return `"${(sec.content || "").slice(0, 80)}"${sec.author ? ` — ${sec.author}` : ""}`;
    case "table":
      return `Table: ${sec.title || ""} (${(sec.headers || []).length} cols × ${(sec.rows || []).length} rows)`;
    default:
      return `FAQ: ${(sec.items || []).length} item(s)`;
  }
}
