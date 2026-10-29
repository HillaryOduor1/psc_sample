// frontend/api/psc-news-post.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const TIMEOUT_MS = 8000;

interface PscNewsDetail {
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

function stripHtml(html: string | undefined): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8230;/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Minimal sanitizer for WordPress's `content.rendered`.
 */
function sanitizeHtml(html: string): string {
  if (!html) return '';

  // Remove <script>, <style>, <object>, <embed>, <form>
  html = html.replace(
    /<(script|style|object|embed|form)[\s\S]*?<\/\1>/gi,
    ''
  );

  // Allow YouTube / Vimeo iframes only; drop every other iframe.
  html = html.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, (match) => {
    const src = /src=["']([^"']+)["']/i.exec(match)?.[1] ?? '';
    if (
      /^https?:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//i.test(
        src
      )
    ) {
      return match;
    }
    return '';
  });

  // Strip inline on* handlers.
  html = html.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  // Neutralize javascript: / data: URLs.
  html = html.replace(
    /\s(href|src)\s*=\s*("|')\s*(javascript|data):[^"']*\2/gi,
    ' $1="#"'
  );

  return html;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const slug = String(req.query.slug || '').trim();

  if (!slug) {
    res.status(400).json({ error: 'Missing slug query parameter' });
    return;
  }

  // Note the _fields parameter — this forces WordPress to send the full 'content' object.
  const upstreamUrl =
    'https://www.publicservice.go.ke/wp-json/wp/v2/posts' +
    `?slug=${encodeURIComponent(slug)}&_embed&_fields=id,slug,date,link,title,content,excerpt,_links,_embedded`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const upstream = await fetch(upstreamUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'PSC-Sample-Website/1.0 (+https://psc-sample.vercel.app)',
        Accept: 'application/json',
      },
    });

    if (!upstream.ok) {
      res.status(502).json({ error: `Upstream returned ${upstream.status}` });
      return;
    }

    const posts: any[] = await upstream.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const post = posts[0];
    const media = post?._embedded?.['wp:featuredmedia']?.[0];
    const author = post?._embedded?.author?.[0];

    const detail: PscNewsDetail = {
      slug: post.slug ?? slug,
      title: stripHtml(post?.title?.rendered),
      content: sanitizeHtml(post?.content?.rendered ?? ''),
      excerpt: stripHtml(post?.excerpt?.rendered),
      image: media?.source_url ?? '/assets/fallback-news.jpg',
      date: post?.date ?? '',
      formattedDate: formatDate(post?.date),
      author: author?.name ?? 'Public Service Commission',
      href: post?.link ?? 'https://www.publicservice.go.ke/',
    };

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=1200'
    );
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(detail);
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      res.status(504).json({ error: 'Upstream request timed out' });
      return;
    }
    console.error('psc-news-post handler error:', err);
    res.status(502).json({ error: 'Could not load PSC news post' });
  } finally {
    clearTimeout(timeout);
  }
}