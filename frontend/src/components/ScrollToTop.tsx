// src/components/ScrollToTop.tsx
import * as React from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    // If there's a hash, try to scroll to that element
    if (hash) {
      // Wait a tick for the target page to render
      const timeoutId = window.setTimeout(() => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            // Use numeric fallback to prevent the signature error
            window.scrollTo(0, 0);
          }
        } catch (error) {
          window.scrollTo(0, 0);
        }
      }, 50);
      return () => window.clearTimeout(timeoutId);
    }

    // Otherwise jump to top of the page using numeric arguments
    window.scrollTo(0, 0);

    // Also reset any custom scroll containers if present
    const main = document.getElementById("main-content");
    if (main) main.scrollTop = 0;

    return undefined;
  }, [pathname, hash]);

  return null;
}