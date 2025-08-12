// api/googleOauth.js
import axiosInstance from '../utils/axiosInstance';  // Import axios instance

// Function to fetch user profile from Google
export const fetchUserProfile = async (accessToken) => {
    try {
        const response = await axiosInstance.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;  // Return the fetched profile data
    } catch (error) {
        console.error("Error fetching Google user profile:", error);
        throw error;  // Throw error to be caught by the mutation hook
    }
};
