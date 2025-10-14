import { userProfileAPIs } from "../api/user";
import {  useMutationWithToast } from "../utils/tanstackInstance";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
/** -------------------------------
 * 📋 Get User Profile
 ---------------------------------- */
export const useGetUserProfile = () =>
    useQuery(
        {
            queryKey: ["userProfile"],
            queryFn: () => userProfileAPIs.getProfile(),
        }
    );
/** -------------------------------
 * 🖼️ Update User Profile Picture
 ---------------------------------- */
export const useUpdateUserProfilePicture = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: userProfileAPIs.updateProfilePicture,
        successMsg: "Profile picture updated successfully!",
        errorMsg: "Failed to update profile picture",
        onSuccess: onSuccessCallback,
    });
// /** -------------------------------
//  * 👤 Sign Up
//  ----------------------------------/*
export const useSignUp = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: userProfileAPIs.signUp,
        successMsg: "Sign up successful!",
        errorMsg: "Failed to sign up",
        onSuccess: onSuccessCallback,
    });
/** -------------------------------
 * 🔐 Login
 * ---------------------------------- */
export const useLogin = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: userProfileAPIs.login,
        successMsg: "Login successful!",
        errorMsg: "Failed to log in",
        onSuccess: onSuccessCallback,
    });
/** -------------------------------
 * 🚪 Logout
 * ---------------------------------- */
export const useLogout = (onSuccess) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post("/user/logout");
            return response.data;
        },
        onSuccess: () => {
            // Clear all localStorage items related to user
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("googleLogin");
            localStorage.removeItem("userProfile");
            localStorage.removeItem("userData");
            
            console.log("Logout - Cleared all localStorage");
            
            // Dispatch custom event to notify Header component
            window.dispatchEvent(new Event("authChanged"));
            
            queryClient.invalidateQueries({
                queryKey: ["authStatus"],
            });
            
            if (onSuccess) {
                onSuccess();
            }
        },
    });
};
// ** -------------------------------
//  * 🔐 Check Auth Status
//  ---------------------------------- */
export const useCheckAuthStatus = () => {
    const { data, isPending } = useQuery({
        queryKey: ["authStatus"],
        queryFn: userProfileAPIs.checkAuthStatus,
        retry: false,
    });

    return { data, isPending };
};
/** -------------------------------
 * 📝 Update User Profile
 * ---------------------------------- */
export const useUpdateUserProfile = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: userProfileAPIs.updateProfile,
        successMsg: "Profile updated successfully!",
        errorMsg: "Failed to update profile",
        onSuccess: onSuccessCallback,
    });
/** -------------------------------
 * 🔐 Change Password
 * ---------------------------------- */
export const useChangePassword = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: userProfileAPIs.changePassword,
        successMsg: "Password changed successfully!",
        errorMsg: "Failed to change password",
        onSuccess: onSuccessCallback,
    });