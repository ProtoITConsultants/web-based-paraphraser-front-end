export default function BulletListEditor({ items, onChange }) {
  const add = () => onChange([...(items || []), ""]);
  const update = (idx, v) => {
    const next = items.slice();
    next[idx] = v;
    onChange(next);
  };
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
  const move = (idx, dir) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= items.length) return;
    const next = items.slice();
    [next[idx], next[ni]] = [next[ni], next[idx]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      {(items || []).map((it, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input className="flex-1 p-2 border rounded" value={it || ""} onChange={(e) => update(idx, e.target.value)} />
          <button type="button" className="btn px-2 py-1 border rounded" onClick={() => move(idx, -1)} disabled={idx === 0}>↑</button>
          <button type="button" className="btn px-2 py-1 border rounded" onClick={() => move(idx, 1)} disabled={idx === items.length - 1}>↓</button>
          <button type="button" className="btn px-2 py-1 border rounded text-red-600 border-red-400" onClick={() => remove(idx)}>✕</button>
        </div>
      ))}
      <button type="button" className="btn px-3 py-2 border rounded w-fit" onClick={add}>+ Add item</button>
    </div>
  );
}
