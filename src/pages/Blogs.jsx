import React from 'react'

const Blogs = ({darkMode, setDarkMode}) => {
  return (
    <div className='min-h-sreen flex items-center justify-center'>
        <h1 className={`${darkMode ? "text-white" : "text-black"} text-4xl font-bold`}>Blogs Page Coming Soon...</h1>
    </div>
  )
}

export default Blogs