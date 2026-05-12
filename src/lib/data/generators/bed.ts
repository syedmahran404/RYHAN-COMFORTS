import type { Product, ProductTag, Section, OptionGroup, Complexity, Option } from '@/lib/schemas/product';
import { CLOTH_OPTIONS, WOOD_OPTIONS, foamOptionsForSlot, slugify } from './shared';

/**
 * Bed generator — 5 kinds × storage variants × headboard patterns.
 */

export type BedKind = 'hydraulic' | 'storage' | 'upholstered' | 'floating' | 'carved';

export const BED_SECTIONS: Section[] = [
  { id: 'silhouette', label: 'Silhouette', icon: 'bed', order: 1 },
  { id: 'frame', label: 'Frame', icon: 'frame', order: 2 },
  { id: 'headboard', label: 'Headboard', icon: 'frame', order: 3 },
  { id: 'upholstery', label: 'Upholstery', icon: 'layers', order: 4 },
  { id: 'foam', label: 'Foam', icon: 'pillow', order: 5 },
  { id: 'storage', label: 'Storage', icon: 'sparkles', order: 6 },
  { id: 'lighting', label: 'Lighting', icon: 'lamp', order: 7 }
];

const SIZES: Option[] = [
  { id: 'size-single', label: 'Single · 90×190', priceDelta: 0 },
  { id: 'size-queen', label: 'Queen · 150×200', priceDelta: 6500 },
  { id: 'size-king', label: 'King · 180×200', priceDelta: 11500 },
  { id: 'size-california', label: 'California King · 180×213', priceDelta: 14500 }
];

const HEADBOARD_PATTERNS: Option[] = [
  { id: 'hb-plain', label: 'Plain', priceDelta: 0 },
  { id: 'hb-tufted', label: 'Tufted', priceDelta: 4500 },
  { id: 'hb-fluted', label: 'Fluted', priceDelta: 5800 },
  { id: 'hb-diamond', label: 'Diamond Tufted', priceDelta: 8200 },
  { id: 'hb-carved', label: 'Hand-Carved', priceDelta: 18500 }
];

const STITCHING: Option[] = [
  { id: 'stitch-single', label: 'Single Needle', priceDelta: 0 },
  { id: 'stitch-double', label: 'Double Needle', priceDelta: 1500 },
  { id: 'stitch-hand', label: 'Hand-Stitched', priceDelta: 5400 }
];

const STORAGE_TYPES: Option[] = [
  { id: 'storage-none', label: 'No Storage', priceDelta: 0 },
  { id: 'storage-side', label: 'Side Drawers (×4)', priceDelta: 8500 },
  { id: 'storage-hydraulic', label: 'Full Hydraulic', priceDelta: 15500 },
  { id: 'storage-vault', label: 'Vault + Hydraulic', description: 'Hidden vault compartment', priceDelta: 22000 }
];

const LIGHTING_TYPES: Option[] = [
  { id: 'light-none', label: 'None', priceDelta: 0 },
  { id: 'light-underglow', label: 'Floating Underglow', description: 'LED under-frame', priceDelta: 4500 },
  { id: 'light-reading', label: 'Headboard Reading Lights', priceDelta: 5800 },
  { id: 'light-ambient', label: 'Full Ambient + Reading', priceDelta: 9500 }
];

const KIND_META: Record<
  BedKind,
  { label: string; tagline: string; premium: number; defaultStorage: string; defaultLight: string; complexity: Complexity }
> = {
  hydraulic: {
    label: 'Hydraulic',
    tagline: 'Lift to store an entire room',
    premium: 15000,
    defaultStorage: 'storage-hydraulic',
    defaultLight: 'light-none',
    complexity: 'detailed'
  },
  storage: {
    label: 'Storage',
    tagline: 'Side-drawer storage, engineered',
    premium: 8500,
    defaultStorage: 'storage-side',
    defaultLight: 'light-none',
    complexity: 'detailed'
  },
  upholstered: {
    label: 'Upholstered',
    tagline: 'Fully fabric-wrapped sanctuary',
    premium: 12000,
    defaultStorage: 'storage-none',
    defaultLight: 'light-none',
    complexity: 'detailed'
  },
  floating: {
    label: 'Floating',
    tagline: 'Underglow, hidden plinth',
    premium: 18500,
    defaultStorage: 'storage-none',
    defaultLight: 'light-underglow',
    complexity: 'detailed'
  },
  carved: {
    label: 'Carved Heritage',
    tagline: 'Hand-carved rosewood frame',
    premium: 28000,
    defaultStorage: 'storage-none',
    defaultLight: 'light-none',
    complexity: 'masterwork'
  }
};

const buildBedGroups = (kind: BedKind): OptionGroup[] => {
  const meta = KIND_META[kind];
  return [
    {
      id: 'model',
      label: 'Silhouette',
      section: 'silhouette',
      kind: 'single',
      required: true,
      defaultValue: `bed-${kind}`,
      options: [{ id: `bed-${kind}`, label: meta.label, description: meta.tagline, priceDelta: 0 }]
    },
    {
      id: 'size',
      label: 'Size',
      section: 'frame',
      kind: 'single',
      required: true,
      defaultValue: 'size-queen',
      options: SIZES
    },
    {
      id: 'base',
      label: 'Frame wood',
      section: 'frame',
      kind: 'single',
      required: true,
      defaultValue: kind === 'carved' ? 'rosewood-hand-carved' : 'walnut-natural',
      options: WOOD_OPTIONS
    },
    {
      id: 'headboard-pattern',
      label: 'Headboard pattern',
      section: 'headboard',
      kind: 'single',
      required: true,
      defaultValue: kind === 'carved' ? 'hb-carved' : 'hb-tufted',
      options: HEADBOARD_PATTERNS
    },
    {
      id: 'upholstery',
      label: 'Headboard upholstery',
      section: 'upholstery',
      kind: 'single',
      required: true,
      defaultValue: 'velvet-bordeaux',
      options: CLOTH_OPTIONS
    },
    {
      id: 'stitching',
      label: 'Stitching',
      section: 'upholstery',
      kind: 'single',
      required: true,
      defaultValue: 'stitch-single',
      options: STITCHING
    },
    {
      id: 'bed-foam',
      label: 'Bed platform foam',
      section: 'foam',
      kind: 'single',
      required: true,
      defaultValue: 'foam-bed-best',
      options: foamOptionsForSlot('bed')
    },
    {
      id: 'headboard-foam',
      label: 'Headboard foam',
      section: 'foam',
      kind: 'single',
      required: true,
      defaultValue: 'foam-headboard-best',
      options: foamOptionsForSlot('headboard')
    },
    {
      id: 'storage-type',
      label: 'Storage type',
      section: 'storage',
      kind: 'single',
      required: true,
      defaultValue: meta.defaultStorage,
      options: STORAGE_TYPES
    },
    {
      id: 'lighting',
      label: 'Lighting',
      section: 'lighting',
      kind: 'single',
      required: false,
      defaultValue: meta.defaultLight,
      options: LIGHTING_TYPES
    }
  ];
};

interface BedSpec {
  id?: string;
  slug?: string;
  name: string;
  tagline: string;
  description: string;
  kind: BedKind;
  basePrice?: number;
  tags?: ProductTag[];
  collections?: string[];
}

export function buildBed(spec: BedSpec): Product {
  const meta = KIND_META[spec.kind];
  const basePrice = (spec.basePrice ?? 48000) + meta.premium;
  const id = spec.id ?? `bed-${spec.kind}-${slugify(spec.name)}`;
  const slug = spec.slug ?? slugify(spec.name);

  return {
    id,
    slug,
    category: spec.kind === 'hydraulic' ? 'hydraulic-bed' : 'bed',
    name: spec.name,
    tagline: spec.tagline,
    description: spec.description,
    basePrice,
    currency: 'INR',
    renderVariant: `bed-${spec.kind}`,
    defaultMaterials: {
      frame: spec.kind === 'carved' ? 'rosewood-hand-carved' : 'walnut-natural',
      upholstery: 'velvet-bordeaux'
    },
    tags: spec.tags ?? [],
    collections: spec.collections ?? [],
    complexity: meta.complexity,
    sections: BED_SECTIONS,
    groups: buildBedGroups(spec.kind),
    dimensions: { w: 160, d: 210, h: 120, wRange: [90, 200], dRange: [195, 215], hRange: [90, 140] },
    pricing: {
      complexityMultiplier: meta.complexity === 'masterwork' ? 1.32 : 1.1,
      areaPricePerCm2: 0.08,
      tagPremiums: { 'hand-carved': 12000, 'hotel-grade': 8500 }
    }
  };
}
