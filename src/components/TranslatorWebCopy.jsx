export default function TranslatorWebCopy({ darkMode }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const languages = [
    "English to Korean",
    "English to Vietnamese",
    "Vietnamese to English",
    "English to Dutch",
    "Somali to English",
    "Portuguese to English",
    "English to Hmong",
    "Haitian Creole to English",
    "English to Romanian",
    "English to Albanian",
    "Italian to English",
    "English to Burmese",
    "English to Chinese Simplified",
    "English to Bengali",
    "English to Farsi",
    "English to Arabic",
    "English to Gujarati",
    "English to Egyptian",
    "English to Uzbek",
    "Kinyarwanda to English",
    "Norwegian to English",
    "Taiwanese to English",
    "Cantonese",
    "Norse",
    "Khmer"
  ];

  const userTypes = [
    "Students",
    "Professionals",
    "Researchers",
    "Freelancers",
    "Businesses",
    "Writers"
  ];

  const benefits = [
    "Natural sentence flow",
    "True meaning is maintained",
    "Supports rare languages",
    "Clean, simple wording",
    "Fast results",
    "No complicated steps",
    "Suitable for long documents",
    "Balanced tone"
  ];

  return (
    <div className="mx-auto">
      {/* Hero Section */}
      <div className="m-12 mt-16 text-center md:max-w-[1240px] mx-auto">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Translate Any Language to <span className="text-[#D2F159]">English</span> & English to Any Language
        </h1>
        <p className={`text-lg md:text-xl mx-auto ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          Whether you are working with a single sentence or a long paragraph, it only takes a few seconds to translate any text between English and other languages. The Translator tool will translate your words in a readable version in the language of your choice.
        </p>
      </div>

      {/* What Makes Us Different */}
      <div className="mt-16 mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          What Makes Our Translator <span className="text-[#D2F159]">Different</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12 mx-auto`}>
          <p className={`text-lg md:text-xl text-center mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Many tools translate word by word. We focus on <span className="font-bold text-[#D2F159]">meaning, clarity, and proper sentence structure</span>. Your translated content will sound natural, readable, and ready to use.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userTypes.map((user, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-black" : "bg-white"} rounded-xl p-4 text-center shadow-md`}
              >
                <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {user}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Languages */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Supported <span className="text-[#D2F159]">Languages</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {languages.map((lang, index) => (
            <span
              key={index}
              className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} px-4 py-2 rounded-full text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* How to Use */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          How to Use <span className="text-[#D2F159]">Translator</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mx-auto">
          {[
            { step: "01", title: "Paste Your Text", desc: "Paste your sentence, paragraph, or long content into the input box" },
            { step: "02", title: "Choose Language", desc: "Select from English, Korean, Vietnamese, Portuguese, and more" },
            { step: "03", title: "Click Translate", desc: "Your new text appears instantly in English or any selected language" },
            { step: "04", title: "Review Result", desc: "Your translation will be smooth, clear, and easy to understand" },
            { step: "05", title: "Copy or Download", desc: "Use your translated content anywhere you need" }
          ].map((item, index) => (
            <div
              key={index}
              className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 text-center`}
            >
              <div className="w-12 h-12 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                {item.step}
              </div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {item.title}
              </h3>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What You Can Translate */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          What You Can <span className="text-[#D2F159]">Translate</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {[
            { title: "Academic Content", desc: "Translate study notes, research papers, or reference material" },
            { title: "Business Documents", desc: "Emails, proposals, agreements, and reports" },
            { title: "Creative Content", desc: "Stories, blogs, captions, and listings" },
            { title: "Technical Content", desc: "Instructions, manuals, and guides" },
            { title: "Personal Content", desc: "Messages, letters, and everyday communication" }
          ].map((item, index) => (
            <div
              key={index}
              className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 border-l-4 border-[#D2F159]`}
            >
              <h3 className={`font-bold text-xl mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {item.title}
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-16 md:max-w-[1240px] mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Benefits of Using Our <span className="text-[#D2F159]">Translator</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12 mx-auto`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
                <span className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`${darkMode ? "bg-black" : "bg-gray-100"} mx-auto py-16 flex flex-col items-center text-center`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Translate Without <span className="text-[#D2F159]">Confusion</span>
        </h2>
        <p className={`text-xl mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Work with any language. Understand global content easily.
        </p>
        <button 
          onClick={scrollToTop}
          className="bg-[#D2F159] cursor-pointer text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-[#c5e14a] transition-colors"
        >
          Try Our Translator Today — Fast, Simple, and Free
        </button>
      </div>
    </div>
  );
}
