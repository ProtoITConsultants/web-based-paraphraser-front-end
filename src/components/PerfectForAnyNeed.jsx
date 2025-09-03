import { useOutletContext } from "react-router-dom";

export function PerfectForAnyNeed({ darkMode, setDarkMode }) {
  const needs = [
    {
      title: "Students",
      description: "Paraphrase essays, assignments, and research papers with ease using Academic mode",
      image: "/young-student-learning-library 3.png", // Placeholder for student image
    },
    {
      title: "Writers",
      description: "Intuitive paraphrasing skills enable writers to be more fluent and creative in both fiction and non-fiction writing",
      image: "/medium-shot-man-working-late-night-laptop 2.png", // Placeholder for writer image
    },
    {
      title: "Professionals",
      description: "Impressive business emails, reports and presentations can be created using Formal and Humanize modes",
      image: "/busy-co-workers 1.png", // Placeholder for professional image
    },
    {
      title: "Content Creators",
      description: "Simplify and paraphrase articles, blogs and social media posts easily in a clear and stylish way",
      image: "/man-working-from-home-desk-while-having-drink 1.png", // Placeholder for content creator image
    },
  ];

  return (
    <section className={`${darkMode ? "bg" : ""} py-16 px-4 md:px-0`}>
      <div className="md:max-w-[1240px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12 text-[#D2F159]"><span className={`${darkMode ? "text-white" : "text-black"}`}>Perfect for Any</span> Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {needs.map((need, index) => (
            <div
              key={index}
              className={`${darkMode ? "bg-black shadow-xs shadow-[#D2F159]" : "bg-white"} rounded-2xl overflow-hidden shadow-md`}
            >
              <img src={need.image} alt={need.title} className="w-full h-78 object-cover mb-4" />
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold mb-1 px-2`}>{need.title}</h3>
              <p className={`text-sm px-2 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{need.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}