import * as React from "react";

/*
  RoutePrefetcher: Starts downloading a route's JS chunk BEFORE the user clicks a Link.
  On hover (mouseenter) over any <a> whose href starts with "/", prefetches.
  On mousedown (touch or mouse), prefetches — fires before click, giving the download a ~100ms head start.
  After mount, prefetches the top 3 routes during idle time.
  The prefetched chunk goes into the browser's HTTP cache; when the user actually navigates,
  React.lazy's import() resolves instantly from cache.
  Works on Chrome 44: uses only addEventListener + requestIdleCallback (with setTimeout fallback).
  No pointer events, no IntersectionObserver.
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
  var normalizedHref = href;

  try {
    if (normalizedHref.indexOf("http") === 0) {
      var parsedUrl = new URL(normalizedHref);
      normalizedHref = parsedUrl.pathname;
    }
  } catch (error) {
    // ignore malformed URLs
  }

  var queryIndex = normalizedHref.indexOf("?");
  if (queryIndex !== -1) {
    normalizedHref = normalizedHref.substring(0, queryIndex);
  }

  var hashIndex = normalizedHref.indexOf("#");
  if (hashIndex !== -1) {
    normalizedHref = normalizedHref.substring(0, hashIndex);
  }

  if (normalizedHref.charAt(0) !== "/") {
    normalizedHref = "/" + normalizedHref;
  }

  return normalizedHref;
}

function prefetchOnce(path: string, routes: RouteMap): void {
  if (loadedRoutes[path]) return;
  if (inflightRoutes[path]) return;

  var loader = routes[path];
  if (!loader) return;

  var loadPromise = loader();
  inflightRoutes[path] = loadPromise;

  loadPromise
    .then(function () {
      loadedRoutes[path] = true;
      inflightRoutes[path] = null;
    })
    .catch(function () {
      // Silent — real navigation will surface the error via ErrorBoundary
      inflightRoutes[path] = null;
    });
}

function scheduleIdle(fn: () => void): void {
  if (typeof window === "undefined") return;

  var requestIdleCallback = (window as any).requestIdleCallback;
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(fn, { timeout: 2500 });
  } else {
    window.setTimeout(fn, 1200);
  }
}

export default function RoutePrefetcher(props: RoutePrefetcherProps) {
  var routes = props.routes;
  var idleRoutes = props.idleRoutes || [];

  React.useEffect(function () {
    function tryFindHref(element: Element | null): string | null {
      var currentNode: Element | null = element;
      while (currentNode) {
        if (currentNode instanceof HTMLAnchorElement) {
          return currentNode.getAttribute("href");
        }
        currentNode = currentNode.parentElement;
      }
      return null;
    }

    function prefetchFor(href: string | null): void {
      if (!href) return;
      if (href.indexOf("http") === 0) return; // external, skip
      if (href.indexOf("mailto:") === 0) return;
      if (href.indexOf("tel:") === 0) return;

      var normalizedPath = normalizePath(href);
      prefetchOnce(normalizedPath, routes);
    }

    function handleMouseOver(event: MouseEvent) {
      var href = tryFindHref(event.target as Element);
      prefetchFor(href);
    }

    function handleTouchStart(event: TouchEvent) {
      var targetElement = event.target as Element;
      var href = tryFindHref(targetElement);
      prefetchFor(href);
    }

    function handleMouseDown(event: MouseEvent) {
      var href = tryFindHref(event.target as Element);
      prefetchFor(href);
    }

    function handleFocus(event: FocusEvent) {
      var href = tryFindHref(event.target as Element);
      prefetchFor(href);
    }

    // Capture phase — runs even if Link handlers call stopPropagation
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener(
      "touchstart",
      handleTouchStart,
      { capture: true, passive: true } as any
    );
    document.addEventListener("focusin", handleFocus, true);

    // Idle-prefetch the priority routes
    scheduleIdle(function () {
      for (var routeIndex = 0; routeIndex < idleRoutes.length; routeIndex++) {
        prefetchOnce(idleRoutes[routeIndex], routes);
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