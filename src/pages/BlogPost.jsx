import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Link, useParams, useLocation } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { getBlogPost } from "../blog-data"
export default function BlogPost() {
  const { darkMode } = useOutletContext();
  const { slug } = useParams();
  const location = useLocation();
  const post = getBlogPost(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  if (!post) {
    return (
      <div className={`min-h-screen ${darkMode ? "" : "bg-white"}`}> 
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Blog post not found</h1>
          <Link to="/blogs" className={`inline-flex items-center mt-8 ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors fixed left-7`}>
            <ChevronLeft className="w-7 h-7 mr-1" />
            Back
          </Link>
        </div>
        <h1 className={`text-2xl md:text-5xl font-semibold text-center my-8 ${darkMode ? "text-white" : "text-gray-900"}`}>Content Not Posted Yet!</h1>
      </div>
    );
  }

  const renderSection = (section, index) => {
    switch (section.type) {
      case "paragraph":
        return (
          <p key={index} className={`${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-6`}>
            {section.content}
          </p>
        )

      case "heading":
        return (
          <h2 key={index} className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-6 mt-8`}>
            {section.content}
          </h2>
        )

      case "numbered-list":
        return (
          <div key={index} className="mb-8">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-6">
                <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"} mb-3`}>
                  {itemIndex + 1}. {item.title}
                </h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed pl-6`}>{item.content}</p>
              </div>
            ))}
          </div>
        )

      case "steps":
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {section.items.map((step, stepIndex) => (
              <div
                key={stepIndex}
                className={`${darkMode ? "bg-[#17191C] border-[#D2F159]" : "bg-gray-50 border-[#D2F159]"} border-2 rounded-3xl p-6`}
              >
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"} mb-3`}>{step.title}</h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm leading-relaxed`}>
                  {step.content}
                </p>
              </div>
            ))}
          </div>
        )

      case "bullet-list":
        return (
          <div key={index} className="mb-8">
            {section.title && (
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-4 font-medium`}>{section.title}</p>
            )}
            <ul className={`${darkMode ? "text-gray-300" : "text-gray-700"} space-y-2 pl-6`}>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="list-disc leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )

      case "quote":
        return (
          <blockquote
            key={index}
            className={`${darkMode ? "bg-[#17191C] border-[#D2F159]" : "bg-gray-50 border-[#D2F159]"} border-l-4 p-6 mb-8 italic rounded-3xl`}
          >
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-lg leading-relaxed mb-2`}>
              "{section.content}"
            </p>
            {section.author && (
              <cite className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm not-italic`}>
                — {section.author}
              </cite>
            )}
          </blockquote>
        )

      case "table":
        return (
          <div key={index} className="mb-8">
            {section.title && (
              <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>
                {section.title}
              </h3>
            )}
            <div className="overflow-x-auto">
              <table
                className={`w-full ${darkMode ? "bg-[#17191C]" : "bg-white"} border border-[#D2F159] rounded-3xl`}
              >
                <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-3xl`}>
                  <tr>
                    {section.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className={`px-4 py-3 text-left text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"} border-b border-[#D2F159]`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-4 py-3 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} border-b border-[#D2F159]`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case "faq":
        return (
          <div key={index} className="mb-8">
            {section.title && (
              <h3 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"} mb-6 text-center`}>
                {section.title.includes("questions") ? (
                  <>
                    {section.title.split("questions")[0]}
                    <span className="#D2F159">questions</span>
                  </>
                ) : (
                  section.title
                )}
              </h3>
            )}
            <div className="space-y-4 w-full">
              {section.items.map((faq, faqIndex) => (
                <div
                  key={faqIndex}
                  className={`${darkMode ? "bg-[#17191C]" : "bg-gray-50"} rounded-3xl shadow-sm`}
                >
                  <button
                    className="w-full px-3 md:px-6 py-6 flex justify-between items-center"
                    onClick={() => setOpenFaqIndex(openFaqIndex === faqIndex ? null : faqIndex)}
                  >
                    <span className={`text-sm text-left md:text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{faq.question}</span>
                    <div className="p-1 bg-[#D2F159] rounded-full flex items-center justify-center">
                      {openFaqIndex === faqIndex ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                        </svg>
                      )}
                    </div>
                  </button>
                  {openFaqIndex === faqIndex && (
                    <div className="px-6 pb-4">
                      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen py-16 ${darkMode ? "" : "bg-white"}`}>
      <div className="max-w-[1240px] mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to="/blogs"
          className={`inline-flex items-center ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} mb-8 transition-colors absolute md:fixed md:left-7 left-5`}
        >
          <ChevronLeft className="w-7 h-7" />
          Back
        </Link>

        {/* Article Header */}
        <div className="my-8">
          <h1
            className={`text-3xl md:text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-6 leading-tight text-balance`}
          >
            {post.title}
          </h1>

          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-6 text-lg text-pretty`}>
            {post.subtitle}
          </p>

          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mb-8`}>{post.date}</div>
        </div>

        {/* Featured Image (use card image from router state if available) */}
        <div className="mb-12">
          <img
            src={location.state?.img || post.img || "/placeholder.svg?height=320&width=800&query=modern architectural design"}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.sections.map((section, index) => renderSection(section, index))}
        </div>
      </div>
    </div>
  )
}