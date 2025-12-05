import { CTASection } from "../components/cta-section";
import { FeaturesThatStandOut } from "../components/FaeturesThatStandOut";
import { FAQSection } from "../components/faq-section";
import { FeaturesSection } from "../components/features-section";
import { HowItWorks } from "../components/how-it-works";
import { PerfectForAnyNeed } from "../components/PerfectForAnyNeed";
import TranslatorArea from "../components/TranslatorArea";
import { WhatUsersAreSaying } from "../components/WhatUsersAreSaying";
import TranslationIntro from "../components/TranslationIntro";

export default function Landing({darkMode, setDarkMode}) {
  return (
    <main className="min-h-screen scroll-smooth">
      {/* ConfidenceSection above HeroSection on large screens
      <div className="hidden md:block">
        <ConfidenceSection darkMode={darkMode} setDarkMode={setDarkMode}/>
        <div className={`container w-[80%] md:w-1/2 my-5 rounded-full h-[2px] mx-auto ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
      </div>
      <HeroSection darkMode={darkMode} setDarkMode={setDarkMode}/>

      <div className="block md:hidden">
        <div className="container w-[80%] md:w-1/2 my-5 rounded-full bg-gray-300 h-[2px] mx-auto"></div>
        <ConfidenceSection darkMode={darkMode} setDarkMode={setDarkMode}/>
      </div> */}
      <FeaturesSection darkMode={darkMode} setDarkMode={setDarkMode}/>
      <FeaturesThatStandOut darkMode={darkMode} setDarkMode={setDarkMode}/>
      <HowItWorks darkMode={darkMode} setDarkMode={setDarkMode}/>
      <PerfectForAnyNeed darkMode={darkMode} setDarkMode={setDarkMode}/>
      <WhatUsersAreSaying darkMode={darkMode} setDarkMode={setDarkMode}/>
      <CTASection darkMode={darkMode} setDarkMode={setDarkMode}/>
      <FAQSection darkMode={darkMode} setDarkMode={setDarkMode}/>
      <TranslationIntro darkMode={darkMode} />
    </main>
  )
}