"use client";

import { createContext, useContext, useSyncExternalStore, ReactNode } from "react";
import { translations, Language } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_EVENT = "language-preference-change";

function getLanguageSnapshot(): Language {
  if (typeof window === "undefined") return "id";
  const saved = localStorage.getItem("language");
  return saved === "id" || saved === "en" ? saved : "id";
}

function subscribeToLanguagePreference(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(LANGUAGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LANGUAGE_EVENT, onChange);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguagePreference,
    getLanguageSnapshot,
    () => "id" as Language
  );

  const setLanguage = (lang: Language) => {
    localStorage.setItem("language", lang);
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage harus dipakai di dalam LanguageProvider");
  }
  return ctx;
}