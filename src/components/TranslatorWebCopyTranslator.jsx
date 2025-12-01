import { Link } from "react-router-dom";

export default function TranslatorWebCopyTranslator({ darkMode }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const languagePairs = [
    "English to Vietnamese", "English to Dutch", "English to Polish", "English to Burmese",
    "English to Hmong", "English to Creole", "Portuguese to English", "Somali to English",
    "Haitian Creole to English", "Taiwanese to English", "Kinyarwanda to English",
    "English to Korean", "English to Arabic", "English to Gujarati", "English to Malayalam",
    "English to Nepali", "English to Egyptian", "English to Albanian", "English to Romanian",
    "English to Filipino", "English to Patois", "English to Uzbek", "English to Bengali",
    "English to Chinese Simplified", "English to Scottish", "Viet to English", "Dutch to English"
  ];

  const academicLanguages = [
    "Arabic to English",
    "Portuguese to English",
    "English to Malayalam",
    "Italian to English",
    "Hebrew to English",
    "Norse",
    "Cantonese"
  ];

  const travelerLanguages = [
    "Somali to English",
    "Portuguese to English",
    "Norway to English",
    "Khmer",
    "English to Chinese Simplified"
  ];

  const features = [
    "Read foreign articles with ease",
    "Prepare documents for global clients",
    "Communicate with friends from other countries",
    "Handle school or work tasks in different languages",
    "Switch between languages without confusion"
  ];

  return (
    <div className="mx-auto">
      {/* Hero Section */}
      <div className="m-12 mt-16 text-center md:max-w-[1240px] mx-auto">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Translate Any Language to <span className="text-[#D2F159]">English</span> Instantly
        </h1>
        <p className={`text-lg md:text-xl mx-auto ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          Whether you are reading, learning, or preparing content, our translator supports a wide range of languages.
        </p>
      </div>

      {/* Language Support Section */}
      <div className="mt-16 mb-16 md:max-w-[1240px] mx-auto">
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Extensive Language <span className="text-[#D2F159]">Support</span>
          </h2>
          <p className={`text-lg text-center mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            You can translate English to Vietnamese, English to Dutch, English to Polish, English to Burmese, English to Hmong, or even English to Creole. You can also switch from Portuguese to English, Somali to English, Haitian Creole to English, Taiwanese to English, Kinyarwanda to English, or convert Portugal language translation to English with complete clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {languagePairs.map((pair, index) => (
              <span
                key={index}
                className={`${darkMode ? "bg-black" : "bg-white"} px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {pair}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reverse Direction Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Need the <span className="text-[#D2F159]">Opposite</span> Direction?
          </h2>
          <p className={`text-lg mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Easily translate English to Korean, English to Arabic writing, English to Gujarati, English to Malayalam, English to Nepali, or even English to Egyptian—all while keeping the meaning intact.
          </p>
          <p className={`text-lg ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            You can also translate short sentences, long paragraphs, documents, notes, or product descriptions without losing tone or intention. Every translation is simple, clear, and connected to the context you provide.
          </p>
        </div>
      </div>

      {/* Simple Switching Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          English to Every Language – <span className="text-[#D2F159]">Simple Switching</span>, Smooth Results
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Sometimes you need to translate English into a local language for better communication. That is why the translator supports English to Burmese converter, English to Portuguese language converter, English to Albanian, English to Romanian, English to Filipino/Philippines, English to Patois, English to Uzbek, English to Bengali, and even English to Chinese simplified.
          </p>
          <p className={`text-lg mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            If you work with special dialects, you can translate English to Scottish, Eng to Viet, or even Eng to PBI with smooth accuracy. You can also switch from viet to English or dutch to English translation without rewriting the whole sentence manually.
          </p>
          <p className={`text-lg ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            This flexibility makes the tool useful for school projects, work emails, research papers, creative content, and even day-to-day communication.
          </p>
        </div>
      </div>

      {/* For Students Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          For <span className="text-[#D2F159]">Students, Teachers, Researchers</span>, and Writers
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg text-center mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Our academic paraphrasing tool online helps with rewriting, while the translator helps you switch languages without losing meaning.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {academicLanguages.map((lang, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-black" : "bg-white"} rounded-xl p-4 text-center`}
              >
                <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {lang}
                </p>
              </div>
            ))}
          </div>
          <p className={`text-lg text-center ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            This makes the tool perfect for reducing similarity percentage in Turnitin, rewriting assignments without plagiarism, and avoiding common plagiarism mistakes.
          </p>
        </div>
      </div>

      {/* For Travelers Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          For <span className="text-[#D2F159]">Travelers</span> and Global Users
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            If you travel or interact with people worldwide, quick translations save time and reduce confusion.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {travelerLanguages.map((lang, index) => (
              <span
                key={index}
                className={`${darkMode ? "bg-black" : "bg-white"} px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {lang}
              </span>
            ))}
          </div>
          <p className={`text-lg ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Short sentences, daily instructions, and quick chats become clear and comfortable to understand.
          </p>
        </div>
      </div>

      {/* Why This Helps Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Why This Translator Helps You Work <span className="text-[#D2F159]">Smarter</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg text-center mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Every part of the translator is designed to support simple, readable language. The flow stays natural, and each line connects smoothly with the next.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
                <span className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <p className={`text-lg text-center mt-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            This keeps the experience smooth and clear, especially when dealing with sensitive or academic content where precision matters.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`${darkMode ? "bg-gradient-to-r from-gray-900 to-black" : "bg-gradient-to-r from-gray-50 to-gray-100"} p-12 text-center`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Start Enhancing Your Writing and Communicating <span className="text-[#D2F159]">Globally</span> Today!
        </h2>
        <p className={`text-xl mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Break language barriers and connect with the world
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={scrollToTop}
            className="bg-[#D2F159] cursor-pointer text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-[#c5e14a] transition-colors"
          >
            Get Started Now
          </button>
          <Link
            to="/"
            className="bg-transparent border-2 border-[#D2F159] cursor-pointer text-[#D2F159] text-lg px-8 py-4 rounded-full hover:bg-[#D2F159] hover:text-black transition-colors"
          >
            Try Paraphraser
          </Link>
        </div>
      </div>
    </div>
  );
}