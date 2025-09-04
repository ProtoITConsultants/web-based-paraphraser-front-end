import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Settings, Moon, LogOut, } from "lucide-react";
import { Link, useNavigate, } from "react-router-dom";
import {  useLogout } from "../../hooks/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function SettingsPanel({
  darkMode,
  setDarkMode,
  onClose,
}) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isUserLoggedIn") === "true");
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
      <div className="flex items-center justify-between">
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
              darkMode ? "translate-x-6" : "translate-x-1"}
            }`}
          />
        </button>
      </div>
      {!isLoggedIn ? (
        <>
        </>
      ) : (
        <>
          {/* Mobile navigation options */}
          <div className="md:hidden block mt-6">
            <Link
              to="/"
              className={`${darkMode ? "text-white" : "text-black"} block py-2 px-4 rounded text-sm font-medium hover:bg-lime-50 hover:text-lime-600 mb-2`}
              onClick={onClose}
            >
              Home
            </Link>
            <Link
              to="/Blogs"
              className={`${darkMode ? "text-white" : "text-black"} block py-2 px-4 rounded text-sm font-medium hover:bg-lime-50 hover:text-lime-600 mb-2`}
              onClick={onClose}
            >
              Blogs
            </Link>
            <button
              className={`${darkMode ? "text-white" : "text-black"} block py-2 px-4 rounded text-sm font-medium hover:bg-lime-50 hover:text-lime-600 mb-2 w-full text-left`}
              onClick={() => {
                onClose();
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }}
            >
              Contact
            </button>
          </div>
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
