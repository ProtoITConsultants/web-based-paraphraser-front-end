import { Link } from "react-router-dom";

export default function TranslationIntro({ darkMode }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`py-16 ${darkMode ? "bg-black" : "bg-white"}`}>
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Main Heading */}
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Introducing Our <span className="text-[#D2F159]">Translation Tool</span> – Clear, Simple and Made for Everyone
        </h2>

        {/* Introduction Text */}
        <div className="max-w-4xl mx-auto space-y-4">
          <p className={`text-base md:text-lg text-center ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Communication becomes easier when language barriers fade. That is why we added a dedicated translation tool that helps you change text from any language to English and from English to any language with accuracy and ease.
          </p>

          <p className={`text-base md:text-lg text-center font-medium ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}>
            The goal is simple: help you understand, write, and express yourself clearly, no matter the language you start with.
          </p>
        </div>

        {/* Feature Cards */}
        <div className={`mt-10 rounded-3xl p-6 md:p-10 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}>
          <p className={`text-base md:text-lg text-center mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            This translator is built for <span className="font-bold text-[#D2F159]">students, professionals, researchers, travelers</span>, and anyone who needs reliable translations without confusion.
          </p>

          <div className={`flex items-center justify-center gap-4 p-5 rounded-2xl border-l-4 border-[#D2F159] ${
            darkMode ? "bg-black" : "bg-white"
          }`}>
            <div className="w-3 h-3 bg-[#D2F159] rounded-full flex-shrink-0"></div>
            <p className={`text-base md:text-lg ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}>
              Every sentence you translate stays true to its meaning while becoming easy to read and ready to use.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <Link
            onClick={scrollToTop}
            to="/translator"
            className="bg-[#D2F159] cursor-pointer text-black text-base md:text-lg font-semibold px-8 py-3 rounded-full hover:bg-[#c5e14a] transition-colors shadow-lg"
          >
            Try Our Translator Now
          </Link>
        </div>
      </div>
    </div>
  );
}
