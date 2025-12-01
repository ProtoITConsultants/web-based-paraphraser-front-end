import { useOutletContext } from "react-router-dom";
import ParaphrasingTool from "../components/ParaphrasingTool";
import Landing from "./Landing";
import { useEffect, useState } from "react";
import Translator from "./Translator";

export default function Home() {
  const { darkMode, setDarkMode, data } = useOutletContext();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const googleLogin = localStorage.getItem("googleLogin") === "true";
    const normalLogin = localStorage.getItem("isUserLoggedIn") === "true";
    setIsUserLoggedIn(googleLogin || normalLogin);
  }, []);

  return (
    <div className={`${darkMode ? "bg-[#101214]" : "bg-white"} scroll-smooth`}>
      <ParaphrasingTool
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        data={data}
      />
      {!isUserLoggedIn && <Landing darkMode={darkMode} setDarkMode={setDarkMode} />}
      <Translator darkMode={darkMode} />
    </div>
  );
}