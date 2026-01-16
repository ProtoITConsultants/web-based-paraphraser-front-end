import { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { languageCodeMap, resolveSlugLanguages } from "../../routes";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  AlignmentType,
} from "docx";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

export default function TranslatorArea({ darkMode }) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(() => {
    return localStorage.getItem("showTranslatorLoginPopup") === "true";
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [languages, setLanguages] = useState([]);
  const [languagesLoading, setLanguagesLoading] = useState(false);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [sourceSearchTerm, setSourceSearchTerm] = useState("");
  const [targetSearchTerm, setTargetSearchTerm] = useState("");
  const [translationLoading, setTranslationLoading] = useState(false);
  const [hasTranslated, setHasTranslated] = useState(false); // Track if user has translated at least once
  const sourceDropdownRef = useRef(null);
  const targetDropdownRef = useRef(null);

  // Frequently used languages
  const frequentlyUsedLanguages = [
    { code: languageCodeMap.english, name: "English" },
    { code: languageCodeMap.spanish, name: "Spanish" },
    { code: languageCodeMap.chinese, name: "Chinese" },
    { code: languageCodeMap.french, name: "French" },
    { code: languageCodeMap.german, name: "German" },
    { code: languageCodeMap.arabic, name: "Arabic" },
  ];

  const { slug } = useParams();
  useEffect(() => {
    if (!slug) return;

    const result = resolveSlugLanguages(slug);
    if (!result) return;

    const { source, target } = result;

    if (languageCodeMap[source] && languageCodeMap[target]) {
      setSourceLanguage(languageCodeMap[source]);
      setTargetLanguage(languageCodeMap[target]);
    }
  }, [slug]);

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    const wordCount = countWords(text);
    if (wordCount <= 500) {
      setInputText(text);
    } else {
      toast.error("You cannot enter more than 500 words!");
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isRtlLang = (langCode) => {
    const rtlLangs = [
      "ar",
      "he",
      "fa",
      "ur",
      "ps",
      "dv",
      "ku",
      "yi",
      "ug",
      "sd",
    ];
    return rtlLangs.includes(langCode);
  };

  const generatePDF = async () => {
    try {
      const dir = isRtlLang(targetLanguage) ? "rtl" : "ltr";
      const element = document.createElement("div");
      element.innerHTML = `
        <div style="padding: 40px; font-family: Arial, sans-serif;">
          <div style="text-align: right; color: #666; font-size: 16px; margin-bottom: 24px;">
            ${getCurrentDate()}
          </div>
          <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 16px; border-bottom: 2px solid #000; padding-bottom: 12px;">
            Translated Content
          </h1>
          <div style="font-size: 20px; line-height: 2; color: #333; white-space: pre-wrap; word-wrap: break-word; direction: ${dir};">
            ${translatedText}
          </div>
        </div>
      `;

      const opt = {
        margin: 0,
        filename: `Translated_Content_${
          new Date().toISOString().split("T")[0]
        }.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      setShowExportPopup(false);
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const generateDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: getCurrentDate(),
                      size: 20,
                      color: "666666",
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                }),
              ],
            }),
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Translated Content",
                  bold: true,
                  size: 32,
                  color: "000000",
                }),
              ],
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: translatedText,
                  size: 24,
                  color: "333333",
                }),
              ],
              spacing: { line: 276 },
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBlob(doc);
    const url = URL.createObjectURL(buffer);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Translated_Content_${
      new Date().toISOString().split("T")[0]
    }.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportPopup(false);
  };

  const performTranslation = async () => {
    if (!inputText.trim()) {
      return;
    }

    setTranslationLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

      // Ensure sourceLanguage and targetLanguage are ISO codes (e.g., 'en', 'it')
      // If languageCodeMap is used, reverse lookup if needed
      let srcLang = sourceLanguage;
      let tgtLang = targetLanguage;

      // If languageCodeMap is an object like { english: 'en', italian: 'it', ... }
      // and sourceLanguage/targetLanguage are values like 'english', 'italian', map them to codes
      // But if already codes, use as is
      // Try to detect if value is a code or a name
      const isCode = (val) => val.length === 2 || val.length === 3;
      if (!isCode(srcLang)) {
        // Try to map name to code
        for (const [name, code] of Object.entries(languageCodeMap)) {
          if (code === srcLang || name === srcLang) {
            srcLang = code;
            break;
          }
        }
      }
      if (!isCode(tgtLang)) {
        for (const [name, code] of Object.entries(languageCodeMap)) {
          if (code === tgtLang || name === tgtLang) {
            tgtLang = code;
            break;
          }
        }
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: inputText,
          source: srcLang,
          target: tgtLang,
        }),
      });
      const result = await response.json();
      if (result?.data?.translations?.[0]) {
        // Decode HTML entities in the translated text
        const decodeHtml = (html) => {
          const txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
        };
        setTranslatedText(
          decodeHtml(result.data.translations[0].translatedText)
        );
      } else {
        toast.error("Translation failed. Please try again.");
      }
    } catch (err) {
      console.error("Translation error:", err);
      toast.error("Translation failed. Please try again.");
    } finally {
      setTranslationLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to translate!");
      return;
    }

    if (!isUserLoggedIn) {
      let usedCount = parseInt(
        localStorage.getItem("translatorUsedCount") || 0
      );
      const usedCountDate =
        localStorage.getItem("translatorUsedCountDate") || getCurrentDate();
      const currentDate = getCurrentDate();

      if (usedCountDate !== currentDate) {
        usedCount = 0;
        localStorage.setItem("translatorUsedCount", 0);
        localStorage.setItem("translatorUsedCountDate", currentDate);
        localStorage.setItem("showTranslatorLoginPopup", "false");
        setShowLoginPopup(false);
      }

      if (usedCount >= 3) {
        setShowLoginPopup(true);
        localStorage.setItem("showTranslatorLoginPopup", "true");
        return;
      }

      usedCount += 1;
      localStorage.setItem("translatorUsedCount", usedCount);
      localStorage.setItem("translatorUsedCountDate", currentDate);
      toast.success(
        `You have used ${usedCount} out of 3 translations for today.`
      );
    }

    setHasTranslated(true);
    await performTranslation();
  };

  // Auto-translate when language changes (only if user has already translated once)
  useEffect(() => {
    if (hasTranslated && translatedText && inputText.trim()) {
      performTranslation();
    }
  }, [sourceLanguage, targetLanguage]);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    setIsUserLoggedIn(isUserLoggedIn === "true");
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(event.target)) {
        setIsSourceDropdownOpen(false);
      }
      if (targetDropdownRef.current && !targetDropdownRef.current.contains(event.target)) {
        setIsTargetDropdownOpen(false);
      }
    };

    if (isSourceDropdownOpen || isTargetDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSourceDropdownOpen, isTargetDropdownOpen]);

  useEffect(() => {
    const fetchLanguages = async () => {
      setLanguagesLoading(true);
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
        const url = `https://translation.googleapis.com/language/translate/v2/languages?target=en&key=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result.data?.languages) {
          const validLanguages = result.data.languages
            .filter((lang) => lang.language && lang.name)
            .map((lang) => ({
              code: lang.language,
              name: lang.name || lang.language,
            }));
          setLanguages(validLanguages);
        } else {
          setLanguages([{ code: "en", name: "English" }]);
        }
      } catch (err) {
        console.error("Failed to fetch languages:", err);
        setLanguages([{ code: "en", name: "English" }]);
      } finally {
        setLanguagesLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const filteredSourceLanguages = languages.filter((lang) =>
    lang.name?.toLowerCase().includes(sourceSearchTerm.toLowerCase())
  );

  const filteredTargetLanguages = languages.filter((lang) =>
    lang.name?.toLowerCase().includes(targetSearchTerm.toLowerCase())
  );

  const sourceLangName =
    languages.find((lang) => lang.code === sourceLanguage)?.name || "English";
  const targetLangName =
    languages.find((lang) => lang.code === targetLanguage)?.name || "Spanish";

  const handleSourceLanguageChange = (langCode) => {
    setSourceLanguage(langCode);
    setIsSourceDropdownOpen(false);
    setSourceSearchTerm("");
  };

  const handleTargetLanguageChange = (langCode) => {
    setTargetLanguage(langCode);
    setIsTargetDropdownOpen(false);
    setTargetSearchTerm("");

    // Count as usage when changing language if not logged in
    if (!isUserLoggedIn && hasTranslated) {
      let usedCount = parseInt(
        localStorage.getItem("translatorUsedCount") || 0
      );
      const usedCountDate =
        localStorage.getItem("translatorUsedCountDate") || getCurrentDate();
      const currentDate = getCurrentDate();

      if (usedCountDate !== currentDate) {
        usedCount = 0;
        localStorage.setItem("translatorUsedCount", 0);
        localStorage.setItem("translatorUsedCountDate", currentDate);
        localStorage.setItem("showTranslatorLoginPopup", "false");
        setShowLoginPopup(false);
      }

      if (usedCount >= 3) {
        setShowLoginPopup(true);
        localStorage.setItem("showTranslatorLoginPopup", "true");
        return;
      }

      usedCount += 1;
      localStorage.setItem("translatorUsedCount", usedCount);
      localStorage.setItem("translatorUsedCountDate", currentDate);
      toast.success(
        `You have used ${usedCount} out of 3 translations for today.`
      );
    }
  };

  return (
    <>
      <div
        id="translator"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-8"
      >
        {/* Input Area */}
        <div
          className={`rounded-2xl p-6 ${darkMode ? "bg-black" : "bg-gray-100"}`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Enter Text
            </h2>
            {/* Source Language Dropdown */}
            <div className="relative" ref={sourceDropdownRef}>
              <button
                onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
                className={`py-1 flex gap-2 rounded-lg text-sm font-medium shadow-sm px-3 items-center hover:bg-gray-300 focus:outline-none ${
                  darkMode
                    ? "bg-[#101214] text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <span>{sourceLangName}</span>
                <ChevronDown />
              </button>
              {isSourceDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-[440px] rounded-lg shadow-lg z-10 overflow-hidden ${
                    darkMode
                      ? "bg-[#101214] text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <input
                    type="text"
                    value={sourceSearchTerm}
                    onChange={(e) => setSourceSearchTerm(e.target.value)}
                    placeholder="Search"
                    className={`w-full px-4 py-3 text-sm border-b focus:outline-none ${
                      darkMode
                        ? "bg-[#101214] text-white border-gray-700 placeholder-gray-500"
                        : "bg-white text-gray-900 border-gray-200 placeholder-gray-400"
                    }`}
                  />
                  <ul className="max-h-80 overflow-y-auto">
                    {languagesLoading ? (
                      <li className="px-4 py-2 text-sm text-gray-500">
                        Loading...
                      </li>
                    ) : (
                      <>
                        {!sourceSearchTerm && (
                          <>
                            <li
                              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              SUGGESTED LANGUAGES
                            </li>
                            <li className="px-4 pb-2">
                              <div className="grid grid-cols-3 gap-2">
                                {frequentlyUsedLanguages.map((lang) => (
                                  <button
                                    key={`freq-${lang.code}`}
                                    onClick={() =>
                                      handleSourceLanguageChange(lang.code)
                                    }
                                    className={`px-3 py-2 text-sm cursor-pointer rounded-lg text-center transition ${
                                      darkMode
                                        ? "hover:bg-gray-700"
                                        : "hover:bg-gray-50"
                                    } ${
                                      sourceLanguage === lang.code
                                        ? darkMode
                                          ? "bg-blue-900/30"
                                          : "bg-blue-50"
                                        : ""
                                    }`}
                                  >
                                    {lang.name}
                                  </button>
                                ))}
                              </div>
                            </li>
                            <li
                              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border-t mt-2 ${
                                darkMode
                                  ? "text-gray-400 border-gray-700"
                                  : "text-gray-500 border-gray-200"
                              }`}
                            >
                              ALL LANGUAGES
                            </li>
                          </>
                        )}
                        {filteredSourceLanguages.length > 0 ? (
                          filteredSourceLanguages.map((lang) => (
                            <li
                              key={lang.code}
                              onClick={() =>
                                handleSourceLanguageChange(lang.code)
                              }
                              className={`px-4 py-2.5 text-sm cursor-pointer ${
                                darkMode
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-gray-50"
                              } ${
                                sourceLanguage === lang.code
                                  ? darkMode
                                    ? "bg-blue-900/30"
                                    : "bg-blue-50"
                                  : ""
                              }`}
                            >
                              {lang.name}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-gray-500">
                            No languages found
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text to translate..."
            className={`w-full min-h-80 h-80 lg:h-96 font-light py-2 border-none focus:border-none outline-none focus:outline-none resize-vertical ${
              darkMode ? "text-gray-400 bg-black" : "text-black bg-gray-100"
            }`}
          />
          <div className="flex justify-end">
            <button
              onClick={handleTranslate}
              disabled={translationLoading || !inputText.trim()}
              className={`bg-lime-300 cursor-pointer hover:bg-[#D2F159] text-gray-900 font-medium px-8 py-3 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-1 flex items-center justify-center gap-2 ${
                translationLoading || !inputText.trim()
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
            >
              {translationLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-gray-900"
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
              {translationLoading ? "Translating..." : "Translate"}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div
          className={`rounded-2xl p-6 relative ${
            darkMode ? "bg-black" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Translated Text
            </h2>
            <div className="flex items-center gap-2">
              {/* Target Language Dropdown */}
              <div className="relative" ref={targetDropdownRef}>
                <button
                  onClick={() => setIsTargetDropdownOpen(!isTargetDropdownOpen)}
                  disabled={translationLoading}
                  className={`py-1 flex gap-2 rounded-lg text-sm font-medium shadow-sm px-3 items-center hover:bg-gray-300 focus:outline-none ${
                    translationLoading ? "opacity-70 cursor-wait" : ""
                  } ${
                    darkMode
                      ? "bg-[#101214] text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <span>{targetLangName}</span>
                  {translationLoading ? (
                    <svg
                      className="animate-spin h-4 w-4"
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
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {isTargetDropdownOpen && !translationLoading && (
                  <div
                    className={`absolute right-0 mt-2 w-[440px] rounded-lg shadow-lg z-10 overflow-hidden ${
                      darkMode
                        ? "bg-[#101214] text-white"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <input
                      type="text"
                      value={targetSearchTerm}
                      onChange={(e) => setTargetSearchTerm(e.target.value)}
                      placeholder="Search"
                      className={`w-full px-4 py-3 text-sm border-b focus:outline-none ${
                        darkMode
                          ? "bg-[#101214] text-white border-gray-700 placeholder-gray-500"
                          : "bg-white text-gray-900 border-gray-200 placeholder-gray-400"
                      }`}
                    />
                    <ul className="max-h-80 overflow-y-auto">
                      {languagesLoading ? (
                        <li className="px-4 py-2 text-sm text-gray-500">
                          Loading...
                        </li>
                      ) : (
                        <>
                          {!targetSearchTerm && (
                            <>
                              <li
                                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                SUGGESTED LANGUAGES
                              </li>
                              <li className="px-4 pb-2">
                                <div className="grid grid-cols-3 gap-2">
                                  {frequentlyUsedLanguages.map((lang) => (
                                    <button
                                      key={`freq-${lang.code}`}
                                      onClick={() =>
                                        handleTargetLanguageChange(lang.code)
                                      }
                                      className={`px-3 py-2 text-sm cursor-pointer rounded-lg text-center transition ${
                                        darkMode
                                          ? "hover:bg-gray-700"
                                          : "hover:bg-gray-50"
                                      } ${
                                        targetLanguage === lang.code
                                          ? darkMode
                                            ? "bg-blue-900/30"
                                            : "bg-blue-50"
                                          : ""
                                      }`}
                                    >
                                      {lang.name}
                                    </button>
                                  ))}
                                </div>
                              </li>
                              <li
                                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border-t mt-2 ${
                                  darkMode
                                    ? "text-gray-400 border-gray-700"
                                    : "text-gray-500 border-gray-200"
                                }`}
                              >
                                ALL LANGUAGES
                              </li>
                            </>
                          )}
                          {filteredTargetLanguages.length > 0 ? (
                            filteredTargetLanguages.map((lang) => (
                              <li
                                key={lang.code}
                                onClick={() =>
                                  handleTargetLanguageChange(lang.code)
                                }
                                className={`px-4 py-2.5 text-sm cursor-pointer ${
                                  darkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-50"
                                } ${
                                  targetLanguage === lang.code
                                    ? darkMode
                                      ? "bg-blue-900/30"
                                      : "bg-blue-50"
                                    : ""
                                }`}
                              >
                                {lang.name}
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-2 text-sm text-gray-500">
                              No languages found
                            </li>
                          )}
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {/* Copy Button */}
              {translatedText && !translationLoading && (
                <button
                  className={`ml-2 md:flex hidden px-4 py-1 rounded-lg text-sm font-medium items-center gap-2 transition-colors duration-200 ${
                    copied
                      ? "bg-[#D2F159] text-black"
                      : darkMode
                      ? "bg-[#101214] text-white hover:bg-gray-700"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    navigator.clipboard.writeText(translatedText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          strokeWidth="2"
                          fill="none"
                        />
                        <rect
                          x="3"
                          y="3"
                          width="13"
                          height="13"
                          rx="2"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <div
            className={`w-full min-h-80 h-80 lg:h-96 py-2 font-light overflow-y-auto ${
              darkMode ? "text-gray-400 bg-black" : "text-black bg-gray-100"
            }`}
            style={{ direction: isRtlLang(targetLanguage) ? "rtl" : "ltr" }}
          >
            {translatedText || (
              <span
                className={darkMode ? "text-gray-500" : "text-gray-400"}
              ></span>
            )}
          </div>

          {translatedText && !translationLoading && (
            <>
              <button
                onClick={() => setShowExportPopup(true)}
                className="absolute bottom-4 right-4 p-3 rounded-xl flex items-center gap-2 bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export
              </button>
              <button
                className={`md:hidden absolute bottom-20 right-4 px-4 py-1 rounded-xl flex items-center gap-2 transition ${
                  copied
                    ? "bg-[#D2F159] text-black"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => {
                  navigator.clipboard.writeText(translatedText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                disabled={copied}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Export Popup */}
      {showExportPopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowExportPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Export your translation
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={generateDOCX}
                className="flex flex-col cursor-pointer items-center p-6 bg-gray-100 rounded-xl hover:bg-gray-200 transition group"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-300">
                  <img
                    src="/material-symbols-light_docs-outline-rounded.png"
                    alt="DOCX"
                    width="32"
                    height="32"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  Download Docs File
                </span>
              </button>
              <button
                onClick={generatePDF}
                className="flex flex-col cursor-pointer items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-200">
                  <img
                    src="/material-icon-theme_pdf.png"
                    alt="PDF"
                    width="32"
                    height="32"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  Download PDF
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 relative">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              You have reached your daily limit of 3 translations
            </h2>
            <p className="text-gray-700 mb-6">
              To keep translating without limits, please{" "}
              <strong>log in or sign up.</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="w-full py-5 text-sm rounded-2xl bg-gray-100 text-center text-gray-900"
                onClick={() =>
                  localStorage.removeItem("showTranslatorLoginPopup")
                }
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="w-full py-5 text-sm rounded-2xl bg-[#D2F159] text-center"
                onClick={() =>
                  localStorage.removeItem("showTranslatorLoginPopup")
                }
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
