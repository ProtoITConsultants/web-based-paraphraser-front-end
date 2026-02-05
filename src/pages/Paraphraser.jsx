import { useOutletContext, useLocation } from "react-router-dom";
import ParaphrasingTool from "../components/ParaphrasingTool";
import ParaphraserWebCopy from "../components/ParaphraserWebCopy";
import { useEffect, useState } from "react";

export default function Paraphraser() {
  const { darkMode, setDarkMode, data } = useOutletContext();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    const googleLogin = localStorage.getItem("googleLogin") === "true";
    const normalLogin = localStorage.getItem("isUserLoggedIn") === "true";
    setIsUserLoggedIn(googleLogin || normalLogin);
  }, []);

  return (
    <div className={`${darkMode ? "bg-[#101214]" : "bg-white"} scroll-smooth`}>
      <h1 className={`${darkMode ? "text-white" : "text-gray-900"} text-3xl md:text-4xl font-semibold md:mt-24 mt-22 px-8`}>Paraphraser</h1>
      <ParaphrasingTool
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        data={data}
      />
      {!isUserLoggedIn && <ParaphraserWebCopy darkMode={darkMode} />}
    </div>
  );
}