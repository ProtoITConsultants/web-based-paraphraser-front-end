import { useState } from "react";
import TranslatorArea from "../components/TranslatorArea";

export default function Translator({ darkMode }) {
  return (
    <div className={`min-h-screen pt-24 px-4 md:px-8 pb-8 ${
      darkMode ? "bg-[#101214]" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Text Translator
          </h1>
          <p className={`text-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Translate your text into multiple languages instantly
          </p>
        </div>
        <TranslatorArea darkMode={darkMode} />
      </div>
    </div>
  );
}
