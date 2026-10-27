// src/components/ClickFeedback.tsx
import * as React from "react";

/*
 * Global click-feedback system.
 *
 * For every clickable element (button, a, [role=button], submit inputs),
 * this component injects a ripple <span> at the click point. The ripple
 * expands and fades over 600ms, giving the user immediate visual feedback
 * that their click was registered — even if the handler is async and the
 * network hasn't responded yet.
 *
 * Works on Chrome 44: uses only DOM API, no CSS animations library, no
 * pointer events (uses mouse + touch + keyboard events for maximum
 * compatibility).
 */
export default function ClickFeedback() {
  React.useEffect(function () {
    function isClickable(el: Element | null): HTMLElement | null {
      var node: Element | null = el;
      while (node) {
        if (node instanceof HTMLElement) {
          var tag = node.tagName.toLowerCase();
          if (tag === "button" || tag === "a") return node;
          var role = node.getAttribute("role");
          if (role === "button") return node;
          var type = node.getAttribute("type");
          if (type === "submit" && tag === "input") return node;
        }
        node = node.parentElement;
      }
      return null;
    }

    function applyRipple(target: HTMLElement, clientX: number, clientY: number) {
      var rect = target.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;

      // Ensure the target is positioned so the ripple is clipped correctly
      var computedStyle = window.getComputedStyle(target);
      if (computedStyle.position === "static") {
        target.style.position = "relative";
      }
      if (computedStyle.overflow !== "hidden") {
        target.style.overflow = "hidden";
      }

      var ripple = document.createElement("span");
      ripple.className = "psc-click-ripple";
      var size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText =
        "position:absolute;" +
        "border-radius:9999px;" +
        "pointer-events:none;" +
        "background-color:currentColor;" +
        "opacity:0.22;" +
        "width:" + size + "px;" +
        "height:" + size + "px;" +
        "left:" + (x - size / 2) + "px;" +
        "top:" + (y - size / 2) + "px;" +
        "transform:scale(0);" +
        "transition:transform 0.6s ease-out, opacity 0.6s ease-out;" +
        "z-index:0;";

      target.appendChild(ripple);

      // Force reflow so the initial transform is committed before transition
      // (Chrome 44 requires an explicit reflow read to trigger transitions
      // that are set in the same tick as appendChild.)
      void ripple.offsetWidth;

      ripple.style.transform = "scale(1)";
      ripple.style.opacity = "0";

      window.setTimeout(function () {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 650);
    }

    function handlePointer(e: MouseEvent | Touch) {
      var target = isClickable(e.target as Element);
      if (!target) return;
      // Skip disabled buttons
      if (target instanceof HTMLButtonElement && target.disabled) return;
      if (target.getAttribute("aria-disabled") === "true") return;
      applyRipple(target, e.clientX, e.clientY);
    }

    function handleMouse(e: MouseEvent) {
      handlePointer(e);
    }

    function handleTouchEnd(e: TouchEvent) {
      if (e.changedTouches && e.changedTouches.length > 0) {
        var touch = e.changedTouches[0];
        handlePointer(touch as any);
      }
    }

    function handleKeyActivate(e: KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var el = document.activeElement;
      if (!(el instanceof HTMLElement)) return;
      var target = isClickable(el);
      if (!target) return;
      var rect = target.getBoundingClientRect();
      applyRipple(target, rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    // Register on capture phase so we get clicks even if handlers call
    // stopPropagation. mousedown fires earlier than click → faster feedback.
    document.addEventListener("mousedown", handleMouse, true);
    document.addEventListener("touchend", handleTouchEnd, true);
    document.addEventListener("keydown", handleKeyActivate, true);

    return function () {
      document.removeEventListener("mousedown", handleMouse, true);
      document.removeEventListener("touchend", handleTouchEnd, true);
      document.removeEventListener("keydown", handleKeyActivate, true);
    };
  }, []);

  return null;
}