import { useEffect, useRef, useState } from "react";
import { Settings, Moon, LogOut, Menu } from "lucide-react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useCheckAuthStatus, useLogout } from "../../hooks/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function SettingsPanel({
  darkMode,
  setDarkMode,
  data,
  onClose,
  isAuthRoute,
  showLogoutButton,
  isGuest,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const panelRef = useRef(null);
  const { mutate, isPending } = useLogout(() => {
    queryClient.invalidateQueries({
      queryKey: ["authStatus"],
    });
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("googleLogin");
    localStorage.removeItem("userProfile");
    onClose();
    navigate("/login");
    console.error("Logout successful, redirecting to login");
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      ref={panelRef}
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
      {isGuest ? (
        <div className="mt-6 flex flex-col gap-3">
          <Link to="/login" className="w-full py-2 rounded bg-lime-400 text-center font-semibold text-gray-900 hover:bg-lime-300">Login</Link>
          <Link to="/signup" className="w-full py-2 rounded border border-lime-400 text-center font-semibold text-lime-400 hover:bg-lime-50">Sign Up</Link>
        </div>
      ) : showLogoutButton && (
        <>
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
