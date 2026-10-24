// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-40 pb-24 text-center">
      <p className="text-7xl md:text-9xl font-black text-[var(--psc-primary)]">
        404
      </p>
      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-[var(--psc-on-surface)]">
        Page not found
      </h1>
      <p className="mt-3 text-[var(--psc-on-surface-variant)]">
        The page you're looking for may have been moved, renamed, or no longer
        exists.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-xl bg-[var(--psc-primary)] px-5 py-3 text-sm font-bold text-white transition-colors hover:brightness-110"
      >
        Back to home
      </Link>
    </div>
  );
}