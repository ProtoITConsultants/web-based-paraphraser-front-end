export function HowItWorks({darkMode, setDarkMode}) {
  const steps = [
    {
      number: "01",
      icon: "/image 7.png", // clipboard icon
      title: "Paste Your Text",
      description:
        "Copy and paste up to 500 words into our intuitive editor; no signup needed.",
    },
    {
      number: "02",
      icon: "/image 11.png", // arrows icon
      title: "Select Your Mode",
      description:
        "Choose your preferred writing style from casual to academic.",
    },
    {
      number: "03",
      icon: "/image 12.jpg", // checkmark icon
      title: "Get Instant Results",
      description:
        "Our AI technology instantly improves it while preserving original meaning.",
    },
  ];

  return (
    <section className={`${darkMode ? "bg-black" : "bg-gray-100"} mx-auto py-16 px-4 md:px-0`}>
      <div className="flex flex-col md:flex-row gap-12 items-center justify-between md:max-w-[1240px] mx-auto">
        {/* Left Circle */}
        <div className="flex sm:justify-self-center lg:justify-self-start xl:justify-self-center ml-0">
          <div className="relative w-full">
            <div className={`w-60 h-60 md:w-72 md:h-72 rounded-full border-[20px] border-[#D2F159] flex items-center justify-center mx-auto ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
              <h2 className="text-2xl lg:text-4xl font-bold text-center">
                How it <br /> works?
              </h2>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#D2F159] shadow-md max-w-[470px]"
            >
              {/* Icon */}
              <div className="flex items-center gap-4">
                <img src={step.icon} className="p-2 bg-white rounded-full flex items-center justify-center text-2xl w-16 h-16 md:w-20 md:h-20" />
                <div className={`w-full p-3 rounded-xl flex justify-between items-center gap-2 ${darkMode ? "bg-black text-white" : "bg-white"}`}>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className={`text-xs md:text-sm ${darkMode ? "text-white" : "text-gray-600"}`}>{step.description}</p>
                  </div>
                  {/* Step Number */}
                  <div className="text-4xl font-bold">
                    {step.number}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
