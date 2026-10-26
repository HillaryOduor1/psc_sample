// src/components/ThemeManager.tsx
import * as React from 'react';
import { useContent } from '../content/useContext';
import { useTheme } from './theme-provider';

interface ThemeConfig {
  light?: Record<string, string>;
  dark?: Record<string, string>;
  typography?: {
    fontFamily?: string;
    headingWeight?: string;
    bodyWeight?: string;
    textScale?: number;
    textAlign?: string;
  };
  spacing?: {
    spacingUnit?: string;
    radius?: string;
    shadowIntensity?: string;
  };
}

export default function ThemeManager(props: { children: React.ReactNode }) {
  var children = props.children;
  var contentData = useContent();
  var content = contentData ? contentData.content : null;
  
  var theme = (content && content.theme) ? (content.theme as ThemeConfig) : {};
  var themeContext = useTheme();
  var currentTheme = themeContext ? themeContext.theme : "light";
  
  var [mounted, setMounted] = React.useState(false);

  React.useEffect(function() {
    setMounted(true);
  }, []);

  React.useEffect(function() {
    if (!mounted || typeof document === "undefined") return;
    
    var root = document.documentElement;
    
    // Remove previously injected dynamic style element
    var existingStyle = document.getElementById('dynamic-dark-theme');
    if (existingStyle) {
      if (existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    }
    
    // Apply light mode variables
    if (theme.light) {
      var lightKeys = Object.keys(theme.light);
      for (var i = 0; i < lightKeys.length; i++) {
        var key = lightKeys[i];
        var val = theme.light[key];
        if (val) root.style.setProperty('--' + key, val);
      }
    }
    
    // Apply dark mode variables by creating a style tag
    if (theme.dark && Object.keys(theme.dark).length > 0) {
      var styleEl = document.createElement('style');
      styleEl.id = 'dynamic-dark-theme';
      
      var darkStyles = '.dark {';
      var darkKeys = Object.keys(theme.dark);
      for (var j = 0; j < darkKeys.length; j++) {
        var dKey = darkKeys[j];
        var dVal = theme.dark[dKey];
        if (dVal) {
          darkStyles += '--' + dKey + ': ' + dVal + ' !important;';
        }
      }
      darkStyles += '}';
      
      styleEl.textContent = darkStyles;
      document.head.appendChild(styleEl);
    }
    
    // Apply typography variables
    if (theme.typography) {
      var typo = theme.typography;
      if (typo.fontFamily) root.style.setProperty('--font-family', typo.fontFamily);
      if (typo.headingWeight) root.style.setProperty('--weight-heading', typo.headingWeight);
      if (typo.bodyWeight) root.style.setProperty('--weight-body', typo.bodyWeight);
      if (typo.textScale !== undefined) root.style.setProperty('--text-scale', typo.textScale.toString());
      if (typo.textAlign) root.style.setProperty('--text-align', typo.textAlign);
    }
    
    // Apply spacing variables
    if (theme.spacing) {
      var spacing = theme.spacing;
      if (spacing.spacingUnit) root.style.setProperty('--spacing-unit', spacing.spacingUnit);
      if (spacing.radius) root.style.setProperty('--radius', spacing.radius);
      if (spacing.shadowIntensity) root.style.setProperty('--shadow-intensity', spacing.shadowIntensity);
    }
    
    // Force visibility of theme toggle button if it somehow got hidden
    var toggleButton = document.querySelector('.theme-toggle-button') as HTMLElement;
    if (toggleButton) {
      toggleButton.style.visibility = 'visible';
      toggleButton.style.opacity = '1';
      toggleButton.style.display = 'inline-flex';
    }
    
  }, [theme, mounted, currentTheme]);

  return React.createElement(React.Fragment, null, children);
}

/*
// src/components/ThemeManager.tsx
import React from 'react';
import { useContent } from '../content/useContext';
import { useTheme } from './theme-provider';

interface ThemeConfig {
  light?: Record<string, string>;
  dark?: Record<string, string>;
  typography?: {
    fontFamily?: string;
    headingWeight?: string;
    bodyWeight?: string;
    textScale?: number;
    textAlign?: string;
  };
  spacing?: {
    spacingUnit?: string;
    radius?: string;
    shadowIntensity?: string;
  };
}

export default function ThemeManager({ children }: { children: React.ReactNode }) {
  const { content } = useContent();
  const theme = (content?.theme as ThemeConfig) || {};
  const { theme: currentTheme } = useTheme();
  
  // Track if component is mounted
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // Only run after mounting to avoid hydration issues
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Clear any existing dynamic theme styles first
    const existingStyle = document.getElementById('dynamic-dark-theme');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Apply light mode variables (these are the base PSC colors)
    if (theme.light) {
      Object.entries(theme.light).forEach(([key, value]) => {
        if (value) root.style.setProperty(`--${key}`, value);
      });
    }
    
    // Apply dark mode variables - using inline style instead of dynamic style tag
    if (theme.dark && Object.keys(theme.dark).length > 0) {
      // Create a style element for dark theme overrides
      const styleEl = document.createElement('style');
      styleEl.id = 'dynamic-dark-theme';
      
      let darkStyles = '.dark {';
      Object.entries(theme.dark).forEach(([key, value]) => {
        if (value) {
          darkStyles += `--${key}: ${value} !important;`;
        }
      });
      darkStyles += '}';
      
      styleEl.textContent = darkStyles;
      document.head.appendChild(styleEl);
    }
    
    // Typography
    if (theme.typography) {
      if (theme.typography.fontFamily) root.style.setProperty('--font-family', theme.typography.fontFamily);
      if (theme.typography.headingWeight) root.style.setProperty('--weight-heading', theme.typography.headingWeight);
      if (theme.typography.bodyWeight) root.style.setProperty('--weight-body', theme.typography.bodyWeight);
      if (theme.typography.textScale !== undefined) root.style.setProperty('--text-scale', theme.typography.textScale.toString());
      if (theme.typography.textAlign) root.style.setProperty('--text-align', theme.typography.textAlign);
    }
    
    // Spacing
    if (theme.spacing) {
      if (theme.spacing.spacingUnit) root.style.setProperty('--spacing-unit', theme.spacing.spacingUnit);
      if (theme.spacing.radius) root.style.setProperty('--radius', theme.spacing.radius);
      if (theme.spacing.shadowIntensity) root.style.setProperty('--shadow-intensity', theme.spacing.shadowIntensity);
    }
    
    // Force visibility of theme toggle after theme changes
    const toggleButton = document.querySelector('.theme-toggle-button') as HTMLElement;
    if (toggleButton) {
      toggleButton.style.visibility = 'visible';
      toggleButton.style.opacity = '1';
      toggleButton.style.display = 'inline-flex';
    }
    
  }, [theme, mounted, currentTheme]);

  return <>{children}</>;
}*/