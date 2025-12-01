import { useOutletContext } from "react-router-dom";
import Translator from "./Translator";

export function TranslatorWrapper() {
  const { darkMode } = useOutletContext();

  return (
    <>
      <Translator darkMode={darkMode} />;
    </>
  );
}
