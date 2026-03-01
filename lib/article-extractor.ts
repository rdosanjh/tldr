import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { ArticleContent } from './types';

export async function extractArticle(url: string): Promise<ArticleContent | null> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; PodcastBot/1.0)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    return null;
  }

  return {
    title: article.title ?? 'Untitled',
    content: article.content ?? '',
    textContent: article.textContent ?? '',
    byline: article.byline ?? null,
    excerpt: article.excerpt ?? null,
    siteName: article.siteName ?? null,
    length: article.length ?? 0,
  };
}
