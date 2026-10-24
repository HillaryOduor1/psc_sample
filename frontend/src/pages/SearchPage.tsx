// src/pages/SearchPage.tsx

import { Link, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  return (
    <div className="mx-auto max-w-4xl px-4 pt-32 pb-20">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--psc-primary)]">
        Search
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--psc-on-surface)]">
        {query ? `Results for "${query}"` : "Search"}
      </h1>

      {!query && (
        <p className="mt-4 text-[var(--psc-on-surface-variant)]">
          Type a keyword into the search bar to find pages, publications,
          vacancies, and more.
        </p>
      )}

      {query && (
        <div className="mt-8 rounded-2xl border border-[var(--psc-border)] bg-[var(--psc-surface-container)] p-6">
          <p className="text-sm text-[var(--psc-on-surface-variant)]">
            No results yet. Wire this page up to your search API or local index.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex text-sm font-semibold text-[var(--psc-primary)] hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      )}
    </div>
  );
}