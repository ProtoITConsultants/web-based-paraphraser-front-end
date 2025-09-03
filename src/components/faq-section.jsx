import { useState } from "react"

export function FAQSection({darkMode, setDarkMode}) {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Which modes are appropriate for certain purposes?",
      answer:
        "Use Formal for business, Academic for schoolwork, Humanize for natural tone, Simple for easy reading, Fluency for smoothness, and Standard for balanced rephrasing. ",
    },
    {
      question: "How accurate is the paraphrasing?",
      answer:
        "Your original meaning will always be retained with clear well-expressed rewrites by our tool.",
    },
    {
      question: "Can one edit the text that has been paraphrased after it is generated?",
      answer:
        "Yes the output can be fully edited to allow you to adjust it to the precise taste. ",
    },
    {
      question: "Is Paraphraser free to use?",
      answer:
        "Yes, with unlimited access on the free plan and additional features available on Premium.",
    },
    {
      question: "Can I upload documents?",
      answer:
        "Absolutely; upload essays, articles, or reports to paraphrase entire documents swiftly. ",
    },
    {
      question: "Does Paraphraser support languages other than English?",
      answer:
        "Yes, it supports multiple languages to help you communicate with audiences.",
    },
    {
      question: "Will using Paraphraser change my message?",
      answer:
        "No, your core message remains consistent while improving readability and style.",
    },
    {
      question: "Is the platform easy for beginners?",
      answer:
        "Designed with simplicity in mind, it’s accessible for all skill levels.",
    },
    {
      question: "How fast is the paraphrasing process?",
      answer:
        "Rewritten text is generated instantly to keep your workflow uninterrupted.",
    },
    {
      question: "Is Paraphraser compatible with any device?",
      answer:
        "Yes, it is compatible with desktops, tablets and smartphones without any installation.",
    },
  ]

  return (
    <section className="container mx-auto px-4 lg:px-0 py-16 max-w-[1240px]">
      <div className="flex flex-col gap-4 md:gap-12 items-center">
        {/* Left Heading */}
        <div className="text-left">
          <h2 className={`text-2xl text-center md:text-left md:text-5xl font-semibold leading-snug ${darkMode ? "text-white" : "text-black"}`}>
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
