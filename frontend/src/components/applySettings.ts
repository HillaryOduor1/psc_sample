// applySettings.ts
import type { AppSettings } from "../stores/settings-store";

export function applySettings(settings: AppSettings) {
  const root = document.documentElement;

  // THEME MODE
  let isDark = settings.theme.mode === "dark";
  if (settings.theme.mode === "system") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Remove both classes and add the correct one
  root.classList.remove("light", "dark");
  if (isDark) {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  }

  // Apply PSC Gold/Orange colors based on mode
  if (isDark) {
    // DARK MODE COLORS
    root.style.setProperty("--psc-primary", "#f29a00");
    root.style.setProperty("--psc-primary-container", "#ffb23e");
    root.style.setProperty("--psc-on-primary", "#211300");
    root.style.setProperty("--psc-on-primary-container", "#2d1800");
    root.style.setProperty("--psc-surface", "#121212");
    root.style.setProperty("--psc-surface-container", "#1b1b1b");
    root.style.setProperty("--psc-surface-container-low", "#161616");
    root.style.setProperty("--psc-surface-container-high", "#202020");
    root.style.setProperty("--psc-surface-variant", "#242424");
    root.style.setProperty("--psc-on-surface", "#f5f5f5");
    root.style.setProperty("--psc-on-surface-medium", "#d6d6d6");
    root.style.setProperty("--psc-on-surface-variant", "#c8c8c8");
    root.style.setProperty("--psc-on-surface-light", "#969696");
    root.style.setProperty("--psc-border", "#383838");
    root.style.setProperty("--psc-border-light", "#2a2a2a");
    root.style.setProperty("--psc-shadow-sm", "0 1px 3px rgba(0, 0, 0, 0.3)");
    root.style.setProperty("--psc-shadow-md", "0 4px 24px rgba(0, 0, 0, 0.45)");
    root.style.setProperty("--psc-shadow-lg", "0 8px 48px rgba(0, 0, 0, 0.5)");
    root.style.setProperty("--psc-hover-overlay", "rgba(255, 255, 255, 0.06)");
    root.style.setProperty("--psc-active-overlay", "rgba(255, 255, 255, 0.12)");
    root.style.setProperty("--psc-focus-ring", "rgba(242, 154, 0, 0.5)");
    root.style.backgroundColor = "#121212";
    root.style.color = "#f5f5f5";
  } else {
    // LIGHT MODE COLORS (PSC Gold/Orange)
    root.style.setProperty("--psc-primary", "#895100");
    root.style.setProperty("--psc-primary-container", "#e68c00");
    root.style.setProperty("--psc-on-primary", "#ffffff");
    root.style.setProperty("--psc-on-primary-container", "#532f00");
    root.style.setProperty("--psc-surface", "#f9f7f0");
    root.style.setProperty("--psc-surface-container", "#ffffff");
    root.style.setProperty("--psc-surface-container-low", "#f5f3ec");
    root.style.setProperty("--psc-surface-container-high", "#f0ede6");
    root.style.setProperty("--psc-surface-variant", "#eeeeea");
    root.style.setProperty("--psc-on-surface", "#1a1a1a");
    root.style.setProperty("--psc-on-surface-medium", "#3d3d3d");
    root.style.setProperty("--psc-on-surface-variant", "#4a4a4a");
    root.style.setProperty("--psc-on-surface-light", "#6b6b6b");
    root.style.setProperty("--psc-border", "#d0d5dd");
    root.style.setProperty("--psc-border-light", "#e5e8ed");
    root.style.setProperty("--psc-shadow-sm", "0 1px 3px rgba(0, 0, 0, 0.06)");
    root.style.setProperty("--psc-shadow-md", "0 4px 20px rgba(0, 0, 0, 0.08)");
    root.style.setProperty("--psc-shadow-lg", "0 8px 40px rgba(0, 0, 0, 0.10)");
    root.style.setProperty("--psc-hover-overlay", "rgba(0, 0, 0, 0.04)");
    root.style.setProperty("--psc-active-overlay", "rgba(0, 0, 0, 0.08)");
    root.style.setProperty("--psc-focus-ring", "rgba(230, 140, 0, 0.4)");
    root.style.backgroundColor = "#f9f7f0";
    root.style.color = "#1a1a1a";
  }

  // Apply body styles
  document.body.style.backgroundColor = isDark ? "#121212" : "#f9f7f0";
  document.body.style.color = isDark ? "#f5f5f5" : "#1a1a1a";

  // LEGACY COLOR VARIABLES (for backwards compatibility)
  root.style.setProperty("--primary-color", isDark ? "#f29a00" : "#895100");
  root.style.setProperty("--secondary-color", isDark ? "#ffb23e" : "#e68c00");
  root.style.setProperty("--background-color", isDark ? "#121212" : "#f9f7f0");
  root.style.setProperty("--text-color", isDark ? "#f5f5f5" : "#1a1a1a");

  // ACCESSIBILITY
  root.classList.toggle("high-contrast", settings.accessibility.highContrast);
  root.classList.toggle("reduced-motion", settings.accessibility.reducedMotion);

  // Text scale
  root.style.fontSize = `${settings.accessibility.textScale * 100}%`;

  // Color vision
  root.dataset.colorVision = settings.accessibility.colorVision || "default";

  // Dispatch event for other components
  try {
    const event = new CustomEvent('themeChanged', { 
      detail: { theme: isDark ? 'dark' : 'light' } 
    });
    document.dispatchEvent(event);
  } catch (_) {
    // Silently fail
  }
}