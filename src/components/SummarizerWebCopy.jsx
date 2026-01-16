export default function SummarizerWebCopy({ darkMode }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const smartCapabilities = [
    "Automatically identifies topic sentences and core ideas",
    "Handles super long sentences and compresses them cleanly",
    "Produces sentence-concise summaries without losing context",
    "Works seamlessly with mixed content (headings, bullets, paragraphs)",
    "Generates summaries suitable for meeting notes, notes making, reports, and study material"
  ];

  const keyFeatures = [
    { title: "Bullet & Paragraph Mode", desc: "Generate short bullet points or short paragraph summaries." },
    { title: "AI PDF Summarizer", desc: "Upload and summarize PDF instantly." },
    { title: "Sentence Simplifier", desc: "Convert complex text into read simple sentences." },
    { title: "Executive Summary Generator", desc: "Perfect for business and research needs." },
    { title: "Sentence Checker & Sentence Corrector", desc: "Improve sentence structure and grammar." },
    { title: "Sentence Changer & Sentence Simplifier", desc: "Make your writing effortless." }
  ];

  const useCases = [
    "Articles in grammar",
    "Summary of paper",
    "Synopsis creator",
    "Mind map generator",
    "Meeting summary notes from discussions or transcripts",
    "AI that summarizes YouTube videos",
    "Apps that summarize YouTube videos",
    "Best AI for notes making"
  ];

  const capabilities = [
    "Convert long text into summarized form",
    "Create sentence concise results",
    "Generate shortest English sentence",
    "Fix paragraph changing words",
    "Detect grammar with sentence checker",
    "Improve clarity using sentence simplifier",
    "Process super long sentence",
    "Create sentence with abstract",
    "Identify topic sentence in a paragraph",
    "Handle simple sentence complex sentence",
    "Generate passive sentences",
    "Generate short bullet points",
    "Improve sentence conciseness",
    "Convert active and passive voice"
  ];

  const userTypes = [
    { type: "Students", uses: "For fast notes AI, summary of paper, and best AI for notes making" },
    { type: "Writers", uses: "For rewrite this, sentence changer, and paraphrasing synonym" },
    { type: "Researchers", uses: "For document analysis, executive summary generator, and source summary" },
    { type: "Marketers", uses: "For text helper, content compression, and paragraph editor" },
    { type: "Professionals", uses: "For report generation tools, sentence concise formatting, and content cleanup" }
  ];

  const securityFeatures = [
    "Not stored",
    "Not indexed",
    "Fully encrypted",
    "Safe from leaks"
  ];

  return (
    <div className="mx-auto">
      {/* Hero Section */}
      <div className="mt-16 text-center md:max-w-[1240px] mx-auto md:px-8 px-4">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Best Free AI <span className="text-[#D2F159]">Summarizer Tool</span> – Instantly Turn Long Content into Clear Summaries
        </h1>
        <p className={`text-lg md:text-xl mb-6 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          Experience the power of the Best AI Summarizer designed to transform complex content into a clean, accurate, and summarized form within seconds. Our Free AI Summarizer Tool works as a complete AI Article Summarizer, AI Text Summarizer, and AI PDF Summarizer.
        </p>
        <p className={`text-base md:text-lg ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          Whether you need text summarization, fast report generation tools, meeting summary notes, or the best AI for notes making, our advanced AI summarization engine delivers precise results for students, professionals, researchers, and content creators.
        </p>
      </div>

      {/* Smart Summarization Section */}
      <div className="mt-16 mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Smart Summarization for <span className="text-[#D2F159]">Everyday & Advanced Use</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Our AI Summarizer Tool is built to handle both everyday writing tasks and advanced content workflows. Whether you are dealing with short paragraphs, meeting transcripts, or super long documents, the tool adapts intelligently to deliver a clear text summary with high accuracy.
          </p>
          <p className={`text-lg mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Our AI Summary Generator allows users to create short summaries of raw data such as meeting discussions and call transcripts in a few clicks without editing or rewriting them, as these summaries are easier to read and comprehend. This is why the document summarizer is excellent at quick decision-making, learning, and enhancing content.
          </p>
          
          <h3 className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Smart Capabilities You'll Notice
          </h3>
          <div className="space-y-3">
            {smartCapabilities.map((capability, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0 mt-2"></div>
                <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {capability}
                </span>
              </div>
            ))}
          </div>
          
          <p className={`text-lg mt-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Whether you're summarizing articles, creating a source summary, preparing meeting summary notes, or preparing content for reuse, this AI-powered summarization feature ensures clarity, speed, and consistency every time.
          </p>
        </div>
      </div>

      {/* Why Best Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Why Our AI Text Summarizer is the <span className="text-[#D2F159]">Best</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg text-center mb-8 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Our AI Text Summarizer is built using modern NLP and machine learning to deliver unmatched accuracy and performance.
          </p>
          
          <h3 className={`text-2xl font-bold text-center mb-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((item, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-black" : "bg-white"} rounded-xl p-4 text-center shadow-md`}
              >
                <h4 className={`font-semibold text-lg mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {item.title}
                </h4>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          How to Use Our <span className="text-[#D2F159]">AI Summarizer Tool</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-2xl">
                1
              </div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Paste your content or upload a file (TXT, DOCX, Image, or use AI PDF Summarizer).
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-2xl">
                2
              </div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Choose your preferred summary length.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-2xl">
                3
              </div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Click Summarize.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-2xl">
                4
              </div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Copy, download, or regenerate instantly.
              </p>
            </div>
          </div>
          
          <h3 className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            It works perfectly for:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
                <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {useCase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What You Can Do Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          What You Can Do With This <span className="text-[#D2F159]">AI Summarizer</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
                <span className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who Should Use Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Who Should Use This <span className="text-[#D2F159]">Tool?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTypes.map((user, index) => (
            <div
              key={index}
              className={`${darkMode ? "bg-black" : "bg-white"} rounded-xl p-4 text-center shadow-md`}
            >
              <h3 className={`font-bold text-xl mb-3 ${darkMode ? "text-[#D2F159]" : "text-gray-900"}`}>
                {user.type}
              </h3>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {user.uses}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          100% Secure & Private <span className="text-[#D2F159]">AI Summarization</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg text-center mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            We guarantee full data privacy. Your uploaded content is:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-black" : "bg-white"} rounded-xl p-4 text-center shadow-md`}
              >
                <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Impact Section */}
      <div className={`${darkMode ? "bg-black" : "bg-gray-100"} py-16 flex flex-col items-center text-center rounded-3xl`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Final <span className="text-[#D2F159]">Impact</span>
        </h2>
        <p className={`text-lg md:text-xl mb-6 max-w-3xl px-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Our Best AI Summarizer is more than just a tool—it's your complete AI-powered writing assistant. Whether you need a text summary, executive report, meeting summary notes, sentence simplifier, or a full document summarizer, this platform gives you everything in one clean, fast, and accurate environment.
        </p>
        <button 
          onClick={scrollToTop}
          className="bg-[#D2F159] cursor-pointer text-black text-lg px-8 py-4 rounded-full hover:bg-[#c5e14a] transition-colors"
        >
          Try Our Summarizer Now — Free & Fast
        </button>
      </div>
    </div>
  );
}
