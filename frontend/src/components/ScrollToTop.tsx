import * as React from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const timeoutId = window.setTimeout(() => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            // User explicitly clicked an anchor — smooth scroll is correct here.
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            window.scrollTo(0, 0);
          }
        } catch (error) {
          window.scrollTo(0, 0);
        }
      }, 50);
      return () => window.clearTimeout(timeoutId);
    }

    /*On a route change, i want INSTANT scroll, not smooth. A smooth scroll to top after clicking a link looks like the new page is bouncing, and the user perceives it as slow. Instant jump feels like the page "teleported" to the top, which is what native multi-page navigation does.
    */
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    const main = document.getElementById("main-content");
    if (main) main.scrollTop = 0;

    return undefined;
  }, [pathname, hash]);

  return null;
}
