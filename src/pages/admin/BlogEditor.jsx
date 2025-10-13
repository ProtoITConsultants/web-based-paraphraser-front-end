import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogsAPI, normalizeDate } from "../../api/blogs";
import SectionEditor from "../../components/admin/SectionEditor";
import { ArrowLeft, Save, Upload } from "lucide-react";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await BlogsAPI.get(id);
        setBlog(deserialize(data));
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

  if (loading) return <div className="px-4 pt-24">Loading...</div>;

  return (
    <form className="max-w-7xl pt-24 mx-auto px-4 w-full pb-12" onSubmit={onSubmit}>
      <div className="flex items-center gap-2 md:gap-4 py-4">
        <button
          type="button"
          className="p-2 rounded-full bg-gray-100 dark:bg-[#17191C] hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors flex-shrink-0"
          onClick={() => navigate(-1)}
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</h1>
        <div className="flex-1" />
        
        {/* Save as Draft - Icon on mobile, text on desktop */}
        <button
          type="button"
          className="py-2 px-3 md:py-4 md:px-6 text-sm rounded-3xl bg-gray-100 dark:bg-[#17191C] text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors font-medium disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
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
          className="bg-[#D2F159] cursor-pointer hover:bg-lime-500 text-gray-900 font-semibold py-2 px-3 md:py-4 md:px-6 rounded-3xl transition-colors duration-200 disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
          disabled={saving}
          title="Publish"
        >
          <Upload className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">{saving ? "Publishing..." : "Publish"}</span>
        </button>
      </div>

      {err && <div className="text-red-600 mb-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-3xl text-sm">{err}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ID</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.id || ""}
            onChange={(e) => updateField("id", e.target.value)}
            placeholder="quillbot-alternatives-2025"
            required
          />
        </div>
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.slug || ""}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="quillbot-alternatives-paraphrasing-tools"
            required
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.subtitle || ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
            placeholder="Enter blog subtitle"
          />
        </div>
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
          <input
            type="date"
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={toDateInput(blog.date)}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </div>
        <div className="bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.category || ""}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Insights"
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.img || ""}
            onChange={(e) => updateField("img", e.target.value)}
            placeholder="/7853107.jpg"
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.excerpt || ""}
            onChange={(e) => updateField("excerpt", e.target.value)}
            placeholder="Brief description of the blog"
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
          <input
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm md:text-base"
            value={blog.metaTitle || ""}
            onChange={(e) => updateField("metaTitle", e.target.value)}
            placeholder="SEO title"
          />
        </div>
        <div className="md:col-span-2 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
          <textarea
            className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 resize-none text-sm md:text-base"
            rows={3}
            value={blog.metaDescription || ""}
            onChange={(e) => updateField("metaDescription", e.target.value)}
            placeholder="SEO description"
          />
        </div>
      </div>

      <h2 className="text-lg md:text-xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4 text-gray-900 dark:text-gray-100">Sections</h2>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4">
        <select id="admin-section-type" className="flex-1 p-3 bg-white dark:bg-[#101214] border-none outline-none text-gray-900 dark:text-gray-300 rounded-3xl text-sm md:text-base">
          <option value="">Add section…</option>
          <option value="paragraph">Paragraph</option>
          <option value="heading">Heading</option>
          <option value="bullet-list">Bullet list</option>
          <option value="quote">Quote</option>
          <option value="table">Table</option>
          <option value="faq">FAQ</option>
        </select>
        <div className="flex gap-2">
          <button type="button" className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-gray-100 dark:bg-[#101214] hover:bg-gray-200 dark:hover:bg-[#1a1c1f] rounded-3xl text-gray-900 dark:text-gray-300 font-medium transition-colors text-sm md:text-base" onClick={() => {
            const el = document.getElementById("admin-section-type");
            if (el && el.value) addSection(el.value);
          }}>Add</button>
          <button type="button" className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-gray-100 dark:bg-[#101214] hover:bg-gray-200 dark:hover:bg-[#1a1c1f] rounded-3xl text-gray-900 dark:text-gray-300 font-medium transition-colors hidden lg:block text-sm md:text-base" onClick={expandAll}>Expand all</button>
          <button type="button" className="flex-1 sm:flex-none px-4 md:px-6 py-3 bg-gray-100 dark:bg-[#101214] hover:bg-gray-200 dark:hover:bg-[#1a1c1f] rounded-3xl text-gray-900 dark:text-gray-300 font-medium transition-colors hidden lg:block text-sm md:text-base" onClick={collapseAll}>Collapse all</button>
        </div>
      </div>

      <ol className="flex flex-col gap-3 md:gap-4">
        {(blog.sections || []).map((sec, idx) => (
          <li key={idx} className="bg-gray-50 dark:bg-[#17191C] rounded-3xl overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="px-3 md:px-4 py-2 bg-white dark:bg-[#101214] hover:bg-gray-100 dark:hover:bg-[#1a1c1f] rounded-2xl text-gray-900 dark:text-gray-300 text-xs md:text-sm font-medium transition-colors"
                onClick={() => toggleCollapse(idx)}
                aria-expanded={!collapsed[idx]}
              >
                {collapsed[idx] ? "Expand" : "Collapse"}
              </button>
              <strong className="flex-1 text-gray-900 dark:text-gray-100 text-sm md:text-base min-w-0 truncate">{labelFor(sec.type)}</strong>
              <div className="flex gap-2">
                <button type="button" className="px-2 md:px-3 py-2 bg-white dark:bg-[#101214] hover:bg-gray-100 dark:hover:bg-[#1a1c1f] rounded-2xl text-gray-900 dark:text-gray-300 transition-colors disabled:opacity-30 text-sm md:text-base" disabled={idx === 0} onClick={() => moveSection(idx, -1)}>↑</button>
                <button type="button" className="px-2 md:px-3 py-2 bg-white dark:bg-[#101214] hover:bg-gray-100 dark:hover:bg-[#1a1c1f] rounded-2xl text-gray-900 dark:text-gray-300 transition-colors disabled:opacity-30 text-sm md:text-base" disabled={idx === (blog.sections.length - 1)} onClick={() => moveSection(idx, 1)}>↓</button>
                <button type="button" className="px-2 md:px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-2xl text-red-600 transition-colors text-xs md:text-sm" onClick={() => removeSection(idx)}>Remove</button>
              </div>
            </div>

            {collapsed[idx] ? (
              <div className="p-3 md:p-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {renderCollapsedPreview(sec)}
              </div>
            ) : (
              <div className="p-3 md:p-4">
                <SectionEditor section={sec} onChange={(next) => updateSection(idx, next)} />
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
    case "faq":
      return `FAQ: ${(sec.items || []).length} item(s)`;
    default:
      return "";
  }
}
