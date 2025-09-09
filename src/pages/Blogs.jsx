import { ExternalLink } from "lucide-react"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"

export default function BlogsPage({ darkMode }) {
  const blogCards = [
    {
      slug: "ai-content-paraphrasers-revolutionizing-writing",
      img: "https://i.pinimg.com/736x/c1/f1/f6/c1f1f6b66d3af4da36f8ea6e388cffa9.jpg",
      alt: "Modern building facade",
      title: "From AI to Human: Humanizing Content with AI Paraphrasers",
      desc: "The style and format of your writing is a very important key to accessing your audience, no matter whether you are blogging or writing a college paper.",
      date: "September 10, 2025",
    },
    {
      slug: "wordtune-vs-quillbot-creativity-or-consistency-2025",
      img: "https://img.freepik.com/free-vector/hand-drawn-olive-green-background_23-2149724858.jpg",
      alt: "Tropical beach scene",
      title: "Wordtune vs Quillbot in 2025: Creativity or Consistency? Full Guide with Free Alternative",
      desc: "Wordtune vs Quillbot in 2025: Creativity or Consistency? Full Guide with Free Alternative",
      date: "January 18, 2025",
    },
    {
      slug: "paraphraser-improve-words-quickly",
      img: "https://img.freepik.com/premium-vector/colorful-soft-pastel-abstract-background_552255-3106.jpg",
      alt: "Breakfast table setting",
      title: "How a Paraphraser Can Help You Improve Your Words Quickly",
      desc: "It should not be like climbing Mount Everest to write clear and interesting material. However, most authors are left with awkward sentences and wordy phrases.",
      date: "January 18, 2025",
    },
    {
      slug: "text-paraphraser-unique-content",
      img: "https://img.freepik.com/premium-vector/sage-green-botanical-abstract-background_1153121-16243.jpg?semt=ais_hybrid&w=740&q=80",
      alt: "Daisies on grass with coffee",
      title: "Text Paraphraser: The Secret to Unique Content Every Time",
      desc: "Content is the core of online communication, education and marketing. Whether it's blogging or product descriptions.",
      date: "January 18, 2025",
    },
    {
      slug: "paraphraser-improve-words-quickly",
      img: "/croissants-table-garden 1.png",
      alt: "Breakfast table setting",
      title: "How a Paraphraser Can Help You Improve Your Words Quickly",
      desc: "It should not be like climbing Mount Everest to write clear and interesting material. However, most authors are left with awkward sentences and wordy phrases.",
      date: "January 18, 2025",
    },
    {
      slug: "text-paraphraser-unique-content",
      img: "/Rectangle 34624724.png",
      alt: "Daisies on grass with coffee",
      title: "How Students Use Paraphrasing Tools Without Plagiarism in 2025",
      desc: "Plagiarism has long been a challenge in education, but in 2025 the stakes are higher than ever. Universities, colleges, and even high schools rely heavily on advanced plagiarism-detection software",
      date: "January 18, 2025",
    },
  ]

  const BATCH_SIZE = 6
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const isAllShown = visibleCount >= blogCards.length
  const gridRef = useRef(null)
  const cardRefs = useRef([])

  const handleLoadMore = () => {
    if (isAllShown) {
      setVisibleCount(BATCH_SIZE)
      setTimeout(() => {
        if (gridRef.current) {
          gridRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      setVisibleCount((prev) => {
        const newCount = Math.min(prev + BATCH_SIZE, blogCards.length)
        setTimeout(() => {
          // Scroll to the last visible blog card
          if (cardRefs.current[newCount - 1]) {
            cardRefs.current[newCount - 1].scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }, 100)
        return newCount
      })
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-[1240px] mx-auto px-6 pt-32 pb-12">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className={`text-2xl md:text-5xl font-semibold mb-4 ${darkMode ? "text-white" : "text-black"}`}>Blogs</h1>
          <p className={`${darkMode ? "text-white" : "text-black"} text-base md:text-lg`}>
            Explore stories, tips, and insights shared by our users on how paraphrasing has improved their writing,
            boosted creativity, and helped them achieve plagiarism-free content.
          </p>
        </div>

        {/* Featured Blog Post */}
        <div className="">
          <Link to="/blog/students-paraphrasing-tools-2025">
            <div
              className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer`}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Content Side */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Insights
                    </span>
                    <h2
                      className={`text-2xl lg:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-4 leading-tight`}
                    >
                      How AI Content Paraphrasers Are Revolutionizing Article Writing
                    </h2>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-6`}>
                      These tools do all the grunt work of content recreation, and they help you write unique and
                      quality articles faster than ever before.
                    </p>
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>January 18, 2025</div>
                </div>

                {/* Image Side */}
                <div className="lg:w-1/2 relative p-6 bg-lime-400">
                  <img
                    src="https://img.freepik.com/premium-vector/green-background-with-abstract-elements-vector-illustration-place-your-text_1007350-3504.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Abstract blue architectural lines"
                    className="w-full h-64 lg:h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <hr className={`my-16 ${darkMode ? "border-gray-700" : "border-gray-200"}`} />

        {/* Blog Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogCards.slice(0, visibleCount).map((card, idx) => (
            <Link
              key={idx}
              to={`/blogs/${card.slug}`}
              state={{ img: card.img }}
            >
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`${darkMode ? "bg-gray-800" : "bg-white"} flex flex-col h-full min-h-[420px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer`}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div className="relative p-4 bg-lime-400 h-[250px]" style={{ width: '100%' }}>
                  <img
                    src={card.img || "/placeholder.svg"}
                    alt={card.alt}
                    className=" w-full h-full object-cover rounded-2xl"
                  />
                  <ExternalLink className="absolute top-5 right-5 w-7 h-7 text-white bg-opacity-20 rounded p-1" />
                </div>
                <div className="flex flex-col flex-1 px-4 py-3">
                  <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-3`}>
                    {card.title}
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm leading-relaxed mb-4`}>
                    {card.desc}
                  </p>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mt-auto`}>{card.date}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More / Show Less Button */}
        <div className="text-center mt-8">
          {blogCards.length > BATCH_SIZE && (
            <button
              className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} cursor-pointer p-2 font-medium transition-colors`}
              onClick={handleLoadMore}
            >
              {isAllShown ? "Show Less" : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
