// src/components/RoutePrefetcher.tsx
import * as React from "react";

/*
 * RoutePrefetcher
 *
 * Starts downloading a route's JS chunk BEFORE the user clicks a Link.
 * - On hover (mouseenter) over any <a> whose href starts with "/", prefetches.
 * - On mousedown (touch or mouse), prefetches — fires before click, giving
 *   the download a ~100ms head start.
 * - After mount, prefetches the top 3 routes during idle time.
 *
 * The prefetched chunk goes into the browser's HTTP cache; when the user
 * actually navigates, React.lazy's import() resolves instantly from cache.
 *
 * Works on Chrome 44: uses only addEventListener + requestIdleCallback
 * (with setTimeout fallback). No pointer events, no IntersectionObserver.
 */

type RouteMap = { [path: string]: () => Promise<any> };

interface RoutePrefetcherProps {
  routes: RouteMap;
  idleRoutes?: string[];
}

// Global cache so we only ever call import() once per route.
var loadedRoutes: { [path: string]: boolean } = {};
var inflightRoutes: { [path: string]: Promise<any> | null } = {};

function normalizePath(href: string): string {
  // Strip origin if present, strip query/hash, ensure leading slash
  var p = href;
  try {
    if (p.indexOf("http") === 0) {
      var u = new URL(p);
      p = u.pathname;
    }
  } catch (e) { /* ignore */ }
  var q = p.indexOf("?");
  if (q !== -1) p = p.substring(0, q);
  var h = p.indexOf("#");
  if (h !== -1) p = p.substring(0, h);
  if (p.charAt(0) !== "/") p = "/" + p;
  return p;
}

function prefetchOnce(path: string, routes: RouteMap): void {
  if (loadedRoutes[path]) return;
  if (inflightRoutes[path]) return;

  var loader = routes[path];
  if (!loader) return;

  var p = loader();
  inflightRoutes[path] = p;
  p.then(function () {
    loadedRoutes[path] = true;
    inflightRoutes[path] = null;
  }).catch(function () {
    // Silent — real navigation will surface the error via ErrorBoundary
    inflightRoutes[path] = null;
  });
}

function scheduleIdle(fn: () => void): void {
  if (typeof window === "undefined") return;
  var ric = (window as any).requestIdleCallback;
  if (typeof ric === "function") {
    ric(fn, { timeout: 2500 });
  } else {
    window.setTimeout(fn, 1200);
  }
}

export default function RoutePrefetcher(props: RoutePrefetcherProps) {
  var routes = props.routes;
  var idleRoutes = props.idleRoutes || [];

  React.useEffect(function () {
    function tryFindHref(el: Element | null): string | null {
      var node: Element | null = el;
      while (node) {
        if (node instanceof HTMLAnchorElement) {
          return node.getAttribute("href");
        }
        node = node.parentElement;
      }
      return null;
    }

    function prefetchFor(href: string | null): void {
      if (!href) return;
      if (href.indexOf("http") === 0) return; // external, skip
      if (href.indexOf("mailto:") === 0) return;
      if (href.indexOf("tel:") === 0) return;
      var path = normalizePath(href);
      prefetchOnce(path, routes);
    }

    function handleMouseOver(e: MouseEvent) {
      var href = tryFindHref(e.target as Element);
      prefetchFor(href);
    }

    function handleTouchStart(e: TouchEvent) {
      var t = e.target as Element;
      var href = tryFindHref(t);
      prefetchFor(href);
    }

    function handleMouseDown(e: MouseEvent) {
      var href = tryFindHref(e.target as Element);
      prefetchFor(href);
    }

    function handleFocus(e: FocusEvent) {
      var href = tryFindHref(e.target as Element);
      prefetchFor(href);
    }

    // Capture phase — runs even if Link handlers call stopPropagation
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true } as any);
    document.addEventListener("focusin", handleFocus, true);

    // Idle-prefetch the priority routes
    scheduleIdle(function () {
      for (var i = 0; i < idleRoutes.length; i++) {
        prefetchOnce(idleRoutes[i], routes);
      }
    });

    return function () {
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("touchstart", handleTouchStart, true);
      document.removeEventListener("focusin", handleFocus, true);
    };
  }, [routes, idleRoutes]);

  return null;
}