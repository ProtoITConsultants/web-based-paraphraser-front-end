import { Trash2, Plus } from "lucide-react";

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
    <div className="space-y-3">
      {/* Title */}
      <label className="flex flex-col gap-1">
        <span className="text-sm">Title</span>
        <input className="p-2 border rounded" value={title} onChange={(e) => set({ title: e.target.value })} />
      </label>

      {/* Headers */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Headers</label>
          <button
            type="button"
            onClick={addHeader}
            className="p-2 bg-[#D2F159] hover:bg-lime-500 rounded-full text-gray-900 transition-colors flex items-center justify-center"
            title="Add Column"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
          {headers.map((h, idx) => (
            <div key={idx} className="space-y-1">
              <div className="bg-white dark:bg-[#101214] rounded-full p-3">
                <input
                  className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
                  value={h}
                  onChange={(e) => updateHeader(idx, e.target.value)}
                  placeholder={`Header ${idx + 1}`}
                />
              </div>
              {headers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHeader(idx)}
                  className="w-full p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-600 transition-colors text-xs flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Rows</label>
          <button
            type="button"
            onClick={addRow}
            className="p-2 bg-[#D2F159] hover:bg-lime-500 rounded-full text-gray-900 transition-colors flex items-center justify-center"
            title="Add Row"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {rows.map((row, ri) => (
          <div key={ri} className="space-y-2">
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
              {row.map((cell, ci) => (
                <div key={ci} className="bg-white dark:bg-[#101214] rounded-full p-3">
                  <input
                    className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 text-sm px-2"
                    value={cell}
                    onChange={(e) => updateCell(ri, ci, e.target.value)}
                    placeholder={`Row ${ri + 1}, Col ${ci + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeRow(ri)}
              className="w-full p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-600 transition-colors text-xs flex items-center justify-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Remove Row
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
