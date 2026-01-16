import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SummarizerWebCopy from "../components/SummarizerWebCopy";
import { toast } from "sonner";

export default function Summarizer() {
  const { darkMode, setDarkMode, data } = useOutletContext();
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(() => {
    return localStorage.getItem("showSummarizerLoginPopup") === "true";
  });
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn =
    localStorage.getItem("isUserLoggedIn") === "true" ||
    localStorage.getItem("googleLogin") === "true";

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to summarize");
      return;
    }

    if (!isLoggedIn) {
      let usedCount = parseInt(
        localStorage.getItem("summarizerUsedCount") || 0
      );
      const usedCountDate =
        localStorage.getItem("summarizerUsedCountDate") || getCurrentDate();
      const currentDate = getCurrentDate();

      if (usedCountDate !== currentDate) {
        usedCount = 0;
        localStorage.setItem("summarizerUsedCount", 0);
        localStorage.setItem("summarizerUsedCountDate", currentDate);
        localStorage.setItem("showSummarizerLoginPopup", "false");
        setShowLoginPopup(false);
      }

      if (usedCount >= 3) {
        setShowLoginPopup(true);
        localStorage.setItem("showSummarizerLoginPopup", "true");
        return;
      }

      usedCount += 1;
      localStorage.setItem("summarizerUsedCount", usedCount);
      localStorage.setItem("summarizerUsedCountDate", currentDate);
      toast.success(`You have used ${usedCount} out of 3 summaries for today.`);
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://api.paraphraser.co/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_text: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setSummary(data.summary || "");
      toast.success("Summary generated successfully!");
    } catch (error) {
      toast.error("Failed to generate summary. Please try again.");
      console.error("Summarization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  const handleClear = () => {
    setInputText("");
    setSummary("");
  };

  return (
    <div
      className={`min-h-screen pt-24 pb-8 mx-auto ${
        darkMode ? "bg-[#101214]" : "bg-white"
      }`}
    >
      <h1
        className={`text-3xl md:text-4xl py-5 font-semibold px-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        AI Summarizer
      </h1>

      <div className="mx-auto flex flex-col gap-0 px-4 md:px-8">
        {/* Output Area (top, like chat) */}
        <div
          className={`rounded-2xl p-6 mb-4 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          } min-h-60 max-h-96 overflow-y-auto flex-1`}
          style={{ minHeight: "240px", maxHeight: "384px" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Summarized Content
            </h2>
            <div className="flex items-center gap-2">
              {summary && (
                <button
                  onClick={handleCopy}
                  className={`ml-2 md:flex hidden px-4 py-1 rounded-lg text-sm font-medium items-center gap-2 transition-colors duration-200 ${
                    darkMode
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                  title="Copy to clipboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="inline-block align-middle"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="13"
                      height="13"
                      rx="2"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                  Copy
                </button>
              )}
            </div>
          </div>
          <div
            className={`w-full font-light ${
              darkMode
                ? "text-gray-200 bg-gray-900"
                : "text-gray-900 bg-gray-50"
            }`}
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {summary ? (
              <span>{summary}</span>
            ) : (
              <span
                className={darkMode ? "text-gray-500" : "text-gray-400"}
              ></span>
            )}
          </div>
        </div>

        {/* Input Bar (bottom, like chat input) */}
        <form
          className={`relative rounded-2xl p-4 bottom-0 z-10 flex items-center gap-2 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSummarize();
          }}
        >
          {/* Clear (X) button at top right of input bar */}
          {inputText && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute top-2 left-2 ${
                darkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-400 hover:text-gray-600"
              } transition-colors cursor-pointer p-1`}
              tabIndex={-1}
              aria-label="Clear input"
              disabled={isLoading}
              style={{ zIndex: 2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Please provide the content that you would like me to summarize."
            className={`flex-1 w-full font-light py-0 sx:py-4 md:py-2 pr-0 md:pr-10 border-none focus:border-none outline-none focus:outline-none resize-none ${
              darkMode
                ? "text-gray-200 bg-gray-900 placeholder-gray-400"
                : "text-gray-900 bg-gray-50 placeholder-gray-400"
            } placeholder:text-xs md:placeholder:text-base`}
            rows={2}
            style={{
              minHeight: "65px",
              maxHeight: "160px",
              height: "48px",
              overflowY: "auto",
            }}
            onInput={(e) => {
              // Auto-expand textarea up to maxHeight
              const target = e.target;
              target.style.height = "48px";
              target.style.height = Math.min(target.scrollHeight, 160) + "px";
            }}
          />
          <div>
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={`bg-[#D2F159] cursor-pointer hover:bg-[#c5e14a] text-black font-medium px-6 py-2 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-1 flex items-center justify-center gap-2 w-full ${
                isLoading || !inputText.trim()
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              style={{ marginLeft: "0.5rem" }}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={`${
                darkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              } cursor-pointer font-medium px-6 py-2 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-1 flex items-center justify-center gap-2 my-2 w-full`}
              style={{ marginLeft: "0.5rem" }}
            >
              Discard
            </button>
          </div>
        </form>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } rounded-2xl p-6 mx-4 relative shadow-2xl`}
          >
            <h2
              className={`text-xl font-semibold mb-3 text-center ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              You have reached your daily limit of 3 summaries
            </h2>
            <p
              className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-6`}
            >
              To keep summarizing without limits, please{" "}
              <strong>log in or sign up.</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  localStorage.removeItem("showSummarizerLoginPopup");
                  setShowLoginPopup(false);
                  navigate("/login");
                }}
                className={`w-full py-5 text-sm rounded-2xl text-center ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                } transition-colors`}
              >
                Log In
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("showSummarizerLoginPopup");
                  setShowLoginPopup(false);
                  navigate("/signup");
                }}
                className="w-full py-5 text-sm rounded-2xl bg-[#D2F159] text-center hover:bg-[#c5e14a] transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Web Copy Section (only for not logged in users) */}
      {!isLoggedIn && <SummarizerWebCopy darkMode={darkMode} />}
    </div>
  );
}
