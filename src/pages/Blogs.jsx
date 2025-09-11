import { ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function BlogsPage() {
  const { darkMode } = useOutletContext(); // Use useOutletContext for darkMode

  const blogCards = [
    {
      slug: "students-use-paraphrasing-tools-without-plagiarism",
      img: "https://img.freepik.com/free-vector/abstract-paper-cut-shape-wave-background_474888-4652.jpg?semt=ais_incoming&w=740&q=80",
      alt: "Student working at desk",
      title: "How Students Use Paraphrasing Tools Without Plagiarism in 2025",
      desc: "Learn how students use paraphrasing tools in 2025 to avoid plagiarism ethically and effectively.",
      date: "September 10, 2025",
    },
    {
      slug: "use-paraphraser-text-tool-for-unique-content",
      img: "https://img.freepik.com/premium-vector/green-background-with-abstract-elements-vector-illustration-place-your-text_1007350-3504.jpg?semt=ais_hybrid&w=740&q=80",
      alt: "Abstract green background",
      title: "How to Use a Paraphraser Text Tool for More Unique Content",
      desc: "Originality is important in the content creation. You can be a student writing an essay, you can be a blogger writing interesting posts, you can be a marketer writing good quality text, but you have to write unique text in order to be a success.",
      date: "January 18, 2025",
    },
    {
      slug: "wordtune-vs-quillbot-creativity-or-consistency-2025",
      img: "https://static.vecteezy.com/system/resources/thumbnails/011/426/071/small_2x/aesthetic-white-and-green-background-with-space-for-text-modern-background-design-with-liquid-shape-white-background-with-green-liquid-shapes-free-vector.jpg",
      alt: "Digital workspace with laptop",
      title:
        "Wordtune vs Quillbot in 2025: Creativity or Consistency? Full Guide with Free Alternative",
      desc: "Explore Wordtune vs Quillbot in 2025—detailed insights into creativity, consistency, and Paraphraser.co as a free alternative.",
      date: "September 10, 2025",
    },
    {
      slug: "paraphraserco-vs-quillbot-why-students-prefer-this-free-alternative",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ODo-z5aIo2lPQaJkocRctlCrUvcgnQdMhPGzK4t_ibr5K-jwuFTw_85Dbou0RnX7gXg&usqp=CAU",
      alt: "Notebook and pen on desk",
      title:
        "Paraphraser.co vs Quillbot: Why Students Prefer This Free Alternative in 2025",
      desc: "Discover why students in 2025 choose Paraphraser.co over Quillbot—a free, practical alternative for academic writing.",
      date: "September 10, 2025",
    },
    {
      slug: "spinbot-vs-rephrase-info-free-vs-ai-powered-tools-compared",
      img: "https://i.pinimg.com/736x/7a/57/11/7a57113203128c356e01bfc003632400.jpg",
      alt: "Typing on laptop",
      title:
        "Spinbot vs Rephrase.info: Free vs AI-Powered Tools Compared in 2025",
      desc: "Compare Spinbot’s free rewriting with Rephrase.info’s AI-powered accuracy in 2025, plus Paraphraser.co as an alternative.",
      date: "September 10, 2025",
    },
    {
      slug: "quillbot-vs-grammarly-paraphrasing-2025",
      img: "https://i.pinimg.com/736x/db/55/84/db55840b70b3bb20de4c45322603270f.jpg",
      alt: "Typing on laptop",
      title:
        "Quillbot vs Grammarly in 2025: The Best Paraphrasing Tool for Writers, Students, and Professionals",
      desc: "Compare Quillbot vs Grammarly in 2025 to find the best paraphrasing tool for writers and professionals.",
      date: "September 10, 2025",
    },
    {
      slug: "top-10-ai-paraphrasers-compared-free-vs-paid-options",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Notebook and pen on desk",
      title: "Top 10 AI Paraphrasers in 2025: Free vs Paid Options Compared",
      desc: "Discover the top 10 AI paraphrasers in 2025, comparing free and paid tools for writing.",
      date: "September 11, 2025",
    },
    {
      slug: "ai-content-paraphrasers-revolutionizing-article-writing",
      img: "https://i.pinimg.com/736x/c1/f1/f6/c1f1f6b66d3af4da36f8ea6e388cffa9.jpg",
      alt: "Laptop with digital interface",
      title: "AI Content Paraphrasers Revolutionizing Article Writing",
      desc: "Learn how AI paraphrasers transform article writing with efficiency, originality, and SEO optimization.",
      date: "September 11, 2025",
    },
    {
      slug: "paraphrasing-vs-summarizing",
      img: "https://img.freepik.com/free-vector/hand-drawn-olive-green-background_23-2149724858.jpg",
      alt: "Olive green abstract background",
      title: "Paraphrasing vs. Summarizing: What's the Difference?",
      desc: "Understanding the key differences between paraphrasing and summarizing can help you choose the right approach for your content creation needs.",
      date: "January 18, 2025",
    },
    {
      slug: "how-paraphraser-improves-writing-quickly",
      img: "https://img.freepik.com/premium-vector/colorful-soft-pastel-abstract-background_552255-3106.jpg",
      alt: "Typewriter and paper",
      title: "How a Paraphraser Can Help You Improve Your Words Quickly",
      desc: "Learn how paraphrasers improve writing clarity, flow, and engagement with practical tips.",
      date: "September 11, 2025",
    },
    {
      slug: "text-paraphraser-write-unique-content",
      img: "https://i.pinimg.com/736x/7a/57/11/7a57113203128c356e01bfc003632400.jpg",
      alt: "Notebook with pen and coffee",
      title: "Text Paraphraser: Write Unique Content Every Time",
      desc: "Learn how a text paraphraser creates unique, high-quality content efficiently.",
      date: "September 11, 2025",
    },
    {
      slug: "humanize-content-with-ai-paraphrasers",
      img: "https://i.pinimg.com/736x/c1/f1/f6/c1f1f6b66d3af4da36f8ea6e388cffa9.jpg",
      alt: "Laptop with open document",
      title: "Humanize Content with AI Paraphrasers for Better Engagement",
      desc: "Learn how AI paraphrasers create natural, engaging content to boost readability and SEO.",
      date: "September 11, 2025",
    },
    {
      slug: "transform-text-with-paragraph-paraphraser",
      img: "https://img.freepik.com/premium-vector/background-with-monstera-leaves-geometric-shapes-vector-illustration-flat-design_1007350-3488.jpg?semt=ais_hybrid&w=740",
      alt: "Person writing at desk",
      title: "Transform Your Text with a Paragraph Paraphraser",
      desc: "Discover how a paragraph paraphraser enhances clarity, tone, and originality in your writing.",
      date: "September 11, 2025",
    },
    {
      slug: "how-to-use-sentence-paraphraser",
      img: "https://img.freepik.com/free-vector/paper-cut-abstract-background_474888-6378.jpg?semt=ais_hybrid&w=740&q=80",
      alt: "Notebook with pen and laptop",
      title: "How to Use a Sentence Paraphraser to Enhance Your Writing",
      desc: "Learn how to use a sentence paraphraser to improve clarity, vocabulary, and tone in your writing.",
      date: "September 11, 2025",
    },
{
  slug: "why-paraphraser-website-essential-content-creation",
  img: "https://img.freepik.com/premium-vector/minimalist-green-botanical-abstract-background-vector-illustration_758746-830.jpg?semt=ais_hybrid&w=740&q=80",
  alt: "Person typing on laptop",
  title: "Why a Paraphraser Website Is a Must-Have for Efficient Content Creation",
  desc: "Learn why a paraphraser website boosts productivity, ensures originality, and enhances writing quality.",
  date: "September 11, 2025"
},
{
  slug: "paraphraser-and-summarizer-perfect-combo",
  img: "https://img.freepik.com/premium-vector/green-monstera-leaf-banner-background-minimal-handdrawn-style_765090-1886.jpg",
  alt: "Person working on laptop with documents",
  title: "Paraphraser and Summarizer: The Perfect Combo for Content Creation",
  desc: "Learn how paraphraser and summarizer tools enhance originality, efficiency, and content quality.",
  date: "September 11, 2025"
},
{
  slug: "essay-paraphraser-time-saving-tool",
  img: "https://img.freepik.com/free-vector/green-tropical-leaves-background_1308-68599.jpg?semt=ais_incoming&w=740&q=80",
  alt: "Student writing at desk",
  title: "Essay Paraphraser: Time-Saving Tool for Students & Writers",
  desc: "Learn how essay paraphrasers improve clarity, save time, and maintain academic integrity.",
  date: "September 11, 2025"
},
{
  slug: "how-to-use-free-online-paraphraser",
  img: "https://static.vecteezy.com/system/resources/thumbnails/011/426/071/small_2x/aesthetic-white-and-green-background-with-space-for-text-modern-background-design-with-liquid-shape-white-background-with-green-liquid-shapes-free-vector.jpg",
  alt: "Person typing on keyboard",
  title: "How to Use a Free Online Paraphraser for Effective Rewriting",
  desc: "Learn how free online paraphrasers improve clarity and efficiency in your writing.",
  date: "September 11, 2025"
},
  ];

  const BATCH_SIZE = 6;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const isAllShown = visibleCount >= blogCards.length;
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

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

        {/* Featured Blog Post */}
        <div className="mb-12">
          <Link to="/blog/quillbot-alternatives-paraphrasing-tools">
            <div
              className={`${
                darkMode ? "bg-black" : ""
              } rounded-3xl overflow-hidden border ${
                darkMode ? "border border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Content Side */}
                <div className="lg:w-1/2 p-6 lg:p-8">
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      <ExternalLink className="w-5 h-5 mr-1" />
                      Insights
                    </span>
                    <h2
                      className={`text-2xl lg:text-3xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      } mb-4 leading-tight`}
                    >
                      Quillbot Alternatives: Exploring Smarter Paraphrasing
                      Tools in 2025
                    </h2>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed mb-6 text-sm md:text-base`}
                    >
                      Discover the best Quillbot alternatives in 2025—compare
                      features, pricing, and use cases to find smarter
                      paraphrasing tools.
                    </p>
                  </div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    September 10, 2025
                  </div>
                </div>

                {/* Image Side */}
                <div className="lg:w-1/2 relative p-6 bg-[#D2F159]">
                  <img
                    src="https://img.freepik.com/premium-vector/green-background-with-abstract-elements-vector-illustration-place-your-text_1007350-3504.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Abstract blue architectural lines"
                    className="w-full h-64 lg:h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <hr
          className={`my-12 ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        />

        {/* Blog Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogCards.slice(0, visibleCount).map((card, idx) => (
            <Link
              key={idx}
              to={`/blogs/${card.slug}`}
              state={{ img: card.img }}
            >
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`${
                  darkMode ? "bg-black" : ""
                } rounded-3xl overflow-hidden border ${
                  darkMode ? "border border-gray-700" : "border-gray-200"
                }`}
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
                    alt={card.alt}
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
                    {card.desc}
                  </p>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } mt-auto`}
                  >
                    {card.date}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More / Show Less Button */}
        <div className="text-center mt-8">
          {blogCards.length > BATCH_SIZE && (
            <button
              className={`border border-[#D2F159] text-[#D2F159] font-semibold py-4 px-6 rounded-3xl hover:bg-[#D2F159] hover:text-gray-900 transition-colors`}
              onClick={handleLoadMore}
            >
              {isAllShown ? "Show Less" : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
