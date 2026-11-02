// src/components/Sidebar/SidebarItem.tsx
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
  external?: boolean;
}

var triggerHaptic = function () {
  try {
    if (window.navigator && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(50);
    }
  } catch (e) {}
};

export default function SidebarItem(props: SidebarItemProps) {
  var location = useLocation();
  var isActive =
    location.pathname === props.href ||
    (props.href.indexOf("#") !== -1 && location.pathname === "/");
  var hasHash = props.href.indexOf("#") !== -1;

  function handleClick() {
    triggerHaptic();
    if (props.onClick) props.onClick();
  }

  var className =
    "flex items-center rounded-lg px-4 py-3 text-sm transition-colors min-h-[44px] " +
    (isActive
      ? "bg-[var(--psc-primary,#e68c00)] text-white font-semibold"
      : "text-[var(--psc-on-surface,#0f172a)] hover:bg-[var(--psc-primary,#e68c00)]/10");

  if (props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {props.icon && (
          <span className="flex-shrink-0 mr-3" aria-hidden="true">
            {props.icon}
          </span>
        )}
        <span>{props.label}</span>
      </a>
    );
  }

  if (hasHash) {
    return (
      <a
        href={props.href}
        onClick={handleClick}
        className={className}
        aria-current={isActive ? "location" : undefined}
      >
        {props.icon && (
          <span className="flex-shrink-0 mr-3" aria-hidden="true">
            {props.icon}
          </span>
        )}
        <span>{props.label}</span>
      </a>
    );
  }

  return (
    <Link
      to={props.href}
      onClick={handleClick}
      className={className}
      aria-current={isActive ? "page" : undefined}
    >
      {props.icon && (
        <span className="flex-shrink-0 mr-3" aria-hidden="true">
          {props.icon}
        </span>
      )}
      <span>{props.label}</span>
    </Link>
  );
}
