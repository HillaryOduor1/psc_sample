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

  /*Theme-aware colors are read from CSS variables (defined in index.css).The `.dark` block in index.css already overrides these variables,so i don't need any JS state or MutationObserver here — the colors flip automatically when the theme class changes on <html>.
   */
  var sidebarBg = "var(--psc-surface-container, #ffffff)";
  var sidebarBorder = "var(--psc-border, rgba(0,0,0,0.08))";
  var sidebarTextColor = "var(--psc-on-surface, #0f172a)";
  var sidebarTextMuted = "var(--psc-on-surface-variant, #4a4a4a)";

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
        className="fixed top-0 left-0 z-[101] flex w-[300px] flex-col transition-transform duration-300 ease-in-out md:hidden"
        style={{
          height: "calc(var(--vh, 1vh) * 100)",
          backgroundColor: sidebarBg,
          borderRight: "1px solid " + sidebarBorder,
          color: sidebarTextColor,
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
              style={{ color: sidebarTextColor }}
            >
              PSC
            </span>
          </Link>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 transition-colors"
            aria-label="Close sidebar"
            style={{ color: sidebarTextColor, background: "transparent" }}
            onMouseEnter={function (e) {
              e.currentTarget.style.backgroundColor = "var(--psc-hover-overlay, rgba(0,0,0,0.05))";
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
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
          <div className="flex flex-col">
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
