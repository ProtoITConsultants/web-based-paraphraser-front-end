import LinkListEditor from "./links/LinkListEditor";
import BulletListEditor from "./lists/BulletListEditor";
import TableEditor from "./table/TableEditor";
import FAQEditor from "./faq/FAQEditor";
import SEOStats from "./SEOStats";
import { Trash2, Plus } from "lucide-react";

export default function SectionEditor({ section, onChange, keyword = "", showStats = false }) {
  switch (section.type) {
    case "paragraph":
      return (
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Content</label>
            <textarea
              className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 resize-none text-sm px-2"
              rows={4}
              value={section.content || ""}
              onChange={(e) => onChange({ ...section, content: e.target.value })}
              placeholder="Enter paragraph content..."
            />
          </div>
          {showStats && <SEOStats content={section.content} keyword={keyword} type="content" darkMode={true} />}

          <div className="text-sm font-medium">Links</div>
          <LinkListEditor
            links={Array.isArray(section.links) ? section.links : []}
            onChange={(links) => onChange({ ...section, links })}
          />
        </div>
      );
    case "heading":
      return (
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Heading Text</label>
            <input
              className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
              value={section.content || ""}
              onChange={(e) => onChange({ ...section, content: e.target.value })}
              placeholder="Enter heading..."
            />
          </div>
          {showStats && <SEOStats content={section.content} keyword={keyword} type="title" darkMode={true} />}
        </div>
      );
    case "bullet-list":
      return (
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Title</label>
            <input
              className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
              value={section.title || ""}
              onChange={(e) => onChange({ ...section, title: e.target.value })}
              placeholder="Enter list title..."
            />
          </div>

          <div className="space-y-2">
            {(section.items || []).map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 bg-white dark:bg-[#101214] rounded-full p-4">
                    <input
                      className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
                      value={item}
                      onChange={(e) => {
                        const items = section.items.slice();
                        items[idx] = e.target.value;
                        onChange({ ...section, items });
                      }}
                      placeholder={`Bullet point ${idx + 1}...`}
                    />
                  </div>
                  {section.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const items = section.items.filter((_, i) => i !== idx);
                        onChange({ ...section, items });
                      }}
                      className="p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-600 transition-colors flex items-center justify-center flex-shrink-0"
                      title="Remove bullet point"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {showStats && <SEOStats content={item} keyword={keyword} type="title" darkMode={true} />}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const items = section.items ? [...section.items, ""] : [""];
              onChange({ ...section, items });
            }}
            className="w-full p-3 bg-[#D2F159] hover:bg-lime-500 rounded-full text-gray-900 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add bullet point
          </button>
        </div>
      );
    case "quote":
      return (
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Quote Text</label>
            <textarea
              className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 resize-none text-sm px-2"
              rows={3}
              value={section.content || ""}
              onChange={(e) => onChange({ ...section, content: e.target.value })}
              placeholder="Enter quote..."
            />
          </div>
          {showStats && <SEOStats content={section.content} keyword={keyword} type="content" darkMode={true} />}

          <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Author (optional)</label>
            <input
              className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
              value={section.author || ""}
              onChange={(e) => onChange({ ...section, author: e.target.value })}
              placeholder="Author name..."
            />
          </div>
        </div>
      );
    case "table":
      return (
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Table Title (optional)</label>
            <input
              className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
              value={section.title || ""}
              onChange={(e) => onChange({ ...section, title: e.target.value })}
              placeholder="Table title..."
            />
          </div>

          <TableEditor
            section={section}
            onChange={onChange}
          />
        </div>
      );
    case "faq":
      return (
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">FAQ Title</label>
            <input
              className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
              value={section.title || ""}
              onChange={(e) => onChange({ ...section, title: e.target.value })}
              placeholder="Enter FAQ title..."
            />
          </div>

          <div className="space-y-3">
            {(section.items || []).map((faq, idx) => (
              <div key={idx} className="space-y-2 p-4 bg-gray-50 dark:bg-[#17191C] rounded-3xl">
                <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Question {idx + 1}</label>
                  <input
                    className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2 mb-3"
                    value={faq.question}
                    onChange={(e) => {
                      const items = section.items.slice();
                      items[idx] = { ...items[idx], question: e.target.value };
                      onChange({ ...section, items });
                    }}
                    placeholder="Enter question..."
                  />
                  {showStats && <SEOStats content={faq.question} keyword={keyword} type="title" darkMode={true} />}
                </div>

                <div className="bg-white dark:bg-[#101214] rounded-3xl p-4">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">Answer</label>
                  <textarea
                    className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 resize-none text-sm px-2 mb-3"
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => {
                      const items = section.items.slice();
                      items[idx] = { ...items[idx], answer: e.target.value };
                      onChange({ ...section, items });
                    }}
                    placeholder="Enter answer..."
                  />
                  {showStats && <SEOStats content={faq.answer} keyword={keyword} type="content" darkMode={true} />}
                </div>

                {section.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const items = section.items.filter((_, i) => i !== idx);
                      onChange({ ...section, items });
                    }}
                    className="w-full p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-600 transition-colors text-xs flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove FAQ
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const items = section.items ? [...section.items, { question: "", answer: "" }] : [{ question: "", answer: "" }];
              onChange({ ...section, items });
            }}
            className="w-full p-3 bg-[#D2F159] hover:bg-lime-500 rounded-full text-gray-900 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>
      );
    default:
      return <div className="text-gray-500 dark:text-gray-400">Unknown section type: {section.type}</div>;
  }
}
