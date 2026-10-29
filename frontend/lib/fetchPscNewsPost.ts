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

function toText(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && 'rendered' in (value as any)) {
    return String((value as any).rendered ?? '');
  }
  return String(value);
}

export async function fetchPscNewsPost(slug: string): Promise<PscNewsDetail> {
  const res = await fetch(
    `/api/psc-news-post?slug=${encodeURIComponent(slug)}`,
    { headers: { Accept: 'application/json' } }
  );

  if (res.status === 404) throw new Error('NOT_FOUND');
  if (!res.ok) throw new Error(`PSC news detail failed: ${res.status}`);

  const raw: any = await res.json();

  return {
    slug: raw?.slug ?? slug,
    title: toText(raw?.title),
    content: toText(raw?.content),
    excerpt: toText(raw?.excerpt),
    image: raw?.image ?? '/assets/fallback-news.jpg',
    date: raw?.date ?? '',
    formattedDate: raw?.formattedDate ?? '',
    author: raw?.author ?? 'Public Service Commission',
    href: raw?.href ?? 'https://www.publicservice.go.ke/',
  };
}