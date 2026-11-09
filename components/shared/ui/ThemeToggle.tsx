"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

const ThemeToggle = (): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {/* Theme Label */}
      {/* <div className="hidden items-center gap-1 text-xs text-foreground/60 lg:flex">
        <Sun className="w-3 h-3" />
        <span>Theme</span>
      </div> */}

      {/* Toggle Switch */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
          theme === "light" ? "bg-primary/20" : "bg-foreground/20"
        }`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        <motion.div
          className="flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-lg"
          animate={{
            x: theme === "light" ? 20 : 2
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <motion.div
            animate={{
              scale: theme === "light" ? 1 : 0.8,
              opacity: theme === "light" ? 1 : 0.6
            }}
            transition={{ duration: 0.2 }}
          >
            {theme === "light" ? (
              <Sun className="w-3 h-3 text-primary" />
            ) : (
              <Moon className="w-3 h-3 text-foreground/60" />
            )}
          </motion.div>
        </motion.div>
      </button>

      {/* Status Indicator */}
      <div className="hidden sm:flex items-center gap-1">
        <motion.div
          animate={{
            scale: theme === "light" ? [1, 1.2, 1] : 1
          }}
          transition={{
            duration: 0.6,
            repeat: theme === "light" ? Infinity : 0,
            repeatDelay: 2
          }}
          className={`w-2 h-2 rounded-full ${
            theme === "light" ? "bg-primary" : "bg-foreground/40"
          }`}
        />
        <span
          className={`text-xs ${
            theme === "light" ? "text-primary" : "text-foreground/60"
          }`}
        >
          {theme === "light" ? "LIGHT" : "DARK"}
        </span>
      </div>
    </div>
  );
};

export default ThemeToggle;
