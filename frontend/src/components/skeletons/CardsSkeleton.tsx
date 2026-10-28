// src/components/skeletons/CardsSkeleton.tsx
import * as React from "react";
import Skeleton from "./Skeleton";

interface CardsSkeletonProps {
  cardCount?: number;
  columns?: 1 | 2 | 3;
  hasHeroBand?: boolean;
}

export default function CardsSkeleton(props: CardsSkeletonProps) {
  var cardCount = props.cardCount || 6;
  var columns = props.columns || 3;
  var hasHeroBand = props.hasHeroBand !== false;

  var gridClass =
    columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="w-full" style={{ backgroundColor: "var(--psc-surface)" }}>
      {/* Hero band (Jobs/Internship have a dark hero at the top) */}
      {hasHeroBand && (
        <div
          className="w-full"
          style={{ backgroundColor: "#1a1c1c", minHeight: "350px", paddingTop: "6rem", display: "flex", alignItems: "center" }}
        >
          <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 lg:px-16 py-8">
            <Skeleton
              className="mb-4"
              style={{ width: "220px", height: "40px", backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <Skeleton
              style={{ width: "110px", height: "3px", backgroundColor: "rgba(255,255,255,0.10)" }}
            />
          </div>
        </div>
      )}

      {/* Tabs strip */}
      {hasHeroBand && (
        <div
          className="w-full py-4 px-4 md:px-10 lg:px-16"
          style={{ backgroundColor: "var(--psc-surface-container-low)" }}
        >
          <div className="max-w-[1280px] mx-auto flex flex-wrap gap-2">
            {[0, 1, 2, 3].map(function (i) {
              return (
                <Skeleton
                  key={i}
                  style={{ width: "130px", height: "36px", borderRadius: "8px" }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Cards grid */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-16 py-12">
        <div className={"grid gap-6 " + gridClass}>
          {Array.from({ length: cardCount }).map(function (_, i) {
            return (
              <div
                key={i}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--psc-surface-container)",
                  border: "1px solid var(--psc-border)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Skeleton style={{ width: "80px", height: "24px", borderRadius: "9999px" }} />
                  <Skeleton style={{ width: "100px", height: "14px" }} />
                </div>
                <Skeleton className="mb-3" style={{ width: "90%", height: "18px" }} />
                <Skeleton className="mb-3" style={{ width: "70%", height: "18px" }} />
                <Skeleton className="mb-6" style={{ width: "100%", height: "14px" }} />
                <Skeleton className="mb-2" style={{ width: "85%", height: "14px" }} />
                <div
                  className="mt-6 pt-4 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--psc-border)" }}
                >
                  <Skeleton style={{ width: "140px", height: "12px" }} />
                  <Skeleton style={{ width: "90px", height: "24px", borderRadius: "9999px" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}