export function HowItWorks({ darkMode, setDarkMode }) {
  const steps = [
    {
      number: "01",
      icon: "/image 7.png", // clipboard icon
      title: "Professional Tone",
      description: "Quickly produce professional, formal texts suitable to use in business correspondence.",
    },
    {
      number: "02",
      icon: "/image 11.png", // arrows icon
      title: "Enhance Readability",
      description: "Get a natural and easy flow of reading without any problems.",
    },
    {
      number: "03",
      icon: "/image 12.jpg", // checkmark icon
      title: "Academic Precision",
      description: "Cite precise, academic material with the Academic mode.",
    },
    {
      number: "04",
      icon: "/image 7.png", // clipboard icon
      title: "Boost Engagement",
      description: "Humanized, relatable text helps you connect deeply with your audience.",
    },
    {
      number: "05",
      icon: "/image 11.png", // arrows icon
      title: "Save Time",
      description: "Speed up your writing and concentrate on ideas rather than on the tiresome rewriting.",
    },
  ];

  return (
    <section className={`${darkMode ? "bg-black" : "bg-gray-100"} mx-auto py-16 px-4 md:px-0`}>
      <div className="flex flex-col md:flex-row gap-12 items-center justify-between md:max-w-[1240px] mx-auto">
        {/* Left Circle */}
        <div className="flex sm:justify-self-center lg:justify-self-start xl:justify-self-center ml-0">
          <div className="relative w-full">
            <div className="w-60 h-60 md:w-100 md:h-100 rounded-full border-[20px] border-[#D2F159] flex items-center justify-center mx-auto">
              <h2 className={`${darkMode ? "text-white" : "text-black"} text-2xl lg:text-4xl font-bold text-center`}>
                <span className="text-[#D2F159]">Benefits</span> of Using Paraphraser
              </h2>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#D2F159] shadow-md max-w-full"
            >
              <div className="flex items-center gap-4 w-full">
                <img src={step.icon} className="p-2 bg-white rounded-full flex items-center justify-center text-2xl w-16 h-16 md:w-20 md:h-20" />
                <div className={`w-full p-3 rounded-xl flex justify-between items-center gap-2 ${darkMode ? "bg-black text-white" : "bg-white"}`}>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className={`text-xs md:text-sm ${darkMode ? "text-white" : "text-gray-600"}`}>{step.description}</p>
                  </div>
                  <div className="text-4xl font-bold">{step.number}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}