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
    console.log('=== BlogsAPI.create called ===');
    console.log('Raw data:', data);
    const payload = preparePayload(data);
    console.log('Prepared payload:', payload);
    console.log('Payload body field:', payload.body);
    const response = await axiosInstance.post('/blog', payload);
    console.log('Create response:', response.data);
    return response.data;
  },
  
  update: async (id, data) => {
    console.log('=== BlogsAPI.update called ===');
    console.log('ID:', id);
    console.log('Raw data:', data);
    const payload = preparePayload(data);
    console.log('Prepared payload:', payload);
    console.log('Payload body field:', payload.body);
    const response = await axiosInstance.put(`/blog/${id}`, payload);
    console.log('Update response:', response.data);
    return response.data;
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
  
  console.log('=== preparePayload INPUT ===');
  console.log('Input blog:', blog);
  console.log('Input blog.body:', blog.body);
  
  // Handle date normalization
  if (payload.date) {
    const d = normalizeDate(payload.date);
    if (d) payload.date = d.toISOString();
  }
  
  // Remove empty string fields EXCEPT body
  Object.keys(payload).forEach((k) => {
    if (k === 'body') return; // Never delete body field
    if (payload[k] === "") delete payload[k];
  });
  
  // Ensure body exists
  if (!payload.body) {
    payload.body = '<p></p>';
  }
  
  console.log('=== preparePayload OUTPUT ===');
  console.log('Output payload:', payload);
  console.log('Output payload.body:', payload.body);
  console.log('Output payload.body length:', payload.body?.length || 0);
  
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
