import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const Blogs = () => {
    const { darkMode } = useOutletContext();
  return (
    <>
      <div
        className={`${
          darkMode ? "border-gray-700" : "border-gray-300"
        } text-black min-h-screen flex justify-center items-center`}
      >
        <h1 className={`${darkMode ? "text-white" : "text-black"} md:text-7xl text-center text-2xl font-semibold`}>Blogs will be available soon</h1>
      </div>
    </>
  );
};

export default Blogs;
