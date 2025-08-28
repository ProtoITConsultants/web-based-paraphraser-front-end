export function ConfidenceSection({darkMode, setDarkMode}) {
  return (
    <section className="max-w-[1140px] mx-auto px-4 lg:px-0 md:py-16">
      <div className="grid lg:grid-cols-2 gap-0 md:gap-12 items-center">
        <div className="space-y-2 md:space-y-6 text-center lg:text-left">
          <h2 className={`text-xl md:text-3xl font-bold leading-tight text-center lg:text-left ${darkMode ? "text-white" : "text-"}`}>
            Write with <span className="text-[#D2F159]">Confidence</span> Every
            Time
          </h2>
          <p className={`text-sm md:text-lg w-full text-gray-600 leading-relaxed text-center lg:text-left ${darkMode ? "text-white" : "text-gray-600"}`}>
            Paraphraser helps you communicate your ideas more effectively and
            clearly in a variety of contexts, including academic papers,
            professional emails, and creative content. Because our AI is
            sensitive to context and subtleties, your rewritten text will retain
            its original meaning while improving readability and flow. As a
            top-rated humanizer and essay humanizer, it also excels as an AI
            humanizer free solution for natural, human-like text.
          </p>
        </div>
        <div className="flex md:justify-end justify-center">
          <img
            src="/1.png"
            alt="Confident writer"
            className="w-full max-w-md lg:max-w-lg justify-self-end"
          />
        </div>
      </div>
    </section>
  );
}
