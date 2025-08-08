import { Link } from "react-router-dom";

export default function Header({ showSettings, setShowSettings, darkMode }) {
  return (
    <div
      className={`flex py-4 px-8 border-b border-gray-700 items-center justify-between lg:justify-start ${
        darkMode ? "bg-[#101214]" : "bg-white"
      } transition-colors duration-300`}
    >
      <div className="flex items-center space-x-4">
        {/* Link wrapping the entire Logo and Title */}
        <Link
          to="/"
          className="flex items-center space-x-4 transition-colors duration-300"
        >
          {/* Logo */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  darkMode ? "bg-gray-600" : "bg-gray-400"
                }`}
              ></div>
            </div>
          </div>

          {/* Title */}
          <h1
            className={`text-2xl lg:text-3xl font-medium transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Paraphraser
          </h1>
        </Link>
      </div>

      {/* Settings Trigger - Green circle that opens settings */}
      <div className="ml-auto">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-12 h-12 cursor-pointer bg-lime-400 hover:bg-lime-500 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
          aria-label="Open Settings"
        ></button>
      </div>
    </div>
  );
}
