// src/components/Sidebar/Sidebar.tsx
import * as React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import SidebarFooter from "./SidebarFooter";
import { navlinks } from "../../data/navlinks";
import { useContent } from "../../content/useContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavLink {
  name: string;
  href: string;
  icon?: string;
  children?: NavLink[];
  external?: boolean;
}

var triggerHaptic = function () {
  try {
    if (window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

function getIconComponent(iconName?: string): React.ReactNode {
  var common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (iconName) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-7H9v7H5a2 2 0 0 1-2-2z" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case "work":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "newspaper":
      return (
        <svg {...common}>
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        </svg>
      );
    case "description":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 7L2 7" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function Sidebar(props: SidebarProps) {
  var isOpen = props.isOpen;
  var toggleSidebar = props.toggleSidebar;
  var sidebarRef = React.useRef<HTMLDivElement | null>(null);
  var { content } = useContent();

  var navItems: NavLink[] =
    content && content.navigation
      ? (content.navigation as NavLink[])
      : (navlinks as NavLink[]);

  var [openDropdowns, setOpenDropdowns] = React.useState<{
    [key: string]: boolean;
  }>({});
  var [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(function () {
    var dark = false;
    if (typeof document !== "undefined")
      dark = document.documentElement.classList.contains("dark");
    setIsDarkMode(dark);
    if (typeof MutationObserver === "undefined") return;
    var observer = new MutationObserver(function () {
      var d = false;
      if (typeof document !== "undefined")
        d = document.documentElement.classList.contains("dark");
      setIsDarkMode(d);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return function () {
      observer.disconnect();
    };
  }, []);

  function toggleDropdown(name: string) {
    setOpenDropdowns(function (prev) {
      var next: { [key: string]: boolean } = {};
      Object.keys(prev).forEach(function (k) {
        next[k] = false;
      });
      next[name] = !prev[name];
      return next;
    });
  }

  function handleClose() {
    triggerHaptic();
    setOpenDropdowns({});
    toggleSidebar();
  }

  React.useEffect(function () {
    if (isOpen) {
      var scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollY + "px";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      var sY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, sY);
      delete document.body.dataset.scrollY;
    }
  }, [isOpen]);

  React.useEffect(function () {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setOpenDropdowns({});
        toggleSidebar();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleSidebar]);

  var sidebarBg = isDarkMode ? "#111827" : "#ffffff";
  var sidebarBorder = isDarkMode
    ? "rgba(255,255,255,0.10)"
    : "rgba(0,0,0,0.08)";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={
          "fixed top-0 left-0 h-full z-[101] flex w-[300px] flex-col transition-transform duration-300 ease-in-out md:hidden"
        }
        style={{
          backgroundColor: sidebarBg,
          borderRight: "1px solid " + sidebarBorder,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: "1px solid " + sidebarBorder }}
        >
          <Link
            to="/"
            onClick={handleClose}
            className="flex items-center gap-3"
          >
            <img
              src="/assets/psc-logo-1.png"
              alt="PSC Logo"
              className="h-9 w-auto"
            />
            <span
              className="text-sm font-bold"
              style={{ color: isDarkMode ? "#ffffff" : "#0f172a" }}
            >
              PSC
            </span>
          </Link>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Close sidebar"
            style={{ color: isDarkMode ? "#ffffff" : "#0f172a" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navItems.map(function (link, idx) {
              var hasChildren =
                !!link.children && link.children.length > 0;
              if (hasChildren) {
                return (
                  <SidebarDropdown
                    key={idx}
                    name={link.name.toLowerCase().replace(/\s/g, "-")}
                    label={link.name}
                    icon={getIconComponent(link.icon)}
                    items={link.children!.map(function (c) {
                      return {
                        name: c.name,
                        href: c.href,
                        external: c.external,
                      };
                    })}
                    isOpen={!!openDropdowns[link.name]}
                    onToggle={function () {
                      toggleDropdown(link.name);
                    }}
                    onItemClick={handleClose}
                  />
                );
              }
              return (
                <SidebarItem
                  key={idx}
                  icon={getIconComponent(link.icon)}
                  label={link.name}
                  href={link.href}
                  external={link.external}
                  onClick={handleClose}
                />
              );
            })}
          </div>
        </nav>

        <div className="px-4 pb-6">
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}

/*
// src/components/Sidebar/Sidebar.tsx
import * as React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";
import { navlinks } from "../../data/navlinks";
import { useContent } from "../../content/useContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  userRole?: string;
}

var triggerHaptic = function() {
  try {
    if (window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export default function Sidebar(props: SidebarProps) {
  var isOpen = props.isOpen;
  var toggleSidebar = props.toggleSidebar;
  var sidebarRef = React.useRef<HTMLDivElement | null>(null);
  var { content, isLoading } = useContent();
  var mobileNavlinks = (content && content.navigation) ? (content.navigation) : navlinks;

  // Check for dark mode (ES5 safe) - use a state to track theme
  var [isDarkMode, setIsDarkMode] = React.useState(false);
  var [isMounted, setIsMounted] = React.useState(false);

  // Detect dark mode on mount and when it changes
  React.useEffect(function() {
    setIsMounted(true);
    
    // Check initial dark mode
    var dark = false;
    if (typeof document !== "undefined") {
      dark = document.documentElement.classList.contains('dark');
    }
    setIsDarkMode(dark);

    // Listen for theme changes
    var observer = new MutationObserver(function() {
      var dark = false;
      if (typeof document !== "undefined") {
        dark = document.documentElement.classList.contains('dark');
      }
      setIsDarkMode(dark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return function() {
      observer.disconnect();
    };
  }, []);

  // Theme-aware background colors
  var sidebarBgColor = isDarkMode ? '#0D2418' : '#F6F8F7';
  var sidebarTextColor = isDarkMode ? '#F6F8F7' : '#0d1b14';
  var sidebarBorderColor = isDarkMode ? '#2B4A3C' : '#D9DDD8';

  // Close on outside click
  React.useEffect(function() {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  // Close on Escape key
  React.useEffect(function() {
    function handleKeyDown(event: KeyboardEvent) {
      if (isOpen && event.key === 'Escape') {
        toggleSidebar();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return function() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleSidebar]);

  // Prevent body scroll
  React.useEffect(function() {
    if (isOpen) {
      var scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollY + 'px';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      var scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
      delete document.body.dataset.scrollY;
    }
  }, [isOpen]);

  // Swipe left to close (on touch devices)
  React.useEffect(function() {
    var touchStartX = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartX = e.changedTouches[0].clientX;
    }
    function onTouchMove(e: TouchEvent) {
      if (!isOpen) return;
      var deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX < -50) {
        toggleSidebar();
      }
    }
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    return function() {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isOpen, toggleSidebar]);

  // Haptic feedback on open (ES5 safe)
  function handleToggle() {
    triggerHaptic();
    toggleSidebar();
  }

  // Determine overlay and sidebar classes
  var overlayClasses = "fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 md:hidden " + 
    (isOpen ? "opacity-100" : "opacity-0 pointer-events-none");

  var sidebarClasses = "fixed top-0 h-full w-[280px] z-[101] flex flex-col p-6 transition-transform duration-300 ease-in-out border-r shadow-xl md:hidden sidebar-solid-fallback " + 
    (isOpen ? "translate-x-0" : "-translate-x-full");

  // Show loading state if content is loading or not mounted
  if (!isMounted || isLoading) {
    return (
      <React.Fragment>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[100] md:hidden"
            onClick={handleToggle}
            aria-hidden="true"
          />
        )}
        <aside
          className={sidebarClasses}
          style={{ 
            height: '100dvh',
            backgroundColor: sidebarBgColor,
            color: sidebarTextColor,
            borderColor: sidebarBorderColor
          }}
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <span className="font-bold text-xl" style={{ color: sidebarTextColor }}>LIS</span>
            </div>
          </div>
          <div className="flex-grow flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map(function(i) {
              return (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              );
            })}
          </div>
          <SidebarFooter />
        </aside>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {/* Overlay /}
      <div
        className={overlayClasses}
        onClick={handleToggle}
        aria-hidden="true"
      />
      {/* Sidebar Panel /}
      <aside
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={sidebarClasses}
        style={{ 
          height: '100dvh',
          backgroundColor: sidebarBgColor,
          color: sidebarTextColor,
          borderColor: sidebarBorderColor
        }}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/10">
          <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded" onClick={handleToggle}>
            <div className="size-8">
              <img 
                src="/assets/footer-logo-light.png" 
                alt="LIS Logo"
                className="w-full h-full object-contain block dark:hidden"
              />
              <img 
                src="/assets/footer-logo-dark.png" 
                alt="LIS Logo"
                className="w-full h-full object-contain hidden dark:block"
              />
            </div>
            <span className="font-bold text-xl" style={{ color: sidebarTextColor }}>LIS</span>
          </Link>
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg bg-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close sidebar"
            style={{ color: sidebarTextColor }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="flex-grow flex flex-col gap-1" aria-label="Mobile navigation">
           {mobileNavlinks.map(function(link, idx) {
              return (
                <SidebarItem
                  key={idx}
                  icon={<span className="material-symbols-outlined text-xl">{link.icon}</span>}
                  label={link.name}
                  href={link.href}
                  onClick={function() { handleToggle(); }}
                />
              );
            })}
          <div className="mt-4 pt-4 border-t border-primary/10">
            <button className="w-full bg-primary hover:bg-primary/90 font-bold py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" style={{ color: '#ffffff' }}>
              Contact Us
            </button>
          </div>
        </nav>
        <SidebarFooter />
      </aside>
    </React.Fragment>
  );
}
*/