import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../../../analytics";
import { fetchPscNews, type PscNewsItem } from "../../../../lib/fetchPscNews";

const CACHE_KEY = "psc_cached_news_v1";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<PscNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let hasCache = false;

    // 1. Load from local storage immediately for fast render / offline support
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setNewsItems(JSON.parse(cached));
        setLoading(false);
        hasCache = true;
      }
    } catch (e) {
      console.warn("Failed to read news cache", e);
    }

    // 2. Fetch fresh news in the background
    fetchPscNews()
      .then((items) => {
        setNewsItems(items);
        // Save fresh data for next time
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(items));
        } catch (e) {
          console.warn("Failed to save news to cache (quota full?)", e);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch live news:", err);
        // If fetch fails, and we already have cache, do nothing.
        // If we don't have cache, the empty state will show.
      })
      .finally(() => {
        if (!hasCache) {
          setLoading(false);
        }
      });
  }, []);

  if (loading) {
    return null; // Or return a skeleton loader
  }

  if (!newsItems || newsItems.length === 0) {
    return null; // Hide section entirely if no news and no cache
  }

  return (
    <section style={{ backgroundColor: "var(--psc-surface)" }} className="py-20">
      <div className="px-4 md:px-8 max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--psc-on-surface)" }}>
          News Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <article
              key={news.id}
              className="rounded-xl overflow-hidden border flex flex-col"
              style={{
                borderColor: "var(--psc-border)",
                backgroundColor: "var(--psc-surface-container)",
              }}
            >
              {/* Only render image wrapper if an image URL exists */}
              {news.image && <NewsImage src={news.image} alt={news.title} />}
              
              <div className="p-6 flex flex-col flex-grow">
                <h3
                  className="text-lg font-semibold mb-3 line-clamp-2"
                  style={{ color: "var(--psc-on-surface)" }}
                >
                  {news.title}
                </h3>
                <p
                  className="mb-4 line-clamp-3 flex-grow"
                  style={{ color: "var(--psc-on-surface-variant)" }}
                >
                  {news.excerpt}
                </p>
                <button
                  onClick={() => {
                    trackEvent("read_more");
                    navigate(`/news/${news.id}`);
                  }}
                  className="text-sm font-bold flex items-center gap-1 mt-auto hover:underline"
                  style={{ color: "var(--psc-primary)" }}
                >
                  Read More{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component to gracefully handle image load errors
function NewsImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    // Render a styled placeholder if the thumbnail fails to load
    return (
      <div 
        className="w-full h-48 flex items-center justify-center"
        style={{ backgroundColor: "var(--psc-surface-container-high)" }}
      >
        <span className="material-symbols-outlined text-4xl opacity-20">
          image
        </span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className="w-full h-48 object-cover"
      src={src}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

export default NewsSection;

/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../../../analytics";
import { fetchPscNews, type PscNewsItem } from "../../../../lib/fetchPscNews";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<PscNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPscNews()
      .then((items) => setNewsItems(items))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section style={{ backgroundColor: "var(--psc-surface)" }} className="py-20">
      <div className="px-4 md:px-8 max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--psc-on-surface)" }}>
          News Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <article
              key={news.id}
              className="rounded-xl overflow-hidden border flex flex-col"
              style={{
                borderColor: "var(--psc-border)",
                backgroundColor: "var(--psc-surface-container)",
              }}
            >
              {news.image && (
                <img
                  alt={news.title}
                  className="w-full h-48 object-cover"
                  src={news.image}
                  loading="lazy"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3
                  className="text-lg font-semibold mb-3 line-clamp-2"
                  style={{ color: "var(--psc-on-surface)" }}
                >
                  {news.title}
                </h3>
                <p
                  className="mb-4 line-clamp-3 flex-grow"
                  style={{ color: "var(--psc-on-surface-variant)" }}
                >
                  {news.excerpt}
                </p>
                <button
                  onClick={() => {
                    trackEvent("read_more");
                    navigate(`/news/${news.id}`); // ← by ID
                  }}
                  className="text-sm font-bold flex items-center gap-1 mt-auto hover:underline"
                  style={{ color: "var(--psc-primary)" }}
                >
                  Read More{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;*/
