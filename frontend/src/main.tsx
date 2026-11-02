// src/main.tsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "core-js/stable";
import "regenerator-runtime/runtime";

import App from "./App";
import "./index.css";
import { ErrorBoundary } from "./ErrorBoundary";

// Smooth-scroll fallback for ES5 browsers (e.g. older Safari,IE11) where scrollTo() ignores the { behavior: "smooth" } option.
if (
  typeof window !== "undefined" &&
  !("scrollBehavior" in document.documentElement.style)
) {
  const originalScrollTo = window.scrollTo;
  (window as any).scrollTo = (
    x?: ScrollToOptions | number,
    y?: number
  ): void => {
    if (typeof x === "object" && x !== null) {
      // First overload: scrollTo(options)
      originalScrollTo(x);
    } else {
      // Second overload: scrollTo(x, y)
      originalScrollTo(x as number, y as number);
    }
  };
}

// Register service worker
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .catch(function () {});
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", registerServiceWorker);
} else {
  registerServiceWorker();
}

// Mount the app

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
