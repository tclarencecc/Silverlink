import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGES = [
  { code: "en", label: "English", hint: "English" },
  { code: "zh", label: "中文", hint: "Chinese" },
  { code: "ms", label: "Melayu", hint: "Malay" },
  { code: "ta", label: "தமிழ்", hint: "Tamil" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "nearby.language";

type LanguageContextValue = {
  language: LanguageCode | null;
  /** True once the saved choice has been read from this device. */
  ready: boolean;
  languageLabel: string;
  setLanguage: (code: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && LANGUAGES.some((item) => item.code === value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguageCode(saved)) setLanguageState(saved);
    } catch {
      // Storage may be blocked (private mode); fall back to no choice.
    }
    setReady(true);
  }, []);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Keep the in-memory choice even if saving fails.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const match = LANGUAGES.find((item) => item.code === language);
    return {
      language,
      ready,
      languageLabel: match?.hint ?? "",
      setLanguage,
    };
  }, [language, ready, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
