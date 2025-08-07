import { Navbar } from "./components/common/Navbar";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import "./App.css"; 

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  // Toggle dark mode class on root element
    useEffect(() => {
      const root = document.documentElement;
      if (darkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }, [darkMode]);

  return (
    <div className={`${darkMode ? "bg-[#101214]" : "bg-white"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`relative min-h-[calc(100dvh-160px)]`}>
        <Outlet context={{ darkMode, setDarkMode }} />
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}
