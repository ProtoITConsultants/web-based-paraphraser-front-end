import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { getBlogPost } from "../blog-data"
import axiosInstance from "../utils/axiosInstance"

export default function BlogPost({ previewData }) {
  const { darkMode } = useOutletContext();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (previewData) {
        console.log("Using preview data:", previewData);
        setPost(previewData);
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching blog post with slug:", slug);
        const response = await axiosInstance.get(`/blog/slug/${slug}`);
        console.log("=== BLOG POST RECEIVED FROM API ===");
        console.log("Full response:", response.data);
        console.log("Body field:", response.data.body);
        console.log("Content field:", response.data.content);
        console.log("Body length:", response.data.body?.length || 0);
        console.log("Content length:", response.data.content?.length || 0);
        console.log("=== END API RESPONSE ===");
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        const fetchedPost = getBlogPost(slug);
        console.log("Fallback to static data:", fetchedPost);
        setPost(fetchedPost);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [previewData, slug]);

  if (loading) {
    return <div className={`min-h-screen ${darkMode ? "" : "bg-white"}`}>Loading...</div>;
  }

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
        // Check if the section has a links array for dynamic inline linking
        if (section.links && section.links.length > 0) {
          let content = section.content;
          // Create a regex pattern for all anchor texts in the links array
          const anchorTexts = section.links.map(link => link.anchorText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
          const regex = new RegExp(`(${anchorTexts})`, 'g');
          // Split content and insert links
          const parts = content.split(regex);
          return (
            <p key={index} className={`${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-6`}>
              {parts.map((part, partIndex) => {
                const link = section.links.find(link => link.anchorText === part);
                if (link) {
                  return (
                    <Link
                      key={partIndex}
                      to={link.to}
                      className="text-[#D2F159] hover:underline"
                    >
                      {part}
                    </Link>
                  );
                }
                return part;
              })}
            </p>
          );
        }
        // Render plain paragraph if no links are defined
        return (
          <p key={index} className={`${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-6`}>
            {section.content}
          </p>
        );

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
                    <span className="text-[#D2F159]">questions</span>
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
        <Link
          to="/blogs"
          className={`inline-flex items-center ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} mb-8 transition-colors absolute md:fixed md:left-7 left-5`}
        >
          <ChevronLeft className="w-7 h-7" />
          Back
        </Link>

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

        <div className="mb-12">
          <img
            src={post.img?.url || post.img || post.coverImage?.url || post.coverImage}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-lg"
            onError={(e) => {
              console.error("Image failed to load:", e.target.src);
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>

        {/* Render HTML body content */}
        {(() => {
          const htmlContent = post.body || '';
          
          console.log('=== RENDERING BLOG CONTENT ===');
          console.log('post.body exists:', !!post.body);
          console.log('post.body length:', post.body?.length || 0);
          console.log('=== END RENDERING INFO ===');
          
          if (htmlContent && htmlContent.trim()) {
            return (
              <article 
                className={`blog-content prose prose-lg max-w-none ${
                  darkMode 
                    ? 'prose-invert' 
                    : ''
                }`}
                style={{
                  '--tw-prose-body': darkMode ? '#d1d5db' : '#374151',
                  '--tw-prose-headings': darkMode ? '#ffffff' : '#111827',
                  '--tw-prose-links': '#D2F159',
                  '--tw-prose-bold': darkMode ? '#ffffff' : '#111827',
                  '--tw-prose-quotes': darkMode ? '#d1d5db' : '#4b5563',
                  '--tw-prose-quote-borders': '#D2F159',
                  '--tw-prose-code': '#D2F159',
                }}
              >
                <div
                  className={`
                    prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                    prose-h1:text-4xl prose-h1:leading-tight
                    prose-h2:text-3xl prose-h2:leading-tight
                    prose-h3:text-2xl prose-h3:leading-snug
                    prose-p:text-base prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-[#D2F159] prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                    prose-strong:font-semibold
                    prose-em:italic
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2
                    prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-2
                    prose-li:text-base prose-li:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-[#D2F159] 
                    prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-6 
                    prose-blockquote:italic prose-blockquote:text-lg
                    ${darkMode ? 'prose-blockquote:bg-[#17191C]' : 'prose-blockquote:bg-gray-50'}
                    prose-blockquote:rounded-r-lg
                    prose-code:text-[#D2F159] prose-code:font-mono prose-code:text-sm
                    ${darkMode ? 'prose-code:bg-gray-800' : 'prose-code:bg-gray-100'}
                    prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 
                    prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                    prose-hr:border-gray-300 dark:prose-hr:border-gray-700 prose-hr:my-8
                  `}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </article>
            );
          } else {
            return (
              <div className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <p>No content available</p>
                <p className="text-xs mt-2">Debug: body length = {post.body?.length || 0}</p>
              </div>
            );
          }
        })()}
      </div>
    </div>
  )
}