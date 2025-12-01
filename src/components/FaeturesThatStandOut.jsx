import { useOutletContext } from "react-router-dom";

export function FeaturesThatStandOut({ darkMode, setDarkMode }) {
  const features = [
    {
      title: "Sentence Rewriter Online",
      description:
        "Automatically rewrite sentences in a natural, grammar-friendly way that maintains clarity and meaning.",
      icon: "/image 17.png",
    },
    {
      title: "Academic Paraphrasing Tool Online",
      description:
        "Perfect for assignments, theses, literature reviews, and research papers. Designed as the best paraphrasing tool for students that keeps academic tone intact.",
      icon: "/image 18.png",
    },
    {
      title: "Paragraph Rewriter Free",
      description:
        "Paste any paragraph and watch our AI rephrase it while maintaining full meaning and context.",
      icon: "/image 19.png",
    },
    {
      title: "Plagiarism Removal Mode",
      description:
        "Turn duplicated sentences into unique content using our plagiarism remover tool, plagiarism eliminator, and plagiarism changer online.",
      icon: "/image 21.png",
    },
    {
      title: "Make Copied Text Untraceable",
      description:
        "Convert copied text to unique text that passes both plagiarism checkers and AI detection tools seamlessly.",
      icon: "/image 25.png",
    },
  ];

  return (
    <section className={`md:bg-[#D2F159] md:p-4`}>
      <div className={`${darkMode ? "md:bg-black" : "bg-white"} md:max-w-full md:p-8 mx-auto p-4`}>
        <div className="md:max-w-[1240px] mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-[#D2F159]">
            <span className={`${darkMode ? "text-white" : "text-black"}`}>What Makes Our AI Paraphrasing Tool</span>{" "}
            Unique?
          </h2>
          <p className={`text-center mb-12 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-4xl mx-auto`}>
            Unlike ordinary spinners, our engine focuses on meaning, sentence structure, and context. This is why our tool will be suitable to any person who wishes to paraphrase without losing quality in order to avoid plagiarism.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-2 md:p-6 flex items-center border border-gray-200`}
                >
                  <div className="mr-4 text-[#D2F159]">
                    <img src={feature.icon} className="w-20" alt="" />
                  </div>
                  <div>
                    <h3 className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold mb-2`}>
                      {feature.title}
                    </h3>
                    <p
                      className={`text-xs md:text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}