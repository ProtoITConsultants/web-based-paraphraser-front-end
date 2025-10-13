export default function TableEditor({ section, onChange }) {
  const { title = "", headers = [""], rows = [[""]] } = section;

  const set = (patch) => onChange({ ...section, ...patch });

  const addHeader = () => set({ headers: [...headers, ""] });
  const updateHeader = (idx, v) => {
    const next = headers.slice();
    next[idx] = v;
    set({ headers: next });
  };
  const removeHeader = (idx) => {
    const nextH = headers.filter((_, i) => i !== idx);
    const nextR = rows.map(r => r.filter((_, i) => i !== idx));
    set({ headers: nextH.length ? nextH : [""], rows: nextR.length ? nextR : [[""]] });
  };

  const addRow = () => set({ rows: [...rows, Array(headers.length).fill("")] });
  const updateCell = (r, c, v) => {
    const next = rows.map((row, ri) => (ri === r ? row.map((cell, ci) => (ci === c ? v : cell)) : row));
    set({ rows: next });
  };
  const removeRow = (ri) => set({ rows: rows.filter((_, i) => i !== ri) });

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-sm">Title</span>
        <input className="p-2 border rounded" value={title} onChange={(e) => set({ title: e.target.value })} />
      </label>

      <div>
        <div className="text-sm font-medium mb-2">Headers</div>
        <div className="flex flex-col gap-2">
          {headers.map((h, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input className="p-2 border rounded flex-1" value={h} onChange={(e) => updateHeader(idx, e.target.value)} />
              <button type="button" className="btn px-2 py-1 border rounded text-red-600 border-red-400" onClick={() => removeHeader(idx)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn px-3 py-2 border rounded w-fit" onClick={addHeader}>+ Add header</button>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Rows</div>
        <div className="flex flex-col gap-2">
          {rows.map((row, ri) => (
            <div key={ri} className="flex items-center gap-2">
              {headers.map((_, ci) => (
                <input key={ci} className="p-2 border rounded flex-1" value={row[ci] || ""} onChange={(e) => updateCell(ri, ci, e.target.value)} />
              ))}
              <button type="button" className="btn px-2 py-1 border rounded text-red-600 border-red-400" onClick={() => removeRow(ri)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn px-3 py-2 border rounded w-fit" onClick={addRow}>+ Add row</button>
        </div>
      </div>
    </div>
  );
}
