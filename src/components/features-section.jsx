export function FeaturesSection({darkMode, setDarkMode}) {
  const features = [
    {
      icon: "image 1.png",
      title: "Instant Rewrite",
      description:
        "Quickly write with the best text rewriter software that is professional, student, and content creator friendly.",
    },
    {
      icon: "image 13.png",
      title: "Free Unlimited Use",
      description:
        "Take advantage of a free humanized text service that makes your content interesting every time.",
    },
    {
      icon: "image 14.png",
      title: "Versatile Rewrite Tool",
      description: "Rewrite text, paragraphs or whole articles using Paraphraser with accuracy and style.",
    },
    {
      icon: "image 3.png",
      title: "Effortless Rephrasing",
      description: "Change the words in a sentence without changing the meaning, making sure it is clear and makes sense.",
    },
    {
      icon: "image 5.png",
      title: "True Humanizer",
      description:
        "A free humanizer option that makes your text sound natural , eliminating any robotic sound to a smooth, professional sound.",
    },
    {
      icon: "image 16.png",
      title: "Plagiarism-Free",
      description:
        "Our powerful article rewriter will ensure that you never have to worry about duplication again, and writes fresh and original.",
    },
  ]

  const highlights = [
    { text: "100% plagiarism-free", icon: "✔" },
    { text: "Turnitin-safe", icon: "✔" },
    { text: "Accurate & meaningful", icon: "✔" },
    { text: "Perfect for academic writing", icon: "✔" },
    { text: "Free, fast & reliable", icon: "✔" },
  ]

  return (
    <section className="md:p-4">
      <div className={`${darkMode ? "md:bg-black" : "bg-white"} md:max-w-full md:p-8 mx-auto p-4`}>
        <div className="md:max-w-[1240px] mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 leading-tight ${darkMode ? "text-white" : "text-black"}`}>
              The Most Powerful <span className="text-[#D2F159]">Free AI Paraphrasing Tool</span> to Rewrite Plagiarism-Free Content
            </h2>
            <p className={`${darkMode ? "text-white" : "text-black"} text-lg md:text-xl font-semibold mb-6`}>
              Rewrite, Reword & Remove Plagiarism Instantly — Trusted by Students, Writers & Academics Worldwide
            </p>
          </div>

          {/* Main Content Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* First Card */}
            <div className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-6 border border-gray-200 flex items-center`}>
              <div className="mr-5">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${darkMode ? "bg-[#D2F159]" : "bg-lime-200"}`}>
                  💡
                </div>
              </div>
              <div>
                <h3 className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold mb-2`}>
                  Why Choose Paraphraser.co?
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Tired of plagiarism stress and struggling to rephrase naturally? Try our free paraphrasing tool that truly delivers.
                </p>
              </div>
            </div>

            {/* Second Card */}
            <div className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-6 border border-gray-200 flex items-center`}>
              <div className="mr-5">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${darkMode ? "bg-[#D2F159]" : "bg-lime-200"}`}>
                  🤖
                </div>
              </div>
              <div>
                <h3 className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold mb-2`}>
                  Advanced AI Technology
                </h3>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  At <strong className="text-[#D2F159]">Paraphraser.co</strong>, we use advanced AI and language skills to create rewriting that sounds natural and free from plagiarism.
                </p>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {highlights.map((highlight, index) => (
              <div 
                key={index} 
                className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-4 border border-gray-200 text-center`}
              >
                <div className={`text-2xl mb-2 ${darkMode ? "text-[#D2F159]" : "text-lime-600"}`}>
                  {highlight.icon}
                </div>
                <p className={`text-xs md:text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Card - Full Width */}
          <div className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-6 border border-gray-200 flex items-center mb-12`}>
            <div className="mr-5">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${darkMode ? "bg-[#D2F159]" : "bg-lime-200"}`}>
                ✨
              </div>
            </div>
            <div>
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold mb-2`}>
                Perfect for Every Use Case
              </h3>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Whether you want to rewrite an article online for free, paraphrase academic writing, or remove plagiarism online, our AI paraphrasing tool helps. It makes your content original while keeping the meaning the same.
              </p>
            </div>
          </div>

          {/* Why Paraphraser Section */}
          <div className="mb-12">
            <h3 className={`text-3xl md:text-5xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-black"}`}>
              Why <span className="text-[#D2F159]">Paraphraser.co</span> Is the Best AI Paraphrasing Tool Online
            </h3>
            <p className={`text-center text-base md:text-lg mb-8 max-w-4xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Today, paraphrasing is not only the process of replacing words with synonyms. It involves paraphrasing text so that it can appear natural and original. It also ensures that your work has no plagiarism. Our system is designed to help you:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Rewrite Sentences Card */}
              <div className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-6 border border-gray-200`}>
                <div className="flex items-start mb-4">
                  <div className={`text-2xl mr-3 ${darkMode ? "text-[#D2F159]" : "text-lime-600"}`}>✔</div>
                  <h4 className={`text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                    Rewrite Sentences, Essays, and Papers Without Plagiarism
                  </h4>
                </div>
                <p className={`text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Say goodbye to similarity indexes. Our plagiarism rewriter tool changes copied content into unique and high-quality writing. You can safely use it anywhere without worry.
                </p>
              </div>

              {/* Remove Plagiarism Card */}
              <div className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-6 border border-gray-200`}>
                <div className="flex items-start mb-4">
                  <div className={`text-2xl mr-3 ${darkMode ? "text-[#D2F159]" : "text-lime-600"}`}>✔</div>
                  <h4 className={`text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                    Remove Plagiarism from Essays & Assignments
                  </h4>
                </div>
                <p className={`text-sm md:text-base mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Use our plagiarism fixer online to make your essays, reports, and articles completely original. It's perfect for:
                </p>
                <ul className={`text-sm md:text-base space-y-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <li>• University students</li>
                  <li>• Researchers</li>
                  <li>• Bloggers</li>
                  <li>• Freelancers</li>
                  <li>• Content creators</li>
                </ul>
              </div>

              {/* Turnitin-Safe Card */}
              <div className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-6 border border-gray-200`}>
                <div className="flex items-start mb-4">
                  <div className={`text-2xl mr-3 ${darkMode ? "text-[#D2F159]" : "text-lime-600"}`}>✔</div>
                  <h4 className={`text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                    Create Turnitin-Safe Versions of Your Work
                  </h4>
                </div>
                <p className={`text-sm md:text-base mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Our tool helps you:
                </p>
                <ul className={`text-sm md:text-base space-y-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <li>• Reduce similarity percentage in Turnitin</li>
                  <li>• Understand how to bring plagiarism to 0%</li>
                  <li>• Fix content flagged in originality reports</li>
                  <li>• Rewrite sentences to pass plagiarism detection</li>
                </ul>
              </div>

              {/* Rewrite Articles Card */}
              <div className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-6 border border-gray-200`}>
                <div className="flex items-start mb-4">
                  <div className={`text-2xl mr-3 ${darkMode ? "text-[#D2F159]" : "text-lime-600"}`}>✔</div>
                  <h4 className={`text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                    Rewrite Entire Articles for Free
                  </h4>
                </div>
                <p className={`text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Paste your text and use our free rewrite article online feature. It turns blogs or articles into fresh, original content. This makes your writing clearer and easier to read.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}