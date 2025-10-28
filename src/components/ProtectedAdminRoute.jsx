import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isUserLoggedIn) {
        setIsChecking(false);
        return;
      }

      try {
        // First, check localStorage for userData
        const userData = localStorage.getItem("userData");
        if (userData) {
          const user = JSON.parse(userData);
          console.log("ProtectedAdminRoute - User data from localStorage:", user);
          console.log("ProtectedAdminRoute - isAdmin from localStorage:", user.isAdmin);
          
          if (user.isAdmin === true) {
            setIsAdmin(true);
            setIsChecking(false);
            return;
          }
        }

        // If not in localStorage, fetch from API
        const response = await axiosInstance.get("/user/getProfile");
        console.log("ProtectedAdminRoute - User profile from API:", response.data);
        
        if (response.data && response.data.user && response.data.user.isAdmin === true) {
          setIsAdmin(true);
          // Store in localStorage for future use
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAdminStatus();
  }, [isUserLoggedIn]);

  if (isChecking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin) {
    // Non-admin user trying to access admin route - redirect to home
    console.log("Non-admin user attempting to access admin route, redirecting to home");
    
    // Don't clear isUserLoggedIn, just redirect
    return <Navigate to="/" replace />;
  }
  
  return children;
}
