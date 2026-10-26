// src/components/themeToggle.tsx
import * as React from "react";
import { Sun, Moon } from "./icons";
import { useTheme } from "./theme-provider"; 

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  isScrolled?: boolean;
}

// Trigger haptic feedback on mobile devices safely
var triggerHaptic = function() {
  try {
    if (typeof window !== "undefined" && window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export function ThemeToggle(props: ThemeToggleProps) {
  var isScrolled = props.isScrolled || false;
  
  // Safe context retrieval with fallback for ES5 browsers
  var themeContext = useTheme();
  var theme = (themeContext && themeContext.theme) ? (themeContext.theme as Theme) : "light";
  var setTheme = (themeContext && themeContext.setTheme) ? themeContext.setTheme : function() {};
  
  var [mounted, setMounted] = React.useState(false);
  var [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(function() {
    setMounted(true);
    
    // Check initial theme
    var dark = false;
    if (typeof document !== "undefined") {
      dark = document.documentElement.classList.contains('dark');
    }
    setIsDarkMode(dark);

    // Fallback if MutationObserver is not supported
    if (typeof MutationObserver === "undefined") return;

    // Listen for manual theme class changes
    var observer = new MutationObserver(function() {
      var currentDark = false;
      if (typeof document !== "undefined") {
        currentDark = document.documentElement.classList.contains('dark');
      }
      setIsDarkMode(currentDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return function() {
      observer.disconnect();
    };
  }, []);

  function handleThemeToggle() {
    triggerHaptic();
    
    var newTheme: Theme = theme === "light" ? "dark" : "light";
    
    try {
      // 1. Update context
      setTheme(newTheme);
      
      // 2. Apply to DOM
      var root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      root.setAttribute("data-theme", newTheme);
      
      document.body.classList.remove("light", "dark");
      document.body.classList.add(newTheme);
      
      setIsDarkMode(newTheme === "dark");
      
      // 3. Dispatch event for other components
      try {
        var event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
        document.dispatchEvent(event);
      } catch (_) {}
      
    } catch (e) {
      // Extreme fallback
      document.documentElement.className = newTheme;
    }
  }

  var isDark = theme === "dark" || isDarkMode;

  // Base mobile-friendly styles (minimum 44px touch target)
  var buttonStyle: React.CSSProperties = {
    width: "2.75rem", 
    height: "2.75rem",
    padding: 0,
    borderRadius: "9999px",
    border: "1px solid",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    flexShrink: 0,
    position: "relative",
    zIndex: 50,
    minWidth: "44px",
    minHeight: "44px",
    WebkitTapHighlightColor: "transparent"
  };

  // Adjust colors based on scroll and dark mode state
  if (isScrolled) {
    buttonStyle.borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
    buttonStyle.backgroundColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    buttonStyle.color = isDark ? "#e5e7eb" : "#0f172a";
    buttonStyle.backdropFilter = "none";
    buttonStyle.WebkitBackdropFilter = "none";
  } else {
    buttonStyle.borderColor = "rgba(255,255,255,0.4)";
    buttonStyle.backgroundColor = "rgba(255,255,255,0.1)";
    buttonStyle.color = "#ffffff";
    buttonStyle.backdropFilter = "blur(4px)";
    buttonStyle.WebkitBackdropFilter = "blur(4px)";
  }

  var iconColor = isScrolled ? (isDark ? "#e5e7eb" : "#0f172a") : "#ffffff";

  var iconProps = {
    className: "h-5 w-5",
    style: { 
      width: "20px",
      height: "20px",
      display: "block",
      color: iconColor,
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return React.createElement(
    "button",
    {
      onClick: handleThemeToggle,
      className: "theme-toggle-button",
      style: buttonStyle,
      title: "Switch to " + (isDark ? "light" : "dark") + " mode",
      "aria-label": "Switch to " + (isDark ? "light" : "dark") + " mode",
      onMouseEnter: function(e: React.MouseEvent<HTMLButtonElement>) {
        if (isScrolled) {
          e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
        }
        e.currentTarget.style.transform = "scale(1.05)";
      },
      onMouseLeave: function(e: React.MouseEvent<HTMLButtonElement>) {
        if (isScrolled) {
          e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
        }
        e.currentTarget.style.transform = "scale(1)";
      },
      onMouseDown: function(e: React.MouseEvent<HTMLButtonElement>) {
        e.currentTarget.style.transform = "scale(0.95)";
      },
      onMouseUp: function(e: React.MouseEvent<HTMLButtonElement>) {
        e.currentTarget.style.transform = "scale(1)";
      }
    },
    isDark
      ? React.createElement(Sun, iconProps)
      : React.createElement(Moon, iconProps)
  );
}

/*
// src/components/theme/themeToggle.tsx
import * as React from "react";
import { Sun, Moon } from "./icons";
import { useTheme } from "./theme-provider"; 

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  isScrolled?: boolean;
}

var triggerHaptic = function() {
  try {
    if (window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export function ThemeToggle(props: ThemeToggleProps) {
  var isScrolled = props.isScrolled || false;
  var themeContext = useTheme();
  var theme = themeContext.theme as Theme;
  var setTheme = themeContext.setTheme;
  
  var [mounted, setMounted] = React.useState(false);
  var [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(function() {
    setMounted(true);
    // Check initial dark mode
    var dark = false;
    if (typeof document !== "undefined") {
      dark = document.documentElement.classList.contains('dark');
    }
    setIsDarkMode(dark);

    // Listen for theme changes
    var observer = new MutationObserver(function() {
      var dark = false;
      if (typeof document !== "undefined") {
        dark = document.documentElement.classList.contains('dark');
      }
      setIsDarkMode(dark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return function() {
      observer.disconnect();
    };
  }, []);

  function handleThemeToggle() {
    triggerHaptic();
    var newTheme: Theme = theme === "light" ? "dark" : "light";
    
    try {
      // Update the theme context
      setTheme(newTheme);
      
      // The theme provider will handle the actual DOM updates
      // But we also update directly for immediate feedback
      var root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      root.setAttribute("data-theme", newTheme);
      
      document.body.classList.remove("light", "dark");
      document.body.classList.add(newTheme);
      
      // Update the isDarkMode state
      setIsDarkMode(newTheme === "dark");
      
      // Dispatch event for other components
      try {
        const event = new CustomEvent('themeChanged', { 
          detail: { theme: newTheme } 
        });
        document.dispatchEvent(event);
      } catch (_) {}
      
    } catch (e) {
      // Fallback
      document.documentElement.className = newTheme;
    }
  }

  var isDark = theme === "dark" || isDarkMode;

  // Theme-aware button styles
  var buttonStyle: React.CSSProperties = {
    width: "2.5rem",
    height: "2.5rem",
    padding: 0,
    borderRadius: "9999px",
    border: "1px solid",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    flexShrink: 0,
    position: "relative",
    zIndex: 50,
  };

  // When scrolled: use theme colors
  // When NOT scrolled: transparent with white border
  if (isScrolled) {
    buttonStyle.borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
    buttonStyle.backgroundColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    buttonStyle.color = isDark ? "#e5e7eb" : "#0f172a";
    buttonStyle.backdropFilter = "none";
  } else {
    buttonStyle.borderColor = "rgba(255,255,255,0.4)";
    buttonStyle.backgroundColor = "rgba(255,255,255,0.1)";
    buttonStyle.color = "#ffffff";
    buttonStyle.backdropFilter = "blur(4px)";
    buttonStyle.WebkitBackdropFilter = "blur(4px)";
  }

  var iconColor = isScrolled ? (isDark ? "#e5e7eb" : "#0f172a") : "#ffffff";

  var iconProps = {
    className: "h-5 w-5",
    style: { 
      width: "20px",
      height: "20px",
      display: "block",
      color: iconColor,
    }
  };

  if (!mounted) {
    return null;
  }

  return React.createElement(
    "button",
    {
      onClick: handleThemeToggle,
      className: "theme-toggle-button",
      style: buttonStyle,
      title: "Switch to " + (isDark ? "light" : "dark") + " mode",
      "aria-label": "Switch to " + (isDark ? "light" : "dark") + " mode",
      onMouseEnter: function(e: React.MouseEvent<HTMLButtonElement>) {
        if (isScrolled) {
          e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
        }
        e.currentTarget.style.transform = "scale(1.05)";
      },
      onMouseLeave: function(e: React.MouseEvent<HTMLButtonElement>) {
        if (isScrolled) {
          e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
        }
        e.currentTarget.style.transform = "scale(1)";
      },
      onMouseDown: function(e: React.MouseEvent<HTMLButtonElement>) {
        e.currentTarget.style.transform = "scale(0.95)";
      },
      onMouseUp: function(e: React.MouseEvent<HTMLButtonElement>) {
        e.currentTarget.style.transform = "scale(1)";
      }
    },
    isDark
      ? React.createElement(Sun, iconProps)
      : React.createElement(Moon, iconProps)
  );
}*/