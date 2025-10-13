import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api", // Update the port to match the backend server port
    withCredentials: true,
});

export default axiosInstance;