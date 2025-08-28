export function HeroSection({darkMode, setDarkMode}) {
  return (
    <section id="Hero" className="max-w-[1140px] mx-auto md:px-0 px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="hidden md:flex justify-start">
          <img
            src="/2.png"
            alt="Person using AI writing tool"
            className="w-full max-w-md lg:max-w-lg"
          />
        </div>
        <div dir="rtl" className="space-y-6 md:text-right text-center">
          <h1 className={`text-xl md:text-3xl mt-8 md:mt-0 font-bold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
            <span className="text-[#D2F159]">Transform Your Writing</span> in
            <br />
            Seconds with Paraphraser, the Best
            <br />
            Paraphrasing Tool
          </h1>
          <p className={`text-sm md:text-lg w-full text-gray-600 leading-relaxed max-w-lg ${darkMode ? "text-white" : "text-gray-600"}`}>
            Instantly improve your writing with Paraphraser's AI paraphraser,
            the best AI rewrite and rewording tool that delivers clearer, more
            polished text without changing your original meaning. Whether you
            need a sentence rephraser, sentence changer, or paragraph rewriter,
            Paraphraser is your ultimate AI rewrite and text rewriter solution
          </p>
        </div>
      </div>
    </section>
  );
}
