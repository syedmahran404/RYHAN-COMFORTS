import type { MetadataRoute } from 'next';
import { CATALOG } from '@/lib/data/catalog';
import { COLLECTIONS } from '@/lib/data/collections';

const categorySlug = (category: string) =>
  category === 'hydraulic-bed' ? 'beds' : `${category}s`;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ryhancomforts.com';
  const now = new Date();

  const root = ['', '/collections', '/configurator', '/craft', '/about', '/contact'];
  const categories = ['sofas', 'chairs', 'beds', 'mattresses', 'curtains', 'headboards'];
  const productPaths = CATALOG.map((p) => `/configurator/${categorySlug(p.category)}/${p.slug}`);
  const collectionPaths = COLLECTIONS.map((c) => `/collections/${c.slug}`);

  const all = [
    ...root,
    ...categories.map((c) => `/configurator/${c}`),
    ...productPaths,
    ...collectionPaths
  ];

  return all.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : p.startsWith('/configurator/') ? 0.8 : 0.7
  }));
}
