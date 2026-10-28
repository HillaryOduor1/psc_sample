// src/components/skeletons/Skeleton.tsx
import * as React from "react";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  circle?: boolean;
}

export default function Skeleton(props: SkeletonProps) {
  return (
    <div
      className={"animate-pulse " + (props.className || "")}
      style={{
        backgroundColor: "var(--psc-surface-variant, #eeeeea)",
        borderRadius: props.circle ? "9999px" : "8px",
        ...(props.style || {}),
      }}
      aria-hidden="true"
    />
  );
}