// src/components/AppLoadingDots.tsx
import * as React from "react";

export default function AppLoadingDots() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#f9f9f9] dark:bg-[#2f3131]"
      style={{ zIndex: 9999 }}
      aria-label="Loading application"
    >
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map(function (i) {
          return (
            <div
              key={i}
              className="h-3 w-3 animate-bounce rounded-full bg-[#e68c00]"
              style={{ animationDelay: i * 0.15 + "s" }}
            />
          );
        })}
      </div>
    </div>
  );
}