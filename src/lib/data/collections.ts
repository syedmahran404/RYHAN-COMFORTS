import type { Collection } from '@/lib/schemas/product';

/**
 * Curated collections — admin-editable surface of the catalog.
 *
 * Collections are resolved in two ways:
 *   1. productIds — explicit pinning
 *   2. filterTag  — automatic via tag membership
 *
 * Both can coexist; the resolver de-duplicates.
 */

export const COLLECTIONS: Collection[] = [
  {
    id: 'signature',
    slug: 'signature',
    label: 'Signature',
    subtitle: 'The flagship commissions',
    description:
      'Our atelier-defining silhouettes — the pieces every Ryhan home is built around.',
    tone: 'walnut',
    order: 1,
    featured: true,
    productIds: ['sofa-atelier-signature', 'chair-lune-lounge', 'bed-nocturne-carved-heritage']
  },
  {
    id: 'trending',
    slug: 'trending',
    label: 'Trending',
    subtitle: 'What Bengaluru is commissioning now',
    description:
      'The silhouettes most ordered in the last three seasons — updated quarterly by our atelier.',
    tone: 'bronze',
    order: 2,
    featured: true,
    filterTag: 'trending'
  },
  {
    id: 'premium',
    slug: 'premium',
    label: 'Premium',
    subtitle: 'Atelier-grade finishes',
    description:
      'Our premium tier — imported fabrics, bouclé, velvet, premium wood tones and elevated craftsmanship.',
    tone: 'cream',
    order: 3,
    featured: true,
    filterTag: 'editors-pick'
  },
  {
    id: 'luxury-heritage',
    slug: 'luxury-heritage',
    label: 'Luxury Heritage',
    subtitle: 'Hand-carved · masterwork',
    description:
      'Hand-carved rosewood, mirror inlay, gold cord — the pieces our master carvers treat as decade-long projects.',
    tone: 'obsidian',
    order: 4,
    featured: true,
    filterTag: 'heritage'
  },
  {
    id: 'italian-luxury',
    slug: 'italian-luxury',
    label: 'Italian Luxury',
    subtitle: 'Milanese proportion',
    description: 'Low-slung silhouettes in full-grain leather and signature Italian proportion.',
    tone: 'emerald',
    order: 5
  },
  {
    id: 'export-quality',
    slug: 'export-quality',
    label: 'Export Quality',
    subtitle: 'Shipped to 14 countries',
    description:
      'Built to export-grade specifications — moisture-protected frames, premium hardware, and climate-tested finishes.',
    tone: 'bronze',
    order: 6,
    filterTag: 'export-quality'
  },
  {
    id: 'hotel-grade',
    slug: 'hotel-grade',
    label: 'Hotel Grade',
    subtitle: 'Contracted by boutique hotels',
    description: 'High-use, warranty-extended pieces engineered for hospitality installations.',
    tone: 'walnut',
    order: 7,
    filterTag: 'hotel-grade'
  }
];

export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);
