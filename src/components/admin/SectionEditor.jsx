import LinkListEditor from "./links/LinkListEditor";
import BulletListEditor from "./lists/BulletListEditor";
import TableEditor from "./table/TableEditor";
import FAQEditor from "./faq/FAQEditor";

export default function SectionEditor({ section, onChange }) {
  switch (section.type) {
    case "paragraph":
      return (
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-sm">Content</span>
            <textarea className="p-2 border rounded" rows={4} value={section.content || ""} onChange={(e) => onChange({ ...section, content: e.target.value })} />
          </label>
          <div className="text-sm font-medium">Links</div>
          <LinkListEditor
            links={Array.isArray(section.links) ? section.links : []}
            onChange={(links) => onChange({ ...section, links })}
          />
        </div>
      );
    case "heading":
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">Heading text</span>
          <input className="p-2 border rounded" value={section.content || ""} onChange={(e) => onChange({ ...section, content: e.target.value })} />
        </div>
      );
    case "bullet-list":
      return (
        <BulletListEditor
          items={Array.isArray(section.items) ? section.items : []}
          onChange={(items) => onChange({ ...section, items })}
        />
      );
    case "quote":
      return (
        <div className="grid md:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="text-sm">Quote</span>
            <textarea className="p-2 border rounded" rows={3} value={section.content || ""} onChange={(e) => onChange({ ...section, content: e.target.value })} />
          </label>
          <label className="flex flex-col gap-1 md:col-span-1">
            <span className="text-sm">Author</span>
            <input className="p-2 border rounded" value={section.author || ""} onChange={(e) => onChange({ ...section, author: e.target.value })} />
          </label>
        </div>
      );
    case "table":
      return (
        <TableEditor
          section={section}
          onChange={onChange}
        />
      );
    case "faq":
      return (
        <FAQEditor
          section={section}
          onChange={onChange}
        />
      );
    default:
      return <div className="text-gray-500">Unsupported section: {section.type}</div>;
  }
}
