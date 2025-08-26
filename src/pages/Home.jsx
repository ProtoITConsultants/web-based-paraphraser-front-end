import { useOutletContext } from "react-router-dom"; 
import ParaphrasingTool from "../components/ParaphrasingTool";
import Landing from "./Landing";

export default function Home() {
  const { darkMode, setDarkMode, data } =
    useOutletContext(); 
  return (
    <div className={`${darkMode ? "bg-[#101214]" : "bg-white"}`}>
      <ParaphrasingTool darkMode={darkMode} setDarkMode={setDarkMode} data={data} />
      <Landing/>
    </div>
  );
}
