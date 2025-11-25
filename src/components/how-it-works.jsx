import { useState } from 'react';

export function HowItWorks({ darkMode = false, setDarkMode }) {
  const comparisonData = [
    { feature: "Speed", manual: "Slow", ai: "Instant" },
    { feature: "Accuracy", manual: "Depends on skill", ai: "High, context-aware" },
    { feature: "Removes plagiarism", manual: "Not always", ai: "Yes, fully" },
    { feature: "Reduces similarity index", manual: "Partial", ai: "90–100%" },
    { feature: "Academic tone", manual: "Hard to maintain", ai: "Built-in" },
    { feature: "Cost", manual: "Time-consuming", ai: "Free" },
    { feature: "Turnitin-safe", manual: "Not guaranteed", ai: "Yes" },
  ];

  return (
   <section className={`${darkMode ? "bg-black" : "bg-gray-100"} mx-auto py-12 px-3 md:px-0`}>
  <div className="w-full max-w-full sm:max-w-[500px] md:max-w-[860px] lg:max-w-[1240px] mx-auto px-2">
    
    <h2
      className={`${darkMode ? "text-white" : "text-black"} 
      text-xl sm:text-2xl md:text-3xl lg:text-4xl 
      font-bold text-center mb-6`}
    >
      Manual Paraphrasing vs <span className="text-[#D2F159]">AI Paraphrasing</span>
    </h2>

    <div className="overflow-x-auto">
      <div className={`${darkMode ? "bg-gray-900" : "bg-white"} rounded-2xl shadow-lg overflow-hidden`}>

        <table className="w-full text-xs sm:text-sm md:text-base lg:text-lg">
          <thead>
            <tr className="bg-[#D2F159]">
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-bold text-black">Feature</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-bold text-black">Manual Paraphrasing</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left font-bold text-black">AI Paraphrasing (Paraphraser.co)</th>
            </tr>
          </thead>

          <tbody>
            {comparisonData.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"} ${
                  index % 2 === 0
                    ? darkMode ? "bg-gray-900" : "bg-gray-50"
                    : darkMode ? "bg-black" : "bg-white"
                }`}
              >
                <td
                  className={`px-3 sm:px-4 md:px-6 py-3 font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {row.feature}
                </td>

                <td
                  className={`px-3 sm:px-4 md:px-6 py-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {row.manual}
                </td>

                <td
                  className={`px-3 sm:px-4 md:px-6 py-3 ${
                    darkMode ? "text-[#D2F159]" : "text-gray-700"
                  }`}
                >
                  {row.ai}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  </div>
</section>

  );
}

// Demo wrapper
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-[#D2F159] rounded-lg font-semibold"
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <HowItWorks darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}