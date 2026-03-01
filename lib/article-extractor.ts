import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';
import { ArticleContent } from './types';

export async function extractArticle(url: string): Promise<ArticleContent | null> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();
  const { document } = parseHTML(html);
  const reader = new Readability(document);
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
