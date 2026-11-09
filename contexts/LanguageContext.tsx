"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../lib/i18n"; // Initialize i18n

interface LanguageContextType {
  currentLanguage: string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({
  children,
}: LanguageProviderProps): React.JSX.Element => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || "de";
  const isRTL = false; // No RTL languages supported

  // Update document direction and font based on language
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Set direction
    html.dir = isRTL ? "rtl" : "ltr";
    html.lang = currentLanguage;

    // Set font family for German.
    body.classList.remove("font-cairo");
    body.classList.add("font-poppins");
  }, [currentLanguage, isRTL]);

  const value = {
    currentLanguage,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
