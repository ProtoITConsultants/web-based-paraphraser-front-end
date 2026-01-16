export const resolveSlugLanguages = (slug) => {
  if (!slug) return null;

  // Remove any path prefixes (e.g., "AI-translation/")
  const cleanSlug = slug.split("/").pop();
  const s = cleanSlug.toLowerCase().trim();

  console.log("Processing slug:", s); // Debug log

  // NEW: Handle natural language queries like "french to english google translate"
  // Pattern 1: "from {lang1} to {lang2}" - specifically for "translate from X to Y"
  const fromToPattern = /\bfrom\s+([a-z]+)\s+to\s+([a-z]+)\b/i;
  let match = s.match(fromToPattern);
  if (match) {
    const source = normalizeLanguage(match[1]);
    const target = normalizeLanguage(match[2]);
    if (source && target) {
      return { source, target };
    }
  }

  // NEW: Pattern 2: "{lang1} to {lang2}" - captures two languages with "to" between them
  // Ignores other words like "google", "translate", etc.
  const langToLangPattern = /\b([a-z]+)\s+to\s+([a-z]+)\b/i;
  match = s.match(langToLangPattern);
  if (match) {
    const source = normalizeLanguage(match[1]);
    const target = normalizeLanguage(match[2]);
    if (source && target) {
      return { source, target };
    }
  }

  // NEW: Handle "translation-from-{lang}-to-{lang}" pattern
  if (s.startsWith("translation-from-") && s.includes("-to-")) {
    const cleaned = s.replace("translation-from-", "");
    const [from, to] = cleaned.split("-to-");
    const source = normalizeLanguage(from);
    const target = normalizeLanguage(to);
    if (source && target) return { source, target };
  }

  // 1. Hyphenated sentence-style: translate-{lang}-text-to-{lang}
  if (s.startsWith("translate-") && s.includes("-text")) {
    const cleaned = s.replace(/^translate-/, "").replace("-text", "");
    if (cleaned.includes("-to-")) {
      const [from, to] = cleaned.split("-to-");
      return { source: normalizeLanguage(from), target: normalizeLanguage(to) };
    }
    const target = normalizeLanguage(cleaned);
    return target ? { source: "english", target } : null;
  }

  // 2. Sentence-style with spaces: translate {lang} text to {lang}
  if (s.startsWith("translate ") && s.includes(" text")) {
    const cleaned = s.replace("translate ", "").replace(" text", "").trim();
    if (cleaned.includes(" to ")) {
      const [from, to] = cleaned.split(" to ");
      return { source: normalizeLanguage(from), target: normalizeLanguage(to) };
    }
    const target = normalizeLanguage(cleaned);
    return target ? { source: "english", target } : null;
  }

  // 3. New case: translate-{lang} (without 'to' or 'in')
  if (s.startsWith("translate-")) {
    const langSlug = s.replace("translate-", "");
    // Skip if it's already handled by other cases with '-to-' or '-text'
    if (!langSlug.includes("-to") && !langSlug.includes("-text")) {
      const source = normalizeLanguage(langSlug);
      if (source) return { source, target: "english" };
    }
  }

  // 4a. translate-to-{lang} (single language at end)
  if (s.startsWith("translate-to-")) {
    const langSlug = s.replace("translate-to-", "");
    const target = normalizeLanguage(langSlug);
    if (!target) return null;
    return { source: "english", target };
  }

  // 4b. translate-in-{lang} (single language at end)
  if (s.startsWith("translate-in-")) {
    const langSlug = s.replace("translate-in-", "");
    const target = normalizeLanguage(langSlug);
    if (!target) return null;
    return { source: "english", target };
  }

  // 5. Ends with -translate (can have -to- before) - ENHANCED to handle trailing words
  if (s.endsWith("-translate")) {
    const base = s.replace("-translate", "");
    if (base.includes("-to-")) {
      const firstToIndex = base.indexOf("-to-");
      const from = base.substring(0, firstToIndex);
      const toSection = base.substring(firstToIndex + 4);

      // Try to find the first valid language in toSection
      const toParts = toSection.split("-");
      for (const part of toParts) {
        const target = normalizeLanguage(part);
        if (target) {
          const source = normalizeLanguage(from);
          if (source && target) {
            return { source, target };
          }
        }
      }
    }
    const target = normalizeLanguage(base);
    return target ? { source: "english", target } : null;
  }

  // 6. {from}-to-{to}-translation
  if (s.includes("-to-") && s.endsWith("-translation")) {
    const base = s.replace(/-translation$/, "");
    if (base.includes("-to-")) {
      const [from, to] = base.split("-to-");
      return { source: normalizeLanguage(from), target: normalizeLanguage(to) };
    }
  }

  // 7. Includes -translate-to- or -translation-to- (from-to)
  if (s.includes("-translate-to-") || s.includes("-translation-to-")) {
    let from, to;

    if (s.includes("-translate-to-")) {
      [from, to] = s.split("-translate-to-");
    } else if (s.includes("-translation-to-")) {
      [from, to] = s.split("-translation-to-");
    }

    const source = normalizeLanguage(from);
    const target = normalizeLanguage(to);
    if (source && target) return { source, target };
  }

  // 8. translate-{from}-to-{to} - ENHANCED to handle trailing words
  if (s.startsWith("translate-") && s.includes("-to-")) {
    const cleaned = s.replace("translate-", "");
    const parts = cleaned.split("-to-");
    const from = parts[0];
    const toSection = parts.slice(1).join("-to-");

    // Try to find the first valid language in toSection
    const toParts = toSection.split("-");
    for (const part of toParts) {
      const target = normalizeLanguage(part);
      if (target) {
        const source = normalizeLanguage(from);
        if (source && target) {
          return { source, target };
        }
      }
    }
  }

  // 9. New case: {from}-to-{to}-translator (before single-language)
  if (s.endsWith("-translator")) {
    const base = s.replace(/-translator$/, "");
    if (base.includes("-to-")) {
      const lastIndex = base.lastIndexOf("-to-");
      const from = base.substring(0, lastIndex);
      const to = base.substring(lastIndex + 4); // 4 is length of '-to-'
      const source = normalizeLanguage(from);
      const target = normalizeLanguage(to);
      if (source && target) return { source, target };
    } else if (base.includes("-")) {
      const [from, to] = base.split("-");
      const source = normalizeLanguage(from);
      const target = normalizeLanguage(to);
      if (source && target) return { source, target };
    }
  }

  // 10. Generic {from}-to-{to} - ENHANCED to handle trailing non-language words
  if (s.includes("-to-")) {
    // Split on first occurrence of "-to-"
    const firstToIndex = s.indexOf("-to-");
    const from = s.substring(0, firstToIndex);
    const toSection = s.substring(firstToIndex + 4); // 4 = length of "-to-"

    // Split toSection by hyphens and try to find the first valid language
    const toParts = toSection.split("-");
    for (const part of toParts) {
      const target = normalizeLanguage(part);
      if (target) {
        const source = normalizeLanguage(from);
        if (source) {
          console.log("Matched in section 10:", { source, target });
          return { source, target };
        }
      }
    }
  }

  // New case: {from}-{to}-translator or {from}-{to}-translation
  if (
    s.includes("-") &&
    (s.endsWith("-translator") || s.endsWith("-translation"))
  ) {
    const base = s.replace(/-(translator|translation)$/, "");
    if (base.includes("-")) {
      const [from, to] = base.split("-");
      const source = normalizeLanguage(from);
      const target = normalizeLanguage(to);
      if (source && target) return { source, target };
    }
  }

  // New case: single or dual languages ending with -translation
  if (s.endsWith("-translation")) {
    const base = s.replace(/-translation$/, "");

    // Case 1: two languages: {from}-to-{to}-translation
    if (base.includes("-to-")) {
      const lastIndex = base.lastIndexOf("-to-");
      const from = base.substring(0, lastIndex);
      const to = base.substring(lastIndex + 4);
      const source = normalizeLanguage(from);
      const target = normalizeLanguage(to);
      if (source && target) return { source, target };
    }

    // Case 2: single language: {lang}-translation
    const target = normalizeLanguage(base);
    if (target) return { source: target, target: "english" }; // language on left, english on right
  }

  // New case: single or dual languages ending with -translator
  if (s.endsWith("-translator")) {
    const base = s.replace(/-translator$/, "");

    // Case 1: two languages: {from}-to-{to}-translator
    if (base.includes("-to-")) {
      const lastIndex = base.lastIndexOf("-to-");
      const from = base.substring(0, lastIndex);
      const to = base.substring(lastIndex + 4);
      const source = normalizeLanguage(from);
      const target = normalizeLanguage(to);
      if (source && target) return { source, target };
    }

    // Case 2: single language: {lang}-translator
    const source = normalizeLanguage(base);
    if (source) return { source, target: "english" }; // language on left, english on right
  }

  // New generic case: {from}-{to} (just two languages, no translate/translator/translation)
  if (
    !s.includes("translate") &&
    !s.endsWith("-translator") &&
    !s.endsWith("-translation") &&
    s.includes("-")
  ) {
    const [from, to] = s.split("-");
    const source = normalizeLanguage(from);
    const target = normalizeLanguage(to);
    if (source && target) return { source, target };
  }

  // New case: translate-from-{from}-to-{to}
  if (s.startsWith("translate-from-") && s.includes("-to-")) {
    const cleaned = s.replace("translate-from-", "");
    const [from, to] = cleaned.split("-to-");
    const source = normalizeLanguage(from);
    const target = normalizeLanguage(to);
    if (source && target) return { source, target };
  }

  // Handle "translate-{from}-into-{to}" slugs
  if (s.startsWith("translate-") && s.includes("-into-")) {
    const cleaned = s.replace(/^translate-/, "");
    const lastIndex = cleaned.lastIndexOf("-into-");
    if (lastIndex > -1) {
      const from = cleaned.substring(0, lastIndex);
      const to = cleaned.substring(lastIndex + 6); // 6 = length of "-into-"
      const source = normalizeLanguage(from);
      const target = normalizeLanguage(to);
      if (source && target) return { source, target };
    }
  }

  // Handle {source}-in-{target} (e.g. japanese-in-vietnamese)
  if (s.includes("-in-")) {
    const [from, to] = s.split("-in-");
    const source = normalizeLanguage(from);
    const target = normalizeLanguage(to);
    if (source && target) {
      return { source, target };
    }
  }

  return null;
};

export const languageAliases = {
  english: ["english", "eng", "en"],
  hindi: ["hindi", "hin", "hi"],
  arabic: ["arabic", "ar"],
  vietnamese: ["vietnamese", "vietnam", "vi"],
  korean: ["korean", "ko"],
  russian: ["russian", "rus", "ru"],
  italian: ["italian", "it"],
  danish: ["danish", "da"],
  norwegian: ["norwegian", "no"],
  chinese: ["chinese", "zh", "ch"],
  thai: ["thai", "th"],
  portuguese: ["portuguese", "pt"],
  malay: ["malay", "ms"],
  french: ["french", "fr"],
  bangla: ["bangla", "bengali", "bn"],
  japanese: ["japanese", "ja"],
  czech: ["czech", "cs"],
  urdu: ["urdu", "ur"],
  spanish: ["spanish", "spa", "es"],
  german: ["german", "de"],
  telugu: ["telugu", "te"],
  polish: ["polish", "pl"],
  tamil: ["tamil", "ta"],
  romanian: ["romanian", "ro"],
  turkish: ["turkish", "tr", "tur", "trk"],
  swedish: ["swedish", "sv"],
  latin: ["latin", "la"],
  gujarati: ["gujarati", "gu"],
  greek: ["greek", "el"],
  dutch: ["dutch", "nl"],
  filipino: ["filipino", "tl"],
  mexican: ["mexican"],
  occitan: ["occitan", "oc"],
  indonesian: ["indonesian", "id"],
  persian: ["persian", "fa"],
};

export const languageCodeMap = {
  english: "en",
  hindi: "hi",
  arabic: "ar",
  vietnamese: "vi",
  korean: "ko",
  russian: "ru",
  rus: "ru",
  italian: "it",
  danish: "da",
  norwegian: "no",
  chinese: "zh-CN",
  thai: "th",
  portuguese: "pt",
  malay: "ms",
  french: "fr",
  bangla: "bn",
  bengali: "bn",
  japanese: "ja",
  czech: "cs",
  urdu: "ur",
  spanish: "es",
  spa: "es",
  german: "de",
  telugu: "te",
  polish: "pl",
  tamil: "ta",
  romanian: "ro",
  turkish: "tr",
  swedish: "sv",
  latin: "la",
  gujarati: "gu",
  greek: "el",
  dutch: "nl",
  filipino: "tl",
  mexican: "es",
  occitan: "oc",
  deep: "sp",
  indonesian: "id",
  persian: "fa",
};

export const normalizeLanguage = (value) => {
  if (!value) return null;
  const v = value.toLowerCase();

  for (const [lang, aliases] of Object.entries(languageAliases)) {
    if (aliases.includes(v) || lang === v) return lang;
  }

  return null;
};
