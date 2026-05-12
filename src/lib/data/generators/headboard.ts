import type { Product, ProductTag, Section, OptionGroup, Complexity, Option } from '@/lib/schemas/product';
import { CLOTH_OPTIONS, WOOD_OPTIONS, foamOptionsForSlot, slugify } from './shared';

export type HeadboardKind = 'tufted' | 'fluted' | 'carved' | 'upholstered' | 'wall-mounted';

export const HEADBOARD_SECTIONS: Section[] = [
  { id: 'silhouette', label: 'Silhouette', icon: 'frame', order: 1 },
  { id: 'panel', label: 'Panel', icon: 'layers', order: 2 },
  { id: 'upholstery', label: 'Upholstery', icon: 'layers', order: 3 },
  { id: 'finish', label: 'Finish', icon: 'sparkles', order: 4 }
];

const WIDTHS: Option[] = [
  { id: 'w-150', label: '150 cm · Queen', priceDelta: 0 },
  { id: 'w-180', label: '180 cm · King', priceDelta: 3500 },
  { id: 'w-240', label: '240 cm · Grand', priceDelta: 7800 },
  { id: 'w-300', label: '300 cm · Wall-Feature', priceDelta: 12500 }
];

const HEIGHTS: Option[] = [
  { id: 'h-100', label: '100 cm · Low', priceDelta: 0 },
  { id: 'h-130', label: '130 cm · Standard', priceDelta: 1800 },
  { id: 'h-160', label: '160 cm · Tall', priceDelta: 3500 },
  { id: 'h-200', label: '200 cm · Architectural', priceDelta: 6500 }
];

const PATTERNS: Record<HeadboardKind, Option[]> = {
  tufted: [
    { id: 'pattern-tufted-classic', label: 'Classic Tufted', priceDelta: 0 },
    { id: 'pattern-tufted-diamond', label: 'Diamond Tufted', priceDelta: 2800 },
    { id: 'pattern-tufted-deep', label: 'Deep-Button', priceDelta: 4600 }
  ],
  fluted: [
    { id: 'pattern-fluted-narrow', label: 'Narrow Flutes', priceDelta: 0 },
    { id: 'pattern-fluted-wide', label: 'Wide Flutes', priceDelta: 1400 },
    { id: 'pattern-fluted-deep', label: 'Deep Flutes', priceDelta: 2800 }
  ],
  carved: [
    { id: 'pattern-carved-floral', label: 'Floral Carving', priceDelta: 0 },
    { id: 'pattern-carved-geometric', label: 'Geometric', priceDelta: 2200 },
    { id: 'pattern-carved-scenic', label: 'Scenic', priceDelta: 5800 }
  ],
  upholstered: [
    { id: 'pattern-upholstered-plain', label: 'Plain', priceDelta: 0 },
    { id: 'pattern-upholstered-channel', label: 'Channel', priceDelta: 2200 },
    { id: 'pattern-upholstered-piped', label: 'Piped', priceDelta: 1800 }
  ],
  'wall-mounted': [
    { id: 'pattern-wall-panel', label: 'Panel', priceDelta: 0 },
    { id: 'pattern-wall-3d', label: '3D Relief', priceDelta: 6500 },
    { id: 'pattern-wall-mixed', label: 'Mixed Wood + Fabric', priceDelta: 8800 }
  ]
};

const KIND_META: Record<HeadboardKind, { label: string; premium: number; complexity: Complexity }> = {
  tufted: { label: 'Tufted', premium: 0, complexity: 'detailed' },
  fluted: { label: 'Fluted', premium: 3500, complexity: 'detailed' },
  carved: { label: 'Hand-Carved', premium: 18500, complexity: 'masterwork' },
  upholstered: { label: 'Upholstered', premium: 0, complexity: 'clean' },
  'wall-mounted': { label: 'Wall-Mounted', premium: 8500, complexity: 'detailed' }
};

const buildHeadboardGroups = (kind: HeadboardKind): OptionGroup[] => [
  {
    id: 'model',
    label: 'Style',
    section: 'silhouette',
    kind: 'single',
    required: true,
    defaultValue: `hb-${kind}`,
    options: [{ id: `hb-${kind}`, label: KIND_META[kind].label, priceDelta: 0 }]
  },
  { id: 'width', label: 'Width', section: 'panel', kind: 'single', required: true, defaultValue: 'w-180', options: WIDTHS },
  { id: 'height', label: 'Height', section: 'panel', kind: 'single', required: true, defaultValue: 'h-130', options: HEIGHTS },
  {
    id: 'pattern',
    label: 'Pattern',
    section: 'panel',
    kind: 'single',
    required: true,
    defaultValue: PATTERNS[kind][0].id,
    options: PATTERNS[kind]
  },
  {
    id: 'upholstery',
    label: 'Upholstery',
    section: 'upholstery',
    kind: 'single',
    required: true,
    defaultValue: 'velvet-bordeaux',
    options: CLOTH_OPTIONS
  },
  {
    id: 'base',
    label: 'Wood accent',
    section: 'upholstery',
    kind: 'single',
    required: false,
    defaultValue: 'walnut-natural',
    options: WOOD_OPTIONS
  },
  {
    id: 'headboard-foam',
    label: 'Foam',
    section: 'finish',
    kind: 'single',
    required: true,
    defaultValue: 'foam-headboard-best',
    options: foamOptionsForSlot('headboard')
  }
];

interface HeadboardSpec {
  id?: string;
  slug?: string;
  name: string;
  tagline: string;
  description: string;
  kind: HeadboardKind;
  basePrice?: number;
  tags?: ProductTag[];
  collections?: string[];
}

export function buildHeadboard(spec: HeadboardSpec): Product {
  const meta = KIND_META[spec.kind];
  const basePrice = (spec.basePrice ?? 18000) + meta.premium;
  const id = spec.id ?? `headboard-${spec.kind}-${slugify(spec.name)}`;
  const slug = spec.slug ?? slugify(spec.name);

  return {
    id,
    slug,
    category: 'headboard',
    name: spec.name,
    tagline: spec.tagline,
    description: spec.description,
    basePrice,
    currency: 'INR',
    renderVariant: `headboard-${spec.kind}`,
    defaultMaterials: { upholstery: 'velvet-bordeaux', base: 'walnut-natural' },
    tags: spec.tags ?? [],
    collections: spec.collections ?? [],
    complexity: meta.complexity,
    sections: HEADBOARD_SECTIONS,
    groups: buildHeadboardGroups(spec.kind),
    dimensions: { w: 180, d: 8, h: 130, wRange: [120, 300], hRange: [90, 210] },
    pricing: {
      complexityMultiplier: meta.complexity === 'masterwork' ? 1.32 : 1.08,
      heightPricePerCm: 120,
      tagPremiums: { 'hand-carved': 12000 }
    }
  };
}
