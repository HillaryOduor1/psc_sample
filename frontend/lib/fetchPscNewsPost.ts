// src/lib/fetchPscNewsPost.ts
export interface PscNewsDetail {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  formattedDate: string;
  author: string;
  href: string;
}

function toText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && "rendered" in (v as any)) {
    return String((v as any).rendered ?? "");
  }
  return String(v);
}

function getImage(raw: any): string {
  if (raw.jetpack_featured_media_url) return raw.jetpack_featured_media_url;
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  if (media?.source_url) return media.source_url;
  if (media?.media_details?.sizes?.full?.source_url) {
    return media.media_details.sizes.full.source_url;
  }
  return "";
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

export async function fetchPscNewsPost(
  identifier: string | number
): Promise<PscNewsDetail> {
  const isId = /^\d+$/.test(String(identifier));
  const qs = isId
    ? `id=${identifier}`
    : `slug=${encodeURIComponent(String(identifier))}`;

  const res = await fetch(`/api/psc-news-post?${qs}`, {
    headers: { Accept: "application/json" },
  });

  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error(`PSC news detail failed: ${res.status}`);

  const raw: any = await res.json();

  return {
    slug: raw?.slug ?? "",
    title: toText(raw?.title),
    content: toText(raw?.content), // full HTML string
    excerpt: toText(raw?.excerpt),
    image: getImage(raw),
    date: raw?.date ?? "",
    formattedDate: raw?.formattedDate ?? "",
    author: raw?.author ?? "Public Service Commission",
    href: raw?.href ?? "https://www.publicservice.go.ke/",
  };
}