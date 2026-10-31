// src/lib/fetchPscNews.ts
export interface PscNewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  href: string;
}

function toText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return stripHtml(v);
  if (typeof v === "object" && "rendered" in (v as any)) {
    return stripHtml(String((v as any).rendered ?? ""));
  }
  return String(v);
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

export async function fetchPscNews(): Promise<PscNewsItem[]> {
  const res = await fetch("/api/psc-news", {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`PSC news list failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected list response");

  return data.map((post: any) => ({
    id: Number(post?.id),
    slug: post?.slug ?? "",
    title: toText(post?.title),
    excerpt: toText(post?.excerpt),
    image: getImage(post),
    date: formatDate(post?.date),
    href: post?.link ?? "https://www.publicservice.go.ke/",
  }));
}