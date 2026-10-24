// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "psc-primary": "#895100",
        "psc-primary-container": "#e68c00",
        "psc-on-primary": "#ffffff",
        "psc-on-primary-container": "#532f00",
        "psc-surface": "#f9f7f0",
        "psc-surface-container": "#ffffff",
        "psc-surface-container-low": "#f5f3ec",
        "psc-surface-container-high": "#f0ede6",
        "psc-surface-variant": "#eeeeea",
        "psc-on-surface": "#1a1a1a",
        "psc-on-surface-medium": "#3d3d3d",
        "psc-on-surface-variant": "#4a4a4a",
        "psc-on-surface-light": "#6b6b6b",
        "psc-border": "#d0d5dd",
        "psc-border-light": "#e5e8ed",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}