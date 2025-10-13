import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import BlogPostContent from "../../components/BlogPostContent";

export default function BlogPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  useEffect(() => {
    if (!blog) {
      navigate("/admin", { replace: true });
    }
  }, [blog, navigate]);

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#101214]">
      <div className="bg-yellow-100 border-b-2 border-yellow-400 py-3 px-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <AlertTriangle className="w-5 h-5 text-yellow-900" />
          <span className="text-sm font-semibold text-yellow-900">
            PREVIEW MODE - This blog is not published yet
          </span>
          <div className="flex-1" />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 py-2 px-4 text-sm rounded-3xl bg-white hover:bg-gray-50 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Editor
          </button>
        </div>
      </div>
      <BlogPostContent blog={blog} isPreview={true} />
    </div>
  );
}
