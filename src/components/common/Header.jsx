import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";

export default function Header({
  showSettings,
  setShowSettings,
  darkMode,
  showLogoutButton,
  data,
}) {
  const [url, setUrl] = useState("");
  const location = useLocation();
  const [isNonGoogleSignedIn, setIsNonGoogleSignedIn] = useState(false);
  const [activeMode, setActiveMode] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isUserLoggedIn") === "true");

  useEffect(() => {
    const googleLogin = localStorage.getItem("googleLogin") === "true";
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    // Set profile picture URL
    if (googleLogin && userProfile?.profile?.picture) {
      setUrl(userProfile.profile.picture);
    } else if (data?.user?.profilePicture?.url) {
      setUrl(data.user.profilePicture.url);
    } else {
      setUrl("");
    }

    // Determine if user is signed in but not via Google and has no profile picture
    setIsNonGoogleSignedIn(
      isUserLoggedIn &&
        !googleLogin &&
        !userProfile?.profile?.picture &&
        !data?.user?.profilePicture?.url
    );
    setIsLoggedIn(isUserLoggedIn);
  }, [data, location.pathname]);

  // Toggle settings panel visibility
  const toggleSettings = () => {
    if (showSettings) {
      console.log("Closing settings panel");
      setShowSettings(false);
    } else {
      console.log("Opening settings panel");
      setShowSettings(true);
    }
  };

  // Scroll to bottom on Contact click
  const handleContactClick = () => {
    setActiveMode("Contact");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div
      className={`flex fixed top-0 z-1 w-full py-4 px-4 md:px-8 border-b border-gray-300 items-center justify-between ${
        darkMode ? "bg-[#101214] border-gray-700" : "bg-white"
      } `}
    >
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-3">
          <div
            className={`w-8 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${
              darkMode ? "bg-gray-900" : "bg-gray-100"
            }`}
          >
            <img src="/Logo.png" className={`w-8 h-8 rounded-full`} />
          </div>
          <h1
            className={`text-lg md:text-2xl lg:text-3xl font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Paraphraser
          </h1>
        </Link>
      </div>
      <div className="md:flex hidden items-center justify-center gap-10 flex-grow">
        <Link
          to="/"
          onClick={() => {setActiveMode("Home")
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`relative pb-2 text-base md:text-lg self-start cursor-pointer
            ${darkMode
              ? activeMode === "Home"
                ? "text-white"
                : "text-gray-400 hover:text-white"
              : activeMode === "Home"
              ? "text-black"
              : "text-gray-400 hover:text-black"}`}
        >
          Home
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out
              ${darkMode
                ? activeMode === "Home"
                  ? "bg-white opacity-100 scale-x-100"
                  : "bg-gray-400 opacity-0 scale-x-0"
                : activeMode === "Home"
                ? "bg-black opacity-100 scale-x-100"
                : "bg-gray-400 opacity-0 scale-x-0"}`}
          />
        </Link>
        <Link
          to="/Blogs"
          onClick={() => setActiveMode("Blogs")}
          className={`relative pb-2 text-base md:text-lg cursor-pointer
            ${darkMode
              ? activeMode === "Blogs"
                ? "text-white"
                : "text-gray-400 hover:text-white"
              : activeMode === "Blogs"
              ? "text-black"
              : "text-gray-400 hover:text-black"}`}
        >
          Blogs
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out
              ${darkMode
                ? activeMode === "Blogs"
                  ? "bg-white opacity-100 scale-x-100"
                  : "bg-gray-400 opacity-0 scale-x-0"
                : activeMode === "Blogs"
                ? "bg-black opacity-100 scale-x-100"
                : "bg-gray-400 opacity-0 scale-x-0"}`}
          />
        </Link>
        <button
          key="Contact"
          onClick={handleContactClick}
          className={`relative pb-2 text-base md:text-lg cursor-pointer
            ${darkMode
              ? activeMode === "Blogs"
                ? "text-white"
                : "text-gray-400 hover:text-white"
              : activeMode === "Blogs"
              ? "text-black"
              : "text-gray-400 hover:text-black"}`}
        >
          Contact
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out
              ${darkMode
                ? activeMode === "Contact"
                  ? "bg-white opacity-100 scale-x-100"
                  : "bg-gray-400 opacity-0 scale-x-0"
                : activeMode === "Contact"
                ? "bg-black opacity-100 scale-x-100"
                : "bg-gray-400 opacity-0 scale-x-0"}`}
          />
        </button>
      </div>
      <div className="ml-auto flex items-center gap-1 md:gap-3">
        {!isLoggedIn && (
          <>
            <Link
              className="hover:bg-gray-200 transition text-sm px-4 md:px-6 md:text-base py-2 bg-gray-100 cursor-pointer rounded-2xl"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hover:bg-lime-400 transition text-sm px-4 md:px-6 md:text-base py-2 bg-[#D2F159] cursor-pointer rounded-2xl"
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
          <EllipsisVertical
            onClick={toggleSettings}
            className="w-7 h-7 cursor-pointer dark:text-white"
            aria-label="Open Settings"
          />
        )}
      </div>
    </div>
  );
}