import type { Product, ProductTag, Section, OptionGroup, Complexity, Option } from '@/lib/schemas/product';
import { LINEN_OPTIONS, VELVET_OPTIONS, CLOTH_OPTIONS, slugify } from './shared';

export type CurtainKind = 'sheer' | 'drape' | 'velvet' | 'blackout' | 'motorized';

export const CURTAIN_SECTIONS: Section[] = [
  { id: 'silhouette', label: 'Type', icon: 'frame', order: 1 },
  { id: 'fabric', label: 'Fabric', icon: 'layers', order: 2 },
  { id: 'hardware', label: 'Hardware', icon: 'sparkles', order: 3 },
  { id: 'dimensions', label: 'Dimensions', icon: 'frame', order: 4 }
];

const FOLDS: Option[] = [
  { id: 'fold-pinch', label: 'Pinch Pleat', priceDelta: 0 },
  { id: 'fold-goblet', label: 'Goblet Pleat', priceDelta: 2200 },
  { id: 'fold-wave', label: 'S-Wave', priceDelta: 3500 },
  { id: 'fold-eyelet', label: 'Eyelet', priceDelta: -800 }
];

const TRANSPARENCY: Option[] = [
  { id: 'trans-sheer', label: 'Sheer · 15%', priceDelta: 0 },
  { id: 'trans-translucent', label: 'Translucent · 45%', priceDelta: 800 },
  { id: 'trans-opaque', label: 'Opaque · 85%', priceDelta: 1500 },
  { id: 'trans-blackout', label: 'Blackout · 100%', priceDelta: 3500 }
];

const LINING: Option[] = [
  { id: 'lining-none', label: 'No Lining', priceDelta: 0 },
  { id: 'lining-standard', label: 'Standard Lining', priceDelta: 1800 },
  { id: 'lining-thermal', label: 'Thermal + Acoustic', priceDelta: 3800 }
];

const RODS: Option[] = [
  { id: 'rod-bronze', label: 'Brushed Bronze', priceDelta: 0 },
  { id: 'rod-gold', label: 'Antique Gold', priceDelta: 1500 },
  { id: 'rod-black', label: 'Matte Black', priceDelta: 0 },
  { id: 'rod-motorized', label: 'Motorised Rail', description: 'App + remote', priceDelta: 14500 }
];

const HEIGHTS: Option[] = [
  { id: 'ch-240', label: '240 cm', priceDelta: 0 },
  { id: 'ch-280', label: '280 cm', priceDelta: 1800 },
  { id: 'ch-320', label: '320 cm · Grand', priceDelta: 3500 },
  { id: 'ch-380', label: '380 cm · Hall', priceDelta: 6500 }
];

const WIDTHS: Option[] = [
  { id: 'cw-150', label: '150 cm', priceDelta: 0 },
  { id: 'cw-200', label: '200 cm', priceDelta: 1500 },
  { id: 'cw-300', label: '300 cm', priceDelta: 3500 },
  { id: 'cw-450', label: '450 cm · Panorama', priceDelta: 6800 }
];

const KIND_META: Record<
  CurtainKind,
  { label: string; fabricDefault: string; fabricOptions: Option[]; premium: number; complexity: Complexity }
> = {
  sheer: { label: 'Sheer Drape', fabricDefault: 'linen-ivory', fabricOptions: LINEN_OPTIONS, premium: 0, complexity: 'clean' },
  drape: { label: 'Linen Drape', fabricDefault: 'linen-sandstone', fabricOptions: CLOTH_OPTIONS, premium: 2500, complexity: 'clean' },
  velvet: { label: 'Velvet Drape', fabricDefault: 'velvet-bordeaux', fabricOptions: VELVET_OPTIONS, premium: 6500, complexity: 'detailed' },
  blackout: { label: 'Blackout Drape', fabricDefault: 'velvet-obsidian', fabricOptions: VELVET_OPTIONS, premium: 4500, complexity: 'detailed' },
  motorized: { label: 'Motorised System', fabricDefault: 'linen-sandstone', fabricOptions: CLOTH_OPTIONS, premium: 14500, complexity: 'detailed' }
};

const buildCurtainGroups = (kind: CurtainKind): OptionGroup[] => {
  const meta = KIND_META[kind];
  return [
    {
      id: 'model',
      label: 'Type',
      section: 'silhouette',
      kind: 'single',
      required: true,
      defaultValue: `curtain-${kind}`,
      options: [{ id: `curtain-${kind}`, label: meta.label, priceDelta: 0 }]
    },
    { id: 'upholstery', label: 'Fabric', section: 'fabric', kind: 'single', required: true, defaultValue: meta.fabricDefault, options: meta.fabricOptions },
    { id: 'transparency', label: 'Transparency', section: 'fabric', kind: 'single', required: true, defaultValue: kind === 'sheer' ? 'trans-sheer' : kind === 'blackout' ? 'trans-blackout' : 'trans-opaque', options: TRANSPARENCY },
    { id: 'fold', label: 'Fold style', section: 'fabric', kind: 'single', required: true, defaultValue: 'fold-pinch', options: FOLDS },
    { id: 'lining', label: 'Lining', section: 'fabric', kind: 'single', required: true, defaultValue: 'lining-standard', options: LINING },
    { id: 'rod', label: 'Hardware', section: 'hardware', kind: 'single', required: true, defaultValue: kind === 'motorized' ? 'rod-motorized' : 'rod-bronze', options: RODS },
    { id: 'height', label: 'Height', section: 'dimensions', kind: 'single', required: true, defaultValue: 'ch-280', options: HEIGHTS },
    { id: 'width', label: 'Width per panel', section: 'dimensions', kind: 'single', required: true, defaultValue: 'cw-200', options: WIDTHS },
    {
      id: 'panels',
      label: 'Panels',
      section: 'dimensions',
      kind: 'count',
      required: true,
      defaultValue: 2,
      options: [],
      range: { min: 1, max: 8, step: 1, baseUnit: 2, pricePerUnit: 1800, unitLabel: 'panel' }
    }
  ];
};

interface CurtainSpec {
  id?: string;
  slug?: string;
  name: string;
  tagline: string;
  description: string;
  kind: CurtainKind;
  basePrice?: number;
  tags?: ProductTag[];
  collections?: string[];
}

export function buildCurtain(spec: CurtainSpec): Product {
  const meta = KIND_META[spec.kind];
  const basePrice = (spec.basePrice ?? 9500) + meta.premium;
  const id = spec.id ?? `curtain-${spec.kind}-${slugify(spec.name)}`;
  const slug = spec.slug ?? slugify(spec.name);

  return {
    id,
    slug,
    category: 'curtain',
    name: spec.name,
    tagline: spec.tagline,
    description: spec.description,
    basePrice,
    currency: 'INR',
    renderVariant: `curtain-${spec.kind}`,
    defaultMaterials: { upholstery: meta.fabricDefault },
    tags: spec.tags ?? [],
    collections: spec.collections ?? [],
    complexity: meta.complexity,
    sections: CURTAIN_SECTIONS,
    groups: buildCurtainGroups(spec.kind),
    dimensions: { w: 200, d: 4, h: 280, hRange: [200, 450] }
  };
}
