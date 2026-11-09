"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const useDevMode = (): DevModeContextType => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
};

interface DevModeProviderProps {  
  children: ReactNode;
}

export const DevModeProvider = ({ children }: DevModeProviderProps): React.JSX.Element => {
  const [isDevMode, setIsDevMode] = useState<boolean>(false);

  // Load dev mode state from localStorage on mount
  useEffect(() => {
    const savedDevMode = localStorage.getItem("portfolioDevMode");
    if (savedDevMode === "true") {
      setIsDevMode(true);
    }
  }, []);

  // Save dev mode state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("portfolioDevMode", isDevMode.toString());
  }, [isDevMode]);

  const toggleDevMode = () => {
    setIsDevMode((prev) => !prev);
  };

  const value = {
    isDevMode,
    toggleDevMode,
  };

  return (
    <DevModeContext.Provider value={value}>{children}</DevModeContext.Provider>
  );
};
