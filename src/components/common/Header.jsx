import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";

export default function Header({
  showSettings,
  setShowSettings,
  darkMode,
  data,
}) {
  const [url, setUrl] = useState("");
  const location = useLocation();
  const [isNonGoogleSignedIn, setIsNonGoogleSignedIn] = useState(false);
  const [activeMode, setActiveMode] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isUserLoggedIn") === "true");
  
  // Check if on login page and redirected from admin
  const isAdminLoginAccess = location.pathname === "/login" && location.state?.from?.startsWith("/admin");
  
  // Check if currently on admin route
  const isOnAdminRoute = location.pathname.startsWith("/admin");

  // Sync auth state
  useEffect(() => {
    const updateAuthState = () => {
      const googleLogin = localStorage.getItem("googleLogin") === "true";
      const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
      const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

      console.log("Header - updateAuthState called");
      console.log("Header - isUserLoggedIn:", isUserLoggedIn);

      // If user is not logged in, clear all state
      if (!isUserLoggedIn) {
        setUrl("");
        setIsNonGoogleSignedIn(false);
        setIsLoggedIn(false);
        return;
      }

      // Set profile picture URL
      let profileUrl = "";
      if (googleLogin && userProfile?.profile?.picture) {
        profileUrl = userProfile.profile.picture;
      } else if (data?.user?.profilePicture?.url) {
        profileUrl = data.user.profilePicture.url;
      }
      setUrl(profileUrl);

      // Determine if user is signed in but not via Google and has no profile picture
      setIsNonGoogleSignedIn(
        isUserLoggedIn &&
          !googleLogin &&
          !userProfile?.profile?.picture &&
          !data?.user?.profilePicture?.url
      );
      setIsLoggedIn(isUserLoggedIn);
    };

    updateAuthState();
    
    // Listen for custom authChanged event
    window.addEventListener("authChanged", updateAuthState);
    
    // Listen for storage changes (for multi-tab support)
    window.addEventListener("storage", updateAuthState);
    
    return () => {
      window.removeEventListener("authChanged", updateAuthState);
      window.removeEventListener("storage", updateAuthState);
    };
  }, [data]);

  // Sync activeMode with route
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path === "/") {
      setActiveMode("Home");
    } else if (path === "/blogs") {
      setActiveMode("Blogs");
    } else if (path === "/contact") {
      setActiveMode("Contact");
    } else {
      setActiveMode(""); // No active link for other routes
    }
  }, [location.pathname]);

  // Toggle settings panel visibility
  const toggleSettings = () => {
    console.log(showSettings ? "Closing settings panel" : "Opening settings panel");
    setShowSettings(!showSettings);
  };

  // Scroll to bottom on Contact click
  const handleContactClick = () => {
    setActiveMode("Contact");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div
      className={`flex fixed top-0 z-10 w-full py-4 px-4 md:px-8 border-b ${
        darkMode ? "bg-[#101214] border-gray-700" : "bg-white border-gray-200"
      } items-center justify-between`}
    >
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-3">
          <div
            className={` md:w-12 md:h-12 rounded-2xl flex items-center justify-center p-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <img src="/Logo.png" className="rounded-full" alt="Paraphraser Logo" />
          </div>
          <h1
            className={`text-lg md:text-2xl lg:text-3xl font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {isAdminLoginAccess || isOnAdminRoute ? "Paraphraser Admin" : "Paraphraser"}
          </h1>
        </Link>
      </div>
      <div className="md:flex hidden items-center justify-center gap-10 flex-grow">
        {!isAdminLoginAccess && !isOnAdminRoute && (
          <Link
            to="/"
            onClick={() => setActiveMode("Home")}
            className={`relative pb-2 text-base md:text-lg cursor-pointer ${
              darkMode
                ? activeMode === "Home"
                  ? "text-white"
                  : "text-gray-300 hover:text-gray-300"
                : activeMode === "Home"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Home
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out ${
                darkMode
                  ? activeMode === "Home"
                    ? "bg-white opacity-100 scale-x-100"
                    : "bg-gray-400 opacity-0 scale-x-0"
                  : activeMode === "Home"
                  ? "bg-gray-900 opacity-100 scale-x-100"
                  : "bg-gray-600 opacity-0 scale-x-0"
              }`}
            />
          </Link>
        )}
        {!isOnAdminRoute && !isAdminLoginAccess && (
          <Link
            to="/Blogs"
            onClick={() => setActiveMode("Blogs")}
            className={`relative pb-2 text-base md:text-lg cursor-pointer ${
              darkMode
                ? activeMode === "Blogs"
                  ? "text-white"
                  : "text-gray-300 hover:text-gray-300"
                : activeMode === "Blogs"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Blogs
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out ${
                darkMode
                  ? activeMode === "Blogs"
                    ? "bg-white opacity-100 scale-x-100"
                    : "bg-gray-400 opacity-0 scale-x-0"
                  : activeMode === "Blogs"
                  ? "bg-gray-900 opacity-100 scale-x-100"
                  : "bg-gray-600 opacity-0 scale-x-0"
              }`}
            />
          </Link>
        )}
        {!isAdminLoginAccess && !isOnAdminRoute && (
          <div
            key="Contact"
            onClick={handleContactClick}
            className={`relative pb-2 text-base md:text-lg cursor-pointer ${
              darkMode
                ? activeMode === "Contact"
                  ? "text-white"
                  : "text-gray-300 hover:text-gray-300"
                : activeMode === "Contact"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Contact
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out ${
                darkMode
                  ? activeMode === "Contact"
                    ? "bg-white opacity-100 scale-x-100"
                    : "bg-gray-400 opacity-0 scale-x-0"
                  : activeMode === "Contact"
                  ? "bg-gray-900 opacity-100 scale-x-100"
                  : "bg-gray-600 opacity-0 scale-x-0"
              }`}
            />
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-3">
        {(isOnAdminRoute || isAdminLoginAccess) && (
          <Link
            to="/Blogs"
            onClick={() => setActiveMode("Blogs")}
            className={`relative pb-2 text-base md:text-lg cursor-pointer ${
              darkMode
                ? activeMode === "Blogs"
                  ? "text-white"
                  : "text-gray-300 hover:text-gray-300"
                : activeMode === "Blogs"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Blogs
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out ${
                darkMode
                  ? activeMode === "Blogs"
                    ? "bg-white opacity-100 scale-x-100"
                    : "bg-gray-400 opacity-0 scale-x-0"
                  : activeMode === "Blogs"
                  ? "bg-gray-900 opacity-100 scale-x-100"
                  : "bg-gray-600 opacity-0 scale-x-0"
              }`}
            />
          </Link>
        )}
        {!isLoggedIn && !isAdminLoginAccess && (
          <>
            <Link
              className={`${
                darkMode
                  ? "bg-gray-900 hover:bg-gray-800 text-gray-300"
                  : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700"
              } text-xs px-2 md:px-6 md:text-base py-2 cursor-pointer rounded-2xl`}
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hover:bg-lime-500 transition text-xs px-2 md:px-6 md:text-base py-2 bg-[#D2F159] text-gray-900 cursor-pointer rounded-2xl"
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}
        {url ? (
          <img
            src={url}
            alt="User avatar"
            onClick={toggleSettings}
            className="size-8 md:w-12 md:h-12 cursor-pointer rounded-full object-cover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-2"
          />
        ) : isNonGoogleSignedIn ? (
          <div
            className="size-8 md:w-12 md:h-12 bg-[#D2F159] cursor-pointer rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-2"
            onClick={toggleSettings}
            aria-label="Open Settings"
          ></div>
        ) : (
          !isAdminLoginAccess && (
            <EllipsisVertical
              onClick={toggleSettings}
              className={`w-7 h-7 cursor-pointer ${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
              }`}
              aria-label="Open Settings"
            />
          )
        )}
      </div>
    </div>
  );
}