// src/components/RouteProgressBar.tsx
import * as React from "react";
import { useLocation } from "react-router-dom";

var rafPolyfill: (cb: FrameRequestCallback) => number = typeof window !== "undefined" && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : function (cb: FrameRequestCallback) { return window.setTimeout(function () { cb(Date.now()); }, 16) as any; };

var cafPolyfill: (id: number) => void = typeof window !== "undefined" && window.cancelAnimationFrame
  ? window.cancelAnimationFrame.bind(window)
  : function (id: number) { window.clearTimeout(id as any); };

export default function RouteProgressBar() {
  var location = useLocation();
  var [visible, setVisible] = React.useState(false);
  var [progress, setProgress] = React.useState(0);

  var hideTimeoutRef = React.useRef<number | null>(null);
  var advanceTimeoutRef = React.useRef<number | null>(null);
  var rafIdRef = React.useRef<number | null>(null);

  React.useEffect(function () {
    // On every pathname change, kick off a new progress cycle.
    // Clear any pending timers so fast navigation doesn't leave orphans.
    if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    if (advanceTimeoutRef.current) window.clearTimeout(advanceTimeoutRef.current);
    if (rafIdRef.current !== null) cafPolyfill(rafIdRef.current);

    setVisible(true);
    setProgress(8);

    // Advance to ~35% after 60ms (feels immediate — this is the "feedback"
    // the user sees right after clicking).
    var t1 = window.setTimeout(function () {
      setProgress(35);
      // Advance to ~78% after another 200ms (simulates "still loading")
      advanceTimeoutRef.current = window.setTimeout(function () {
        setProgress(78);
      }, 200);
    }, 60);

    // Complete after a short fixed delay. Because we cannot know when the
    // lazy-loaded chunk has actually rendered, we complete "optimistically"
    // — the Suspense fallback is our source of truth for real loading.
    // 500ms is a middle ground: fast enough to feel responsive, slow
    // enough to not look like nothing happened.
    hideTimeoutRef.current = window.setTimeout(function () {
      setProgress(100);
      rafIdRef.current = rafPolyfill(function () {
        // After the 100% transition (300ms) finishes, hide the bar.
        window.setTimeout(function () {
          setVisible(false);
          setProgress(0);
        }, 320);
      });
    }, 500);

    return function () {
      window.clearTimeout(t1);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
      if (advanceTimeoutRef.current) window.clearTimeout(advanceTimeoutRef.current);
      if (rafIdRef.current !== null) cafPolyfill(rafIdRef.current);
    };
  }, [location.pathname, location.search, location.hash]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Page loading"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          height: "100%",
          width: progress + "%",
          backgroundColor: "var(--psc-primary-container, #e68c00)",
          boxShadow: "0 0 8px var(--psc-primary-container, #e68c00)",
          transition: progress >= 100 ? "width 0.2s ease" : "width 0.4s ease",
        }}
      />
    </div>
  );
}