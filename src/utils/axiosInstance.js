import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Update the port to match the backend server port
    withCredentials: true,
});

export default axiosInstance;