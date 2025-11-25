import {
  AlertTriangle, HelpCircle, FileText, BookOpen, RefreshCw,
  Shield, Lightbulb, Zap, Scale, Sparkles,
  GraduationCap, Search,
  Recycle, BookOpenText, Rocket, CheckCircle,
  Target, File,
  TrendingDown, Bot, PenLine,
  Sparkle
} from "lucide-react";

export function AcademicAndProfessionalFeatures({ darkMode }) {
  const studentIssues = [
    { text: "Accidental copying", Icon: AlertTriangle },
    { text: "Not knowing how to paraphrase text without plagiarism", Icon: HelpCircle },
    { text: "Rewriting too close to the original", Icon: FileText },
    { text: "Poor citation", Icon: BookOpen },
    { text: "Reusing content from notes or online sources", Icon: RefreshCw }
  ];

  const learningPoints = [
    { text: "How to prevent accidental plagiarism", Icon: Shield },
    { text: "Why plagiarism occurs in academic writing", Icon: Lightbulb },
    { text: "Common plagiarism mistakes to avoid", Icon: Zap },
    { text: "Plagiarism consequences for students", Icon: Scale },


  ];

  const commonQuestions = [
    { text: "Does paraphrasing count as plagiarism?", Icon: HelpCircle },
    { text: "Is paraphrasing allowed in university?", Icon: GraduationCap },
    { text: "How teachers detect plagiarism", Icon: Search }
  ];

  const bloggerBenefits = [
    { text: "Repurpose articles", Icon: Recycle },
    { text: "Improve readability", Icon: BookOpenText },
    { text: "Rewrite old posts", Icon: RefreshCw },
    { text: "Create SEO friendly variants", Icon: Rocket },
    { text: "Fix duplicated content", Icon: CheckCircle }
  ];

  const extraTools = [
    {
      title: "How to Check Plagiarism for Free",
      description: "We provide free methods and tools to help you test originality.",
      Icon: Search
    },
    {
      title: "TurnAI Plagiarism Remover",
      description: "A special mode designed to rewrite text safely for Turnitin detection.",
      Icon: Target
    },
    {
      title: "Rewrite Academic Text to Remove Plagiarism",
      description: "We ensure compliance with academic style guidelines using our academic paraphrasing tool online.",
      Icon: File
    }
  ];

  return (
    <section className={`${darkMode ? "bg-black" : "bg-gray-50"} py-16 px-4`}>
      <div className="max-w-[1240px] mx-auto">
        {/* Built for Students Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            <span className={`${darkMode ? "text-white" : "text-black"}`}>
              Built for Students: Avoid Academic Penalties
            </span>{" "}
            <span className="text-[#D2F159]">Easily</span>
          </h2>

          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-8 text-center text-lg max-w-3xl mx-auto`}>
            Students often face plagiarism issues that can impact their academic success
          </p>

          {/* Issues Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {studentIssues.map((issue, index) => {
              const Icon = issue.Icon;
              return (
                <div
                  key={index}
                  className={`${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`${darkMode ? "text-[#D2F159]" : "text-[#D2F159]"}`} size={32} />
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm leading-relaxed`}>
                      {issue.text}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

          {/* What We Teach Section */}
          <div className={`flex items-center flex-col w-full ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-br from-[#D2F159]/10 to-white border-[#D2F159]/30"} border-2 rounded-2xl p-8 mb-8`}>
            <h3 className="text-2xl font-bold mb-6 text-center">
              <span className="text-[#D2F159]">Paraphraser.co</span>
              <span className={`${darkMode ? "text-white" : "text-black"}`}> helps students avoid mistakes and learn:</span>
            </h3>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center w-full">
                {learningPoints.map((point, index) => {
                  const Icon = point.Icon;
                  return (
                    <div key={index} className="flex items-center gap-3 text-center w-full">
                      <div className="self-start">
                        <Icon className="text-[#D2F159]" size={28} />
                      </div>
                      <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {point.text}
                      </span>
                    </div>
                  );
                })}
                <div className="flex col-span-2 items-center justify-center gap-3 text-center w-full">
                  <div className="self-start">
                    <Sparkle className="text-[#D2F159]" size={28} />
                  </div>
                  <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    How paraphrasing helps originality
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div>
            <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-semibold mb-4 text-center`}>
              We even address questions like:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {commonQuestions.map((question, index) => {
                const Icon = question.Icon;
                return (
                  <div
                    key={index}
                    className={`${darkMode ? "bg-gray-900 border-[#D2F159]" : "bg-white border-[#D2F159]"} border-2 rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="text-[#D2F159] mx-auto mb-3" size={36} />
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}>
                      {question.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Turnitin & AI Detection Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            <span className={`${darkMode ? "text-white" : "text-black"}`}>
              Rewrite Content to Pass
            </span>{" "}
            <span className="text-[#D2F159]">Turnitin & AI Detection</span>
          </h2>

          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-10 text-center text-lg max-w-2xl mx-auto`}>
            Turnitin is getting smarter every day — but so are we.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Lower Plagiarism Card */}
            <div className={`${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-br from-white to-gray-50 border-gray-200"} border-2 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
              <TrendingDown className="text-[#D2F159] mb-4" size={48} />
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold mb-3 flex items-center gap-2`}>
                Lower Plagiarism in Essays
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Reduce similarity indexes by transforming structure, tone, and logic flow.
              </p>
            </div>

            {/* Remove AI Footprints Card */}
            <div className={`${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-br from-white to-gray-50 border-gray-200"} border-2 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
              <Bot className="text-[#D2F159] mb-4" size={48} />
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold mb-3 flex items-center gap-2`}>

                Remove AI Footprints
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Our rewrite feature makes content pass AI detection and plagiarism checks. It creates human-like and undetectable writing.
              </p>
            </div>

            {/* Rewrite Assignments Card */}
            <div className={`${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-br from-white to-gray-50 border-gray-200"} border-2 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
              <PenLine className="text-[#D2F159] mb-4" size={48} />
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold mb-3 flex items-center gap-2`}>

                Rewrite Assignments the Right Way
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-3`}>
                We guide you on:
              </p>
              <ul className={`${darkMode ? "text-gray-400" : "text-gray-600"} space-y-1 text-sm`}>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2F159]">→</span>
                  <span>How to fix Turnitin plagiarism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2F159]">→</span>
                  <span>How to rewrite sentences to pass plagiarism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D2F159]">→</span>
                  <span>How to paraphrase plagiarism-free</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${darkMode ? "bg-[#D2F159]/10 border-[#D2F159]" : "bg-[#D2F159]/20 border-[#D2F159]"} border-2 rounded-xl p-6 text-center`}>
            <p className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold`}>
              Your writing becomes completely safe and original — without losing clarity or academic value.
            </p>
          </div>
        </div>

        {/* Perfect for Bloggers Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            <span className={`${darkMode ? "text-white" : "text-black"}`}>
              Perfect for
            </span>{" "}
            <span className="text-[#D2F159]">Bloggers, Writers & Professionals</span>
          </h2>

          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-10 text-center text-lg max-w-3xl mx-auto`}>
            Whether you write for business or content marketing, our AI paraphrasing tool helps you create better content faster
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {bloggerBenefits.map((benefit, index) => {
              const Icon = benefit.Icon;
              return (
                <div
                  key={index}
                  className={`${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-2 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D2F159] `}
                >
                  <Icon className="text-[#D2F159] mx-auto mb-3" size={40} />
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium text-sm`}>
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className={`${darkMode ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-r from-[#D2F159]/10 to-white border-[#D2F159]/30"} border-2 rounded-2xl p-6 text-center`}>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-lg`}>
              You can also <span className="font-semibold text-[#D2F159]">rewrite article without plagiarism</span> to refresh outdated blog posts and boost rankings.
            </p>
          </div>
        </div>

        {/* Extra Tools Section */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            <span className={`${darkMode ? "text-white" : "text-black"}`}>
              Extra Tools
            </span>{" "}
            <span className="text-[#D2F159]">We Offer</span>
          </h2>

          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-10 text-center text-lg`}>
            Along with advanced paraphrasing, we help users with:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extraTools.map((tool, index) => {
              const Icon = tool.Icon;
              return (
                <div
                  key={index}
                  className={`${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-br from-white to-[#D2F159]/5 border-gray-200"} border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#D2F159]`}
                >
                  <Icon className="text-[#D2F159] mb-4" size={48} />
                  <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold mb-3`}>
                    {tool.title}
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}