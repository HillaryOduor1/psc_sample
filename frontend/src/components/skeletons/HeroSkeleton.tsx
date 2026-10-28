// src/components/skeletons/HeroSkeleton.tsx
import * as React from "react";
import Skeleton from "./Skeleton";

export default function HeroSkeleton() {
  return (
    <div className="w-full" style={{ backgroundColor: "var(--psc-surface)" }}>
      {/* Hero band */}
      <div
        className="w-full"
        style={{
          backgroundColor: "#1a1c1c",
          minHeight: "80vh",
          paddingTop: "5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-[900px]">
            {/* Badge */}
            <Skeleton
              className="mb-4"
              style={{ width: "60px", height: "14px", backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <Skeleton
              className="mb-2"
              style={{ width: "80%", height: "32px", backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <Skeleton
              className="mb-2"
              style={{ width: "70%", height: "32px", backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <Skeleton
              className="mb-6"
              style={{ width: "55%", height: "32px", backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            {/* Subtext */}
            <Skeleton
              className="mb-2"
              style={{ width: "90%", height: "18px", backgroundColor: "rgba(255,255,255,0.10)" }}
            />
            <Skeleton
              className="mb-8"
              style={{ width: "75%", height: "18px", backgroundColor: "rgba(255,255,255,0.10)" }}
            />
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Skeleton
                style={{ width: "140px", height: "44px", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.18)" }}
              />
              <Skeleton
                style={{ width: "160px", height: "44px", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.10)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions grid */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map(function (i) {
            return (
              <div
                key={i}
                className="rounded-xl p-6"
                style={{ border: "1px solid var(--psc-border)", height: "192px" }}
              >
                <Skeleton
                  className="mb-4"
                  style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                />
                <Skeleton style={{ width: "60%", height: "20px" }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}