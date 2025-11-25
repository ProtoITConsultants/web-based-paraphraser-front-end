import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import React from 'react'

export const SubHeader = ({darkMode,title}) => {
  return (
    <div className="p-9 border-y border-gray-300 dark:border-gray-700 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-2 text-[#C7CBD1] hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 "
      >
        <ChevronLeft size={32} />
        <span
          className={`text-2xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </span>
      </Link>
    </div>
  );
}
