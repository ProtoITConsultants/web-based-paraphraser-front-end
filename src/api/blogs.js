import axiosInstance from "..//utils/axiosInstance";

const BLOG_BASE = "/blog";

export const BlogsAPI = {
  list: async (includeUnpublished = false) => {
    const res = await axiosInstance.get(BLOG_BASE);
    const data = res?.data;
    const allBlogs = Array.isArray(data) ? data : (data?.items || []);
    
    // Filter to only published blogs unless includeUnpublished is true
    if (!includeUnpublished) {
      return allBlogs.filter(blog => blog.published !== false);
    }
    return allBlogs;
  },

  get: async (idOrBusinessId) => {
    const path = isMongoId(idOrBusinessId)
      ? `${BLOG_BASE}/${idOrBusinessId}`
      : `${BLOG_BASE}/by-id/${encodeURIComponent(idOrBusinessId)}`;
    const res = await axiosInstance.get(path);
    return res.data;
  },

  create: async (data) => {
    const payload = preparePayload(data);
    const res = await axiosInstance.post(BLOG_BASE, payload);
    return res.data;
  },

  update: async (idOrBusinessId, data) => {
    const payload = preparePayload(data);
    const path = isMongoId(idOrBusinessId)
      ? `${BLOG_BASE}/${idOrBusinessId}`
      : `${BLOG_BASE}/by-id/${encodeURIComponent(idOrBusinessId)}`;
    const res = await axiosInstance.put(path, payload);
    return res.data;
  },

  remove: async (idOrBusinessId) => {
    if (isMongoId(idOrBusinessId)) {
      const res = await axiosInstance.delete(`${BLOG_BASE}/${idOrBusinessId}`);
      return res.data;
    }
    const lookup = await axiosInstance.get(`${BLOG_BASE}/by-id/${encodeURIComponent(idOrBusinessId)}`);
    const mongoId = lookup?.data?._id;
    if (!mongoId) throw new Error("Unable to resolve blog _id for deletion");
    const res = await axiosInstance.delete(`${BLOG_BASE}/${mongoId}`);
    return res.data;
  },
};

function isMongoId(v) {
  return typeof v === "string" && /^[a-fA-F0-9]{24}$/.test(v);
}

function preparePayload(blog) {
  const payload = { ...blog };
  if (payload.date) {
    const d = normalizeDate(payload.date);
    if (d) payload.date = d.toISOString();
  }
  Object.keys(payload).forEach((k) => payload[k] === "" && delete payload[k]);
  return payload;
}

export function normalizeDate(d) {
  try {
    if (!d) return null;
    if (typeof d === "string") return new Date(d);
    if (d?.$date?.$numberLong) return new Date(Number(d.$date.$numberLong));
    if (typeof d === "number") return new Date(d);
    return new Date(d);
  } catch {
    return null;
  }
}
