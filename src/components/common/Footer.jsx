import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <div className="hidden md:block text-black pt-10 border-t border-gray-300">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
            <div className="w-8 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-gray-100">
              <img src="/Logo.png" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-900">
                Paraphrasing
              </h1>
              <p className="text-sm font-light md:text-base text-gray-500">
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
            className="p-3 bg-[#D2F159] rounded-full flex items-center justify-center hover:bg-lime-400 cursor-pointer transition-colors mt-4 md:mt-0"
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
        <p className="text-center text-gray-500 mt-10 text-sm md:text-base">
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
      <div className="relative block md:hidden text-black pt-10 border-t border-gray-300">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
            <div className="flex items-center gap-2">
              <div className="w-8 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-gray-100">
                <img src="/Logo.png" className="w-8 h-8 rounded-full" />
              </div>
              <h1 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-900">
                Paraphrasing
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
            className="p-3 absolute right-3 top-15 bg-[#D2F159] rounded-full flex items-center justify-end hover:bg-lime-400 cursor-pointer transition-colors mt-4 md:mt-0"
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
