import axiosInstance from "..//utils/axiosInstance";
export const userProfileAPIs = {
    /** Get User Profile */
    getProfile: async () => {
        try {
            const response = await axiosInstance.get("/user/getProfile");
            return response.data;
        } catch (error) {
            // console.error("Get profile error:", error);
            throw new Error(
                error?.response?.data?.message || "Failed to fetch user profile. Please try again."
            );
        }
    },

    /** Update Profile Picture (multipart/form-data) */
    updateProfilePicture: async (file) => {
        try {
            const formData = new FormData();
            formData.append("image", file); // 'image' matches backend's expected field

            // DO NOT set 'Content-Type' manually — let Axios handle it with boundary
            const response = await axiosInstance.patch("/user/updateProfilePicture", formData);

            return response.data;
        } catch (error) {
            // Properly log full error for debugging
            console.error("Update profile picture error:", error.response || error);

            throw new Error(
                error?.response?.data?.message ||
                "Failed to update profile picture. Please try again."
            );
        }
    },
    // sign up 
    signUp: async (userData) => {
        try {
            const response = await axiosInstance.post("/user/signup", userData);
            return response.data;
        } catch (error) {
            // console.error("Sign up error:", error);
            throw new Error(
                error?.response?.data?.message || "Failed to sign up. Please try again."
            );
        }
    },
    // login
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post("/user/login", credentials);
            return response.data;
        } catch (error) {
            // console.error("Login error:", error);
            throw new Error(
                error?.response?.data?.message || "Failed to log in. Please try again."
            );
        }
    },
    // logout
    logout: async () => {
        try {
            const response = await axiosInstance.post("/user/logout");
            return response.data;
        } catch (error) {
            // console.error("Logout error:", error);
            throw new Error(
                error?.response?.data?.message || "Failed to log out. Please try again."
            );
        }
    },
    checkAuthStatus: async () => {
        try {
            const response = await axiosInstance.get("/user/checkAuthStatus");
            return response.data;
        } catch (error) {
            // console.error("Check auth status error:", error);
            throw new Error(
                error?.response?.data?.message || "Failed to check authentication status. Please try again."
            );
        }
    },
    updateProfile: async (profileData) => {
        try {
            const response = await axiosInstance.patch("/user/updateProfile", profileData);
            return response.data;
        } catch (error) {
            // console.error("Update profile error:", error);
            throw new Error(
                error?.response?.data?.message || "Failed to update profile. Please try again."
            );
        }
    },
    changePassword: async (passwordData) => {
        try {
            const response = await axiosInstance.patch("/user/changePassword", passwordData);
            return response.data;
        } catch (error) {
            // console.error("Change password error:", error);
            throw new Error(
                error?.response?.data?.message || "Failed to change password. Please try again."
            );
        }
    },

};
