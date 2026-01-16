import { useOutletContext } from "react-router-dom";

export function FeaturesThatStandOut({ darkMode, setDarkMode }) {
  const features = [
    {
      title: "Available Anywhere",
      description:
        "You can run Paraphraser on any device and do not need to install it or give it a second thought.",
      icon: "/image 17.png", // Placeholder for location icon
    },
    {
      title: "Multilingual Support",
      description:
        "Re-phrase in more than one language, other than English. In a supportive manner, to address the requirement of international communication.",
      icon: "/image 18.png", // Placeholder for globe icon
    },
    {
      title: "Fast Processing",
      description:
        "Get high-quality, real-time rewritten text without annoying delays.",
      icon: "/image 19.png", // Placeholder for clock icon
    },
    {
      title: "Unlimited Rewrites",
      description:
        "You are free to paraphrase as much as you like and there are no restrictions daily limit.",
      icon: "/image 21.png", // Placeholder for edit icon
    },
    {
      title: "User-Friendly Interface",
      description:
        "Our site has a very simple and easy to use interface so that any user can easily paraphrase regardless of his or her technical knowledge.",
      icon: "/image 25.png", // Placeholder for hand icon
    },
    {
      title: "Precision",
      description:
        "Each of the rewrites is the same in meaning but the level of expression and clarity is improved.",
      icon: "/image 26.png", // Placeholder for target icon
    },
    {
      title: "Humanized Results",
      description:
        "Your content will be written as though it was written by an expert human being, not a robot or unnatural sounding.",
      icon: "/image 27.png", // Placeholder for brain icon
    },
    {
      title: "Customizable Outputs",
      description:
        "Change the tone and style using optional settings to make sure you are always appropriate to the moment in your text.",
      icon: "/image 2 (1).png", // Placeholder for gear icon
    },
    {
      title: "Constant Style Upkeep",
      description:
        "Your originality is maintained, and you produce professional and coherent work every time.",
      icon: "/image 28.png", // Placeholder for speech icon
    },
    {
      title: "Easy Integration",
      description:
        "Use Paraphraser on any platform, and it is compatible with such popular tools as Google Docs and WordPress.",
      icon: "/image 29.png", // Placeholder for arrow icon
    },
    {
      title: "Different Styles",
      description:
        "Select Standard to have a well-rounded paraphrasing. Fluency to have a more polished style, Humanize to have a friendly and conversational style, Formal to have a professional writing style, Academic to have a clear and precise writing and Simple to have a simple and easy read.",
      icon: "/image 30.png", // Placeholder for styles icon
    },
  ];

  return (
    <section className={`md:bg-[#D2F159] md:p-4`}>
      <div className={`${darkMode ? "md:bg-black" : "bg-white"} md:max-w-full md:p-8 mx-auto p-4`}>
        <div className="md:max-w-[1240px] mx-auto">
          <h2 className="text-2xl md:text-5xl font-semibold text-center mb-12 text-[#D2F159]">
            <span className={`${darkMode ? "text-white" : "text-black"}`}>Features That Make Paraphraser</span>{" "}
            Stand Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              // If last card, make it span both columns on md+
              const isLast = index === features.length - 1;
              return (
                <div
                  key={index}
                  className={`${darkMode ? "bg-black shadow-[#D2F159] shadow-xs" : "bg-white"} rounded-2xl shadow-md p-2 md:p-6 flex items-center border border-gray-200${
                    isLast ? " md:col-span-2" : ""
                  }`}
                >
                  <div className="mr-4 text-[#D2F159]">
                    {/* Placeholder for icon - replace with actual icon component or image */}
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
