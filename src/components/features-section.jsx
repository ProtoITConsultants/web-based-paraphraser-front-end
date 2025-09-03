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

  return (
    <section className="container md:max-w-[1240px] mx-auto px-4 md:px-0 py-16">
      <div className="text-center mb-12">
        <h2 className={`text-2xl md:text-5xl font-semibold mb-4 ${darkMode ? "text-white" : "text-black"}`}>Why Paraphraser is the <span className="text-lime-500">Best Rewording </span>Tool</h2>
        <p className={`${darkMode ? "text-white" : "text-black"} text-base md:text-lg`}>Find the ultimate paraphrasing assistant that is more than a text rewriter. It converts your writing into real, straightforward and humanized texts. Paraphraser is the best tool for rewriting essays, rephrasing sentences, or polishing paragraphs. It makes new, original content that sounds like it was written by a human.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
        {features.map((feature, index) => (
          <div key={index} className={`p-6 rounded-2xl shadow-lg mx-auto ${darkMode ? "bg-black text-white shadow-[#D2F159] shadow-xs" : "bg-white text-black border border-gray-200"}`}>
            <div className="mb-5">
                <img className={`p-2 object-cover rounded-full w-16 h-16 ${
                  darkMode ? "bg-[#D2F159]" : "bg-lime-200/80"
                }`} src={feature.icon} alt="" />
            </div>
            <h3 className="text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
            <p className={` leading-relaxed text-sm md:text-base ${darkMode ? "text-white" : "text-gray-600"}`}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}