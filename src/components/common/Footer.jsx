import { Link } from "react-router-dom";

export const Footer = ({darkMode, setDarkMode}) => {
  return (
    <>
      <div className={`${darkMode ? "border-gray-700": "border-gray-300"} hidden relative md:block text-black pt-5 border-t`}>
        <div className="flex flex-col max-w-[1240px] md:flex-row items-center justify-center mx-auto">
          <div className="flex w-full flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3">
            <div className={`w-8 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <img src="/Logo.png" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <h1 className={`${darkMode ? "text-white" : "text-black"} text-lg md:text-2xl lg:text-3xl font-medium`}>
                Paraphraser
              </h1>
              <p className={`${darkMode ? "text-white" : "text-gray-500"} text-sm font-light md:text-base`}>
                In case of any queries, please contact us at{" "}
                <u>support@paraphraser.co</u>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-3 absolute right-10 bg-[#D2F159] rounded-full flex items-center justify-center hover:bg-lime-400 cursor-pointer transition-colors mt-4 md:mt-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
        <p className={`${darkMode ? "text-white" : "text-gray-500"} text-center text-gray-500 mt-7 pb-4 text-sm md:text-base`}>
          © Copyright 2025 All rights reserved.{" "}
          <a href="/privacy/#" className="ml-2 hover:underline">
            Privacy Policy
          </a>
          {" - "}
          <a href="/terms/#" className="ml-2 hover:underline">
            Terms of Service
          </a>
          {" - "}
          <a href="/disclaimer/#" className="ml-2 hover:underline">
            Disclaimer
          </a>
        </p>
      </div>
      <div className="relative block md:hidden text-black pt-10 border-t border-gray-300">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
            <div className="flex items-center gap-2">
              <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-2xl flex items-center justify-center p-2`}>
                <img src="/Logo.png" className="w-8 h-8 rounded-full" />
              </div>
              <h1 className={`${darkMode ? "text-white" : "text-black"} text-lg md:text-2xl lg:text-3xl font-medium text-gray-900`}>
                Paraphraser
              </h1>
            </div>
            <div></div>
            <p className="text-sm text-center font-light md:text-base text-gray-500">
              In case of any queries, please contact us at{" "}
              <u>support@paraphraser.co</u>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-3 absolute right-3 top-3 bg-[#D2F159] rounded-full flex items-center justify-end hover:bg-lime-400 cursor-pointer transition-colors mt-4 md:mt-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
        <p className="text-center px-3 text-gray-500 mt-5 text-sm md:text-base">
          © Copyright 2025 All rights reserved.{" "}
          <Link to="/privacy" className="ml-2 hover:underline">
            Privacy Policy
          </Link>
          {" - "}
          <Link to="/terms" className="ml-2 hover:underline">
            Terms of Service
          </Link>
          {" - "}
          <Link to="/disclaimer" className="ml-2 hover:underline">
            Disclaimer
          </Link>
        </p>
      </div>
    </>
  );
};
