import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ showSettings, setShowSettings, darkMode, showLogoutButton, data }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const googleLogin = localStorage.getItem("googleLogin") === "true";
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (googleLogin && userProfile?.profile?.picture) {
      setUrl(userProfile.profile.picture);
    } else if (data?.user?.profilePicture?.url) {
      setUrl(data.user.profilePicture.url);
    }
  }, [data]); 
  return (
    <div
      className={`flex py-4 px-8 border-b border-gray-300 items-center justify-between lg:justify-start ${
        darkMode ? "bg-[#101214] border-gray-700" : "bg-white"
      } `}
    >
      <div className="flex items-center space-x-4">
        {/* Link wrapping the entire Logo and Title */}
        <Link to="/" className="flex items-center space-x-3">
          {/* Logo */}
          <div
            className={`w-8 md:w-12 md:h-12 rounded-2xl flex items-center justify-center  ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <img src="/Logo.png" className={`w-8 h-8 rounded-full `} />
          </div>

          {/* Title */}
          <h1
            className={`text-lg md:text-2xl lg:text-3xl font-medium  ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Paraphraser
          </h1>
        </Link>
      </div>
      {/* Settings Trigger - Green circle that opens settings */}
      <div className="ml-auto flex items-center gap-2">
        {!showLogoutButton && (
          <Link className="dark:text-white hover:underline" to="/login">
            Login
          </Link>
        )}

        {url ? (
          <img
            src={url}
            alt="User avatar"
            onClick={() => setShowSettings(!showSettings)}
            className="size-8 md:w-12 md:h-12 cursor-pointer rounded-full object-cover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
          />
        ) : (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-8 h-8 md:w-12 md:h-12 cursor-pointer bg-lime-400 hover:bg-lime-500 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
            aria-label="Open Settings"
          ></button>
        )}
      </div>
    </div>
  );
}
