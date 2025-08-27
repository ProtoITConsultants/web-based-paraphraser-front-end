import { ConfidenceSection } from "../components/confidence-scetion";
import { CTASection } from "../components/cta-section";
import { FAQSection } from "../components/faq-section";
import { FeaturesSection } from "../components/features-section";
import { HeroSection } from "../components/hero-section";
import { HowItWorks } from "../components/how-it-works";

export default function Landing() {
  return (
    <main className="min-h-screen scroll-smooth">
      {/* ConfidenceSection above HeroSection on large screens */}
      <div className="hidden md:block">
        <ConfidenceSection />
        <div className="container w-[80%] md:w-1/2 my-5 rounded-full bg-gray-300 h-[2px] mx-auto"></div>
      </div>
      <HeroSection/>
      {/* ConfidenceSection below HeroSection on small screens */}
      <div className="block md:hidden">
        <div className="container w-[80%] md:w-1/2 my-5 rounded-full bg-gray-300 h-[2px] mx-auto"></div>
        <ConfidenceSection />
      </div>
      <FeaturesSection />
      <HowItWorks />
      <FAQSection />
      <CTASection />
    </main>
  )
}