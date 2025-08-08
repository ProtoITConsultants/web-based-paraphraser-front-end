import { useState, useEffect } from "react"
import ModeSelector from "./ModeSelector"
import ContentArea from "./ContentArea"
export default function ParaphrasingTool( { darkMode, setDarkMode }) {
  const [activeMode, setActiveMode] = useState("Standard")
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [loading, setLoading] = useState(false);
  // Listen for custom 'paraphrase' event from ContentArea
  useEffect(() => {
    const handler = async (e) => {
      if (e.detail && e.detail.trim()) {
        setLoading(true);
        setOutputText("");
        try {
          const apiProtocol = window.location.protocol === 'https:' ? 'https' : 'http';
          const apiUrl = `https://api.paraphraser.co/paraphraser`;
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              input_text: e.detail,
              mode: activeMode.toLowerCase()
            })
          });
          const data = await response.json();
          setOutputText(data.paraphrased_text || "Error: No paraphrased text returned.");
        } catch (err) {
          setOutputText("Error: Unable to paraphrase. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    window.addEventListener('paraphrase', handler);
    return () => window.removeEventListener('paraphrase', handler);
  }, [setOutputText, activeMode]);

  return (
    <>
        {/* Mode Selector */}
        <div className="px-8 lg:pt-4">
          <ModeSelector activeMode={activeMode} setActiveMode={setActiveMode} darkMode={darkMode} />
        </div>

        {/* Content Area */}
        <div className="mt-2 px-8">
          <ContentArea
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            darkMode={darkMode}
            loading={loading}
          />
        </div>
    </>
  )
}