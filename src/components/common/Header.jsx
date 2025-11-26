import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";

// Navigation links configuration
const NAV_LINKS = [
  {
    id: "home",
    label: "Home",
    path: "/",
    showOnAdmin: false,
    onClick: null,
  },
  {
    id: "paraphraser",
    label: "Paraphraser",
    path: "/",
    showOnAdmin: false,
    onClick: null,
  },
  {
    id: "translator",
    label: "Translator",
    path: "#translator",
    showOnAdmin: false,
    onClick: null,
  },
  {
    id: "blogs",
    label: "Blogs",
    path: "/blogs",
    showOnAdmin: true, // Show on admin pages
    onClick: null,
  },
  {
    id: "contact",
    label: "Contact",
    path: "#contact",
    showOnAdmin: false,
    onClick: "handleContactClick", // Special handler for scroll
  },
];

export default function Header({
  showSettings,
  setShowSettings,
  darkMode,
  data,
}) {
  const [url, setUrl] = useState("");
  const location = useLocation();
  const [isNonGoogleSignedIn, setIsNonGoogleSignedIn] = useState(false);
  const [activeMode, setActiveMode] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isUserLoggedIn") === "true");
  
  const isAdminLoginAccess = location.pathname === "/login" && location.state?.from?.startsWith("/admin");
  const isOnAdminRoute = location.pathname.startsWith("/admin");

  // Special handlers for navigation items
  const navigationHandlers = {
    handleContactClick: () => {
      setActiveMode("contact");
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },
  };

  // Sync auth state
  useEffect(() => {
    const updateAuthState = () => {
      const googleLogin = localStorage.getItem("googleLogin") === "true";
      const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
      const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

      if (!isUserLoggedIn) {
        setUrl("");
        setIsNonGoogleSignedIn(false);
        setIsLoggedIn(false);
        return;
      }

      let profileUrl = "";
      if (googleLogin && userProfile?.profile?.picture) {
        profileUrl = userProfile.profile.picture;
      } else if (data?.user?.profilePicture?.url) {
        profileUrl = data.user.profilePicture.url;
      }
      setUrl(profileUrl);

      setIsNonGoogleSignedIn(
        isUserLoggedIn &&
          !googleLogin &&
          !userProfile?.profile?.picture &&
          !data?.user?.profilePicture?.url
      );
      setIsLoggedIn(isUserLoggedIn);
    };

    updateAuthState();
    window.addEventListener("authChanged", updateAuthState);
    window.addEventListener("storage", updateAuthState);
    
    return () => {
      window.removeEventListener("authChanged", updateAuthState);
      window.removeEventListener("storage", updateAuthState);
    };
  }, [data]);

  // Sync activeMode with route
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const activeLink = NAV_LINKS.find(link => {
      if (link.path === "/" && path === "/") return true;
      if (link.path !== "/" && path.startsWith(link.path)) return true;
      return false;
    });
    setActiveMode(activeLink?.id || "");
  }, [location.pathname]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Filter links based on current route context
  const getVisibleLinks = () => {
    if (isAdminLoginAccess || isOnAdminRoute) {
      return NAV_LINKS.filter(link => link.showOnAdmin);
    }
    return NAV_LINKS.filter(link => !link.showOnAdmin || link.path === "/blogs");
  };

  // Render a single navigation link
  const renderNavLink = (link) => {
    const isActive = activeMode === link.id;
    const linkClasses = `relative pb-2 text-base md:text-lg cursor-pointer ${
      darkMode
        ? isActive
          ? "text-white"
          : "text-gray-300 hover:text-gray-300"
        : isActive
        ? "text-gray-900"
        : "text-gray-600 hover:text-gray-900"
    }`;

    const underlineClasses = `absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out ${
      darkMode
        ? isActive
          ? "bg-white opacity-100 scale-x-100"
          : "bg-gray-400 opacity-0 scale-x-0"
        : isActive
        ? "bg-gray-900 opacity-100 scale-x-100"
        : "bg-gray-600 opacity-0 scale-x-0"
    }`;

    const handleClick = () => {
      setActiveMode(link.id);
      if (link.onClick && navigationHandlers[link.onClick]) {
        navigationHandlers[link.onClick]();
      }
    };

    // If link has special onClick handler (like Contact)
    if (link.onClick) {
      return (
        <div
          key={link.id}
          onClick={handleClick}
          className={linkClasses}
        >
          {link.label}
          <div className={underlineClasses} />
        </div>
      );
    }

    // Regular link
    return (
      <Link
        key={link.id}
        to={link.path}
        onClick={handleClick}
        className={linkClasses}
      >
        {link.label}
        <div className={underlineClasses} />
      </Link>
    );
  };

  const visibleLinks = getVisibleLinks();

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

      {/* Desktop Navigation */}
      <div className="md:flex hidden items-center justify-center gap-10 flex-grow">
        {visibleLinks.map(link => renderNavLink(link))}
      </div>

      {/* Right side: Auth buttons or Profile */}
      <div className="ml-auto flex items-center gap-2 md:gap-3">
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