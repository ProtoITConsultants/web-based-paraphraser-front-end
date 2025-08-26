import { Link } from "react-router-dom";
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
  const [isNonGoogleSignedIn, setIsNonGoogleSignedIn] = useState(false);

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
      isUserLoggedIn && !googleLogin && !userProfile?.profile?.picture && !data?.user?.profilePicture?.url
    );
  }, [data]);

  return (
    <div
      className={`flex fixed top-0 z-1 w-full py-4 px-4 md:px-8 border-b border-gray-300 items-center justify-between lg:justify-start ${
        darkMode ? "bg-[#101214] border-gray-700" : "bg-white"
      } `}
    >
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-3">
          <div
            className={`w-8 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
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
      <div className="ml-auto flex items-center gap-1">
        {!showLogoutButton && (
          <>
            <Link
              className="hover:underline text-sm px-4 md:px-6 md:text-base py-2 bg-gray-100 cursor-pointer rounded-2xl"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hover:underline text-sm px-4 md:px-6 md:text-base py-2 bg-[#D2F159] cursor-pointer rounded-2xl"
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
            onClick={() => setShowSettings(!showSettings)}
            className="size-8 md:w-12 md:h-12 cursor-pointer rounded-full object-cover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-2"
          />
        ) : isNonGoogleSignedIn ? (
          <div
            className="size-8 md:w-12 md:h-12 bg-[#D2F159] cursor-pointer rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-2"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Open Settings"
          ></div>
        ) : (
          <EllipsisVertical
            onClick={() => setShowSettings(!showSettings)}
            className="w-7 h-7 cursor-pointer dark:text-white"
            aria-label="Open Settings"
          />
        )}
      </div>
    </div>
  );
}