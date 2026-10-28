// src/polyfills/mediaQueryListener.ts
//
// MediaQueryList.addEventListener("change", fn) is Safari 14+ only.
// iOS 12 (iPhone 6, iPhone 5s, iPad Air 1 …) needs .addListener().
// This shim makes the modern API available everywhere with no
// change to any consumer.

(function () {
  if (typeof window === "undefined") return;
  if (typeof (window as any).MediaQueryList === "undefined") return;

  var proto = (window as any).MediaQueryList.prototype;
  if (!proto) return;

  if (typeof proto.addEventListener !== "function" && typeof proto.addListener === "function") {
    proto.addEventListener = function (type: string, listener: any, options?: any) {
      if (type === "change") {
        this.addListener(listener);
      }
    };
  }

  if (typeof proto.removeEventListener !== "function" && typeof proto.removeListener === "function") {
    proto.removeEventListener = function (type: string, listener: any, options?: any) {
      if (type === "change") {
        this.removeListener(listener);
      }
    };
  }
})();

export {};