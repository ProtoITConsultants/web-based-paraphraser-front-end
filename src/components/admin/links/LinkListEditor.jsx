export default function LinkListEditor({ links, onChange }) {
  const add = () => onChange([...(links || []), { anchorText: "", to: "" }]);
  const update = (idx, patch) => {
    const next = links.slice();
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };
  const remove = (idx) => onChange(links.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-3">
      {(links || []).map((l, idx) => (
        <div key={idx} className="grid md:grid-cols-2 gap-2">
          <input className="p-2 border rounded" placeholder="Anchor text" value={l.anchorText || ""} onChange={(e) => update(idx, { anchorText: e.target.value })} />
          <input className="p-2 border rounded" placeholder="/blog/..." value={l.to || ""} onChange={(e) => update(idx, { to: e.target.value })} />
          <div className="md:col-span-2">
            <button type="button" className="btn px-2 py-1 border rounded text-red-600 border-red-400" onClick={() => remove(idx)}>Remove link</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn px-3 py-2 border rounded w-fit" onClick={add}>+ Add link</button>
    </div>
  );
}
