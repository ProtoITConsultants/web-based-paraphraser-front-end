import { useState } from "react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Is Paraphraser free to use?",
      answer:
        "Yes! Paraphrase up to 500 words anytime with unlimited daily usage. ",
    },
    {
      question: "Will my writing sound natural?",
      answer:
        "Absolutely. Our AI is the best AI humanizer free tool designed to make your text flow naturally.",
    },
    {
      question: "Can I use Paraphraser for academic work?",
      answer:
        "Yes, it’s perfect for academic writing. Always cite sources when paraphrasing.",
    },
    {
      question: "How accurate is the paraphrasing?",
      answer:
        "Our AI maintains 99% accuracy in preserving original meaning while enhancing sentence structure and style.",
    },
  ]

  return (
    <section className="container mx-auto px-4 lg:px-12 py-16">
      <div className="grid lg:grid-cols-2 gap-4 md:gap-12 items-center">
        {/* Left Heading */}
        <div className="text-left">
          <h2 className="text-2xl text-center md:text-left md:text-5xl font-bold leading-snug">
            Frequently asked{" "}
            <span className="text-[#D2F159]">questions</span>
          </h2>
        </div>

        {/* Right FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl shadow-sm"
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
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
