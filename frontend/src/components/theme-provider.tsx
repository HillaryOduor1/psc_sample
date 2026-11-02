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

var ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);
var STORAGE_KEY = "theme";

var ThemeProvider = function (props: ThemeProviderProps) {
  var children = props.children;
  var defaultTheme = props.defaultTheme || "system";

  var getInitialTheme = function (): Theme {
    if (typeof window !== "undefined") {
      try {
        var saved = localStorage.getItem(STORAGE_KEY) as Theme;
        if (saved === "light" || saved === "dark" || saved === "system") {
          return saved;
        }
      } catch (e) {
        // Ignore localStorage errors
      }
      
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    }
    return defaultTheme;
  };

  var [theme, setTheme] = React.useState<Theme>(getInitialTheme);
  var [mounted, setMounted] = React.useState(false);

  React.useEffect(function() {
    setMounted(true);
  }, []);

  var applyTheme = React.useCallback(function(newTheme: Theme) {
    if (typeof window === "undefined") return;

    try {
      var root = document.documentElement;
      
      var isDark = false;
      if (newTheme === "system") {
        isDark = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? true : false;
      } else {
        isDark = newTheme === "dark";
      }

      // Clean up old classes
      root.classList.remove("light", "dark");
      
      // Apply new class
      if (isDark) {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
      }
      
      document.body.classList.remove("light", "dark");
      document.body.classList.add(isDark ? "dark" : "light");
      
      // Apply PSC specific colors via settings
      var settings = { ...DEFAULT_SETTINGS };
      settings.theme.mode = newTheme;
      applySettings(settings);

      localStorage.setItem(STORAGE_KEY, newTheme);

      // Trigger a reflow to ensure CSS updates
      root.offsetHeight;

    } catch (e) {
      console.error("Error applying theme:", e);
    }
  }, []);

  React.useEffect(function() {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted, applyTheme]);

  React.useEffect(function() {
    if (!mounted || typeof window === "undefined") return;

    var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    var handleChange = function() {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    // Support older browsers without addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return function() {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, mounted, applyTheme]);

  var handleSetTheme = React.useCallback(function(newTheme: Theme) {
    setTheme(newTheme);
  }, []);

  var value: ThemeContextValue = { 
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
  var context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
