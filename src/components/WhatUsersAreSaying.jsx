import { useOutletContext } from "react-router-dom";

export function WhatUsersAreSaying({ darkMode, setDarkMode }) {
  const testimonials = [
    {
      quote: "Paraphraser transformed my writing! The humanize mode made my essays sound so natural.",
      author: "Sarah L.",
      role: "Content Writer",
    },
    {
      quote: "A must-have for professional. It saves me tons of time rewriting reports without losing the message.",
      author: "John D.",
      role: "Masters Student",
    },
    {
      quote: "The multiple modes let me customize my content tone perfectly. Highly recommended!",
      author: "Tina M.",
      role: "Masters Student",
    },
  ];

  return (
    <section className={`${darkMode ? "bg-black text-white" : "bg-white"} py-16 px-4 md:px-0`}>
      <div className="md:max-w-[1240px] mx-auto">
        <h2 className="text-5xl font-semibold text-center mb-12 ">What Our <span className="text-[#D2F159]">Users</span> Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${darkMode ? "shadow-xs shadow-[#D2F159]" : "border border-gray-200"} rounded-2xl shadow-md p-6 flex flex-col items-center text-center`}
            >
              <span className="text-[#D2F159] self-start text-5xl">&ldquo;</span>
              <span className={`${darkMode ? "text-white border-white" : "text-gray-600"} text-lg italic mb-2 pb-2 border-b border-b-gray-300`}>{testimonial.quote}</span>
              <p className="font-semibold mt-5">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}