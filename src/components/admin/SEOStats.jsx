import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, BookOpen, Target, Clock, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";
import * as readability from "text-readability";
import seord from "seord";

export default function SEOStats({ 
  content = "", 
  title = "", 
  keyword = "",
  type = "content", // "content", "title", "meta"
  darkMode = true 
}) {
  const [stats, setStats] = useState({
    wordCount: 0,
    charCount: 0,
    sentenceCount: 0,
    readingTime: 0,
    // Readability scores
    fleschScore: null,
    fleschKincaid: null,
    gunningFog: null,
    colemanLiau: null,
    smogIndex: null,
    automatedReadability: null,
    // SEO metrics from seord
    keywordDensity: 0,
    keywordCount: 0,
    titleScore: null,
    descriptionScore: null,
    seoScore: null,
    recommendations: [],
  });

  useEffect(() => {
    if (!content && !title) {
      setStats({
        wordCount: 0,
        charCount: 0,
        sentenceCount: 0,
        readingTime: 0,
        fleschScore: null,
        fleschKincaid: null,
        gunningFog: null,
        colemanLiau: null,
        smogIndex: null,
        automatedReadability: null,
        keywordDensity: 0,
        keywordCount: 0,
        titleScore: null,
        descriptionScore: null,
        seoScore: null,
        recommendations: [],
      });
      return;
    }

    const text = content || title;
    
    // Basic text statistics
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Calculate reading time (225 words per minute)
    const readingTime = Math.ceil(words.length / 225);

    // Calculate readability scores using text-readability
    let fleschScore = null;
    let fleschKincaid = null;
    let gunningFog = null;
    let colemanLiau = null;
    let smogIndex = null;
    let automatedReadability = null;
    
    if (text.length > 0 && words.length > 1 && sentences.length > 0) {
      try {
        fleschScore = Math.round(readability.fleschReadingEase(text) * 10) / 10;
        fleschKincaid = Math.round(readability.fleschKincaidGrade(text) * 10) / 10;
        gunningFog = Math.round(readability.gunningFog(text) * 10) / 10;
        colemanLiau = Math.round(readability.colemanLiauIndex(text) * 10) / 10;
        smogIndex = Math.round(readability.smogIndex(text) * 10) / 10;
        automatedReadability = Math.round(readability.automatedReadabilityIndex(text) * 10) / 10;
      } catch (e) {
        console.warn("Readability calculation error:", e);
      }
    }

    // SEO analysis using seord
    let keywordDensity = 0;
    let keywordCount = 0;
    let titleScore = null;
    let descriptionScore = null;
    let seoScore = null;
    let recommendations = [];

    if (keyword && text.length > 0) {
      try {
        // Analyze keyword density and frequency
        const lowerText = text.toLowerCase();
        const lowerKeyword = keyword.toLowerCase();
        const keywordRegex = new RegExp(`\\b${lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        keywordCount = (lowerText.match(keywordRegex) || []).length;
        keywordDensity = words.length > 0 ? ((keywordCount / words.length) * 100).toFixed(2) : 0;

        // Use seord for SEO analysis
        if (type === "title") {
          const analysis = seord.title(text, keyword);
          titleScore = analysis.score;
          if (analysis.recommendations) {
            recommendations = analysis.recommendations;
          }
        } else if (type === "meta") {
          const analysis = seord.description(text, keyword);
          descriptionScore = analysis.score;
          if (analysis.recommendations) {
            recommendations = analysis.recommendations;
          }
        } else if (type === "content") {
          const analysis = seord.content(text, keyword);
          seoScore = analysis.score;
          if (analysis.recommendations) {
            recommendations = analysis.recommendations;
          }
        }
      } catch (e) {
        console.warn("SEO analysis error:", e);
      }
    }

    setStats({
      wordCount: words.length,
      charCount: text.length,
      sentenceCount: sentences.length,
      readingTime,
      fleschScore,
      fleschKincaid,
      gunningFog,
      colemanLiau,
      smogIndex,
      automatedReadability,
      keywordDensity: parseFloat(keywordDensity),
      keywordCount,
      titleScore,
      descriptionScore,
      seoScore,
      recommendations: Array.isArray(recommendations) ? recommendations : [],
    });
  }, [content, title, keyword, type]);

  const getFleschStatus = (score) => {
    if (score === null) return { label: "N/A", color: "gray", icon: Info, desc: "Insufficient text" };
    if (score >= 80) return { label: "Very Easy", color: "green", icon: CheckCircle2, desc: "5th grade level" };
    if (score >= 60) return { label: "Easy", color: "green", icon: CheckCircle2, desc: "8-9th grade" };
    if (score >= 50) return { label: "Fairly Easy", color: "yellow", icon: AlertCircle, desc: "10-12th grade" };
    if (score >= 30) return { label: "Difficult", color: "orange", icon: AlertCircle, desc: "College level" };
    return { label: "Very Difficult", color: "red", icon: AlertCircle, desc: "Graduate level" };
  };

  const getScoreStatus = (score) => {
    if (score === null) return { label: "N/A", color: "gray", icon: Info };
    if (score >= 80) return { label: "Excellent", color: "green", icon: CheckCircle2 };
    if (score >= 60) return { label: "Good", color: "green", icon: CheckCircle2 };
    if (score >= 40) return { label: "Fair", color: "yellow", icon: AlertCircle };
    if (score >= 20) return { label: "Poor", color: "orange", icon: AlertTriangle };
    return { label: "Very Poor", color: "red", icon: AlertCircle };
  };

  const getKeywordStatus = (density) => {
    if (density === 0) return { label: "Missing", color: "red", icon: AlertCircle };
    if (density >= 0.5 && density <= 2.5) return { label: "Optimal", color: "green", icon: CheckCircle2 };
    if (density > 2.5 && density <= 4) return { label: "High", color: "yellow", icon: AlertCircle };
    if (density > 4) return { label: "Keyword Stuffing", color: "red", icon: AlertCircle };
    return { label: "Too Low", color: "orange", icon: AlertCircle };
  };

  const fleschStatus = getFleschStatus(stats.fleschScore);
  const keywordStatus = getKeywordStatus(stats.keywordDensity);

  // Compact view for titles
  if (type === "title") {
    const scoreStatus = getScoreStatus(stats.titleScore);
    
    return (
      <div className="space-y-2">
        <div className={`flex items-center gap-3 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} flex-wrap`}>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{stats.wordCount} words</span>
          </div>
          <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
          <span>{stats.charCount} chars</span>
          {stats.titleScore !== null && (
            <>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
              <span className={`flex items-center gap-1 font-medium ${
                scoreStatus.color === "green" ? "text-green-500" :
                scoreStatus.color === "yellow" ? "text-yellow-500" :
                scoreStatus.color === "orange" ? "text-orange-500" :
                scoreStatus.color === "red" ? "text-red-500" : "text-gray-500"
              }`}>
                <scoreStatus.icon className="w-3 h-3" />
                SEO: {stats.titleScore}/100
              </span>
            </>
          )}
          {keyword && stats.keywordCount > 0 && (
            <>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
              <span className={`flex items-center gap-1 font-medium ${
                keywordStatus.color === "green" ? "text-green-500" :
                keywordStatus.color === "yellow" ? "text-yellow-500" :
                keywordStatus.color === "red" ? "text-red-500" : "text-orange-500"
              }`}>
                <Target className="w-3 h-3" />
                {stats.keywordCount}x ({stats.keywordDensity}%)
              </span>
            </>
          )}
        </div>
        
        {stats.recommendations.length > 0 && (
          <div className={`text-xs ${darkMode ? "bg-blue-900/20 text-blue-300" : "bg-blue-50 text-blue-700"} p-2 rounded-lg`}>
            <div className="font-medium mb-1 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Recommendations:
            </div>
            <ul className="list-disc list-inside space-y-0.5 ml-1">
              {stats.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Compact view for meta descriptions
  if (type === "meta") {
    const scoreStatus = getScoreStatus(stats.descriptionScore);
    
    return (
      <div className="space-y-2">
        <div className={`flex items-center gap-3 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} flex-wrap`}>
          <span>{stats.wordCount} words</span>
          <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
          <span>{stats.charCount} chars</span>
          {stats.descriptionScore !== null && (
            <>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
              <span className={`flex items-center gap-1 font-medium ${
                scoreStatus.color === "green" ? "text-green-500" :
                scoreStatus.color === "yellow" ? "text-yellow-500" :
                scoreStatus.color === "orange" ? "text-orange-500" :
                scoreStatus.color === "red" ? "text-red-500" : "text-gray-500"
              }`}>
                <scoreStatus.icon className="w-3 h-3" />
                SEO: {stats.descriptionScore}/100
              </span>
            </>
          )}
          {keyword && stats.keywordCount > 0 && (
            <>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
              <span className="flex items-center gap-1 text-green-500 font-medium">
                <Target className="w-3 h-3" />
                {stats.keywordCount}x keyword
              </span>
            </>
          )}
        </div>
        
        {stats.recommendations.length > 0 && (
          <div className={`text-xs ${darkMode ? "bg-blue-900/20 text-blue-300" : "bg-blue-50 text-blue-700"} p-2 rounded-lg`}>
            <div className="font-medium mb-1 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Recommendations:
            </div>
            <ul className="list-disc list-inside space-y-0.5 ml-1">
              {stats.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Full content view with detailed metrics
  const scoreStatus = getScoreStatus(stats.seoScore);
  
  return (
    <div className="space-y-3">
      {/* SEO Score Banner */}
      {stats.seoScore !== null && (
        <div className={`p-4 rounded-2xl border-2 ${
          scoreStatus.color === "green" ? "bg-green-50 dark:bg-green-900/20 border-green-500" :
          scoreStatus.color === "yellow" ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500" :
          scoreStatus.color === "orange" ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500" :
          "bg-red-50 dark:bg-red-900/20 border-red-500"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${
              scoreStatus.color === "green" ? "bg-green-500" :
              scoreStatus.color === "yellow" ? "bg-yellow-500" :
              scoreStatus.color === "orange" ? "bg-orange-500" : "bg-red-500"
            }`}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                SEO Content Score
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${
                  scoreStatus.color === "green" ? "text-green-600 dark:text-green-400" :
                  scoreStatus.color === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                  scoreStatus.color === "orange" ? "text-orange-600 dark:text-orange-400" :
                  "text-red-600 dark:text-red-400"
                }`}>
                  {stats.seoScore}
                </span>
                <span className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>/100</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  scoreStatus.color === "green" ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300" :
                  scoreStatus.color === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300" :
                  scoreStatus.color === "orange" ? "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300" :
                  "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                }`}>
                  {scoreStatus.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Primary Metrics */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl ${
        darkMode ? "bg-[#101214]" : "bg-white"
      } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex flex-col">
          <span className={`text-xs flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            <BookOpen className="w-3 h-3" />
            Words
          </span>
          <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {stats.wordCount}
          </span>
        </div>

        <div className="flex flex-col">
          <span className={`text-xs flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            <Clock className="w-3 h-3" />
            Read Time
          </span>
          <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {stats.readingTime}m
          </span>
        </div>

        <div className="flex flex-col">
          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Readability</span>
          <span className={`flex items-center gap-1 text-sm font-bold ${
            fleschStatus.color === "green" ? "text-green-500" :
            fleschStatus.color === "yellow" ? "text-yellow-500" :
            fleschStatus.color === "orange" ? "text-orange-500" :
            fleschStatus.color === "red" ? "text-red-500" : "text-gray-500"
          }`}>
            <fleschStatus.icon className="w-4 h-4" />
            {fleschStatus.label}
          </span>
          <span className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>
            {fleschStatus.desc}
          </span>
        </div>

        {keyword && (
          <div className="flex flex-col">
            <span className={`text-xs flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              <Target className="w-3 h-3" />
              Keyword
            </span>
            <span className={`flex items-center gap-1 text-sm font-bold ${
              keywordStatus.color === "green" ? "text-green-500" :
              keywordStatus.color === "yellow" ? "text-yellow-500" :
              keywordStatus.color === "orange" ? "text-orange-500" :
              keywordStatus.color === "red" ? "text-red-500" : "text-gray-500"
            }`}>
              <keywordStatus.icon className="w-4 h-4" />
              {stats.keywordDensity}%
            </span>
            <span className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>
              {stats.keywordCount} occurrences
            </span>
          </div>
        )}
      </div>

      {/* Detailed Readability Scores */}
      {stats.fleschKincaid !== null && (
        <div className={`p-4 rounded-2xl ${darkMode ? "bg-[#101214]" : "bg-gray-50"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
            <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Readability Analysis
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mb-1`}>Flesch Reading Ease</div>
              <div className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {stats.fleschScore}
              </div>
              <div className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>0-100 scale</div>
            </div>
            <div>
              <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mb-1`}>Flesch-Kincaid Grade</div>
              <div className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {stats.fleschKincaid}
              </div>
              <div className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>Grade level</div>
            </div>
            <div>
              <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mb-1`}>Gunning Fog</div>
              <div className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {stats.gunningFog}
              </div>
              <div className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>Years of education</div>
            </div>
            <div>
              <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mb-1`}>Coleman-Liau</div>
              <div className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {stats.colemanLiau}
              </div>
              <div className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>Grade level</div>
            </div>
            <div>
              <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mb-1`}>SMOG Index</div>
              <div className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {stats.smogIndex}
              </div>
              <div className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>Grade level</div>
            </div>
            <div>
              <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mb-1`}>Automated Readability</div>
              <div className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {stats.automatedReadability}
              </div>
              <div className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-500"}`}>Grade level</div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Recommendations */}
      {stats.recommendations.length > 0 && (
        <div className={`p-4 rounded-2xl ${
          darkMode ? "bg-blue-900/20" : "bg-blue-50"
        } border ${darkMode ? "border-blue-800" : "border-blue-200"}`}>
          <div className={`flex items-center gap-2 mb-3 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">SEO Recommendations</span>
          </div>
          <ul className={`space-y-2 text-sm ${darkMode ? "text-blue-200" : "text-blue-800"}`}>
            {stats.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
