import type { ProductCategory } from '@/lib/schemas/product';

/**
 * Category metadata — drives navigation, collection grids, and future CMS.
 */

export interface CategoryMeta {
  id: ProductCategory;
  label: string;
  subtitle: string;
  description: string;
  slug: string;
  heroTone: 'walnut' | 'obsidian' | 'cream' | 'bronze';
  order: number;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'sofa',
    label: 'Sofas',
    subtitle: 'The centrepiece',
    description:
      'Handcrafted lounges and sectionals tailored to your space, fabric and soul. Made to order — never mass produced.',
    slug: 'sofas',
    heroTone: 'walnut',
    order: 1
  },
  {
    id: 'chair',
    label: 'Chairs',
    subtitle: 'Sculpted seating',
    description:
      'Accent chairs, lounges, and wingbacks — carved to silhouette, upholstered in signature fabrics.',
    slug: 'chairs',
    heroTone: 'bronze',
    order: 2
  },
  {
    id: 'bed',
    label: 'Beds',
    subtitle: 'Nightly sanctuary',
    description:
      'Carved wooden beds, upholstered platforms, and hydraulic storage beds engineered for decades.',
    slug: 'beds',
    heroTone: 'obsidian',
    order: 3
  },
  {
    id: 'mattress',
    label: 'Mattresses',
    subtitle: 'Sleep refined',
    description:
      'Custom-layered latex, pocket-spring and memory foam — built to your firmness and dimension.',
    slug: 'mattresses',
    heroTone: 'cream',
    order: 4
  },
  {
    id: 'curtain',
    label: 'Curtains',
    subtitle: 'Light, redrawn',
    description:
      'Bespoke drapery in linen, velvet and sheer silks — motorised and manual, tailored to the millimetre.',
    slug: 'curtains',
    heroTone: 'cream',
    order: 5
  },
  {
    id: 'headboard',
    label: 'Headboards',
    subtitle: 'Wall as stage',
    description:
      'Tufted, fluted and carved wall headboards — the architectural frame of your bedroom.',
    slug: 'headboards',
    heroTone: 'walnut',
    order: 6
  },
  {
    id: 'deewan',
    label: 'Deewans',
    subtitle: 'Modern heirloom',
    description:
      'Traditional deewans reimagined — carved, upholstered, and storage-integrated.',
    slug: 'deewans',
    heroTone: 'bronze',
    order: 7
  }
];

export const getCategory = (id: ProductCategory) => CATEGORIES.find((c) => c.id === id);
