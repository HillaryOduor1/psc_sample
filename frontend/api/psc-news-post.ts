// frontend/api/psc-news-post.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

const TIMEOUT_MS = 8000;

function stripHtml(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
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

/** Strip only dangerous things — leave layout markup intact. */
function sanitizeHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const id = String(req.query.id || "").trim();
  const slug = String(req.query.slug || "").trim();

  let upstreamUrl = "";
  if (id && /^\d+$/.test(id)) {
    upstreamUrl = `https://www.publicservice.go.ke/wp-json/wp/v2/posts/${id}?_embed`;
  } else if (slug) {
    upstreamUrl =
      "https://www.publicservice.go.ke/wp-json/wp/v2/posts" +
      `?slug=${encodeURIComponent(slug)}&_embed`;
  } else {
    res.status(400).json({ error: "Missing id or slug" });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(upstreamUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "PSC-Sample-Website/1.0 (+https://psc-sample.vercel.app)",
        Accept: "application/json",
      },
    });

    if (!upstream.ok) {
      res.status(502).json({ error: `Upstream returned ${upstream.status}` });
      return;
    }

    const raw = await upstream.json();
    // The by-ID endpoint returns an object, the by-slug endpoint returns an array.
    const post = Array.isArray(raw) ? raw[0] : raw;

    if (!post || !post.id) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    const detail = {
      slug: post.slug,
      title: stripHtml(post?.title?.rendered),
      content: sanitizeHtml(post?.content?.rendered ?? ""), // full HTML
      excerpt: stripHtml(post?.excerpt?.rendered),
      image: getImage(post),
      date: post?.date ?? "",
      formattedDate: formatDate(post?.date),
      author: "Public Service Commission",
      href: post?.link ?? "https://www.publicservice.go.ke/",
    };

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=1200"
    );
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(detail);
  } catch (err: any) {
    if (err?.name === "AbortError") {
      res.status(504).json({ error: "Upstream request timed out" });
      return;
    }
    console.error("psc-news-post handler error:", err);
    res.status(502).json({ error: "Could not load PSC news post" });
  } finally {
    clearTimeout(timeout);
  }
}