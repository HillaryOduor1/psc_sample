import * as React from "react";

// TYPES 
export type ThemeMode = "light" | "dark" | "system";
export type FontSize = "small" | "normal" | "large" | "xlarge";
export type ButtonStyle = "rounded" | "pill" | "square" | "filled" | "outline" | "ghost" | "link";
export type UIDensity = "compact" | "comfortable" | "spacious";
export type AnimationLevel = "full" | "reduced" | "none";
export type FontFamily = "system" | "serif" | "monospace" | "custom";

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: "small" | "medium" | "large";
  shadows: boolean;
  animations?: boolean;
}

export interface TypographyConfig {
  fontFamily: FontFamily;
  customFont?: string;
  fontSize: FontSize;
  lineHeight: number;
  letterSpacing: "tight" | "normal" | "wide";
  bodyWeight: "normal" | "medium" | "semibold" | "bold";
  headingWeight: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  headingScale: "compact" | "normal" | "relaxed";
  textAlign: "left" | "center" | "right" | "justify";
}

export interface UIConfig {
  density: UIDensity;
  buttonStyle: ButtonStyle;
  animations: AnimationLevel;
}

export interface DataConfig {
  autoSave: boolean;
  saveInterval: number;
  exportFormat: "json" | "csv";
  backupEnabled: boolean;
}

export interface NotificationConfig {
  enabled: boolean;
  sound: boolean;
  desktopNotifications: boolean;
  frequency: "instant" | "daily" | "weekly";
  emailNotifications: boolean;
  pushNotifications: boolean;
  categories: string[];
}

export interface AccessibilityConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  focusVisible: boolean;
  textScale: number;
  dyslexiaFriendly: boolean;
  largerText?: boolean;
  soundCues?: boolean;
  focusIndicators?: boolean;
  fontSize?: FontSize;
  colorVision?: "default" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";
}

export interface AppSettings {
  version: number;
  theme: ThemeConfig;
  typography: TypographyConfig;
  ui: UIConfig;
  data: DataConfig;
  notifications: NotificationConfig;
  accessibility: AccessibilityConfig;
  lastUpdated: string;
}

// DEFAULTS (UPDATED TO PSC GOLD/ORANGE BRAND)
export const DEFAULT_SETTINGS: AppSettings = {
  version: 1,
  theme: {
    mode: "system",
    primaryColor: "#895100",
    secondaryColor: "#e68c00",
    backgroundColor: "#f9f7f0",
    textColor: "#1a1a1a",
    borderRadius: "medium",
    shadows: true,
    animations: true,
  },
  typography: {
    fontFamily: "system",
    fontSize: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    bodyWeight: "normal",
    headingWeight: "bold",
    headingScale: "normal",
    textAlign: "left",
  },
  ui: {
    density: "comfortable",
    buttonStyle: "filled",
    animations: "full"
  },
  data: {
    autoSave: true,
    saveInterval: 5,
    exportFormat: "json",
    backupEnabled: true
  },
  notifications: {
    enabled: true,
    sound: true,
    desktopNotifications: false,
    frequency: "instant",
    emailNotifications: true,
    pushNotifications: false,
    categories: ["security", "updates"],
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    focusVisible: true,
    textScale: 1.0,
    dyslexiaFriendly: false,
    largerText: false,
    soundCues: false,
    focusIndicators: true,
    fontSize: "normal",
    colorVision: "default",
  },
  lastUpdated: new Date().toISOString()
};

// Apply settings to DOM
export function applySettingsToDOM(appSettings: AppSettings) {
  const root = document.documentElement;

  // 1. Theme Mode
  let isDark = appSettings.theme.mode === "dark";
  if (appSettings.theme.mode === "system") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Set dark/light classes
  if (isDark) {
    root.classList.add("dark");
    root.classList.remove("light");
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = "dark";
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = "light";
  }

  // 2. PSC Gold/Orange Color Variables
  const lightColors = {
    primary: "#895100",
    primaryContainer: "#e68c00",
    onPrimary: "#ffffff",
    onPrimaryContainer: "#532f00",
    surface: "#f9f7f0",
    surfaceContainer: "#ffffff",
    surfaceContainerLow: "#f5f3ec",
    surfaceContainerHigh: "#f0ede6",
    surfaceVariant: "#eeeeea",
    onSurface: "#1a1a1a",
    onSurfaceMedium: "#3d3d3d",
    onSurfaceVariant: "#4a4a4a",
    onSurfaceLight: "#6b6b6b",
    border: "#d0d5dd",
    borderLight: "#e5e8ed",
    error: "#ba1a1a",
    errorContainer: "#ffdad6",
    onError: "#ffffff",
    onErrorContainer: "#410002",
    success: "#1e7b3a",
    successContainer: "#a7f0ba",
    onSuccess: "#ffffff",
    onSuccessContainer: "#00210a",
    warning: "#9b6b00",
    warningContainer: "#ffdf9e",
    onWarning: "#ffffff",
    onWarningContainer: "#301f00",
    info: "#005b9e",
    infoContainer: "#cbe6ff",
    onInfo: "#ffffff",
    onInfoContainer: "#001b36",
    secondary: "#4a4a4a",
    tertiary: "#6b6b6b",
    hoverOverlay: "rgba(0, 0, 0, 0.04)",
    activeOverlay: "rgba(0, 0, 0, 0.08)",
    focusRing: "rgba(230, 140, 0, 0.4)",
    shadowSm: "0 1px 3px rgba(0, 0, 0, 0.06)",
    shadowMd: "0 4px 20px rgba(0, 0, 0, 0.08)",
    shadowLg: "0 8px 40px rgba(0, 0, 0, 0.10)",
  };

  const darkColors = {
    primary: "#f29a00",
    primaryContainer: "#ffb23e",
    onPrimary: "#211300",
    onPrimaryContainer: "#2d1800",
    surface: "#121212",
    surfaceContainer: "#1b1b1b",
    surfaceContainerLow: "#161616",
    surfaceContainerHigh: "#202020",
    surfaceVariant: "#242424",
    onSurface: "#f5f5f5",
    onSurfaceMedium: "#d6d6d6",
    onSurfaceVariant: "#c8c8c8",
    onSurfaceLight: "#969696",
    border: "#383838",
    borderLight: "#2a2a2a",
    error: "#ffb4ab",
    errorContainer: "#93000a",
    onError: "#690005",
    onErrorContainer: "#ffdad6",
    success: "#7ddb9b",
    successContainer: "#00601f",
    onSuccess: "#00380f",
    onSuccessContainer: "#a7f0ba",
    warning: "#ffbe4d",
    warningContainer: "#6b4a00",
    onWarning: "#3d2900",
    onWarningContainer: "#ffdf9e",
    info: "#85c8ff",
    infoContainer: "#00427a",
    onInfo: "#00254a",
    onInfoContainer: "#cbe6ff",
    secondary: "#b5b5b5",
    tertiary: "#969696",
    hoverOverlay: "rgba(255, 255, 255, 0.06)",
    activeOverlay: "rgba(255, 255, 255, 0.12)",
    focusRing: "rgba(242, 154, 0, 0.5)",
    shadowSm: "0 1px 3px rgba(0, 0, 0, 0.3)",
    shadowMd: "0 4px 24px rgba(0, 0, 0, 0.45)",
    shadowLg: "0 8px 48px rgba(0, 0, 0, 0.5)",
  };

  const colors = isDark ? darkColors : lightColors;

  // Set CSS variables
  root.style.setProperty("--psc-primary", colors.primary);
  root.style.setProperty("--psc-primary-container", colors.primaryContainer);
  root.style.setProperty("--psc-on-primary", colors.onPrimary);
  root.style.setProperty("--psc-on-primary-container", colors.onPrimaryContainer);
  root.style.setProperty("--psc-surface", colors.surface);
  root.style.setProperty("--psc-surface-container", colors.surfaceContainer);
  root.style.setProperty("--psc-surface-container-low", colors.surfaceContainerLow);
  root.style.setProperty("--psc-surface-container-high", colors.surfaceContainerHigh);
  root.style.setProperty("--psc-surface-variant", colors.surfaceVariant);
  root.style.setProperty("--psc-on-surface", colors.onSurface);
  root.style.setProperty("--psc-on-surface-medium", colors.onSurfaceMedium);
  root.style.setProperty("--psc-on-surface-variant", colors.onSurfaceVariant);
  root.style.setProperty("--psc-on-surface-light", colors.onSurfaceLight);
  root.style.setProperty("--psc-border", colors.border);
  root.style.setProperty("--psc-border-light", colors.borderLight);
  root.style.setProperty("--psc-error", colors.error);
  root.style.setProperty("--psc-error-container", colors.errorContainer);
  root.style.setProperty("--psc-on-error", colors.onError);
  root.style.setProperty("--psc-on-error-container", colors.onErrorContainer);
  root.style.setProperty("--psc-success", colors.success);
  root.style.setProperty("--psc-success-container", colors.successContainer);
  root.style.setProperty("--psc-on-success", colors.onSuccess);
  root.style.setProperty("--psc-on-success-container", colors.onSuccessContainer);
  root.style.setProperty("--psc-warning", colors.warning);
  root.style.setProperty("--psc-warning-container", colors.warningContainer);
  root.style.setProperty("--psc-on-warning", colors.onWarning);
  root.style.setProperty("--psc-on-warning-container", colors.onWarningContainer);
  root.style.setProperty("--psc-info", colors.info);
  root.style.setProperty("--psc-info-container", colors.infoContainer);
  root.style.setProperty("--psc-on-info", colors.onInfo);
  root.style.setProperty("--psc-on-info-container", colors.onInfoContainer);
  root.style.setProperty("--psc-secondary", colors.secondary);
  root.style.setProperty("--psc-tertiary", colors.tertiary);
  root.style.setProperty("--psc-hover-overlay", colors.hoverOverlay);
  root.style.setProperty("--psc-active-overlay", colors.activeOverlay);
  root.style.setProperty("--psc-focus-ring", colors.focusRing);
  root.style.setProperty("--psc-shadow-sm", colors.shadowSm);
  root.style.setProperty("--psc-shadow-md", colors.shadowMd);
  root.style.setProperty("--psc-shadow-lg", colors.shadowLg);

  // Set background and text colors
  root.style.backgroundColor = colors.surface;
  root.style.color = colors.onSurface;
  document.body.style.backgroundColor = colors.surface;
  document.body.style.color = colors.onSurface;

  // Legacy/Compatibility variables
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-container", colors.primaryContainer);
  root.style.setProperty("--accent", colors.primaryContainer);
  root.style.setProperty("--bg", colors.surface);
  root.style.setProperty("--text", colors.onSurface);
  root.style.setProperty("--surface", colors.surfaceContainer);
  root.style.setProperty("--border", colors.border);
  root.style.setProperty("--primary-color", colors.primary);
  root.style.setProperty("--secondary-color", colors.primaryContainer);

  // Dispatch event for other components
  try {
    const themeEvent = new CustomEvent('themeChanged', { 
      detail: { theme: isDark ? 'dark' : 'light' } 
    });
    document.dispatchEvent(themeEvent);
  } catch (e) {
    // Silently fail
  }
}

// STORAGE MANAGER 
const getApiUrl = () => {
  if (import.meta.env.PROD) {
    const baseUrl = import.meta.env.VITE_API_URL;
    return `${baseUrl}/api/v1/settings`;
  }
  return '/api/settings';
};

const API_URL = getApiUrl();

class StorageManager {
  private memoryCache: AppSettings | null = null;

  private getLocalStorage(): Storage | null {
    try {
      if (typeof window === "undefined") return null;
      if (!window.localStorage) return null;
      return localStorage;
    } catch (e) {
      return null;
    }
  }

  async save(settings: AppSettings): Promise<boolean> {
    try {
      this.memoryCache = {
        ...settings,
        lastUpdated: new Date().toISOString()
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.memoryCache),
        });
        if (!response.ok) throw new Error('Backend save failed');
      } catch (e) {
        console.warn("Backend save failed, falling back to localStorage", e);
      }

      const ls = this.getLocalStorage();
      if (ls) {
        ls.setItem("app-settings", JSON.stringify(this.memoryCache));
      }

      return true;
    } catch (error) {
      console.error("Failed to save settings:", error);
      return false;
    }
  }

  async load(): Promise<AppSettings> {
    if (this.memoryCache) return this.memoryCache;

    try {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const loadedSettings = await response.json();
          if (this.validateSettings(loadedSettings)) {
            const migrated = this.migrateSettings(loadedSettings);
            this.memoryCache = migrated;
            return migrated;
          }
        }
      } catch (e) {
        console.warn("Backend load failed, falling back to local storage", e);
      }

      const ls = this.getLocalStorage();
      if (ls) {
        const saved = ls.getItem("app-settings");
        if (saved) {
          const loadedSettings = JSON.parse(saved);
          if (this.validateSettings(loadedSettings)) {
            const migrated = this.migrateSettings(loadedSettings);
            this.memoryCache = migrated;
            return migrated;
          }
        }
      }

      this.memoryCache = DEFAULT_SETTINGS;
      return DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Failed to load settings:", error);
      return DEFAULT_SETTINGS;
    }
  }

  private validateSettings(settings: any): settings is AppSettings {
    return (
      settings &&
      typeof settings === "object" &&
      typeof settings.version === "number" &&
      settings.theme &&
      settings.typography &&
      settings.ui &&
      settings.data &&
      settings.notifications &&
      settings.accessibility
    );
  }

  private migrateSettings(settings: any): AppSettings {
    const currentVersion = 1;

    if (!settings.version || settings.version < currentVersion) {
      const migrated = {
        ...DEFAULT_SETTINGS,
        ...settings,
        version: currentVersion,
        lastUpdated: new Date().toISOString()
      };

      return {
        ...migrated,
        theme: {
          ...DEFAULT_SETTINGS.theme,
          ...migrated.theme,
          animations: migrated.theme.animations ?? DEFAULT_SETTINGS.theme.animations
        },
        typography: {
          ...DEFAULT_SETTINGS.typography,
          ...migrated.typography,
          bodyWeight: migrated.typography.bodyWeight ?? DEFAULT_SETTINGS.typography.bodyWeight,
          headingWeight: migrated.typography.headingWeight ?? DEFAULT_SETTINGS.typography.headingWeight,
          headingScale: migrated.typography.headingScale ?? DEFAULT_SETTINGS.typography.headingScale,
          textAlign: migrated.typography.textAlign ?? DEFAULT_SETTINGS.typography.textAlign
        },
        notifications: {
          ...DEFAULT_SETTINGS.notifications,
          ...migrated.notifications,
          emailNotifications: migrated.notifications.emailNotifications ?? DEFAULT_SETTINGS.notifications.emailNotifications,
          pushNotifications: migrated.notifications.pushNotifications ?? DEFAULT_SETTINGS.notifications.pushNotifications
        },
        accessibility: {
          ...DEFAULT_SETTINGS.accessibility,
          ...migrated.accessibility,
          largerText: migrated.accessibility.largerText ?? DEFAULT_SETTINGS.accessibility.largerText,
          soundCues: migrated.accessibility.soundCues ?? DEFAULT_SETTINGS.accessibility.soundCues,
          focusIndicators: migrated.accessibility.focusIndicators ?? DEFAULT_SETTINGS.accessibility.focusIndicators,
          fontSize: migrated.accessibility.fontSize ?? DEFAULT_SETTINGS.accessibility.fontSize,
          colorVision: migrated.accessibility.colorVision ?? DEFAULT_SETTINGS.accessibility.colorVision
        }
      };
    }

    return settings;
  }

  export(settings: AppSettings): string {
    const exportData = {
      ...settings,
      exportDate: new Date().toISOString(),
      app: "PSC Kenya App",
      formatVersion: "1.0"
    };
    return JSON.stringify(exportData, null, 2);
  }

  import(jsonString: string): { success: boolean; settings?: AppSettings; error?: string } {
    try {
      const imported = JSON.parse(jsonString);

      if (!imported.theme || !imported.typography) {
        return { success: false, error: "Invalid settings format" };
      }

      const settings: AppSettings = this.migrateSettings({
        ...DEFAULT_SETTINGS,
        ...imported,
        version: imported.version || 1,
        lastUpdated: new Date().toISOString()
      });

      this.memoryCache = settings;
      return { success: true, settings };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Invalid JSON"
      };
    }
  }

  reset(): AppSettings {
    this.memoryCache = DEFAULT_SETTINGS;
    return DEFAULT_SETTINGS;
  }
}

// REACT CONTEXT
interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  updateSetting: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportSettings: () => string;
  importSettings: (jsonString: string) => Promise<{ success: boolean; error?: string }>;
  isSaving: boolean;
  previewSettings: AppSettings | null;
  setPreviewSettings: (settings: AppSettings | null) => void;
  applyPreview: () => Promise<void>;
  discardPreview: () => void;
}

const SettingsContext = React.createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = React.useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = React.useState(false);
  const [previewSettings, setPreviewSettings] = React.useState<AppSettings | null>(null);

  const storageManager = React.useRef(new StorageManager());

  React.useEffect(() => {
    const loadSettings = async () => {
      const loaded = await storageManager.current.load();
      setSettings(loaded);
      applySettingsToDOM(loaded);
    };

    loadSettings();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "app-settings" && event.newValue) {
        try {
          const newSettings = JSON.parse(event.newValue);
          setSettings(newSettings);
          applySettingsToDOM(newSettings);
        } catch (e) {
          console.error("Failed to parse settings from storage event:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  React.useEffect(() => {
    applySettingsToDOM(previewSettings || settings);
  }, [settings, previewSettings]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentSettings = previewSettings || settings;
      if (currentSettings.theme.mode === "system") {
        applySettingsToDOM(currentSettings);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [settings, previewSettings]);

  const updateSettings = async (updates: Partial<AppSettings>) => {
    setIsSaving(true);
    try {
      const newSettings = {
        ...settings,
        ...updates,
        lastUpdated: new Date().toISOString()
      };

      setSettings(newSettings);
      await storageManager.current.save(newSettings);
      applySettingsToDOM(newSettings);
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = async <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    await updateSettings({ [key]: value });
  };

  const resetToDefaults = async () => {
    const defaults = storageManager.current.reset();
    setSettings(defaults);
    await storageManager.current.save(defaults);
    applySettingsToDOM(defaults);
  };

  const exportSettings = () => storageManager.current.export(settings);

  const importSettings = async (jsonString: string) => {
    const result = storageManager.current.import(jsonString);
    if (result.success && result.settings) {
      setSettings(result.settings);
      await storageManager.current.save(result.settings);
      applySettingsToDOM(result.settings);
    }
    return result;
  };

  const applyPreview = async () => {
    if (previewSettings) {
      await updateSettings(previewSettings);
      setPreviewSettings(null);
    }
  };

  const discardPreview = () => {
    setPreviewSettings(null);
  };

  const value: SettingsContextValue = {
    settings,
    updateSettings,
    updateSetting,
    resetToDefaults,
    exportSettings,
    importSettings,
    isSaving,
    previewSettings,
    setPreviewSettings,
    applyPreview,
    discardPreview
  };

  return React.createElement(
    SettingsContext.Provider,
    { value },
    children
  );
};

export const useSettings = function () {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

// HELPER FUNCTIONS 
function getFontFamily(typography: TypographyConfig): string {
  switch (typography.fontFamily) {
    case "system":
      return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    case "serif":
      return "Georgia, 'Times New Roman', serif";
    case "monospace":
      return "Menlo, Monaco, 'Courier New', monospace";
    case "custom":
      return typography.customFont || "inherit";
    default:
      return "inherit";
  }
}

function getFontSize(size: FontSize): string {
  switch (size) {
    case "small": return "0.875rem";
    case "normal": return "1rem";
    case "large": return "1.125rem";
    case "xlarge": return "1.25rem";
    default: return "1rem";
  }
}

function getFontWeight(weight: string): string {
  switch (weight) {
    case "normal": return "400";
    case "medium": return "500";
    case "semibold": return "600";
    case "bold": return "700";
    case "extrabold": return "800";
    default: return "400";
  }
}

function getSpacing(density: UIDensity): string {
  switch (density) {
    case "compact": return "0.25rem";
    case "comfortable": return "0.5rem";
    case "spacious": return "1rem";
    default: return "0.5rem";
  }
}

export function getColorVisionFilter(colorVision?: string): string {
  switch (colorVision) {
    case "protanopia":
      return "url('#protanopia-filter')";
    case "deuteranopia":
      return "url('#deuteranopia-filter')";
    case "tritanopia":
      return "url('#tritanopia-filter')";
    case "achromatopsia":
      return "grayscale(100%)";
    default:
      return "none";
  }
}