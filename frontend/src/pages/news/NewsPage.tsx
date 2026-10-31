// src/pages/news/NewsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

interface PscNewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  href: string;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8230;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

function toText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return stripHtml(value);
  if (typeof value === "object" && "rendered" in (value as any)) {
    return stripHtml(String((value as any).rendered ?? ""));
  }
  return String(value);
}

function formatDate(iso: unknown): string {
  if (typeof iso !== "string" || !iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getImage(post: any): string {
  if (post.jetpack_featured_media_url) return post.jetpack_featured_media_url;
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (media?.source_url) return media.source_url;
  if (media?.media_details?.sizes?.full?.source_url) {
    return media.media_details.sizes.full.source_url;
  }
  return "";
}

const NewsPage = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState<PscNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "News & Updates | PSC Kenya";
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // Fetch 12 latest posts from WordPress via our API (with fallback if proxy not set up for 12)
    fetch("https://www.publicservice.go.ke/wp-json/wp/v2/posts?per_page=12&_embed")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!Array.isArray(data)) throw new Error("Unexpected response");
        
        const mapped: PscNewsItem[] = data.map((post: any) => ({
          id: Number(post?.id),
          slug: post?.slug ?? "",
          title: toText(post?.title),
          excerpt: toText(post?.excerpt),
          image: getImage(post),
          date: formatDate(post?.date),
          href: post?.link ?? "https://www.publicservice.go.ke/",
        }));
        
        setNewsItems(mapped);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Could not load news list:", err);
        setError("Unable to load news updates at this time.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SectionTitle
        text1="Updates"
        text2="News & Announcements"
        text3="Stay informed with the latest news and updates from the Public Service Commission."
      />

      {loading && (
        <p className="mt-12 text-center" style={{ color: "var(--psc-on-surface-variant)" }}>
          Loading news…
        </p>
      )}

      {error && (
        <p className="mt-12 text-center" style={{ color: "var(--psc-error)" }} role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <article
              key={news.id}
              className="rounded-xl border flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: "var(--psc-surface-container)",
                borderColor: "var(--psc-border)",
              }}
              onClick={() => navigate(`/news/${news.id}`)}
            >
              {news.image && (
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold mb-2" style={{ color: "var(--psc-primary)" }}>
                  {news.date}
                </span>
                <h3
                  className="text-lg font-bold mb-3 line-clamp-2"
                  style={{ color: "var(--psc-on-surface)" }}
                >
                  {news.title}
                </h3>
                <p
                  className="text-sm mb-4 line-clamp-3 flex-grow"
                  style={{ color: "var(--psc-on-surface-variant)" }}
                >
                  {news.excerpt}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double navigation if button is clicked
                    navigate(`/news/${news.id}`);
                  }}
                  className="text-sm font-bold hover:underline text-left mt-auto"
                  style={{ color: "var(--psc-primary)" }}
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;