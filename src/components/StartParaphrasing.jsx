import { useState } from 'react';

export function StartParaphrasing({ darkMode = false }) {
  const features = [
    "Rewrite text",
    "Remove plagiarism",
    "Fix Turnitin issues",
    "Rewrite essays",
    "Reduce similarity index",
    "Paraphrase safely",
    "Make your writing unique"
  ];

  return (
    <section className={`${darkMode ? "bg-black" : "bg-gray-100"} mx-auto py-16 px-4 md:px-0`}>
      <div className="md:max-w-[1240px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className={`${darkMode ? "text-white" : "text-black"} text-4xl md:text-5xl font-bold mb-6`}>
            Start Paraphrasing With <span className="text-[#D2F159]">Zero Plagiarism</span>
          </h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-xl mb-8`}>
            Paraphraser.co is your all-in-one solution to:
          </p>
          
          {/* Inline Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#D2F159] px-4 py-2 rounded-full text-black"
              >
                {feature}
              </div>
            ))}
          </div>

         
        </div>
      </div>
    </section>
  );
}
