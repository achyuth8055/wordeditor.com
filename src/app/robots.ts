export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/convex/'],
      },
    ],
    sitemap: 'https://wordeditor.online/sitemap.xml',
  };
}
