export default function ModeSelector({ activeMode, setActiveMode, darkMode }) {
  const modes = [
    "Standard",
    "Fluency",
    "Humanize",
    "Formal",
    "Academic",
    "Simple",
  ];

  return (
    <div className="flex flex-col font-light">
      <div className="flex items-center space-x-6">
        <span
          className={`text-sm font-medium px-8 py-2 border rounded-full  ${
            darkMode ? "text-gray-200 border-[#D2F159]" : "text-black"
          }`}
        >
          Modes
        </span>
        <div className="flex my-5 space-x-6 relative overflow-x-auto scrollbar-thin scrollbar-thumb-[#D2F159] scrollbar-track-gray-200 lg:overflow-visible lg:scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`relative pb-2 text-sm  self-start cursor-pointer
                ${darkMode
                  ? activeMode === mode
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                  : activeMode === mode
                    ? "text-black"
                    : "text-gray-400 hover:text-black"}`}
            >
              {mode}
              {/* Underline */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out
                  ${darkMode
                    ? activeMode === mode
                      ? "bg-white opacity-100 scale-x-100"
                      : "bg-gray-400 opacity-0 scale-x-0"
                    : activeMode === mode
                      ? "bg-black opacity-100 scale-x-100"
                      : "bg-gray-400 opacity-0 scale-x-0"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
