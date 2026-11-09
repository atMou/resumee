"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): React.JSX.Element => {
  const [theme, setTheme] = useState<Theme>("dark");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolioTheme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)")
        .matches
        ? "light"
        : "dark";
      setTheme(systemTheme);
    }
  }, []);

  // Save theme to localStorage and apply to document whenever it changes
  useEffect(() => {
    localStorage.setItem("portfolioTheme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
