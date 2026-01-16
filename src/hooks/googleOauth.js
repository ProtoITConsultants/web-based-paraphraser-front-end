// hooks/googleOauth.js
import { useMutationWithToast } from "../utils/tanstackInstance";  // Import the custom mutation hook
import { fetchUserProfile } from "../api/googleOauth";  // Import the function to fetch the user profile

/** -------------------------------
 * 📋 Fetch User Profile (Google)
 ---------------------------------- */
export const useFetchGoogleUserProfile = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: fetchUserProfile,  // Use the fetchUserProfile function
        successMsg: "User profile fetched successfully!",  // Success message
        errorMsg: "Failed to fetch user profile",  // Error message
        onSuccess: onSuccessCallback,  // Callback on successful mutation
    });
