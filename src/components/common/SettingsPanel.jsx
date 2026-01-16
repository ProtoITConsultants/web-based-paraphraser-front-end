import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Settings,
  Moon,
  LogOut,
  Home,
  Phone,
  FileText,
  Type,
  Languages,
  FileText as SummarizerIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";
export default function SettingsPanel({ darkMode, setDarkMode, onClose }) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isUserLoggedIn") === "true"
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useLogout(() => {
    queryClient.invalidateQueries({
      queryKey: ["authStatus"],
    });
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("googleLogin");
    localStorage.removeItem("userProfile");
    window.dispatchEvent(new Event("authChanged"));
    onClose();
    navigate("/login");
    console.error("Logout successful, redirecting to login");
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setIsLoggedIn(localStorage.getItem("isUserLoggedIn") === "true");
  }, [darkMode, location.pathname]);
      
  return (
    <div
      className={`rounded-xl shadow-lg border p-4 w-64  ${
        darkMode ? "bg-[#101214] border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div
        className={`${
          darkMode ? "border-b-gray-700" : "border-b-gray-300"
        } flex pb-3 border-b  items-center justify-between md:border-0 md:pb-0`}
      >
        <div className="flex items-center space-x-2">
          <Moon
            className={`w-4 h-4  ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Dark Mode
          </span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer  ${
            darkMode ? "bg-[#D2F159]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }
            }`}
          />
        </button>
      </div>
      <div className="md:hidden block mt-4 space-y-6">
        <Link to="/" className="flex items-center space-x-2">
          <Home
            className={`w-4 h-4  ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Home
          </span>
        </Link>
        <Link
          to="/AI-paraphrasing-tool/"
          className="flex items-center space-x-2"
        >
          <Type
            className={`w-4 h-4  ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Paraphraser
          </span>
        </Link>
        <Link to="/AI-translation/" className="flex items-center space-x-2">
          <Languages
            className={`w-4 h-4  ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Translator
          </span>
        </Link>
        <Link
          to="/AI-generated-summaries/"
          className="flex items-center space-x-2"
        >
          <SummarizerIcon
            className={`w-4 h-4  ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Summarizer
          </span>
        </Link>
        <Link to="/blogs" className="flex items-center space-x-2">
          <FileText
            className={`w-4 h-4  ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Blogs
          </span>
        </Link>
        <div
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
            onClose();
          }}
          className="flex items-center space-x-2"
        >
          <Phone
            className={`w-4 h-4  ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Contact
          </span>
        </div>
      </div>
      {!isLoggedIn ? (
        <></>
      ) : (
        <>
          {/* Mobile navigation options */}
          <div className="mt-6">
            <Link
              to="/settings"
              className="flex items-center space-x-2 text-sm font-medium  hover:text-[#D2F159]"
            >
              <Settings
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Settings
              </span>
            </Link>
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                mutate();
              }}
              className="flex items-center space-x-2 text-sm font-medium  cursor-pointer hover:text-[#D2F159]"
            >
              <LogOut
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Log Out
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
