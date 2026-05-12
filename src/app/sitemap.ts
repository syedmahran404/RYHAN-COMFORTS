import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ryhancomforts.com';
  const now = new Date();
  const paths = ['', '/collections', '/configurator', '/configurator/sofas', '/craft', '/about', '/contact'];
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7
  }));
}
