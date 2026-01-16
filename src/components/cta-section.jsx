import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="bg-[#D2F159] py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl lg:text-4xl font-bold text-black mb-4 md:mb-6">Start Writing Better Today</h2>
        <p className="text-sm md:text-lg text-black/80 mb-8 max-w-6xl mx-auto leading-relaxed">
          Join thousands who trust Paraphraser for cleaner, more engaging content, powered by a powerful AI rewrite and
          rephrase AI engine. Try the best paraphrasing tool now and experience effortless humanize text free and
          professional rewriting.
        </p>
        <Link to="/signup" className="bg-white text-black px-12 py-3 rounded-full font-semibold text-sm md:text-lg hover:bg-gray-100 transition-colors cursor-pointer">
          Get Started for Free
        </Link>
      </div>
    </section>
  )
}
