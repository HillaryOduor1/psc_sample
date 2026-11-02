// src/components/Sidebar/SidebarDropdown.tsx
import * as React from "react";
import SidebarItem from "./SidebarItem";

interface SidebarDropdownItem {
  name: string;
  href: string;
  external?: boolean;
}

interface SidebarDropdownProps {
  name: string;
  label: string;
  icon?: React.ReactNode;
  items: SidebarDropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onItemClick?: () => void;
}

var triggerHaptic = function () {
  try {
    if (window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export default function SidebarDropdown(props: SidebarDropdownProps) {
  var isOpen = props.isOpen;

  function handleToggle() {
    triggerHaptic();
    props.onToggle();
  }

  var panelClass =
    "flex flex-col overflow-hidden transition-all duration-300 " +
    (isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0");

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-[var(--psc-on-surface,#0f172a)] transition-colors hover:bg-[var(--psc-primary,#e68c00)]/10 min-h-[44px]"
        aria-expanded={isOpen}
        aria-controls={"dropdown-" + props.name}
      >
        <span className="flex items-center">
          {props.icon && (
            <span className="flex-shrink-0 mr-3" aria-hidden="true">
              {props.icon}
            </span>
          )}
          <span>{props.label}</span>
        </span>
        <svg
          className={
            "h-4 w-4 flex-shrink-0 transition-transform duration-200 " +
            (isOpen ? "rotate-180" : "")
          }
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div id={"dropdown-" + props.name} className={panelClass}>
        <div className="ml-4 border-l-2 border-[var(--psc-primary,#e68c00)]/40 pl-2 mt-1">
          {props.items.map(function (item, i) {
            return (
              <SidebarItem
                key={i}
                label={item.name}
                href={item.href}
                external={item.external}
                onClick={props.onItemClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
