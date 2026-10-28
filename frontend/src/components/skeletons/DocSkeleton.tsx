// src/components/skeletons/DocSkeleton.tsx
import * as React from "react";
import Skeleton from "./Skeleton";

export default function DocSkeleton() {
  return (
    <div className="w-full" style={{ backgroundColor: "var(--psc-surface)", paddingTop: "6rem" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Small eyebrow */}
        <Skeleton className="mb-3" style={{ width: "80px", height: "12px" }} />
        {/* Title */}
        <Skeleton className="mb-6" style={{ width: "60%", height: "40px" }} />
        {/* Last updated */}
        <Skeleton className="mb-8" style={{ width: "180px", height: "14px" }} />

        {/* Body paragraphs */}
        {[0, 1, 2, 3, 4, 5].map(function (i) {
          return (
            <div key={i} className="mb-6">
              <Skeleton className="mb-2" style={{ width: "100%", height: "16px" }} />
              <Skeleton className="mb-2" style={{ width: "98%", height: "16px" }} />
              <Skeleton className="mb-2" style={{ width: "92%", height: "16px" }} />
              {i % 2 === 0 && (
                <Skeleton className="mb-2" style={{ width: "40%", height: "16px" }} />
              )}
            </div>
          );
        })}

        {/* CTA / contact block */}
        <div
          className="mt-10 p-6 rounded-xl"
          style={{
            backgroundColor: "var(--psc-surface-container)",
            border: "1px solid var(--psc-border)",
          }}
        >
          <Skeleton className="mb-3" style={{ width: "50%", height: "20px" }} />
          <Skeleton className="mb-4" style={{ width: "100%", height: "16px" }} />
          <Skeleton style={{ width: "160px", height: "40px", borderRadius: "8px" }} />
        </div>
      </div>
    </div>
  );
}