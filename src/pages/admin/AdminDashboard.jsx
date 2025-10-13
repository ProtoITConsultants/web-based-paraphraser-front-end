import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BlogsAPI, normalizeDate } from "../../api/blogs";
import { Pencil, Trash2, Search, Upload, Plus } from "lucide-react";
import { Footer } from "../../components/common/Footer";

const PER_PAGE = 10;

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "published", "draft"
  const [publishingAll, setPublishingAll] = useState(false);
  const [showPublishAllModal, setShowPublishAllModal] = useState(false);

  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const data = await BlogsAPI.list(true); // Include unpublished blogs for admin
      setRows(data);
    } catch (e) {
      setErr(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let filtered = rows.filter((b) =>
      (b.title || "").toLowerCase().includes(q) ||
      (b.slug || "").toLowerCase().includes(q)
    );

    // Apply status filter
    if (statusFilter === "published") {
      filtered = filtered.filter((b) => b.published !== false);
    } else if (statusFilter === "draft") {
      filtered = filtered.filter((b) => b.published === false);
    }

    return filtered;
  }, [rows, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const paginated = filtered.slice(start, start + PER_PAGE);

  useEffect(() => { if (page > totalPages) setPage(1); }, [page, totalPages]);

  const openDelete = (b) => setDeleteTarget(b);
  const closeDelete = () => setDeleteTarget(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await BlogsAPI.remove(deleteTarget._id || deleteTarget.id);
      closeDelete();
      await load();
    } catch (e) {
      setErr(e.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const openPublishAllModal = () => {
    const drafts = rows.filter((b) => b.published === false);
    if (drafts.length === 0) {
      setErr("No draft blogs to publish");
      return;
    }
    setShowPublishAllModal(true);
  };

  const closePublishAllModal = () => {
    if (!publishingAll) {
      setShowPublishAllModal(false);
    }
  };

  const confirmPublishAll = async () => {
    const drafts = rows.filter((b) => b.published === false);

    try {
      setPublishingAll(true);
      setErr("");
      
      // Publish all drafts
      await Promise.all(
        drafts.map((blog) =>
          BlogsAPI.update(blog._id || blog.id, { ...blog, published: true })
        )
      );

      // Reload blogs
      await load();
      setErr("");
      setShowPublishAllModal(false);
    } catch (e) {
      setErr(e.message || "Failed to publish all drafts");
    } finally {
      setPublishingAll(false);
    }
  };

  const draftCount = rows.filter((b) => b.published === false).length;

  return (
    <section className="max-w-7xl pt-24 mx-auto px-4 w-full">
      <div className="flex items-center gap-2 md:gap-4 py-4">
        <h1 className="text-xl md:text-2xl font-semibold truncate">Blogs</h1>
        <div className="flex-1" />
        <button
          onClick={openPublishAllModal}
          disabled={draftCount === 0}
          className="flex items-center gap-2 bg-transparent cursor-pointer text-gray-500 font-semibold py-2 px-3 md:py-4 md:px-6 rounded-3xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-[#D2F159] border flex-shrink-0"
          title="Publish All Drafts"
        >
          <Upload className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden lg:inline">Publish All</span>
        </button>
        <button
          onClick={() => navigate("/admin/new")}
          className="flex items-center gap-2 bg-[#D2F159] cursor-pointer hover:bg-lime-500 text-gray-900 font-semibold py-2 px-3 md:py-4 md:px-6 rounded-3xl transition-colors duration-200 flex-shrink-0"
          title="Add Blog"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Add Blog</span>
        </button>
      </div>

      <div className="mb-4 bg-gray-50 dark:bg-[#17191C] rounded-3xl p-3 md:p-4 space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Blogs
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 bg-white dark:bg-[#101214] border-none outline-none placeholder-gray-400 text-gray-900 dark:text-gray-300 rounded-3xl text-sm md:text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Status
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 md:px-4 py-2 rounded-3xl text-xs md:text-sm font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-[#D2F159] text-gray-900"
                  : "bg-white dark:bg-[#101214] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1c1f]"
              }`}
            >
              <span>All</span>
              <span className="hidden sm:inline"> ({rows.length})</span>
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-3 md:px-4 py-2 rounded-3xl text-xs md:text-sm font-medium transition-colors ${
                statusFilter === "published"
                  ? "bg-[#D2F159] text-gray-900"
                  : "bg-white dark:bg-[#101214] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1c1f]"
              }`}
            >
              <span>Published</span>
              <span className="hidden sm:inline"> ({rows.filter((b) => b.published !== false).length})</span>
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-3 md:px-4 py-2 rounded-3xl text-xs md:text-sm font-medium transition-colors ${
                statusFilter === "draft"
                  ? "bg-[#D2F159] text-gray-900"
                  : "bg-white dark:bg-[#101214] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1c1f]"
              }`}
            >
              <span>Drafts</span>
              <span className="hidden sm:inline"> ({rows.filter((b) => b.published === false).length})</span>
            </button>
          </div>
        </div>
      </div>

      {err && <div className="text-red-600 mb-3 text-sm md:text-base">{err}</div>}

      <div className="overflow-x-auto border rounded-3xl">
        <table className="min-w-full text-xs md:text-base">
          <thead className="bg-gray-50 dark:bg-[#17191C]">
            <tr>
              <th className="text-left p-2 md:p-4 font-medium text-gray-700 dark:text-gray-300">Title</th>
              <th className="text-left p-2 md:p-4 font-medium text-gray-700 dark:text-gray-300 hidden sm:table-cell">Slug</th>
              <th className="text-left p-2 md:p-4 font-medium text-gray-700 dark:text-gray-300 hidden md:table-cell">Category</th>
              <th className="text-left p-2 md:p-4 font-medium text-gray-700 dark:text-gray-300 hidden lg:table-cell">Date</th>
              <th className="text-left p-2 md:p-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
              <th className="p-2 md:p-4 w-24 md:w-40 font-medium text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t dark:border-gray-700 animate-pulse">
                  <td className="p-2 md:p-4"><div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" /></td>
                  <td className="p-2 md:p-4 hidden sm:table-cell"><div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" /></td>
                  <td className="p-2 md:p-4 hidden md:table-cell"><div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" /></td>
                  <td className="p-2 md:p-4 hidden lg:table-cell"><div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" /></td>
                  <td className="p-2 md:p-4"><div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" /></td>
                  <td className="p-2 md:p-4"><div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" /></td>
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr><td className="p-2 md:p-4 text-center text-gray-500 dark:text-gray-400" colSpan={6}>No blogs found.</td></tr>
            ) : (
              paginated.map((b) => (
                <tr key={b._id || b.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#17191C] transition-colors">
                  <td className="p-2 md:p-4 text-gray-900 dark:text-gray-300" title={b.title}>{truncate(b.title, 40)}</td>
                  <td className="p-2 md:p-4 text-gray-900 dark:text-gray-300 hidden sm:table-cell">{truncate(b.slug, 30)}</td>
                  <td className="p-2 md:p-4 text-gray-900 dark:text-gray-300 hidden md:table-cell">{b.category}</td>
                  <td className="p-2 md:p-4 text-gray-900 dark:text-gray-300 hidden lg:table-cell">{fmt(normalizeDate(b.date))}</td>
                  <td className="p-2 md:p-4">
                    <span className={`px-2 md:px-3 py-1 text-xs rounded-full font-medium ${b.published !== false ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`}>
                      {b.published !== false ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-2 md:p-4">
                    <div className="flex gap-1 md:gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/admin/${b._id || b.id}`)}
                        className="p-1.5 md:p-2 rounded-full bg-gray-100 dark:bg-[#17191C] hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3 h-3 md:w-4 md:h-4 text-gray-700 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => openDelete(b)}
                        className="p-1.5 md:p-2 rounded-full bg-gray-100 dark:bg-[#17191C] hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 mb-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="py-2 px-4 md:py-3 md:px-6 text-xs md:text-sm rounded-3xl bg-gray-100 dark:bg-[#17191C] text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Prev
          </button>
          <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="py-2 px-4 md:py-3 md:px-6 text-xs md:text-sm rounded-3xl bg-gray-100 dark:bg-[#17191C] text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1f2225] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Next
          </button>
        </div>
      )}

      {showPublishAllModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50" onClick={closePublishAllModal}>
          <div className="bg-white dark:bg-[#17191C] rounded-3xl p-6 mx-4 relative max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
              {publishingAll ? "Publishing Drafts..." : "Publish All Drafts?"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
              {publishingAll ? (
                <>
                  <span className="block mb-2">Please wait while we publish all draft blogs.</span>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D2F159]"></div>
                  </div>
                </>
              ) : (
                <>
                  This will publish <strong>{draftCount}</strong> draft blog{draftCount !== 1 ? 's' : ''} and make them visible to the public.
                </>
              )}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                className="w-full py-4 text-sm rounded-3xl bg-gray-100 dark:bg-[#101214] text-center text-gray-900 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-[#1a1c1f] transition-colors disabled:opacity-50"
                onClick={closePublishAllModal}
                disabled={publishingAll}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full py-4 text-sm rounded-3xl bg-[#D2F159] text-center text-gray-900 font-semibold hover:bg-lime-500 transition-colors disabled:opacity-50"
                onClick={confirmPublishAll}
                disabled={publishingAll}
              >
                {publishingAll ? "Publishing..." : "Publish All"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50" onClick={closeDelete}>
          <div className="bg-white dark:bg-[#17191C] rounded-3xl p-6 mx-4 relative max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
              Delete blog?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
              This action will permanently delete
              <strong> {truncate(deleteTarget.title || deleteTarget.slug || "", 60)}.</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                className="w-full py-4 text-sm rounded-3xl bg-gray-100 dark:bg-[#101214] text-center text-gray-900 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-[#1a1c1f] transition-colors"
                onClick={closeDelete}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full py-4 text-sm rounded-3xl bg-[#D2F159] text-center text-gray-900 font-semibold hover:bg-lime-500 transition-colors disabled:opacity-50"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </section>
  );
}

function truncate(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function fmt(d) {
  if (!d || isNaN(d)) return "";
  return d.toISOString().slice(0, 10);
}
