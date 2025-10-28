import axiosInstance from '../utils/axiosInstance';
export const fetchUserProfile = async (accessToken) => {
    try {
        const response = await axiosInstance.patch('/user/googleAuth', { accessToken });
        return response.data;
    } catch (error) {
        console.error("Get profile error:", error);
        throw new Error(
            error?.response?.data?.message || "Failed to fetch user profile. Please try again."
        );
    }
}
