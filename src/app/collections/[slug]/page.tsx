import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COLLECTIONS, getCollection } from '@/lib/data/collections';
import { CATEGORIES } from '@/lib/data/categories';
import {
  getProductsByCategory,
  getProductsByCollection,
  getProductsByTag
} from '@/lib/data/catalog';
import type { Product, ProductCategory } from '@/lib/schemas/product';
import { CategoryLanding } from '@/features/collections/CategoryLanding';
import { CuratedCollection } from '@/features/collections/CuratedCollection';

/**
 * /collections/:slug
 *
 * Accepts BOTH:
 *   · category slugs — 'sofas', 'chairs', 'beds', 'mattresses', 'curtains', 'headboards'
 *   · curated collection slugs — 'signature', 'trending', 'premium', ...
 *
 * Previously only curated slugs resolved and the category-named tiles 404'd.
 * Fixed.
 */

export const dynamicParams = false;

const CATEGORY_MAP: Record<string, ProductCategory> = {
  sofas: 'sofa',
  chairs: 'chair',
  beds: 'bed',
  mattresses: 'mattress',
  curtains: 'curtain',
  headboards: 'headboard',
  deewans: 'deewan'
};

export function generateStaticParams() {
  return [
    ...COLLECTIONS.map((c) => ({ slug: c.slug })),
    ...Object.keys(CATEGORY_MAP).map((slug) => ({ slug }))
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = CATEGORY_MAP[params.slug];
  if (cat) {
    const c = CATEGORIES.find((x) => x.id === cat);
    return { title: `${c?.label ?? 'Collection'} Collection`, description: c?.description };
  }
  const col = getCollection(params.slug);
  if (!col) return { title: 'Collection' };
  return { title: `${col.label} Collection`, description: col.description };
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const cat = CATEGORY_MAP[params.slug];

  // Category-led landing page (e.g. /collections/sofas)
  if (cat) {
    const meta = CATEGORIES.find((c) => c.id === cat);
    if (!meta) notFound();
    const products = getProductsByCategory(cat);
    return <CategoryLanding category={meta} products={products} />;
  }

  // Curated collection
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const pinned = collection.productIds ? getProductsByCollection(collection.id) : [];
  const tagMatched = collection.filterTag ? getProductsByTag(collection.filterTag) : [];
  const seen = new Set<string>();
  const products: Product[] = [...pinned, ...tagMatched].filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  return <CuratedCollection collection={collection} products={products} />;
}
