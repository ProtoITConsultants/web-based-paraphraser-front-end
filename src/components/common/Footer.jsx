import React from "react";
import { Link } from "react-router-dom";

export const Footer = ({ darkMode }) => {
  // Conditional styling based on darkMode
  const footerStyle = darkMode ? "bg-[#101214] text-white" : "bg-white text-black";

  return (
    <div
      className={`${footerStyle} py-3 ${
        darkMode ? "border-t border-gray-700" : "border-t border-gray-300"
      } `}
    >
      <p className="text-center">
        © Copyright 2025 All rights reserved.
        <div className="flex mt-2 items-center justify-center">
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
        </div>
      </p>
    </div>
  );
};
