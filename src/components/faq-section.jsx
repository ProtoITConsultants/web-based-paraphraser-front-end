import { useState } from "react"

export function FAQSection({darkMode, setDarkMode}) {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Can AI rewriting remove plagiarism?",
      answer:
        "Yes. Our AI completely restructures text while preserving meaning, producing unique content. It doesn't just swap synonyms — it recreates human-like phrasing from scratch. This not only makes your text unique but it does not alter the original meaning. Such tools as Paraphraser.co are created to produce Turnitin-safe and plagiarism-free output in real time.",
    },
    {
      question: "Is paraphrasing allowed in university?",
      answer:
        "In universities, you are allowed to paraphrase if you write the text in your own words and cite the original source. Plagiarism is simply the replacement of a few words. Good paraphrasing demonstrates that you have mastered the content and it is acceptable in academic writing.",
    },
    {
      question: "How to bring plagiarism to 0%?",
      answer:
        "Use our plagiarism remover tool, rewrite major sections, and adjust sentence structures. Rewrite any heavily copied sections by breaking, merging, or restructuring ideas. Do not copy the words or phrases of the original source. After you have rewritten, check your writing with the help of a plagiarism tool to be sure that nothing is similar and your writing is totally original.",
    },
    {
      question: "How to make copied text untraceable?",
      answer:
        "Be sure to paraphrase the text entirely but retain the meaning. Do not leave copied parts or phrases which can be detected by plagiarism detector. Check your document using a plagiarism detector to ensure that it is original.",
    },
  ]

  return (
    <section className="container mx-auto px-4 lg:px-0 py-16 max-w-[1240px]">
      <div className="flex flex-col gap-4 md:gap-12 items-center">
        {/* Left Heading */}
        <div className="text-left">
          <h2 className={`text-2xl text-center md:text-left md:text-5xl font-bold leading-snug ${darkMode ? "text-white" : "text-black"}`}>
            Frequently asked{" "}
            <span className="text-[#D2F159]">questions</span>
          </h2>
        </div>

        {/* Right FAQ Accordion */}
        <div className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${darkMode ? "bg-black text-white" : "bg-gray-100"} rounded-2xl shadow-sm`}
            >
              <button
                className="w-full px-3 md:px-6 p-6 flex justify-between items-center"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span className="text-sm text-left md:text-base font-semibold">
                  {faq.question}
                </span>
                <div className="p-1 bg-[#D2F159] rounded-full flex items-center justify-center">
                  {openIndex === index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                    </svg>
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className={`${darkMode ? "text-white" : "text-gray-600"} text-sm`}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
