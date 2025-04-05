"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type LanguageContextType = {
  language: "de" | "en"
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"de" | "en">("de")

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage === "en") {
      setLanguage("en")
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === "de" ? "en" : "de"
      // Save to localStorage
      localStorage.setItem("language", newLanguage)
      return newLanguage
    })
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Return a default value instead of throwing an error
    return {
      language: "de" as const,
      toggleLanguage: () => console.warn("LanguageProvider not found"),
    }
  }
  return context
}

