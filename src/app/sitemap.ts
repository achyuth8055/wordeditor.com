export default function sitemap() {
  const baseUrl = 'https://wordeditor.online';
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/documents',
    '/tools/word-counter',
    '/tools/character-counter',
    '/tools/typing-test',
    '/tools/reading-time',
    '/tools/text-analyzer',
    '/tools/case-converter',
    '/tools/text-diff',
    '/tools/lorem-ipsum',
    '/tools/markdown-preview',
    '/tools/markdown-generator',
    '/tools/grammar-checker',
    '/tools/paraphraser',
    '/tools/summarizer',
    '/tools/text-to-html',
    '/tools/html-to-document',
    '/blog/improve-typing-speed',
    '/blog/understanding-readability-scores',
    '/blog/seo-content-best-practices',
    '/blog/markdown-formatting-guide',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : route.startsWith('/blog') ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/tools') ? 0.9 : 0.7,
  }));

  return routes;
}
