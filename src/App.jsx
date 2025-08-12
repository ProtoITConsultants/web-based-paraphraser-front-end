import { Navbar } from "./components/common/Navbar";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import "./App.css";
import { useCheckAuthStatus } from "./hooks/user";
import LoadingBackdrop from "./components/common/LoadingBackdrop";
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";
  const { data, isPending } = useCheckAuthStatus();
  useEffect(() => {
    if (data) {
      setIsAuthenticated(true);
      setUserProfile(data);
    }
  }, [data]);
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      {isPending && !isAuthRoute && <LoadingBackdrop />}{" "}
      <div className={`${darkMode ? "bg-[#101214]" : "bg-white"}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className={`relative min-h-[calc(100dvh-160px)]`}>
          <Outlet context={{ darkMode, setDarkMode, isAuthenticated }} />
        </div>
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}