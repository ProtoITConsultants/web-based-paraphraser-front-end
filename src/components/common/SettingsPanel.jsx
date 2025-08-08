import { useEffect, useRef } from "react";
import { Settings, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function SettingsPanel({ darkMode, setDarkMode, onClose }) {
  const panelRef = useRef(null); // Create a ref for the settings panel

  // Close the settings panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose(); // Call the `onClose` function passed from parent to close the panel
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Apply dark mode to the body element when `darkMode` changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      ref={panelRef} // Attach the ref to the settings panel div
      className={`rounded-xl shadow-lg border p-4 w-64 transition-colors duration-300 ${
        darkMode ? "bg-[#101214] border-gray-900" : "bg-white border-gray-200"
      }`}
    >
      {/* Dark Mode Toggle */}
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

      {/* Settings Option Link */}
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
    </div>
  );
}
