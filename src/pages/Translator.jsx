import { useLocation } from "react-router-dom";

import TranslatorArea from "../components/TranslatorArea";
import TranslatorWebCopyTranslator from "../components/TranslatorWebCopyTranslator";
import TranslatorWebCopy from "../components/TranslatorWebCopy";

export default function Translator({ darkMode = false }) {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const isTranslatorRoute = location.pathname === "/translator";

  return (
    <div className={`min-h-screen pt-24 pb-8 mx-auto ${
      darkMode ? "bg-[#101214]" : "bg-white"
    }`}>
      <div className="mx-auto">
        {/* Translator Area - Always visible */}
        <TranslatorArea darkMode={darkMode} />
        
        {/* Home Web Copy - Only on / route */}
        {isHomeRoute && <TranslatorWebCopy darkMode={darkMode} />}
        
        {/* Translator Web Copy - Only on /translator route */}
        {isTranslatorRoute && <TranslatorWebCopyTranslator darkMode={darkMode} />}
      </div>
    </div>
  );
}
