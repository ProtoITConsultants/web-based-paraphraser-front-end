export function FeaturesSection() {
  const features = [
    {
      icon: "image 1.png",
      title: "Lightning-Fast Results",
      description:
        "Transform entire paragraphs in seconds, not minutes. For quick rephrasing, our AI instantly analyzes your text.",
    },
    {
      icon: "c2.png",
      title: "Maintains Your Voice",
      description:
        "Unlike other rewrite tools, Paraphraser preserves your unique style while enhancing clarity and flow.",
    },
    {
      icon: "image 3.png",
      title: "Multiple Writing Modes",
      description: "Choose from Standard, Academic, Creative, and Professional modes to match your needs.",
    },
    {
      icon: "c4.png",
      title: "Smart Suggestions",
      description: "To get the most out of our AI rewording tool, click any word to see context-appropriate synonyms.",
    },
    {
      icon: "image 5.png",
      title: "Free Humanizer",
      description:
        "Act as a free humanizer to humanize AI text free and unlimited, ensuring your text sounds natural and engaging.",
    },
    {
      icon: "c6.png",
      title: "Easy Login/Signup",
      description:
        "Get started instantly with secure and hassle-free Google authentication—no need to remember extra passwords.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-5xl font-bold mb-4">Why Choose Paraphraser?</h2>
      </div>
      <div className="grid lg:w-2/3 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto justify-items-center">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg mx-auto">
            <div className="mb-5">
                <img className="p-2 object-cover rounded-full bg-lime-100 w-16 h-16" src={feature.icon} alt="" />
            </div>
            <h3 className="text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}