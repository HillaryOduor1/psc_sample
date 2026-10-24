// src/components/ScrollToTop.tsx
import * as React from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route pathname changes.
 * Also handles hash links (#section) by scrolling to the target element.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    // If there's a hash, try to scroll to that element
    if (hash) {
      // Wait a tick for the target page to render
      const timeoutId = window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      }, 50);
      return () => window.clearTimeout(timeoutId);
    }

    // Otherwise jump to top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Also reset any custom scroll containers if present
    const main = document.getElementById("main-content");
    if (main) main.scrollTop = 0;

    return undefined;
  }, [pathname, hash]);

  return null;
}