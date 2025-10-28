import { ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BlogsAPI } from "../api/blogs";

export default function BlogsPage() {
  const { darkMode } = useOutletContext();
  const [blogCards, setBlogCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const BATCH_SIZE = 6;
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await BlogsAPI.list(); // Fetch only published blogs
        setBlogCards(data);
      } catch (err) {
        setError(err.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const isAllShown = visibleCount >= blogCards.length;

  const handleLoadMore = () => {
    if (isAllShown) {
      setVisibleCount(BATCH_SIZE);
      setTimeout(() => {
        if (gridRef.current) {
          gridRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      setVisibleCount((prev) => {
        const newCount = Math.min(prev + BATCH_SIZE, blogCards.length);
        setTimeout(() => {
          if (cardRefs.current[newCount - 1]) {
            cardRefs.current[newCount - 1].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);
        return newCount;
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? "" : "bg-white"}`}>
      <div className="max-w-[1240px] mx-auto px-6 pt-24 md:pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1
            className={`text-3xl lg:text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            Blogs
          </h1>
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-700"
            } text-sm md:text-lg leading-relaxed`}
          >
            Explore stories, tips, and insights shared by our users on how
            paraphraser has improved their writing, boosted creativity, and
            helped them achieve plagiarism-free content.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-3xl text-center">
            {error}
          </div>
        )}

        {/* Featured Blog Post - Skeleton or Content */}
        {loading ? (
          <div className="mb-12 animate-pulse">
            <div
              className={`${
                darkMode ? "bg-black" : ""
              } rounded-3xl overflow-hidden border ${
                darkMode ? "border border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 p-6 lg:p-8">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
                <div className="lg:w-1/2 relative p-6 bg-gray-200 dark:bg-gray-700">
                  <div className="w-full h-64 lg:h-full bg-gray-300 dark:bg-gray-600 rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        ) : blogCards.length > 0 ? (
          <div className="mb-12">
            <Link to={`/blogs/${blogCards[0].slug || blogCards[0].id}`}>
              <div
                className={`${
                  darkMode ? "bg-black" : ""
                } rounded-3xl overflow-hidden border ${
                  darkMode ? "border border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-6 lg:p-8">
                    <div className="mb-6">
                      <span
                        className={`inline-flex items-center text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } mb-4`}
                      >
                        <ExternalLink className="w-5 h-5 mr-1" />
                        {blogCards[0].category || "Insights"}
                      </span>
                      <h2
                        className={`text-2xl lg:text-3xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        } mb-4 leading-tight`}
                      >
                        {blogCards[0].title}
                      </h2>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed mb-6 text-sm md:text-base`}
                      >
                        {blogCards[0].excerpt || blogCards[0].subtitle}
                      </p>
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {formatDate(blogCards[0].date)}
                    </div>
                  </div>
                  <div className="lg:w-1/2 relative p-6 bg-[#D2F159]">
                    <img
                      src={blogCards[0].img || "/placeholder.svg"}
                      alt={blogCards[0].title}
                      className="w-full h-64 lg:h-full object-cover rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ) : null}

        <hr
          className={`my-12 ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        />

        {/* Blog Grid - Skeleton or Content */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`${
                  darkMode ? "bg-black" : ""
                } rounded-3xl overflow-hidden border ${
                  darkMode ? "border border-gray-700" : "border-gray-200"
                } animate-pulse`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  className="relative p-4 h-[250px] bg-gray-200 dark:bg-gray-700"
                  style={{ width: "100%" }}
                >
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-3xl"></div>
                </div>
                <div className="flex flex-col flex-1 px-4 py-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-auto"></div>
                </div>
              </div>
            ))
          ) : blogCards.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } text-lg`}
              >
                No blogs found.
              </p>
            </div>
          ) : (
            blogCards.slice(1, visibleCount + 1).map((card, idx) => (
              <Link key={card._id || card.id} to={`/blogs/${card.slug || card.id}`}>
                <div
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={`${
                    darkMode ? "bg-black" : ""
                  } rounded-3xl overflow-hidden border ${
                    darkMode ? "border border-gray-700" : "border-gray-200"
                  } hover:border-[#D2F159] transition-colors`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    className="relative p-4 h-[250px] bg-[#D2F159]"
                    style={{ width: "100%" }}
                  >
                    <img
                      src={card.img || "/placeholder.svg"}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute top-6 right-6 p-1 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-black" />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 px-4 py-3">
                    <h3
                      className={`text-lg lg:text-xl font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      } mb-3`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } text-sm leading-relaxed mb-4`}
                    >
                      {card.excerpt || card.subtitle}
                    </p>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mt-auto`}
                    >
                      {formatDate(card.date)}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Load More / Show Less Button */}
        {!loading && blogCards.length > BATCH_SIZE && (
          <div className="text-center mt-8">
            <button
              className={`${
                darkMode ? "text-[#D2F159]" : "text-gray-700"
              } border border-[#D2F159] font-semibold py-4 px-6 rounded-3xl hover:bg-[#D2F159] hover:text-gray-900 transition-colors`}
              onClick={handleLoadMore}
            >
              {isAllShown ? "Show Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
