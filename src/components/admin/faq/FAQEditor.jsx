export default function FAQEditor({ section, onChange }) {
  const { title = "", items = [{ question: "", answer: "" }] } = section;
  const set = (patch) => onChange({ ...section, ...patch });

  const addItem = () => set({ items: [...items, { question: "", answer: "" }] });
  const updateItem = (idx, patch) => {
    const next = items.slice();
    next[idx] = { ...next[idx], ...patch };
    set({ items: next });
  };
  const removeItem = (idx) => set({ items: items.filter((_, i) => i !== idx) });

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-sm">Title</span>
        <input className="p-2 border rounded" value={title} onChange={(e) => set({ title: e.target.value })} />
      </label>

      <div className="flex flex-col gap-4">
        {(items || []).map((it, idx) => (
          <div key={idx} className="border rounded p-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm">Question</span>
              <input className="p-2 border rounded" value={it.question || ""} onChange={(e) => updateItem(idx, { question: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1 mt-2">
              <span className="text-sm">Answer</span>
              <textarea className="p-2 border rounded" rows={3} value={it.answer || ""} onChange={(e) => updateItem(idx, { answer: e.target.value })} />
            </label>
            <div className="mt-2">
              <button type="button" className="btn px-2 py-1 border rounded text-red-600 border-red-400" onClick={() => removeItem(idx)}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" className="btn px-3 py-2 border rounded w-fit" onClick={addItem}>+ Add FAQ item</button>
      </div>
    </div>
  );
}
