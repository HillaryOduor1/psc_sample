// src/pages/news/NewsDetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPscNewsPost, type PscNewsDetail } from "../../../../lib/fetchPscNewsPost";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PscNewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"not-found" | "failed" | null>(null);

  useEffect(() => {
    if (!id) {
      setError("not-found");
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    fetchPscNewsPost(id)
      .then((data) => {
        if (!cancelled) {
          setPost(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "";
        setError(msg === "NOT_FOUND" ? "not-found" : "failed");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div
      className="min-h-screen py-16 px-4 md:px-8"
      style={{ backgroundColor: "var(--psc-surface)" }}
    >
      <div className="max-w-[860px] mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm mb-6"
          style={{ color: "var(--psc-on-surface-variant)" }}
        >
          <button type="button" onClick={() => navigate("/")} className="hover:underline">
            Home
          </button>
          <span aria-hidden="true">/</span>
          <button type="button" onClick={() => navigate("/news")} className="hover:underline">
            News
          </button>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--psc-on-surface)" }}>
            {post?.title
              ? post.title.slice(0, 60) + (post.title.length > 60 ? "…" : "")
              : "Article"}
          </span>
        </nav>

        {loading && (
          <p style={{ color: "var(--psc-on-surface-variant)" }}>Loading article…</p>
        )}

        {error === "not-found" && (
          <div>
            <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--psc-on-surface)" }}>
              Article not found
            </h1>
            <p style={{ color: "var(--psc-on-surface-variant)" }}>
              This news item does not exist or has been removed.
            </p>
            <button
              type="button"
              onClick={() => navigate("/news")}
              className="mt-6 inline-flex items-center gap-2 font-bold hover:underline"
              style={{ color: "var(--psc-primary)" }}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to News
            </button>
          </div>
        )}

        {error === "failed" && (
          <div role="alert">
            <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--psc-on-surface)" }}>
              Could not load this article
            </h1>
            <p style={{ color: "var(--psc-on-surface-variant)" }}>Please try again later.</p>
            <button
              type="button"
              onClick={() => navigate("/news")}
              className="mt-6 inline-flex items-center gap-2 font-bold hover:underline"
              style={{ color: "var(--psc-primary)" }}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to News
            </button>
          </div>
        )}

        {!loading && !error && post && (
          <article>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-xl object-cover mb-8"
                style={{ maxHeight: 420 }}
              />
            )}

            <h1
              className="text-3xl md:text-4xl font-bold leading-tight mb-4"
              style={{ color: "var(--psc-on-surface)" }}
            >
              {post.title}
            </h1>

            <div
              className="flex flex-wrap items-center gap-4 text-sm mb-10 pb-6"
              style={{
                color: "var(--psc-on-surface-variant)",
                borderBottom: "1px solid var(--psc-border)",
              }}
            >
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                {post.formattedDate || post.date}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">person</span>
                {post.author}
              </span>
            </div>

            <div
              className="news-content"
              style={{
                color: "var(--psc-on-surface)",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div
              className="flex flex-wrap items-center gap-4 mt-12 pt-8"
              style={{ borderTop: "1px solid var(--psc-border)" }}
            >
              <button
                type="button"
                onClick={() => navigate("/news")}
                className="inline-flex items-center gap-2 font-bold hover:underline"
                style={{ color: "var(--psc-primary)" }}
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to News
              </button>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold hover:underline ml-auto"
                style={{ color: "var(--psc-primary)" }}
              >
                Open on PSC website
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default NewsDetailPage;