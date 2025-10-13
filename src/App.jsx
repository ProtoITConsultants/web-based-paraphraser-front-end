import { Navbar } from "./components/common/Navbar";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import "./App.css";
import { useCheckAuthStatus } from "./hooks/user";
import LoadingBackdrop from "./components/common/LoadingBackdrop";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoutes from "./routes/Admin";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { data, isPending } = useCheckAuthStatus();
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
      {isPending && !isAuthRoute && <LoadingBackdrop />}
      <div className={`${darkMode ? "bg-[#101214]" : "bg-white"} min-h-screen flex flex-col justify-between gap-8`}>
        <Navbar
          key={location.pathname}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          data={data}
          isAuthRoute={isAuthRoute}
        />
        <div className={`relative scroll-smooth`}>
          <ScrollToTop/>
          {isAdminRoute ? (
            <AdminRoutes darkMode={darkMode} setDarkMode={setDarkMode} user={data} />
          ) : (
            <Outlet context={{ darkMode, setDarkMode, data, isAuthRoute }}  />
          )}
        </div>
        {!isAdminRoute && <Footer darkMode={darkMode} />}
      </div>
    </>
  );
}