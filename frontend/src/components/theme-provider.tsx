// src/components/theme-provider.tsx
"use client";

import * as React from "react";
import { applySettings } from "./applySettings"; 
import { DEFAULT_SETTINGS } from "../stores/settings-store";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "theme";

const ThemeProvider = function (props: ThemeProviderProps) {
  const children = props.children;
  const defaultTheme = props.defaultTheme || "system";

  const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as Theme;
        if (saved === "light" || saved === "dark" || saved === "system") {
          return saved;
        }
      } catch (e) {
        // Ignore
      }
      
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    }
    return defaultTheme;
  };

  const [theme, setTheme] = React.useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const applyTheme = React.useCallback((newTheme: Theme) => {
    if (typeof window === "undefined") return;

    try {
      const root = document.documentElement;
      
      let isDark: boolean;
      if (newTheme === "system") {
        isDark = window.matchMedia && 
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? true
          : false;
      } else {
        isDark = newTheme === "dark";
      }

      // Remove all theme classes first
      root.classList.remove("light", "dark");
      
      // Apply new class
      if (isDark) {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
      }
      
      // Apply body theme
      document.body.classList.remove("light", "dark");
      document.body.classList.add(isDark ? "dark" : "light");
      
      // Apply PSC colors using the settings system
      const settings = { ...DEFAULT_SETTINGS };
      settings.theme.mode = newTheme;
      applySettings(settings);

      // Save preference
      localStorage.setItem(STORAGE_KEY, newTheme);

      // Force repaint
      root.offsetHeight;

    } catch (e) {
      console.error("Error applying theme:", e);
    }
  }, []);

  React.useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted, applyTheme]);

  React.useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, mounted, applyTheme]);

  const handleSetTheme = React.useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  const value: ThemeContextValue = { 
    theme: theme, 
    setTheme: handleSetTheme 
  };

  return React.createElement(
    ThemeContext.Provider, 
    { value: value }, 
    children
  );
};

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };