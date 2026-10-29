// src/lib/fetchPscNews.ts
export interface PscNewsItem {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  href: string;
  slug: string;
}

const PSC_NEWS_ENDPOINT = '/api/psc-news';

/**
 * WordPress sometimes returns `{ rendered, protected }` objects.
 * This guarantees the caller always gets a string.
 */
function toText(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return stripHtml(value);
  if (typeof value === 'object' && 'rendered' in (value as any)) {
    return stripHtml(String((value as any).rendered ?? ''));
  }
  return String(value);
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8230;/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalize(raw: any): PscNewsItem {
  const media = raw?._embedded?.['wp:featuredmedia']?.[0];

  return {
    title: toText(raw?.title),
    excerpt: toText(raw?.excerpt),
    image: media?.source_url ?? '/assets/fallback-news.jpg',
    date: formatDate(raw?.date),
    href: raw?.link ?? 'https://www.publicservice.go.ke/',
    slug: raw?.slug ?? '',
  };
}

function formatDate(iso: unknown): string {
  if (typeof iso !== 'string' || !iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export async function fetchPscNews(): Promise<PscNewsItem[]> {
  const res = await fetch(PSC_NEWS_ENDPOINT, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) throw new Error(`PSC news request failed: ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('Unexpected response shape from /api/psc-news');
  }

  // Normalize every item so `title` and `excerpt` are always strings,
  // regardless of whether the server already flattened them.
  return data.map(normalize);
}