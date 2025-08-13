import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://node.paraphraser.co/api",
    withCredentials: true,
});

export default axiosInstance;