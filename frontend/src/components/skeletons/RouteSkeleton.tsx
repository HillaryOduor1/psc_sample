// src/components/skeletons/RouteSkeleton.tsx
import * as React from "react";
import { useLocation } from "react-router-dom";
import HeroSkeleton from "./HeroSkeleton";
import CardsSkeleton from "./CardsSkeleton";
import DocSkeleton from "./DocSkeleton";

export default function RouteSkeleton() {
  var location = useLocation();
  var path = location.pathname;

  if (path === "/" || path === "") return <HeroSkeleton />;

  if (
    path === "/jobs" ||
    path === "/internship" ||
    path === "/vacancies" ||
    path === "/jobs/vacancies" ||
    path === "/tenders"
  ) {
    return <CardsSkeleton cardCount={6} columns={3} hasHeroBand={true} />;
  }

  if (
    path === "/media" ||
    path === "/news" ||
    path === "/media/news" ||
    path === "/media/events" ||
    path === "/media/announcements" ||
    path === "/media/gallery" ||
    path === "/media/videos" ||
    path === "/media/press-releases"
  ) {
    return <CardsSkeleton cardCount={6} columns={2} hasHeroBand={false} />;
  }

  if (
    path === "/resources" ||
    path === "/policies" ||
    path === "/faqs" ||
    path === "/resources/faqs"
  ) {
    return <CardsSkeleton cardCount={6} columns={2} hasHeroBand={false} />;
  }

  if (
    path === "/about" ||
    path === "/contact" ||
    path === "/search" ||
    path === "/privacy" ||
    path === "/terms" ||
    path === "/accessibility" ||
    path === "/jobs/recruitment" ||
    path.indexOf("/resources/") === 0
  ) {
    return <DocSkeleton />;
  }

  return <CardsSkeleton cardCount={4} columns={2} hasHeroBand={false} />;
}