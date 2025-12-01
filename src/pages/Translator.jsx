import { useLocation } from "react-router-dom";

import TranslatorArea from "../components/TranslatorArea";
import TranslatorWebCopyTranslator from "../components/TranslatorWebCopyTranslator";
import TranslatorWebCopy from "../components/TranslatorWebCopy";

export default function Translator({ darkMode = false }) {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const isTranslatorRoute = location.pathname === "/translator";

  return (
    <div
      className={`min-h-screen ${
        isHomeRoute ? "" : "pt-24"
      } pb-8 mx-auto ${darkMode ? "bg-[#101214]" : "bg-white"}`}
    >
      <h1 className={`${darkMode ? "text-white" : "text-black"} text-3xl md:text-4xl py-5 font-semibold px-8`}>Translator</h1>
      <div className="mx-auto">
        {/* Translator Area - Always visible */}
        <TranslatorArea darkMode={darkMode} />

        {/* Home Web Copy - Only on / route */}
        {isHomeRoute && <TranslatorWebCopyTranslator darkMode={darkMode} />}

        {/* Translator Web Copy - Only on /translator route */}
        {isTranslatorRoute && (
          <TranslatorWebCopy darkMode={darkMode} />
        )}
      </div>
    </div>
  );
}
