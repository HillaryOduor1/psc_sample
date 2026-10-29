// frontend/api/psc-news.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const UPSTREAM_URL =
  'https://www.publicservice.go.ke/wp-json/wp/v2/posts' +
  '?per_page=3&_embed&orderby=date&order=desc';

const TIMEOUT_MS = 8000;

interface PscNewsItem {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  href: string;
}

/** Strip HTML tags and collapse whitespace. */
function stripHtml(html: string | undefined): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8230;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Format an ISO date string as e.g. "Oct 29, 2026". */
function formatDate(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(UPSTREAM_URL, {
      signal: controller.signal,
      headers: {
        // Be polite and identify the request; WordPress may throttle
        // requests with empty user agents.
        'User-Agent':
          'PSC-Sample-Website/1.0 (+https://psc-sample.vercel.app)',
        Accept: 'application/json',
      },
    });

    if (!upstream.ok) {
      res
        .status(502)
        .json({ error: `Upstream returned ${upstream.status}` });
      return;
    }

    const posts: any[] = await upstream.json();

    const items: PscNewsItem[] = posts.map((post) => {
      const media = post?._embedded?.['wp:featuredmedia']?.[0];

      return {
        title: stripHtml(post?.title?.rendered),
        excerpt: stripHtml(post?.excerpt?.rendered),
        image: media?.source_url ?? '/assets/fallback-news.jpg',
        date: formatDate(post?.date),
        href: post?.link ?? 'https://www.publicservice.go.ke/',
      };
    });

    // Let Vercel's CDN cache the response for 10 minutes and serve
    // stale content while revalidating for up to 20 minutes.
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=1200'
    );
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(items);
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      res.status(504).json({ error: 'Upstream request timed out' });
      return;
    }
    console.error('psc-news handler error:', err);
    res.status(502).json({ error: 'Could not load PSC news' });
  } finally {
    clearTimeout(timeout);
  }
}