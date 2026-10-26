import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "../../content/useContext";
import { ThemeToggle } from "../themeToggle";
import { MenuIcon, SearchIcon, CloseIcon } from "../icons";
import { navlinks } from "../../data/navlinks";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

interface NavLink {
  name: string;
  href: string;
  icon?: string;
  description?: string;
  external?: boolean;
  children?: NavLink[];
}

var triggerHaptic = function () {
  try {
    if (typeof window !== "undefined" && window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export default function Navbar(props: NavbarProps) {
  var isSidebarOpen = props.isSidebarOpen;
  var setIsSidebarOpen = props.setIsSidebarOpen;
  var { content } = useContent();
  var location = useLocation();

  var [isScrolled, setIsScrolled] = React.useState(function () {
    if (typeof document === "undefined" || typeof window === "undefined") return false;
    var hasHero = !!document.getElementById("hero-section");
    return hasHero ? false : true;
  });

  var [isDarkMode, setIsDarkMode] = React.useState(false);
  var [isSearchOpen, setIsSearchOpen] = React.useState(false);
  var [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  var searchInputRef = React.useRef<HTMLInputElement>(null);
  var dropdownTimeoutRef = React.useRef<number | null>(null);

  var navItems: NavLink[] = content && content.navigation ? (content.navigation as NavLink[]) : (navlinks as NavLink[]);

  function isActive(path: string) {
    if (path === "/") return location.pathname === path;
    return location.pathname === path || location.pathname.indexOf(path + "/") === 0 || location.pathname.indexOf(path) === 0;
  }

  function hasActiveChild(link: NavLink): boolean {
    if (!link.children || link.children.length === 0) return false;
    return link.children.some(function (child) {
      if (isActive(child.href)) return true;
      return hasActiveChild(child);
    });
  }

  function isNavItemActive(link: NavLink) {
    return isActive(link.href) || hasActiveChild(link);
  }

  function toggleSidebar() {
    triggerHaptic();
    setIsSidebarOpen(!isSidebarOpen);
    setOpenDropdown(null);
  }

  function openSearch() {
    setIsSearchOpen(true);
    window.setTimeout(function () {
      if (searchInputRef.current) searchInputRef.current.focus();
    }, 100);
    document.body.style.overflow = "hidden";
  }

  function closeSearch() {
    setIsSearchOpen(false);
    document.body.style.overflow = "";
  }

  function clearDropdownTimer() {
    if (dropdownTimeoutRef.current !== null) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }

  function handleDropdownEnter(name: string) {
    clearDropdownTimer();
    setOpenDropdown(name);
  }

  function handleDropdownLeave() {
    clearDropdownTimer();
    dropdownTimeoutRef.current = window.setTimeout(function () {
      setOpenDropdown(null);
    }, 200);
  }

  function toggleDropdown(name: string) {
    clearDropdownTimer();
    if (openDropdown === name) setOpenDropdown(null);
    else setOpenDropdown(name);
  }

  React.useEffect(function () {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isSearchOpen) closeSearch();
        if (openDropdown !== null) setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, openDropdown]);

  React.useEffect(function () {
    var dark = false;
    if (typeof document !== "undefined") dark = document.documentElement.classList.contains("dark");
    setIsDarkMode(dark);
    if (typeof MutationObserver === "undefined") return;
    var observer = new MutationObserver(function () {
      var currentDark = false;
      if (typeof document !== "undefined") currentDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(currentDark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return function () { observer.disconnect(); };
  }, []);

  React.useEffect(function () {
    function handleScroll() {
      var heroElement = document.getElementById("hero-section");
      if (heroElement) {
        var heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 0);
      } else {
        setIsScrolled(window.scrollY > 100);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return function () { window.removeEventListener("scroll", handleScroll); };
  }, []);

  React.useEffect(function () {
    var timeoutId = window.setTimeout(function () {
      var heroElement = document.getElementById("hero-section");
      if (!heroElement) setIsScrolled(true);
      else {
        var heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 0 || window.scrollY > 100);
      }
    }, 60);
    return function () { window.clearTimeout(timeoutId); };
  }, [location.pathname]);

  // Replaced .closest() with .contains() for ES5 compat
  React.useEffect(function () {
    function handleClickOutside(e: MouseEvent) {
      var target = e.target as HTMLElement;
      var dropdownContainer = document.querySelector(".psc-dropdown-container");
      if (dropdownContainer && !dropdownContainer.contains(target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  React.useEffect(function () {
    return function () {
      clearDropdownTimer();
      document.body.style.overflow = "";
    };
  }, []);

  React.useEffect(function () { setOpenDropdown(null); }, [location.pathname]);

  var navbarBg = isScrolled ? "var(--psc-surface-container, #ffffff)" : "transparent";
  var navbarBorder = isScrolled ? "var(--psc-border, rgba(0,0,0,0.1))" : "transparent";
  var navbarShadow = isScrolled ? "shadow-lg" : "shadow-none";

  function getLinkColor(active: boolean) {
    if (active) return isScrolled ? "var(--psc-primary, #e68c00)" : "var(--psc-primary-container, #e68c00)";
    if (isScrolled) return isDarkMode ? "rgba(255,255,255,0.88)" : "#334155";
    return "rgba(255,255,255,0.92)";
  }

  function getIconColor() {
    if (isScrolled) return isDarkMode ? "#e5e7eb" : "#0f172a";
    return "rgba(255,255,255,0.85)";
  }

  function getActiveBarColor() { return isScrolled ? "var(--psc-primary, #e68c00)" : "#ffffff"; }

  function renderActiveBar() {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1.5 lg:bottom-2 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: "22px", height: "2.5px", backgroundColor: getActiveBarColor() }}
      />
    );
  }

  var navItemBase = "psc-nav-link relative flex h-full items-center rounded-md font-semibold transition-colors duration-200 focus:outline-none";

  function getDropdownWidth(count: number): number {
    if (count <= 3) return 300;
    if (count <= 6) return 540;
    return 660;
  }

  function renderDropdownItem(child: NavLink, index: number) {
    var childActive = isActive(child.href);
    return (
      <Link
        key={child.name}
        to={child.href}
        onClick={function () { setOpenDropdown(null); }}
        className="psc-dropdown-item group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors focus:outline-none"
        style={{ backgroundColor: childActive ? "rgba(230,140,0,0.12)" : "transparent", textDecoration: "none" }}
        onMouseEnter={function (e) { if (!childActive) e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
        onMouseLeave={function (e) { if (!childActive) e.currentTarget.style.backgroundColor = "transparent"; }}
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold"
          style={{ backgroundColor: childActive ? "var(--psc-primary, #e68c00)" : isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", color: childActive ? "#ffffff" : isDarkMode ? "rgba(255,255,255,0.85)" : "#334155" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold" style={{ color: childActive ? "var(--psc-primary, #e68c00)" : isDarkMode ? "rgba(255,255,255,0.92)" : "#1e293b" }}>
          {child.name}
        </span>
        <svg className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--psc-primary, #e68c00)" }} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  }

  function renderDesktopDropdown(link: NavLink) {
    if (!link.children || link.children.length === 0) return null;
    var children = link.children;
    var count = children.length;
    var active = isNavItemActive(link);
    var isDropdownOpen = openDropdown === link.name;
    var widthPx = getDropdownWidth(count);
    var twoColumns = count > 3;

    var panelBg = isDarkMode ? "#1a1c1c" : "#ffffff";
    var panelBorder = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
    var headerBorder = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
    var titleColor = isDarkMode ? "#ffffff" : "#0f172a";
    var subTextColor = isDarkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";

    return (
      <div key={link.name} className="psc-dropdown-container relative flex h-full items-center"
        onMouseEnter={function () { handleDropdownEnter(link.name); }} onMouseLeave={handleDropdownLeave}>
        <button type="button" onClick={function (e) { e.preventDefault(); e.stopPropagation(); toggleDropdown(link.name); }}
          className={navItemBase + " gap-1 md:px-1.5 lg:px-2 xl:px-2.5 text-[11px] md:text-[11px] lg:text-xs xl:text-[13px]"}
          style={{ color: isDropdownOpen || active ? getLinkColor(true) : getLinkColor(false), background: "transparent", cursor: "pointer" }}
          aria-expanded={isDropdownOpen} aria-haspopup="true">
          <span>{link.name}</span>
          <svg className={"h-3 w-3 lg:h-3.5 lg:w-3.5 transition-transform duration-200 " + (isDropdownOpen ? "rotate-180" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {active && !isDropdownOpen && renderActiveBar()}
        </button>

        {isDropdownOpen && (
          <div style={{ position: "absolute", left: "50%", top: "100%", transform: "translateX(-50%)", paddingTop: "10px", zIndex: 9999, width: widthPx + "px", maxWidth: "calc(100vw - 32px)" }}
            onMouseEnter={function () { handleDropdownEnter(link.name); }} onMouseLeave={handleDropdownLeave}>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", backgroundColor: panelBg, border: "1px solid " + panelBorder, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35), 0 10px 20px -8px rgba(0,0,0,0.2)" }}>
              <div style={{ height: "4px", width: "100%", backgroundColor: "var(--psc-primary, #e68c00)" }} />
              <div style={{ padding: "14px 20px", borderBottom: "1px solid " + headerBorder, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--psc-primary, #e68c00)", margin: 0 }}>Navigation</p>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: titleColor, margin: "3px 0 0 0" }}>{link.name}</h3>
                </div>
                <span style={{ borderRadius: "9999px", padding: "4px 10px", fontSize: "10px", fontWeight: 700, backgroundColor: "rgba(230,140,0,0.12)", color: "var(--psc-primary, #e68c00)", whiteSpace: "nowrap" }}>
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </div>
              <div style={{ padding: "10px" }}>
                <div style={{ display: "grid", gridTemplateColumns: twoColumns ? "1fr 1fr" : "1fr", gap: "4px" }}>
                  {children.map(function (child, index) { return renderDropdownItem(child, index); })}
                </div>
              </div>
              <div style={{ padding: "10px 20px", borderTop: "1px solid " + headerBorder }}>
                <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: subTextColor }}>Select an option to continue</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <header className={"psc-navbar fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out " + navbarShadow} style={{ backgroundColor: navbarBg, borderBottom: "1px solid " + navbarBorder }}>
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-3 sm:px-4 md:h-16 md:px-3 lg:h-20 lg:px-6 xl:px-8">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4">
            <button type="button" onClick={toggleSidebar} className="rounded-md p-2 transition-colors md:hidden focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center" style={{ color: getIconColor(), background: "transparent" }} aria-label="Open navigation menu">
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link to="/" className="flex-shrink-0 focus:outline-none">
              <img alt="Coat of Arms" className="h-8 w-auto sm:h-9 md:h-10 lg:h-12 xl:h-14" src="/assets/coa-2.png" />
            </Link>
          </div>

          <nav className="hidden h-full items-center gap-1 md:flex lg:gap-2 xl:gap-4 2xl:gap-6" aria-label="Primary navigation">
            {navItems.map(function (link) {
              var hasChildren = !!link.children && link.children.length > 0;
              if (hasChildren) return renderDesktopDropdown(link);
              var active = isNavItemActive(link);
              return (
                <Link key={link.name} to={link.href} className={navItemBase + " px-1.5 lg:px-2 xl:px-2.5 text-[11px] md:text-[11px] lg:text-xs xl:text-[13px]"} style={{ color: getLinkColor(active), textDecoration: "none" }}>
                  {link.name}
                  {active && renderActiveBar()}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-3 xl:gap-4">
            <button type="button" onClick={openSearch} className="rounded-full p-2 transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center" style={{ color: getIconColor(), background: "transparent" }} aria-label="Open search">
              <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </button>
            <ThemeToggle isScrolled={isScrolled} />
            <Link to="/" className="flex-shrink-0 focus:outline-none">
              <img alt="PSC Logo" className="h-7 w-auto sm:h-8 md:h-9 lg:h-10 xl:h-12" src="/assets/psc-logo-1.png" />
            </Link>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4" style={{ backdropFilter: "blur(8px)" }} onClick={closeSearch} role="dialog" aria-modal="true">
          <div className="w-full max-w-2xl" onClick={function (e) { e.stopPropagation(); }}>
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={closeSearch} className="rounded-full p-2 text-white/70 transition-colors hover:text-white focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close search">
                <CloseIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>
            <div className="relative">
              <input ref={searchInputRef} type="text" placeholder="Search..." className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-6 pr-28 text-lg text-white outline-none placeholder:text-white/40 focus:border-[var(--psc-primary-container)] md:text-xl"
                onKeyDown={function (e) {
                  if (e.key === "Enter") {
                    var query = (e.target as HTMLInputElement).value;
                    if (query.trim()) window.location.href = "/search?q=" + encodeURIComponent(query.trim());
                  }
                }} />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[var(--psc-primary-container,#e68c00)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:brightness-110 focus:outline-none min-h-[44px]"
                onClick={function () {
                  var input = searchInputRef.current;
                  if (input && input.value.trim()) window.location.href = "/search?q=" + encodeURIComponent(input.value.trim());
                }}>Search</button>
            </div>
            <div className="mt-6 text-center text-sm text-white/40">
              Press <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60">Enter</kbd> to search or <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60">ESC</kbd> to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/*
// src/components/layout/Navbar.tsx
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "../../content/useContext";
import { ThemeToggle } from "../themeToggle";
import { MenuIcon, SearchIcon, CloseIcon } from "../icons";
import { navlinks } from "../../data/navlinks";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

interface NavLink {
  name: string;
  href: string;
  icon?: string;
  description?: string;
  external?: boolean;
  children?: NavLink[];
}

var triggerHaptic = function () {
  try {
    if (
      typeof window !== "undefined" &&
      window.navigator &&
      typeof window.navigator.vibrate === "function"
    ) {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export default function Navbar(props: NavbarProps) {
  var isSidebarOpen = props.isSidebarOpen;
  var setIsSidebarOpen = props.setIsSidebarOpen;

  var { content } = useContent();
  var location = useLocation();

  var [isScrolled, setIsScrolled] = React.useState(function () {
    if (typeof document === "undefined") return false;
    if (typeof window === "undefined") return false;
    var hasHero = !!document.getElementById("hero-section");
    return hasHero ? false : true;
  });

  var [isDarkMode, setIsDarkMode] = React.useState(false);
  var [isSearchOpen, setIsSearchOpen] = React.useState(false);
  var [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  var searchInputRef = React.useRef<HTMLInputElement>(null);
  var dropdownTimeoutRef = React.useRef<number | null>(null);

  var navItems: NavLink[] =
    content && content.navigation
      ? (content.navigation as NavLink[])
      : (navlinks as NavLink[]);

  function isActive(path: string) {
    if (path === "/") return location.pathname === path;
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/") ||
      location.pathname.startsWith(path)
    );
  }

  function hasActiveChild(link: NavLink): boolean {
    if (!link.children || link.children.length === 0) return false;
    return link.children.some(function (child) {
      if (isActive(child.href)) return true;
      return hasActiveChild(child);
    });
  }

  function isNavItemActive(link: NavLink) {
    return isActive(link.href) || hasActiveChild(link);
  }

  function toggleSidebar() {
    triggerHaptic();
    setIsSidebarOpen(!isSidebarOpen);
    setOpenDropdown(null);
  }

  function openSearch() {
    setIsSearchOpen(true);
    window.setTimeout(function () {
      if (searchInputRef.current) searchInputRef.current.focus();
    }, 100);
    document.body.style.overflow = "hidden";
  }

  function closeSearch() {
    setIsSearchOpen(false);
    document.body.style.overflow = "";
  }

  function clearDropdownTimer() {
    if (dropdownTimeoutRef.current !== null) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }

  function handleDropdownEnter(name: string) {
    clearDropdownTimer();
    setOpenDropdown(name);
  }

  function handleDropdownLeave() {
    clearDropdownTimer();
    dropdownTimeoutRef.current = window.setTimeout(function () {
      setOpenDropdown(null);
    }, 200);
  }

  function toggleDropdown(name: string) {
    clearDropdownTimer();
    if (openDropdown === name) setOpenDropdown(null);
    else setOpenDropdown(name);
  }

  React.useEffect(
    function () {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
          if (isSearchOpen) closeSearch();
          if (openDropdown !== null) setOpenDropdown(null);
        }
      }
      document.addEventListener("keydown", handleKeyDown);
      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [isSearchOpen, openDropdown]
  );

  React.useEffect(function () {
    var dark = false;
    if (typeof document !== "undefined")
      dark = document.documentElement.classList.contains("dark");
    setIsDarkMode(dark);
    if (typeof MutationObserver === "undefined") return;
    var observer = new MutationObserver(function () {
      var currentDark = false;
      if (typeof document !== "undefined")
        currentDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(currentDark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return function () {
      observer.disconnect();
    };
  }, []);

  React.useEffect(function () {
    function handleScroll() {
      var heroElement = document.getElementById("hero-section");
      if (heroElement) {
        var heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 0);
      } else {
        setIsScrolled(window.scrollY > 100);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(
    function () {
      var timeoutId = window.setTimeout(function () {
        var heroElement = document.getElementById("hero-section");
        if (!heroElement) {
          setIsScrolled(true);
        } else {
          var heroBottom = heroElement.getBoundingClientRect().bottom;
          setIsScrolled(heroBottom < 0 || window.scrollY > 100);
        }
      }, 60);

      return function () {
        window.clearTimeout(timeoutId);
      };
    },
    [location.pathname]
  );

  React.useEffect(function () {
    function handleClickOutside(e: MouseEvent) {
      var target = e.target as HTMLElement;
      if (!target.closest(".psc-dropdown-container")) setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(function () {
    return function () {
      clearDropdownTimer();
      document.body.style.overflow = "";
    };
  }, []);

  React.useEffect(
    function () {
      setOpenDropdown(null);
    },
    [location.pathname]
  );

  var navbarBg = isScrolled
    ? "var(--psc-surface-container, #ffffff)"
    : "transparent";
  var navbarBorder = isScrolled
    ? "var(--psc-border, rgba(0,0,0,0.1))"
    : "transparent";
  var navbarShadow = isScrolled ? "shadow-lg" : "shadow-none";

  /**
   * Theme- and scroll-aware link colors.
   * Active items are always shown in the brand gold/orange.
   /
  function getLinkColor(active: boolean) {
    if (active) {
      return isScrolled
        ? "var(--psc-primary, #e68c00)"
        : "var(--psc-primary-container, #e68c00)";
    }
    if (isScrolled) {
      return isDarkMode ? "rgba(255,255,255,0.88)" : "#334155";
    }
    return "rgba(255,255,255,0.92)";
  }

  function getIconColor() {
    if (isScrolled) {
      return isDarkMode ? "#e5e7eb" : "#0f172a";
    }
    return "rgba(255,255,255,0.85)";
  }

  /**
   * Color of the small underline bar under the active item.
   * Over the hero it's white; once scrolled it turns brand gold.
   /
  function getActiveBarColor() {
    return isScrolled ? "var(--psc-primary, #e68c00)" : "#ffffff";
  }

  /**
   * Small centered pill under the active nav item.
   * Sits 6px from the bottom of the item container (which is the full
   * navbar height), so it hovers just above the header's bottom edge.
   /
  function renderActiveBar() {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1.5 lg:bottom-2 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "22px",
          height: "2.5px",
          backgroundColor: getActiveBarColor(),
        }}
      />
    );
  }

  /**
   * No visible focus ring on nav links — active items are identified by
   * their gold text plus the small underline bar. This class also
   * neutralises the global a:focus-visible / button:focus-visible
   * outlines from index.css.
   /
  var navItemBase =
    "psc-nav-link relative flex h-full items-center rounded-md font-semibold transition-colors duration-200 focus:outline-none";

  function getDropdownWidth(count: number): number {
    if (count <= 3) return 300;
    if (count <= 6) return 540;
    return 660;
  }

  function renderDropdownItem(child: NavLink, index: number) {
    var childActive = isActive(child.href);
    return (
      <Link
        key={child.name}
        to={child.href}
        onClick={function () {
          setOpenDropdown(null);
        }}
        className="psc-dropdown-item group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors focus:outline-none"
        style={{
          backgroundColor: childActive
            ? "rgba(230,140,0,0.12)"
            : "transparent",
          textDecoration: "none",
        }}
        onMouseEnter={function (e) {
          if (!childActive)
            e.currentTarget.style.backgroundColor = isDarkMode
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)";
        }}
        onMouseLeave={function (e) {
          if (!childActive)
            e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <span
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold"
          style={{
            backgroundColor: childActive
              ? "var(--psc-primary, #e68c00)"
              : isDarkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.05)",
            color: childActive
              ? "#ffffff"
              : isDarkMode
              ? "rgba(255,255,255,0.85)"
              : "#334155",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="min-w-0 flex-1 text-sm font-semibold"
          style={{
            color: childActive
              ? "var(--psc-primary, #e68c00)"
              : isDarkMode
              ? "rgba(255,255,255,0.92)"
              : "#1e293b",
          }}
        >
          {child.name}
        </span>
        <svg
          className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--psc-primary, #e68c00)" }}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  }

  function renderDesktopDropdown(link: NavLink) {
    if (!link.children || link.children.length === 0) return null;

    var children = link.children;
    var count = children.length;
    var active = isNavItemActive(link);
    var isDropdownOpen = openDropdown === link.name;
    var widthPx = getDropdownWidth(count);
    var twoColumns = count > 3;

    var panelBg = isDarkMode ? "#1a1c1c" : "#ffffff";
    var panelBorder = isDarkMode
      ? "rgba(255,255,255,0.10)"
      : "rgba(0,0,0,0.08)";
    var headerBorder = isDarkMode
      ? "rgba(255,255,255,0.10)"
      : "rgba(0,0,0,0.08)";
    var titleColor = isDarkMode ? "#ffffff" : "#0f172a";
    var subTextColor = isDarkMode
      ? "rgba(255,255,255,0.55)"
      : "rgba(0,0,0,0.5)";

    return (
      <div
        key={link.name}
        className="psc-dropdown-container relative flex h-full items-center"
        onMouseEnter={function () {
          handleDropdownEnter(link.name);
        }}
        onMouseLeave={handleDropdownLeave}
      >
        <button
          type="button"
          onClick={function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown(link.name);
          }}
          className={
            navItemBase +
            " gap-1 md:px-1.5 lg:px-2 xl:px-2.5 text-[11px] md:text-[11px] lg:text-xs xl:text-[13px]"
          }
          style={{
            color:
              isDropdownOpen || active
                ? getLinkColor(true)
                : getLinkColor(false),
            background: "transparent",
            cursor: "pointer",
          }}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <span>{link.name}</span>
          <svg
            className={
              "h-3 w-3 lg:h-3.5 lg:w-3.5 transition-transform duration-200 " +
              (isDropdownOpen ? "rotate-180" : "")
            }
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>

          {/* Small active underline bar /}
          {active && !isDropdownOpen && renderActiveBar()}
        </button>

        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "100%",
              transform: "translateX(-50%)",
              paddingTop: "10px",
              zIndex: 9999,
              width: widthPx + "px",
              maxWidth: "calc(100vw - 32px)",
            }}
            onMouseEnter={function () {
              handleDropdownEnter(link.name);
            }}
            onMouseLeave={handleDropdownLeave}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: panelBg,
                border: "1px solid " + panelBorder,
                boxShadow:
                  "0 25px 50px -12px rgba(0,0,0,0.35), 0 10px 20px -8px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  height: "4px",
                  width: "100%",
                  backgroundColor: "var(--psc-primary, #e68c00)",
                }}
              />

              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: "1px solid " + headerBorder,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--psc-primary, #e68c00)",
                      margin: 0,
                    }}
                  >
                    Navigation
                  </p>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: titleColor,
                      margin: "3px 0 0 0",
                    }}
                  >
                    {link.name}
                  </h3>
                </div>
                <span
                  style={{
                    borderRadius: "9999px",
                    padding: "4px 10px",
                    fontSize: "10px",
                    fontWeight: 700,
                    backgroundColor: "rgba(230,140,0,0.12)",
                    color: "var(--psc-primary, #e68c00)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </div>

              <div style={{ padding: "10px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: twoColumns ? "1fr 1fr" : "1fr",
                    gap: "4px",
                  }}
                >
                  {children.map(function (child, index) {
                    return renderDropdownItem(child, index);
                  })}
                </div>
              </div>

              <div
                style={{
                  padding: "10px 20px",
                  borderTop: "1px solid " + headerBorder,
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: subTextColor,
                  }}
                >
                  Select an option to continue
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <header
        className={
          "psc-navbar fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out " +
          navbarShadow
        }
        style={{
          backgroundColor: navbarBg,
          borderBottom: "1px solid " + navbarBorder,
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-3 sm:px-4 md:h-16 md:px-3 lg:h-20 lg:px-6 xl:px-8">
          {/* LEFT /}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-1 transition-colors md:hidden focus:outline-none"
              style={{
                color: getIconColor(),
                background: "transparent",
              }}
              aria-label="Open navigation menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>

            <Link to="/" className="flex-shrink-0 focus:outline-none">
              <img
                alt="Coat of Arms"
                className="h-8 w-auto sm:h-9 md:h-10 lg:h-12 xl:h-14"
                src="/assets/coa-2.png"
              />
            </Link>
          </div>

          {/* CENTER: Desktop Nav /}
          <nav
            className="hidden h-full items-center gap-1 md:flex lg:gap-2 xl:gap-4 2xl:gap-6"
            aria-label="Primary navigation"
          >
            {navItems.map(function (link) {
              var hasChildren = !!link.children && link.children.length > 0;
              if (hasChildren) return renderDesktopDropdown(link);

              var active = isNavItemActive(link);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={
                    navItemBase +
                    " px-1.5 lg:px-2 xl:px-2.5 text-[11px] md:text-[11px] lg:text-xs xl:text-[13px]"
                  }
                  style={{
                    color: getLinkColor(active),
                    textDecoration: "none",
                  }}
                >
                  {link.name}

                  {/* Small active underline bar /}
                  {active && renderActiveBar()}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT /}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-3 xl:gap-4">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-1 transition-colors focus:outline-none"
              style={{
                color: getIconColor(),
                background: "transparent",
              }}
              aria-label="Open search"
            >
              <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </button>

            <ThemeToggle isScrolled={isScrolled} />

            <Link to="/" className="flex-shrink-0 focus:outline-none">
              <img
                alt="PSC Logo"
                className="h-7 w-auto sm:h-8 md:h-9 lg:h-10 xl:h-12"
                src="/assets/psc-logo-1.png"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL /}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
          style={{ backdropFilter: "blur(8px)" }}
          onClick={closeSearch}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-2xl"
            onClick={function (e) {
              e.stopPropagation();
            }}
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={closeSearch}
                className="rounded-full p-2 text-white/70 transition-colors hover:text-white focus:outline-none"
                aria-label="Close search"
              >
                <CloseIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>

            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-6 pr-28 text-lg text-white outline-none placeholder:text-white/40 focus:border-[var(--psc-primary-container)] md:text-xl"
                onKeyDown={function (e) {
                  if (e.key === "Enter") {
                    var query = (e.target as HTMLInputElement).value;
                    if (query.trim()) {
                      window.location.href =
                        "/search?q=" + encodeURIComponent(query.trim());
                    }
                  }
                }}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[var(--psc-primary-container,#e68c00)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:brightness-110 focus:outline-none"
                onClick={function () {
                  var input = searchInputRef.current;
                  if (input && input.value.trim()) {
                    window.location.href =
                      "/search?q=" + encodeURIComponent(input.value.trim());
                  }
                }}
              >
                Search
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-white/40">
              Press{" "}
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60">
                Enter
              </kbd>{" "}
              to search or{" "}
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60">
                ESC
              </kbd>{" "}
              to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}*/


/*
// src/components/layout/Navbar.tsx
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "../../content/useContext";
import { ThemeToggle } from "../themeToggle";
import { MenuIcon, SearchIcon, CloseIcon } from "../icons";
import { navlinks } from "../../data/navlinks";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

interface NavLink {
  name: string;
  href: string;
  icon?: string;
  description?: string;
  children?: NavLink[];
}

var triggerHaptic = function () {
  try {
    if (
      typeof window !== "undefined" &&
      window.navigator &&
      typeof window.navigator.vibrate === "function"
    ) {
      window.navigator.vibrate(50);
    }
  } catch (e) {
    // Haptics are optional.
  }
};

export default function Navbar(props: NavbarProps) {
  var isSidebarOpen = props.isSidebarOpen;
  var setIsSidebarOpen = props.setIsSidebarOpen;

  var { content } = useContent();
  var location = useLocation();

  var [isScrolled, setIsScrolled] = React.useState(false);
  var [isDarkMode, setIsDarkMode] = React.useState(false);
  var [isSearchOpen, setIsSearchOpen] = React.useState(false);
  var [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  var searchInputRef = React.useRef<HTMLInputElement>(null);
  var dropdownTimeoutRef = React.useRef<number | null>(null);

  /*
   * ContentProvider remains the source of truth.
   * navlinks is only used as a fallback.
   /
  var navItems: NavLink[] =
    content && content.navigation
      ? (content.navigation as NavLink[])
      : (navlinks as NavLink[]);

  function isActive(path: string) {
    if (path === "/") {
      return location.pathname === path;
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/") ||
      location.pathname.startsWith(path)
    );
  }

  /*
   * A parent navigation item should also be considered active
   * when one of its children contains the current route.
   /
  function hasActiveChild(link: NavLink): boolean {
    if (!link.children || link.children.length === 0) {
      return false;
    }

    return link.children.some(function (child) {
      if (isActive(child.href)) {
        return true;
      }

      return hasActiveChild(child);
    });
  }

  function isNavItemActive(link: NavLink) {
    return isActive(link.href) || hasActiveChild(link);
  }

  function toggleSidebar() {
    triggerHaptic();
    setIsSidebarOpen(!isSidebarOpen);
    setOpenDropdown(null);
  }

  function openSearch() {
    setIsSearchOpen(true);

    window.setTimeout(function () {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);

    document.body.style.overflow = "hidden";
  }

  function closeSearch() {
    setIsSearchOpen(false);
    document.body.style.overflow = "";
  }

  function clearDropdownTimer() {
    if (dropdownTimeoutRef.current !== null) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }

  function handleDropdownEnter(name: string) {
    clearDropdownTimer();
    setOpenDropdown(name);
  }

  function handleDropdownLeave() {
    clearDropdownTimer();

    dropdownTimeoutRef.current = window.setTimeout(function () {
      setOpenDropdown(null);
    }, 180);
  }

  function toggleDropdown(name: string) {
    clearDropdownTimer();

    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  }

  function closeDropdown() {
    clearDropdownTimer();
    setOpenDropdown(null);
  }

  /*
   * Escape closes both search and navigation dropdowns.
   /
  React.useEffect(
    function () {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
          if (isSearchOpen) {
            closeSearch();
          }

          if (openDropdown !== null) {
            closeDropdown();
          }
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [isSearchOpen, openDropdown]
  );

  /*
   * Observe dark-mode changes.
   /
  React.useEffect(function () {
    var dark = false;

    if (typeof document !== "undefined") {
      dark = document.documentElement.classList.contains("dark");
    }

    setIsDarkMode(dark);

    if (typeof MutationObserver === "undefined") {
      return;
    }

    var observer = new MutationObserver(function () {
      var currentDark = false;

      if (typeof document !== "undefined") {
        currentDark =
          document.documentElement.classList.contains("dark");
      }

      setIsDarkMode(currentDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return function () {
      observer.disconnect();
    };
  }, []);

  /*
   * Navbar becomes solid after the hero section.
   /
  React.useEffect(function () {
    function handleScroll() {
      var heroElement = document.getElementById("hero-section");

      if (heroElement) {
        var heroBottom = heroElement.getBoundingClientRect().bottom;

        setIsScrolled(heroBottom < 0);
      } else {
        setIsScrolled(window.scrollY > 100);
      }
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Close dropdown when clicking outside the navigation.
   /
  React.useEffect(function () {
    function handleClickOutside(e: MouseEvent) {
      var target = e.target as HTMLElement;

      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return function () {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /*
   * Clean up timers and body scroll lock.
   /
  React.useEffect(function () {
    return function () {
      clearDropdownTimer();
      document.body.style.overflow = "";
    };
  }, []);

  /*
   * Close navigation dropdowns when the route changes.
   /
  React.useEffect(
    function () {
      setOpenDropdown(null);
    },
    [location.pathname]
  );

  var navbarBg = isScrolled
    ? "var(--psc-surface-container)"
    : "transparent";

  var navbarBorder = isScrolled
    ? "var(--psc-border)"
    : "transparent";

  var navbarShadow = isScrolled ? "shadow-lg" : "shadow-none";

  /*
   * Desktop parent navigation colours.
   /
  function getLinkColor(active: boolean) {
    if (active) {
      return isScrolled ? "var(--psc-primary)" : "#ffffff";
    }

    return isScrolled
      ? "var(--psc-on-surface-variant)"
      : "rgba(255,255,255,0.92)";
  }

  /*
   * Determine the appropriate dropdown width.
   *
   * 1–3 children  -> compact menu
   * 4–6 children  -> medium mega menu
   * 7+ children   -> large mega menu
   /
  function getDropdownWidth(count: number) {
    if (count <= 3) {
      return "w-[320px]";
    }

    if (count <= 6) {
      return "w-[560px]";
    }

    return "w-[680px]";
  }

  /*
   * Determine whether a dropdown should use multiple columns.
   /
  function getDropdownColumns(count: number) {
    if (count <= 3) {
      return "grid-cols-1";
    }

    return "grid-cols-2";
  }

  /*
   * Desktop dropdown item.
   /
  function renderDropdownItem(child: NavLink, index: number) {
    var childActive = isNavItemActive(child);

    return (
      <Link
        key={child.name}
        to={child.href}
        onClick={function () {
          setOpenDropdown(null);
        }}
        className={
          "group flex items-start gap-3 rounded-xl px-3 py-3 " +
          "transition-all duration-200 " +
          "focus:outline-none focus-visible:ring-2 " +
          "focus-visible:ring-[var(--psc-primary)]"
        }
        style={{
          backgroundColor: childActive
            ? "var(--psc-primary-container)"
            : "transparent",
        }}
        onMouseEnter={function (e) {
          if (!childActive) {
            e.currentTarget.style.backgroundColor =
              "var(--psc-hover-overlay)";
          }
        }}
        onMouseLeave={function (e) {
          if (!childActive) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        {/* Number / navigation marker /}
        <span
          className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors duration-200"
          style={{
            backgroundColor: childActive
              ? "var(--psc-primary)"
              : isScrolled
              ? "var(--psc-surface-container-high)"
              : "rgba(255,255,255,0.10)",
            color: childActive ? "#ffffff" : getLinkColor(false),
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Label + optional description /}
        <span className="min-w-0 flex-1">
          <span
            className="block text-sm font-semibold leading-5"
            style={{
              color: childActive
                ? "var(--psc-primary)"
                : getLinkColor(false),
            }}
          >
            {child.name}
          </span>
          {child.description ? (
            <span
              className="mt-0.5 block text-[11px] leading-4"
              style={{
                color: isScrolled
                  ? "var(--psc-on-surface-variant)"
                  : "rgba(255,255,255,0.55)",
                opacity: 0.8,
              }}
            >
              {child.description}
            </span>
          ) : null}
        </span>

        {/* Arrow /}
        <svg
          className={
            "mt-2 h-4 w-4 flex-shrink-0 opacity-0 " +
            "transition-all duration-200 " +
            "group-hover:translate-x-0.5 group-hover:opacity-100"
          }
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--psc-primary)" }}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    );
  }

  /*
   * Desktop mega dropdown.
   /
  function renderDesktopDropdown(link: NavLink) {
    if (!link.children || link.children.length === 0) {
      return null;
    }

    var children = link.children;
    var count = children.length;
    var active = isNavItemActive(link);
    var isDropdownOpen = openDropdown === link.name;

    var dropdownWidth = getDropdownWidth(count);
    var dropdownColumns = getDropdownColumns(count);

    return (
      <div
        key={link.name}
        className="dropdown-container relative flex h-full items-center"
        onMouseEnter={function () {
          handleDropdownEnter(link.name);
        }}
        onMouseLeave={handleDropdownLeave}
      >
        {/* Parent trigger /}
        <button
          type="button"
          onClick={function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown(link.name);
          }}
          className={
            "relative flex h-full items-center gap-1.5 " +
            "border-b-2 border-transparent px-1 " +
            "text-xs font-semibold transition-all duration-200 " +
            "focus:outline-none focus-visible:ring-2 " +
            "focus-visible:ring-[var(--psc-primary)] " +
            "lg:text-sm"
          }
          style={{
            color:
              isDropdownOpen || active
                ? getLinkColor(true)
                : getLinkColor(false),
            borderBottomColor:
              isDropdownOpen || active
                ? isScrolled
                  ? "var(--psc-primary)"
                  : "#ffffff"
                : "transparent",
          }}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-controls={
            isDropdownOpen ? "dropdown-" + link.name : undefined
          }
        >
          <span>{link.name}</span>

          <svg
            className={
              "h-3.5 w-3.5 transition-transform duration-200 " +
              (isDropdownOpen ? "rotate-180" : "")
            }
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>

          {/* Active indicator /}
          {active && !isDropdownOpen && (
            <span
              className="absolute -bottom-0.5 left-0 right-0 h-0.5"
              style={{
                backgroundColor: isScrolled
                  ? "var(--psc-primary)"
                  : "#ffffff",
              }}
            />
          )}
        </button>

        {/* Dropdown panel /}
        {isDropdownOpen && (
          <div
            id={"dropdown-" + link.name}
            className={
              "absolute left-1/2 top-full z-[70] " +
              "-translate-x-1/2 pt-3 " +
              dropdownWidth
            }
            onMouseEnter={function () {
              handleDropdownEnter(link.name);
            }}
            onMouseLeave={handleDropdownLeave}
          >
            <div
              className="relative overflow-hidden rounded-2xl border shadow-2xl"
              style={{
                backgroundColor: isScrolled
                  ? "var(--psc-surface-container)"
                  : isDarkMode
                  ? "var(--psc-surface-container)"
                  : "rgba(28, 30, 30, 0.98)",
                borderColor: "var(--psc-border)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Top accent /}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: "var(--psc-primary)" }}
              />

              {/* Header /}
              <div
                className="border-b px-5 py-4"
                style={{ borderColor: "var(--psc-border)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "var(--psc-primary)" }}
                    >
                      Navigation
                    </p>

                    <h3
                      className="mt-1 text-base font-bold"
                      style={{ color: getLinkColor(true) }}
                    >
                      {link.name}
                    </h3>
                  </div>

                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{
                      backgroundColor: "var(--psc-primary-container)",
                      color: "var(--psc-primary)",
                    }}
                  >
                    {count} {count === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              {/* Menu items *}
              <div className="p-3">
                <div className={"grid gap-1.5 " + dropdownColumns}>
                  {children.map(function (child, index) {
                    return renderDropdownItem(child, index);
                  })}
                </div>
              </div>

              {/* Bottom rule /}
              <div
                className="border-t px-5 py-3"
                style={{ borderColor: "var(--psc-border)" }}
              >
                <span
                  className="text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: "var(--psc-on-surface-variant)" }}
                >
                  Select an option to continue
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /*
   * Mobile navigation item.
   /
  function renderMobileNavLink(link: NavLink) {
    var active = isNavItemActive(link);
    var hasChildren = !!link.children && link.children.length > 0;
    var isDropdownOpen = openDropdown === link.name;

    if (hasChildren) {
      return (
        <div
          key={link.name}
          className="w-full border-b py-1"
          style={{ borderColor: "var(--psc-border)" }}
        >
          <button
            type="button"
            onClick={function () {
              toggleDropdown(link.name);
            }}
            className="flex w-full items-center justify-between gap-4 rounded-lg px-2 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--psc-primary)]"
            style={{
              color: active
                ? "var(--psc-primary)"
                : isScrolled
                ? "var(--psc-on-surface-variant)"
                : "rgba(255,255,255,0.92)",
            }}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <span className="text-sm font-semibold">{link.name}</span>

            <svg
              className={
                "h-4 w-4 flex-shrink-0 transition-transform duration-200 " +
                (isDropdownOpen ? "rotate-180" : "")
              }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              className="mb-2 ml-2 space-y-1 border-l-2 pl-3"
              style={{ borderColor: "var(--psc-primary)" }}
            >
              {link.children &&
                link.children.map(function (child, index) {
                  var childActive = isNavItemActive(child);

                  return (
                    <Link
                      key={child.name}
                      to={child.href}
                      onClick={function () {
                        setIsSidebarOpen(false);
                        setOpenDropdown(null);
                      }}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--psc-primary)]"
                      style={{
                        backgroundColor: childActive
                          ? "var(--psc-primary-container)"
                          : "transparent",
                        color: childActive
                          ? "var(--psc-primary)"
                          : isScrolled
                          ? "var(--psc-on-surface-variant)"
                          : "rgba(255,255,255,0.82)",
                      }}
                    >
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[9px] font-bold"
                        style={{
                          backgroundColor: childActive
                            ? "var(--psc-primary)"
                            : isScrolled
                            ? "var(--psc-surface-container-high)"
                            : "rgba(255,255,255,0.10)",
                          color: childActive
                            ? "#ffffff"
                            : isScrolled
                            ? "var(--psc-on-surface-variant)"
                            : "rgba(255,255,255,0.65)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-medium">
                        {child.name}
                      </span>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.href}
        onClick={function () {
          setIsSidebarOpen(false);
          setOpenDropdown(null);
        }}
        className="block border-b px-2 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--psc-primary)]"
        style={{
          borderColor: "var(--psc-border)",
          color: active
            ? "var(--psc-primary)"
            : isScrolled
            ? "var(--psc-on-surface-variant)"
            : "rgba(255,255,255,0.92)",
        }}
      >
        {link.name}
      </Link>
    );
  }

  return (
    <>
      {/* =========================================================
          MAIN NAVBAR
      ========================================================== /}
      <header
        className={
          "fixed left-0 right-0 top-0 z-50 " +
          "transition-all duration-300 ease-in-out " +
          navbarShadow
        }
        style={{
          backgroundColor: navbarBg,
          borderBottom: "1px solid " + navbarBorder,
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-3 sm:px-4 md:h-20 md:px-8">
          {/* =====================================================
              LEFT
          ====================================================== /}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Mobile menu /}
            <button
              type="button"
              onClick={toggleSidebar}
              className={
                "rounded-md p-1 transition-colors " +
                "focus:outline-none focus-visible:ring-2 " +
                "focus-visible:ring-[var(--psc-primary)] " +
                "md:hidden"
              }
              style={{
                color: isScrolled ? "var(--psc-on-surface)" : "#ffffff",
              }}
              aria-label="Open navigation menu"
              aria-expanded={isSidebarOpen}
            >
              <MenuIcon className="h-6 w-6" />
            </button>

            {/* Coat of Arms /}
            <Link
              to="/"
              className="flex-shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--psc-primary)]"
              aria-label="Public Service Commission home"
            >
              <img
                alt="Coat of Arms"
                className="h-10 w-auto md:h-14"
                src="/assets/coa-2.png"
              />
            </Link>
          </div>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== /}
          <nav
            className="hidden h-full items-center gap-4 md:flex lg:gap-6 xl:gap-8"
            aria-label="Primary navigation"
          >
            {navItems.map(function (link) {
              var hasChildren =
                !!link.children && link.children.length > 0;

              if (hasChildren) {
                return renderDesktopDropdown(link);
              }

              var active = isNavItemActive(link);

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={
                    "relative flex h-full items-center " +
                    "border-b-2 border-transparent px-1 " +
                    "text-xs font-semibold transition-all duration-200 " +
                    "focus:outline-none focus-visible:ring-2 " +
                    "focus-visible:ring-[var(--psc-primary)] " +
                    "lg:text-sm"
                  }
                  style={{
                    color: getLinkColor(active),
                    borderBottomColor: active
                      ? isScrolled
                        ? "var(--psc-primary)"
                        : "#ffffff"
                      : "transparent",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* =====================================================
              RIGHT
          ====================================================== /}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Search /}
            <button
              type="button"
              onClick={openSearch}
              className={
                "rounded-full p-1 transition-colors " +
                "focus:outline-none focus-visible:ring-2 " +
                "focus-visible:ring-[var(--psc-primary)]"
              }
              style={{
                color: isScrolled
                  ? "var(--psc-on-surface)"
                  : "rgba(255,255,255,0.85)",
              }}
              aria-label="Open search"
            >
              <SearchIcon className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Theme /}
            <ThemeToggle isScrolled={isScrolled} />

            {/* PSC Logo /}
            <Link
              to="/"
              className="flex-shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--psc-primary)]"
              aria-label="Public Service Commission home"
            >
              <img
                alt="PSC Logo"
                className="h-8 w-auto sm:h-10 md:h-12"
                src="/assets/psc-logo-1.webp"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE SIDEBAR
      ========================================================== /}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={toggleSidebar}
          role="presentation"
        >
          <aside
            className="fixed left-0 top-0 h-full w-[280px] overflow-y-auto shadow-2xl"
            style={{
              backgroundColor: isScrolled
                ? "var(--psc-surface-container)"
                : "#1a1c1c",
            }}
            onClick={function (e) {
              e.stopPropagation();
            }}
            aria-label="Mobile navigation"
          >
            {/* Sidebar header /}
            <div
              className="flex items-center justify-between border-b px-4 py-4"
              style={{ borderColor: "var(--psc-border)" }}
            >
              <Link
                to="/"
                onClick={function () {
                  setIsSidebarOpen(false);
                }}
                className="flex items-center gap-3"
              >
                <img
                  src="/assets/psc-logo-1.webp"
                  alt="PSC Logo"
                  className="h-9 w-auto"
                />
              </Link>

              <button
                type="button"
                onClick={toggleSidebar}
                className="rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--psc-primary)]"
                style={{
                  color: isScrolled
                    ? "var(--psc-on-surface)"
                    : "rgba(255,255,255,0.85)",
                }}
                aria-label="Close navigation menu"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile links /}
            <nav
              className="px-4 pb-8 pt-3"
              aria-label="Mobile primary navigation"
            >
              {navItems.map(function (link) {
                return renderMobileNavLink(link);
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* =========================================================
          SEARCH MODAL
      ========================================================== /}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
          onClick={closeSearch}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div
            className="w-full max-w-2xl"
            onClick={function (e) {
              e.stopPropagation();
            }}
          >
            {/* Close /}
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={closeSearch}
                className="rounded-full p-2 text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--psc-primary-container)]"
                aria-label="Close search"
              >
                <CloseIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>

            {/* Search input *}
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-white/50"
                aria-hidden="true"
              >
                search
              </span>

              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                aria-label="Search"
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-14 pr-28 text-lg text-white outline-none transition-all placeholder:text-white/40 focus:border-[var(--psc-primary-container)] focus:ring-2 focus:ring-[var(--psc-primary-container)]/50 md:text-xl"
                onKeyDown={function (e) {
                  if (e.key === "Enter") {
                    var query = (e.target as HTMLInputElement).value;

                    if (query.trim()) {
                      window.location.href =
                        "/search?q=" +
                        encodeURIComponent(query.trim());
                    }
                  }
                }}
              />

              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[var(--psc-primary-container)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#d47d00] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                onClick={function () {
                  var input = searchInputRef.current;

                  if (input && input.value.trim()) {
                    window.location.href =
                      "/search?q=" +
                      encodeURIComponent(input.value.trim());
                  }
                }}
              >
                Search
              </button>
            </div>

            {/* Keyboard hint /}
            <div className="mt-6 text-center text-sm text-white/40">
              Press{" "}
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60">
                Enter
              </kbd>{" "}
              to search or{" "}
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60">
                ESC
              </kbd>{" "}
              to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}*/


/*
// src/components/layout/Navbar.tsx
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "../../content/useContext";
import { ThemeToggle } from "../themeToggle";
import { MenuIcon, SearchIcon, CloseIcon } from "../icons";
import { navlinks } from "../../data/navlinks";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

interface NavLink {
  name: string;
  href: string;
  icon?: string;
  children?: NavLink[];
}

var triggerHaptic = function() {
  try {
    if (window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export default function Navbar(props: NavbarProps) {
  var isSidebarOpen = props.isSidebarOpen;
  var setIsSidebarOpen = props.setIsSidebarOpen;
  var { content } = useContent();
  var location = useLocation();
  var [isScrolled, setIsScrolled] = React.useState(false);
  var [isDarkMode, setIsDarkMode] = React.useState(false);
  var [isSearchOpen, setIsSearchOpen] = React.useState(false);
  var [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  var searchInputRef = React.useRef<HTMLInputElement>(null);
  var dropdownTimeoutRef = React.useRef<number | null>(null);
  
  var navItems = (content && content.navigation) ? content.navigation : navlinks;

  function isActive(path: string) {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  }

  function toggleSidebar() {
    triggerHaptic();
    setIsSidebarOpen(!isSidebarOpen);
  }

  function openSearch() {
    setIsSearchOpen(true);
    setTimeout(function() {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    setIsSearchOpen(false);
    document.body.style.overflow = '';
  }

  function handleDropdownEnter(name: string) {
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(name);
  }

  function handleDropdownLeave() {
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = window.setTimeout(function() {
      setOpenDropdown(null);
    }, 200);
  }

  function toggleDropdown(name: string) {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  }

  React.useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return function() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  React.useEffect(function() {
    var dark = false;
    if (typeof document !== "undefined") {
      dark = document.documentElement.classList.contains('dark');
    }
    setIsDarkMode(dark);

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

  React.useEffect(function() {
    function handleScroll() {
      var heroElement = document.getElementById('hero-section');
      if (heroElement) {
        var heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 0);
      } else {
        setIsScrolled(window.scrollY > 100);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return function() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(function() {
    function handleClickOutside(e: MouseEvent) {
      var target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return function() {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Theme-aware styles
  var navbarBg = isScrolled ? 'var(--psc-surface-container)' : 'transparent';
  var navbarBorder = isScrolled ? 'var(--psc-border)' : 'transparent';
  var navbarShadow = isScrolled ? 'shadow-lg' : 'shadow-none';

  function renderNavLink(link: NavLink, isMobile: boolean = false) {
    var active = isActive(link.href);
    var hasChildren = link.children && link.children.length > 0;
    
    var linkColor = isScrolled
      ? 'text-[var(--psc-on-surface-variant)] hover:text-[var(--psc-primary)]'
      : 'text-white/90 hover:text-white';
    var activeColor = isScrolled
      ? 'text-[var(--psc-primary)] border-[var(--psc-primary)]'
      : 'text-white border-white';
    var activeClasses = active ? activeColor : linkColor;

    if (isMobile) {
      if (hasChildren) {
        var isDropdownOpen = openDropdown === link.name;
        return (
          <div key={link.name} className="w-full border-b border-[var(--psc-border-light)] dark:border-[var(--psc-border)] py-2">
            <button
              onClick={function() { toggleDropdown(link.name); }}
              className="flex items-center justify-between w-full text-left text-sm font-semibold transition-colors"
              style={{ color: isScrolled ? 'var(--psc-on-surface-variant)' : 'rgba(255,255,255,0.9)' }}
            >
              <span>{link.name}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && link.children && (
              <div className="mt-2 ml-4 space-y-1">
                {link.children.map(function(child) {
                  var childActive = isActive(child.href);
                  return (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="block py-2 px-3 text-sm rounded-lg transition-colors"
                      style={{
                        color: childActive 
                          ? 'var(--psc-primary)' 
                          : (isScrolled ? 'var(--psc-on-surface-variant)' : 'rgba(255,255,255,0.8)'),
                        backgroundColor: childActive ? 'var(--psc-primary-container)' : 'transparent',
                        opacity: childActive ? 1 : 0.8,
                      }}
                      onClick={function() { setIsSidebarOpen(false); }}
                    >
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={link.name}
          to={link.href}
          className={`block py-2 text-sm font-semibold transition-colors border-b border-[var(--psc-border-light)] dark:border-[var(--psc-border)] ${
            active ? activeColor : linkColor
          }`}
          onClick={function() { setIsSidebarOpen(false); }}
        >
          {link.name}
        </Link>
      );
    }

    // Desktop navigation
    if (hasChildren) {
      var isDropdownOpen = openDropdown === link.name;
      return (
        <div
          key={link.name}
          className="dropdown-container relative flex items-center h-full"
          onMouseEnter={function() { handleDropdownEnter(link.name); }}
          onMouseLeave={handleDropdownLeave}
        >
          <button
            onClick={function(e) { e.preventDefault(); toggleDropdown(link.name); }}
            className={`flex items-center gap-1 text-xs lg:text-sm font-semibold transition-colors duration-200 h-full border-b-2 ${
              isDropdownOpen ? activeColor : linkColor
            } border-transparent hover:border-[var(--psc-primary)]`}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {link.name}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && link.children && (
            <div
              className="absolute top-full left-0 mt-0 min-w-[220px] rounded-lg shadow-xl overflow-hidden"
              style={{
                backgroundColor: isScrolled 
                  ? 'var(--psc-surface-container)'
                  : 'rgba(26, 28, 28, 0.95)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid var(--psc-border)',
              }}
              onMouseEnter={function() { handleDropdownEnter(link.name); }}
              onMouseLeave={handleDropdownLeave}
            >
              {link.children.map(function(child) {
                var childActive = isActive(child.href);
                return (
                  <Link
                    key={child.name}
                    to={child.href}
                    className="block px-4 py-3 text-sm transition-colors hover:bg-[var(--psc-hover-overlay)]"
                    style={{
                      color: childActive 
                        ? 'var(--psc-primary)' 
                        : (isScrolled ? 'var(--psc-on-surface-variant)' : 'rgba(255,255,255,0.85)'),
                      backgroundColor: childActive ? 'var(--psc-primary-container)' : 'transparent',
                      opacity: childActive ? 1 : 0.85,
                    }}
                  >
                    {child.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.href}
        className={`text-xs lg:text-sm font-semibold transition-colors duration-200 flex items-center h-full border-b-2 ${
          active 
            ? activeClasses + ' border-b-2'
            : activeClasses + ' border-transparent hover:border-[var(--psc-primary)]'
        }`}
      >
        {link.name}
      </Link>
    );
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navbarShadow}`}
        style={{
          backgroundColor: navbarBg,
          borderBottom: `1px solid ${navbarBorder}`,
        }}
      >
        <div className="flex justify-between items-center w-full px-3 sm:px-4 md:px-8 max-w-[1400px] mx-auto h-16 md:h-20">
          
          {/* LEFT SIDE /}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button 
              onClick={toggleSidebar}
              className={`md:hidden transition-colors duration-300 p-1 ${
                isScrolled 
                  ? 'text-[var(--psc-on-surface)]'
                  : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            <Link to="/" className="flex-shrink-0">
              <img 
                alt="Coat of Arms" 
                className="h-10 md:h-14 w-auto" 
                src="/assets/coa-2.png"
              />
            </Link>
          </div>

          {/* CENTER: Desktop Navigation /}
          <nav className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 items-center h-full">
            {navItems.map(function(link) {
              return renderNavLink(link, false);
            })}
          </nav>

          {/* RIGHT SIDE /}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={openSearch}
              className={`transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--psc-primary-container)] rounded-full p-1 ${
                isScrolled 
                  ? 'text-[var(--psc-on-surface)] hover:text-[var(--psc-primary)]'
                  : 'text-white/80 hover:text-white'
              }`}
              aria-label="Open search"
            >
              <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <ThemeToggle isScrolled={isScrolled} />

            <Link to="/" className="flex-shrink-0">
              <img 
                alt="PSC Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto" 
                src="/assets/psc-logo-1.webp"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar /}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={toggleSidebar}
        >
          <div 
            className="fixed top-0 left-0 h-full w-[280px] shadow-xl overflow-y-auto transition-transform duration-300"
            style={{
              backgroundColor: isScrolled 
                ? 'var(--psc-surface-container)'
                : '#1a1c1c',
            }}
            onClick={function(e) { e.stopPropagation(); }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-[var(--psc-hover-overlay)] transition-colors"
                style={{ color: isScrolled ? 'var(--psc-on-surface)' : 'rgba(255,255,255,0.8)' }}
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-4 pb-8">
              {navItems.map(function(link) {
                return renderNavLink(link, true);
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal /}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={closeSearch}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div 
            className="w-full max-w-2xl mx-4"
            onClick={function(e) { e.stopPropagation(); }}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={closeSearch}
                className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--psc-primary-container)] rounded-full p-2"
                aria-label="Close search"
              >
                <CloseIcon className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-2xl">
                search
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full py-4 pl-14 pr-6 bg-white/10 backdrop-blur-sm text-white text-lg md:text-xl rounded-2xl border border-white/20 focus:border-[var(--psc-primary-container)] focus:outline-none focus:ring-2 focus:ring-[var(--psc-primary-container)]/50 transition-all placeholder:text-white/40"
                onKeyDown={function(e) {
                  if (e.key === 'Enter') {
                    var query = (e.target as HTMLInputElement).value;
                    if (query.trim()) {
                      window.location.href = '/search?q=' + encodeURIComponent(query.trim());
                    }
                  }
                }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--psc-primary-container)] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#d47d00] transition-colors text-sm"
                onClick={function() {
                  var input = searchInputRef.current;
                  if (input && input.value.trim()) {
                    window.location.href = '/search?q=' + encodeURIComponent(input.value.trim());
                  }
                }}
              >
                Search
              </button>
            </div>

            <div className="mt-6 text-white/40 text-sm text-center">
              Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/60 font-mono text-xs">Enter</kbd> to search or <kbd className="px-2 py-1 bg-white/10 rounded text-white/60 font-mono text-xs">ESC</kbd> to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}*/