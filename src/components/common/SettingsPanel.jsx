import { useEffect, useRef } from "react";
import { Settings, Moon, LogOut } from "lucide-react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useLogout } from "../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";

export default function SettingsPanel({ darkMode, setDarkMode, data, onClose, isAuthRoute }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const panelRef = useRef(null);
  const { mutate, isPending } = useLogout(() => {
    onClose();
    navigate("/login");
    queryClient.invalidateQueries(["authStatus"]);
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
      className={`rounded-xl shadow-lg border p-4 w-64 transition-colors duration-300 ${
        darkMode ? "bg-[#101214] border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Moon
            className={`w-4 h-4 transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <span
            className={`transition-colors duration-300 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Dark Mode
          </span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
            darkMode ? "bg-lime-400" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      {data && !isAuthRoute && (
        <>
          <div className="mt-6">
            <Link
              to="/settings"
              className="flex items-center space-x-2 text-sm font-medium transition-colors duration-300 hover:text-lime-400"
            >
              <Settings
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
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
                setIsAuthenticated(false);
              }}
              className="flex items-center space-x-2 text-sm font-medium transition-colors duration-300 cursor-pointer hover:text-lime-400"
            >
              <LogOut
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
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
