export default function ParaphraserWebCopy({ darkMode }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const features = [
    "100% plagiarism-free",
    "Turnitin-safe",
    "Accurate & meaningful",
    "Perfect for academic writing",
    "Free, fast & reliable",
    "Context-aware rewriting",
    "Natural language output",
    "SEO-friendly content"
  ];

  const userTypes = [
    "Students",
    "Writers",
    "Researchers",
    "Bloggers",
    "Freelancers",
    "Professionals"
  ];

  const uniqueFeatures = [
    { title: "Sentence Rewriter Online", desc: "Automatically rewrite sentences in a natural, grammar-friendly way" },
    { title: "Academic Paraphrasing Tool", desc: "Perfect for assignments, theses, literature reviews, and research papers" },
    { title: "Paragraph Rewriter Free", desc: "Paste any paragraph and watch our AI rephrase it while maintaining full meaning" },
    { title: "Plagiarism Removal Mode", desc: "Turn duplicated sentences into unique content instantly" },
    { title: "Make Copied Text Untraceable", desc: "Convert copied text to unique text, passing plagiarism checkers and AI detection" }
  ];

  const studentIssues = [
    "Accidental copying",
    "Not knowing how to paraphrase",
    "Rewriting too close to original",
    "Poor citation",
    "Reusing content from notes"
  ];

  const comparisonData = [
    { feature: "Speed", manual: "Slow", ai: "Instant" },
    { feature: "Accuracy", manual: "Depends on skill", ai: "High, context-aware" },
    { feature: "Removes plagiarism", manual: "Not always", ai: "Yes, fully" },
    { feature: "Reduces similarity index", manual: "Partial", ai: "90–100%" },
    { feature: "Academic tone", manual: "Hard to maintain", ai: "Built-in" },
    { feature: "Cost", manual: "Time-consuming", ai: "Free" },
    { feature: "Turnitin-safe", manual: "Not guaranteed", ai: "Yes" }
  ];

  const faqs = [
    {
      q: "Can AI rewriting remove plagiarism?",
      a: "Yes. Our AI completely restructures text while preserving meaning, producing unique content. It doesn't just swap synonyms — it recreates human-like phrasing from scratch. This not only makes your text unique but it does not alter the original meaning."
    },
    {
      q: "Is paraphrasing allowed in university?",
      a: "In universities, you are allowed to paraphrase if you write the text in your own words and cite the original source. Plagiarism is simply the replacement of a few words. Good paraphrasing demonstrates that you have mastered the content and it is acceptable in academic writing."
    },
    {
      q: "How to bring plagiarism to 0%?",
      a: "Use our plagiarism remover tool, rewrite major sections, and adjust sentence structures. Rewrite any heavily copied sections by breaking, merging, or restructuring ideas. After you have rewritten, check your writing with a plagiarism tool to ensure nothing is similar."
    },
    {
      q: "How to make copied text untraceable?",
      a: "Be sure to paraphrase the text entirely but retain the meaning. Do not leave copied parts or phrases which can be detected by plagiarism detector. Check your document using a plagiarism detector to ensure that it is original."
    }
  ];

  return (
    <div className="mx-auto">
      {/* Hero Section */}
      <div className="mt-16 text-center md:max-w-[1240px] mx-auto md:px-8 px-4">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          The Most Powerful Free AI <span className="text-[#D2F159]">Paraphrasing Tool</span> to Rewrite Plagiarism-Free Content
        </h1>
        <p className={`text-lg md:text-xl mb-6 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          Rewrite, Reword & Remove Plagiarism Instantly — Trusted by Students, Writers & Academics Worldwide
        </p>
        <p className={`text-base md:text-lg ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          Tired of plagiarism stress and struggling to rephrase naturally? Try our free paraphrasing tool that truly delivers. At Paraphraser.co, we use advanced AI and language skills to create rewriting that sounds natural and free from plagiarism.
        </p>
      </div>

      {/* Key Features */}
      <div className="mt-12 mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
                <span className={`text-sm md:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Best Tool */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Why Paraphraser.co Is the <span className="text-[#D2F159]">Best AI Paraphrasing Tool</span> Online
        </h2>
        <p className={`text-lg text-center mb-8 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          Today, paraphrasing is not only the process of replacing words with synonyms. It involves paraphrasing text so that it can appear natural and original. It also ensures that your work has no plagiarism.
        </p>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
          <div className="space-y-6">
            <div className={`border-l-4 border-[#D2F159] pl-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <h3 className={`font-bold text-xl mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                ✔ Rewrite Sentences, Essays, and Papers Without Plagiarism
              </h3>
              <p>Say goodbye to similarity indexes. Our plagiarism rewriter tool changes copied content into unique and high-quality writing.</p>
            </div>
            <div className={`border-l-4 border-[#D2F159] pl-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <h3 className={`font-bold text-xl mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                ✔ Remove Plagiarism from Essays & Assignments
              </h3>
              <p>Use our plagiarism fixer online to make your essays, reports, and articles completely original.</p>
            </div>
            <div className={`border-l-4 border-[#D2F159] pl-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <h3 className={`font-bold text-xl mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                ✔ Create Turnitin-Safe Versions of Your Work
              </h3>
              <p>Reduce similarity percentage, fix flagged content, and rewrite sentences to pass plagiarism detection.</p>
            </div>
            <div className={`border-l-4 border-[#D2F159] pl-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <h3 className={`font-bold text-xl mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                ✔ Rewrite Entire Articles for Free
              </h3>
              <p>Paste your text and use our free rewrite article online feature. It turns blogs or articles into fresh, original content.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Unique */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          What Makes Our AI Paraphrasing Tool <span className="text-[#D2F159]">Unique</span>
        </h2>
        <p className={`text-lg text-center mb-8 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          Unlike ordinary spinners, our engine focuses on meaning, sentence structure, and context.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueFeatures.map((item, index) => (
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

      {/* Built for Students */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Built for <span className="text-[#D2F159]">Students</span>: Avoid Academic Penalties Easily
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Students often face plagiarism issues due to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {studentIssues.map((issue, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
                <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                  {issue}
                </span>
              </div>
            ))}
          </div>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Paraphraser.co helps students avoid mistakes and learn how to prevent accidental plagiarism, understand why plagiarism occurs, and recognize common plagiarism mistakes to avoid.
          </p>
        </div>
      </div>

      {/* Turnitin & AI Detection */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Rewrite Content to Pass <span className="text-[#D2F159]">Turnitin & AI Detection</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 text-center`}>
            <div className="w-12 h-12 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
              ✔
            </div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Lower Plagiarism in Essays
            </h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Reduce similarity indexes by transforming structure, tone, and logic flow
            </p>
          </div>
          <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 text-center`}>
            <div className="w-12 h-12 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
              ✔
            </div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Remove AI Footprints
            </h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Make content pass AI detection and create human-like, undetectable writing
            </p>
          </div>
          <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 text-center`}>
            <div className="w-12 h-12 bg-[#D2F159] rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
              ✔
            </div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Rewrite Assignments Right
            </h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Fix Turnitin plagiarism and rewrite sentences to pass detection
            </p>
          </div>
        </div>
      </div>

      {/* Perfect for Bloggers, Writers & Professionals */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Perfect for <span className="text-[#D2F159]">Bloggers, Writers & Professionals</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-8 md:p-12`}>
          <p className={`text-lg mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Whether you write for business or content marketing, our AI paraphrasing tool helps you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
              <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                Repurpose articles
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
              <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                Improve readability
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
              <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                Rewrite old posts
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
              <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                Create SEO friendly variants
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2F159] rounded-full flex-shrink-0"></div>
              <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                Fix duplicated content
              </span>
            </div>
          </div>
          <p className={`text-lg ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            You can also rewrite article without plagiarism to refresh outdated blog posts and boost rankings.
          </p>
        </div>
      </div>

      {/* Extra Tools We Offer */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Extra Tools <span className="text-[#D2F159]">We Offer</span>
        </h2>
        <p className={`text-lg text-center mb-8 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          Along with advanced paraphrasing, we help users with:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 border-l-4 border-[#D2F159]`}>
            <h3 className={`font-bold text-xl mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              How to Check Plagiarism for Free
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              We provide free methods and tools to help you test originality.
            </p>
          </div>
          <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 border-l-4 border-[#D2F159]`}>
            <h3 className={`font-bold text-xl mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              TurnAI Plagiarism Remover
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              A special mode designed to rewrite text safely for Turnitin detection.
            </p>
          </div>
          <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6 border-l-4 border-[#D2F159]`}>
            <h3 className={`font-bold text-xl mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Rewrite Academic Text to Remove Plagiarism
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              We ensure compliance with academic style guidelines using our academic paraphrasing tool online.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Manual Paraphrasing vs <span className="text-[#D2F159]">AI Paraphrasing</span>
        </h2>
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-3xl p-6 overflow-x-auto`}>
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <th className={`text-left py-4 px-4 font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Feature</th>
                <th className={`text-left py-4 px-4 font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Manual Paraphrasing</th>
                <th className={`text-left py-4 px-4 font-bold text-[#D2F159]`}>AI Paraphrasing (Paraphraser.co)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className={`border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                  <td className={`py-4 px-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{row.feature}</td>
                  <td className={`py-4 px-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{row.manual}</td>
                  <td className={`py-4 px-4 font-semibold ${darkMode ? "text-[#D2F159]" : "text-[#D2F159]"}`}>{row.ai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-16 md:max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          FAQs
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} rounded-2xl p-6`}>
              <h3 className={`font-bold text-xl mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {faq.q}
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={`${darkMode ? "bg-black" : "bg-gray-100"} py-16 flex flex-col items-center text-center rounded-3xl`}>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Start Paraphrasing With <span className="text-[#D2F159]">Zero Plagiarism</span>
        </h2>
        <p className={`text-xl mb-6 max-w-2xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Rewrite text, remove plagiarism, fix Turnitin issues, and make your writing unique — all for free
        </p>
        <button 
          onClick={scrollToTop}
          className="bg-[#D2F159] cursor-pointer text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-[#c5e14a] transition-colors"
        >
          Try Our Paraphraser Now — Free & Fast
        </button>
      </div>
    </div>
  );
}
