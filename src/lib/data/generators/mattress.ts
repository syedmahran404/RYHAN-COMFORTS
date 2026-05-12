import type { Product, ProductTag, Section, OptionGroup, Complexity, Option } from '@/lib/schemas/product';
import { MATTRESS_CORES } from '../materials';
import { slugify } from './shared';

export type MattressKind = 'spring' | 'memory' | 'orthopedic' | 'hybrid' | 'hotel';

export const MATTRESS_SECTIONS: Section[] = [
  { id: 'silhouette', label: 'Type', icon: 'bed', order: 1 },
  { id: 'core', label: 'Core', icon: 'layers', order: 2 },
  { id: 'support', label: 'Support', icon: 'pillow', order: 3 },
  { id: 'dimensions', label: 'Dimensions', icon: 'frame', order: 4 }
];

const SIZES: Option[] = [
  { id: 'size-single', label: 'Single · 90×190', priceDelta: 0 },
  { id: 'size-queen', label: 'Queen · 150×200', priceDelta: 5800 },
  { id: 'size-king', label: 'King · 180×200', priceDelta: 9500 },
  { id: 'size-california', label: 'California · 180×213', priceDelta: 12500 }
];

const THICKNESS: Option[] = [
  { id: 'thickness-6', label: '6 inch', priceDelta: 0 },
  { id: 'thickness-8', label: '8 inch', priceDelta: 3500 },
  { id: 'thickness-10', label: '10 inch', priceDelta: 6500 },
  { id: 'thickness-12', label: '12 inch', priceDelta: 9800 }
];

const FIRMNESS: Option[] = [
  { id: 'firm-soft', label: 'Soft', description: 'Plush pillow top', priceDelta: 0 },
  { id: 'firm-medium', label: 'Medium', description: 'Balanced support', priceDelta: 0 },
  { id: 'firm-firm', label: 'Firm', description: 'Orthopedic spine support', priceDelta: 1500 },
  { id: 'firm-extra', label: 'Extra Firm', description: 'High-density clinical', priceDelta: 2800 }
];

const SUPPORT_LAYERS: Option[] = [
  { id: 'layer-single', label: 'Single Layer', priceDelta: 0 },
  { id: 'layer-dual', label: 'Dual Layer', priceDelta: 3500 },
  { id: 'layer-tri', label: 'Triple Layer', priceDelta: 6500 },
  { id: 'layer-custom', label: 'Custom Zoned', description: 'Seven-zone engineering', priceDelta: 9800 }
];

const KIND_META: Record<
  MattressKind,
  { label: string; defaultCore: string; premium: number; complexity: Complexity }
> = {
  spring: { label: 'Spring', defaultCore: 'core-pocket-spring', premium: 0, complexity: 'detailed' },
  memory: { label: 'Memory Foam', defaultCore: 'core-memory-foam', premium: 4500, complexity: 'detailed' },
  orthopedic: { label: 'Orthopedic', defaultCore: 'core-orthopedic', premium: 3500, complexity: 'detailed' },
  hybrid: { label: 'Hybrid Luxury', defaultCore: 'core-hybrid', premium: 9500, complexity: 'detailed' },
  hotel: { label: 'Hotel-Grade', defaultCore: 'core-hotel', premium: 12500, complexity: 'masterwork' }
};

const coreOptions: Option[] = MATTRESS_CORES.map((m) => ({
  id: m.id,
  label: m.name,
  description: m.badge,
  priceDelta: m.priceDelta,
  visual: m.color,
  meta: { kind: m.kind, tier: m.tier }
}));

const buildMattressGroups = (kind: MattressKind): OptionGroup[] => [
  {
    id: 'model',
    label: 'Type',
    section: 'silhouette',
    kind: 'single',
    required: true,
    defaultValue: `mat-${kind}`,
    options: [{ id: `mat-${kind}`, label: KIND_META[kind].label, priceDelta: 0 }]
  },
  {
    id: 'core',
    label: 'Core',
    section: 'core',
    kind: 'single',
    required: true,
    defaultValue: KIND_META[kind].defaultCore,
    options: coreOptions
  },
  { id: 'thickness', label: 'Thickness', section: 'core', kind: 'single', required: true, defaultValue: 'thickness-8', options: THICKNESS },
  { id: 'firmness', label: 'Firmness', section: 'support', kind: 'single', required: true, defaultValue: 'firm-medium', options: FIRMNESS },
  { id: 'layers', label: 'Support layers', section: 'support', kind: 'single', required: true, defaultValue: 'layer-dual', options: SUPPORT_LAYERS },
  { id: 'size', label: 'Size', section: 'dimensions', kind: 'single', required: true, defaultValue: 'size-queen', options: SIZES }
];

interface MattressSpec {
  id?: string;
  slug?: string;
  name: string;
  tagline: string;
  description: string;
  kind: MattressKind;
  basePrice?: number;
  tags?: ProductTag[];
  collections?: string[];
}

export function buildMattress(spec: MattressSpec): Product {
  const meta = KIND_META[spec.kind];
  const basePrice = (spec.basePrice ?? 22000) + meta.premium;
  const id = spec.id ?? `mattress-${spec.kind}-${slugify(spec.name)}`;
  const slug = spec.slug ?? slugify(spec.name);

  return {
    id,
    slug,
    category: 'mattress',
    name: spec.name,
    tagline: spec.tagline,
    description: spec.description,
    basePrice,
    currency: 'INR',
    renderVariant: `mattress-${spec.kind}`,
    defaultMaterials: { core: meta.defaultCore },
    tags: spec.tags ?? [],
    collections: spec.collections ?? [],
    complexity: meta.complexity,
    sections: MATTRESS_SECTIONS,
    groups: buildMattressGroups(spec.kind),
    dimensions: { w: 150, d: 200, h: 20, wRange: [90, 200], dRange: [190, 213], hRange: [15, 30] },
    pricing: {
      complexityMultiplier: meta.complexity === 'masterwork' ? 1.28 : 1.08,
      areaPricePerCm2: 0.06,
      tagPremiums: { 'hotel-grade': 6500, orthopedic: 3500 }
    }
  };
}
