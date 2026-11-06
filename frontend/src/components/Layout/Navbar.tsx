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

  var [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  var [isDarkMode, setIsDarkMode] = React.useState(false);
  var [isSearchOpen, setIsSearchOpen] = React.useState(false);
  var [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  var searchInputRef = React.useRef<HTMLInputElement>(null);
  var dropdownTimeoutRef = React.useRef<number | null>(null);
  var navRef = React.useRef<HTMLElement>(null);

  var navItems: NavLink[] = content && content.navigation ? (content.navigation as NavLink[]) : (navlinks as NavLink[]);

  function isActive(path: string) {
    if (!path) return false;
    if (path === "/") return location.pathname === path;
    return location.pathname === path || location.pathname.indexOf(path + "/") === 0;
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
        var rect = heroElement.getBoundingClientRect();
        if (rect.bottom <= 0) {
          setIsScrolled(true); 
        } else {
          setIsScrolled(false); 
        }
      } else {
        setIsScrolled(true);
      }
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return function () {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  React.useEffect(function () {
    function handleClickOutside(e: MouseEvent) {
      var target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
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

  var navbarClass = isScrolled ? "navbar-solid" : "navbar-transparent";

  function getLinkColor(active: boolean) {
    if (active) return isScrolled ? "var(--psc-primary, #e68c00)" : "var(--psc-primary-container, #e68c00)";
    if (isScrolled) return isDarkMode ? "rgba(255,255,255,0.88)" : "#334155";
    return "rgba(255,255,255,0.92)";
  }

  function getIconColor() {
    if (!isScrolled) return "#ffffff";
    return isDarkMode ? "#e5e7eb" : "#0f172a";
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

  // FIX 1: Added whitespace-nowrap to prevent text from breaking into two lines
  var navItemBase = "psc-nav-link relative flex h-full items-center rounded-md font-semibold transition-colors duration-200 focus:outline-none whitespace-nowrap";

  function getDropdownWidth(count: number): number {
    if (count <= 3) return 300;
    if (count <= 6) return 540;
    return 660;
  }

  function renderDropdownItem(child: NavLink, index: number) {
    if (!child || !child.href) return null;

    var childActive = isActive(child.href);
    return (
      <Link
        key={child.name}
        to={child.href}
        onClick={function () { setOpenDropdown(null); }}
        className="psc-dropdown-item group flex items-center rounded-xl px-3 py-3 transition-colors focus:outline-none"
        style={{ backgroundColor: childActive ? "rgba(230,140,0,0.12)" : "transparent", textDecoration: "none" }}
        onMouseEnter={function (e) { if (!childActive) e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
        onMouseLeave={function (e) { if (!childActive) e.currentTarget.style.backgroundColor = "transparent"; }}
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold mr-3"
          style={{ backgroundColor: childActive ? "var(--psc-primary, #e68c00)" : isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", color: childActive ? "#ffffff" : isDarkMode ? "rgba(255,255,255,0.85)" : "#334155" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold" style={{ color: childActive ? "var(--psc-primary, #e68c00)" : isDarkMode ? "rgba(255,255,255,0.92)" : "#1e293b" }}>
          {child.name}
        </span>
        <svg className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--psc-primary, #e68c00)" }} aria-hidden="true">
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
        
        {/* FIX 2: Adjusted padding (px-1 md:px-1.5) to fit more links on tablet screens */}
        <button type="button" onClick={function (e) { e.preventDefault(); e.stopPropagation(); toggleDropdown(link.name); }}
          className={navItemBase + " md:px-1.5 lg:px-2 xl:px-2.5 text-[10px] md:text-[11px] lg:text-xs xl:text-[13px] ml-1 xl:ml-2"}
          style={{ color: isDropdownOpen || active ? getLinkColor(true) : getLinkColor(false), background: "transparent", cursor: "pointer" }}
          aria-expanded={isDropdownOpen} aria-haspopup="true">
          <span>{link.name}</span>
          <svg className={"h-3 w-3 lg:h-3.5 lg:w-3.5 transition-transform duration-200 ml-1 " + (isDropdownOpen ? "rotate-180" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {active && !isDropdownOpen && renderActiveBar()}
        </button>

        {isDropdownOpen && (
          <div style={{ position: "absolute", left: "50%", top: "100%", transform: "translateX(-50%)", paddingTop: "10px", zIndex: 9999, width: widthPx + "px", maxWidth: "calc(100vw - 32px)" }}
            onMouseEnter={function () { handleDropdownEnter(link.name); }} onMouseLeave={handleDropdownLeave}>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", backgroundColor: panelBg, border: "1px solid " + panelBorder, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35), 0 10px 20px -8px rgba(0,0,0,0.2)" }}>
              <div style={{ height: "4px", width: "100%", backgroundColor: "var(--psc-primary, #e68c00)" }} />
              <div style={{ padding: "14px 20px", borderBottom: "1px solid " + headerBorder, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
      <header className={"psc-navbar fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out " + navbarClass}>
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between pl-2 pr-4 sm:pl-4 sm:pr-6 md:h-16 md:pl-2 md:pr-4 lg:h-20 lg:pl-6 lg:pr-10 xl:pl-8 xl:pr-12">
          <div className="flex items-center flex-shrink-0">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-2 transition-colors md:hidden focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center mr-1"
              style={{ color: getIconColor(), background: "transparent" }}
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

          <nav ref={navRef} className="hidden h-full items-center md:flex min-w-0 px-2">
            {navItems.map(function (link) {
              var hasChildren = !!link.children && link.children.length > 0;
              if (hasChildren) return renderDesktopDropdown(link);
              var active = isNavItemActive(link);
              return (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  // FIX 3: Reduced margins and padding for tighter fitting
                  className={navItemBase + " px-1 lg:px-1.5 xl:px-2.5 text-[10px] md:text-[11px] lg:text-xs xl:text-[13px] ml-1 xl:ml-2"} 
                  style={{ color: getLinkColor(active), textDecoration: "none" }}
                >
                  {link.name}
                  {active && renderActiveBar()}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2 transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center hidden sm:flex"
              style={{ color: getIconColor(), background: "transparent" }}
              aria-label="Open search"
            >
              <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </button>
            <ThemeToggle isScrolled={isScrolled} />
            <Link to="/" className="flex-shrink-0 focus:outline-none hidden sm:block ml-1">
              <img
                alt="PSC Logo"
                className="h-7 w-auto sm:h-8 md:h-9 lg:h-10 xl:h-12"
                src="/assets/psc-logo-1.png"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL (Unchanged) */}
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
/*import * as React from "react";
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

  var [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  var [isDarkMode, setIsDarkMode] = React.useState(false);
  var [isSearchOpen, setIsSearchOpen] = React.useState(false);
  var [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  var searchInputRef = React.useRef<HTMLInputElement>(null);
  var dropdownTimeoutRef = React.useRef<number | null>(null);
  var navRef = React.useRef<HTMLElement>(null);

  var navItems: NavLink[] = content && content.navigation ? (content.navigation as NavLink[]) : (navlinks as NavLink[]);

  function isActive(path: string) {
    if (!path) return false;
    if (path === "/") return location.pathname === path;
    return location.pathname === path || location.pathname.indexOf(path + "/") === 0;
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

  // UPDATED LOGIC: Navbar stays transparent until the hero section is completely scrolled past
  React.useEffect(function () {
    function handleScroll() {
      var heroElement = document.getElementById("hero-section");
      
      if (heroElement) {
        var rect = heroElement.getBoundingClientRect();
        // Trigger solid background ONLY when the bottom of the hero section reaches the top of the screen
        if (rect.bottom <= 0) {
          setIsScrolled(true); 
        } else {
          setIsScrolled(false); 
        }
      } else {
        // If no hero section exists on this page, always use solid background
        setIsScrolled(true);
      }
    }

    // Run on mount/route change
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return function () {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  React.useEffect(function () {
    function handleClickOutside(e: MouseEvent) {
      var target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
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

  // Apply the global CSS classes you defined in index.css
  var navbarClass = isScrolled ? "navbar-solid" : "navbar-transparent";

  function getLinkColor(active: boolean) {
    if (active) return isScrolled ? "var(--psc-primary, #e68c00)" : "var(--psc-primary-container, #e68c00)";
    if (isScrolled) return isDarkMode ? "rgba(255,255,255,0.88)" : "#334155";
    return "rgba(255,255,255,0.92)";
  }

  function getIconColor() {
    if (!isScrolled) return "#ffffff";
    return isDarkMode ? "#e5e7eb" : "#0f172a";
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
    if (!child || !child.href) return null;

    var childActive = isActive(child.href);
    return (
      <Link
        key={child.name}
        to={child.href}
        onClick={function () { setOpenDropdown(null); }}
        className="psc-dropdown-item group flex items-center rounded-xl px-3 py-3 transition-colors focus:outline-none"
        style={{ backgroundColor: childActive ? "rgba(230,140,0,0.12)" : "transparent", textDecoration: "none" }}
        onMouseEnter={function (e) { if (!childActive) e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
        onMouseLeave={function (e) { if (!childActive) e.currentTarget.style.backgroundColor = "transparent"; }}
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold mr-3"
          style={{ backgroundColor: childActive ? "var(--psc-primary, #e68c00)" : isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", color: childActive ? "#ffffff" : isDarkMode ? "rgba(255,255,255,0.85)" : "#334155" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold" style={{ color: childActive ? "var(--psc-primary, #e68c00)" : isDarkMode ? "rgba(255,255,255,0.92)" : "#1e293b" }}>
          {child.name}
        </span>
        <svg className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--psc-primary, #e68c00)" }} aria-hidden="true">
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
          className={navItemBase + " md:px-1.5 lg:px-2 xl:px-2.5 text-[11px] md:text-[11px] lg:text-xs xl:text-[13px] ml-2"}
          style={{ color: isDropdownOpen || active ? getLinkColor(true) : getLinkColor(false), background: "transparent", cursor: "pointer" }}
          aria-expanded={isDropdownOpen} aria-haspopup="true">
          <span>{link.name}</span>
          <svg className={"h-3 w-3 lg:h-3.5 lg:w-3.5 transition-transform duration-200 ml-1 " + (isDropdownOpen ? "rotate-180" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {active && !isDropdownOpen && renderActiveBar()}
        </button>

        {isDropdownOpen && (
          <div style={{ position: "absolute", left: "50%", top: "100%", transform: "translateX(-50%)", paddingTop: "10px", zIndex: 9999, width: widthPx + "px", maxWidth: "calc(100vw - 32px)" }}
            onMouseEnter={function () { handleDropdownEnter(link.name); }} onMouseLeave={handleDropdownLeave}>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", backgroundColor: panelBg, border: "1px solid " + panelBorder, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35), 0 10px 20px -8px rgba(0,0,0,0.2)" }}>
              <div style={{ height: "4px", width: "100%", backgroundColor: "var(--psc-primary, #e68c00)" }} />
              <div style={{ padding: "14px 20px", borderBottom: "1px solid " + headerBorder, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
      {/* Swapped to use the predefined CSS classes for smooth background transitions /}
      <header className={"psc-navbar fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out " + navbarClass}>
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between pl-3 pr-6 sm:pl-4 sm:pr-6 md:h-16 md:pl-3 md:pr-8 lg:h-20 lg:pl-6 lg:pr-10 xl:pl-8 xl:pr-12">
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-2 transition-colors md:hidden focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center mr-2"
              style={{ color: getIconColor(), background: "transparent" }}
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

          <nav ref={navRef} className="hidden h-full items-center md:flex" aria-label="Primary navigation">
            {navItems.map(function (link) {
              var hasChildren = !!link.children && link.children.length > 0;
              if (hasChildren) return renderDesktopDropdown(link);
              var active = isNavItemActive(link);
              return (
                <Link key={link.name} to={link.href} className={navItemBase + " px-1.5 lg:px-2 xl:px-2.5 text-[11px] md:text-[11px] lg:text-xs xl:text-[13px] ml-2"} style={{ color: getLinkColor(active), textDecoration: "none" }}>
                  {link.name}
                  {active && renderActiveBar()}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-full p-2 transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{ color: getIconColor(), background: "transparent" }}
              aria-label="Open search"
            >
              <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            </button>
            <ThemeToggle isScrolled={isScrolled} />
            <Link to="/" className="flex-shrink-0 focus:outline-none ml-1">
              <img
                alt="PSC Logo"
                className="h-7 w-auto sm:h-8 md:h-9 lg:h-10 xl:h-12"
                src="/assets/psc-logo-1.png"
              />
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
}*/