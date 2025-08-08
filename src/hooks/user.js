import { userProfileAPIs } from "../api/user";
import { useQueryWithErrorToast, useMutationWithToast } from "../utils/tanstackInstance";
/** -------------------------------
 * 📋 Get User Profile
 ---------------------------------- */
export const useGetUserProfile = (onSuccessCallback) =>
    useQueryWithErrorToast(
        {
            queryKey: ["userProfile"],
            queryFn: () => userProfileAPIs.getProfile(),
        },
        "Failed to fetch user profile",
        onSuccessCallback
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
export const useLogout = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: userProfileAPIs.logout,
        successMsg: "Logout successful!",
        errorMsg: "Failed to log out",
        onSuccess: onSuccessCallback,
    });
// ** -------------------------------
//  * 🔐 Check Auth Status
//  ---------------------------------- */
export const useCheckAuthStatus = (onSuccessCallback) =>
    useQueryWithErrorToast(
        {
            queryKey: ["authStatus"],
            queryFn: userProfileAPIs.checkAuthStatus,
        },
        "Failed to check authentication status",
        onSuccessCallback
    );
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
