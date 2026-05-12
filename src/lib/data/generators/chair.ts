import type { Product, ProductStyle, ProductTag, Section, OptionGroup, Complexity, Option } from '@/lib/schemas/product';
import {
  CLOTH_OPTIONS,
  WOOD_OPTIONS,
  ARM_STYLES,
  BACK_STYLES,
  LEG_STYLES,
  PIPING_STYLES,
  STITCHING_STYLES,
  STYLE_META,
  foamOptionsForSlot,
  slugify
} from './shared';

/**
 * Chair generator — covers 9 dominant styles with rich sections.
 */

export const CHAIR_SECTIONS: Section[] = [
  { id: 'silhouette', label: 'Silhouette', icon: 'armchair', order: 1 },
  { id: 'seat', label: 'Seat', icon: 'layers', order: 2 },
  { id: 'back', label: 'Back', icon: 'armchair', order: 3 },
  { id: 'arms', label: 'Arms', icon: 'hand', order: 4 },
  { id: 'legs', label: 'Legs', icon: 'leg', order: 5 },
  { id: 'finish', label: 'Finish', icon: 'sparkles', order: 6 }
];

type SubModel = { id: string; label: string; description: string; priceDelta: number };

const CHAIR_SUBMODELS: Partial<Record<ProductStyle, SubModel[]>> = {
  modern: [
    { id: 'chair-lounge', label: 'Lounge', description: 'Reading companion', priceDelta: 0 },
    { id: 'chair-low', label: 'Low Lounge', description: 'Architectural low', priceDelta: 2200 },
    { id: 'chair-accent', label: 'Accent', description: 'Compact accent', priceDelta: -1500 }
  ],
  minimal: [
    { id: 'chair-slab', label: 'Slab', description: 'Cubic minimal', priceDelta: 0 },
    { id: 'chair-floor', label: 'Floor', description: 'Floor-grazing', priceDelta: 1800 }
  ],
  scandinavian: [
    { id: 'chair-nord', label: 'Nordic', description: 'Light oak frame', priceDelta: 0 },
    { id: 'chair-nord-high', label: 'Nordic Highback', description: 'Tall wingback', priceDelta: 3500 }
  ],
  chesterfield: [
    { id: 'chair-wing', label: 'Wingback Chesterfield', description: 'Deep button winged', priceDelta: 0 },
    { id: 'chair-club', label: 'Club Chesterfield', description: 'Club chair', priceDelta: 1800 }
  ],
  'italian-luxury': [
    { id: 'chair-milano', label: 'Milano Lounge', description: 'Nappa leather', priceDelta: 0 },
    { id: 'chair-swivel', label: 'Swivel Milano', description: '360° swivel', priceDelta: 5500 }
  ],
  'royal-carved': [
    { id: 'chair-throne', label: 'Throne', description: 'Hand-carved', priceDelta: 0 },
    { id: 'chair-maharani', label: 'Maharani', description: 'Rosewood throne', priceDelta: 14000 }
  ],
  'arabic-luxury': [
    { id: 'chair-majlis', label: 'Majlis', description: 'Low majlis chair', priceDelta: 0 },
    { id: 'chair-carved-m', label: 'Carved Majlis', description: 'Hand-carved', priceDelta: 6500 }
  ],
  curved: [
    { id: 'chair-egg', label: 'Egg', description: 'Curved shell', priceDelta: 0 },
    { id: 'chair-kidney', label: 'Kidney', description: 'S-curve', priceDelta: 2400 }
  ],
  recliner: [
    { id: 'chair-rec-single', label: 'Single Recliner', description: 'Electric', priceDelta: 0 },
    { id: 'chair-rec-zero', label: 'Zero-Gravity', description: 'Engineered recline', priceDelta: 11500 }
  ]
};

export const getChairSubModels = (style: ProductStyle): SubModel[] =>
  CHAIR_SUBMODELS[style] ?? CHAIR_SUBMODELS.modern!;

const buildChairGroups = (style: ProductStyle): OptionGroup[] => {
  const subs = getChairSubModels(style);
  return [
    {
      id: 'model',
      label: 'Silhouette',
      section: 'silhouette',
      kind: 'single',
      required: true,
      defaultValue: subs[0].id,
      options: subs as Option[]
    },
    {
      id: 'upholstery',
      label: 'Upholstery',
      section: 'seat',
      kind: 'single',
      required: true,
      defaultValue: 'velvet-emerald',
      options: CLOTH_OPTIONS
    },
    {
      id: 'seat-foam',
      label: 'Seat foam',
      section: 'seat',
      kind: 'single',
      required: true,
      defaultValue: 'foam-seat-best',
      options: foamOptionsForSlot('seat')
    },
    {
      id: 'back-style',
      label: 'Back style',
      section: 'back',
      kind: 'single',
      required: true,
      defaultValue: style === 'chesterfield' ? 'back-chesterfield' : 'back-pillow',
      options: BACK_STYLES
    },
    {
      id: 'back-foam',
      label: 'Back foam',
      section: 'back',
      kind: 'single',
      required: true,
      defaultValue: 'foam-back-better',
      options: foamOptionsForSlot('back')
    },
    {
      id: 'arm-style',
      label: 'Arm style',
      section: 'arms',
      kind: 'single',
      required: true,
      defaultValue: 'arm-rolled',
      options: ARM_STYLES
    },
    {
      id: 'base',
      label: 'Wood finish',
      section: 'legs',
      kind: 'single',
      required: true,
      defaultValue: 'walnut-natural',
      options: WOOD_OPTIONS
    },
    {
      id: 'leg-style',
      label: 'Leg style',
      section: 'legs',
      kind: 'single',
      required: true,
      defaultValue: style === 'royal-carved' ? 'leg-carved' : 'leg-tapered',
      options: LEG_STYLES
    },
    {
      id: 'piping',
      label: 'Piping',
      section: 'finish',
      kind: 'single',
      required: false,
      defaultValue: 'piping-none',
      options: PIPING_STYLES
    },
    {
      id: 'stitching',
      label: 'Stitching',
      section: 'finish',
      kind: 'single',
      required: true,
      defaultValue: 'stitch-single',
      options: STITCHING_STYLES
    }
  ];
};

interface ChairSpec {
  id?: string;
  slug?: string;
  name: string;
  tagline: string;
  description: string;
  style: ProductStyle;
  basePrice?: number;
  tags?: ProductTag[];
  collections?: string[];
  complexity?: Complexity;
}

const COMPLEXITY_BY_STYLE: Partial<Record<ProductStyle, Complexity>> = {
  modern: 'clean',
  minimal: 'clean',
  scandinavian: 'clean',
  chesterfield: 'ornate',
  'italian-luxury': 'detailed',
  'royal-carved': 'masterwork',
  'arabic-luxury': 'ornate',
  curved: 'detailed',
  recliner: 'detailed'
};

export function buildChair(spec: ChairSpec): Product {
  const meta = STYLE_META[spec.style];
  const basePrice = (spec.basePrice ?? 12000) + Math.round(meta.premium * 0.55);
  const complexity = spec.complexity ?? COMPLEXITY_BY_STYLE[spec.style] ?? 'clean';
  const id = spec.id ?? `chair-${slugify(spec.name)}`;
  const slug = spec.slug ?? slugify(spec.name);

  return {
    id,
    slug,
    category: 'chair',
    name: spec.name,
    tagline: spec.tagline,
    description: spec.description,
    basePrice,
    currency: 'INR',
    renderVariant: `chair-${spec.style}`,
    defaultMaterials: { upholstery: 'velvet-emerald', base: 'walnut-natural' },
    style: spec.style,
    tags: spec.tags ?? [],
    collections: spec.collections ?? [],
    complexity,
    sections: CHAIR_SECTIONS,
    groups: buildChairGroups(spec.style),
    dimensions: { w: 82, d: 84, h: 92, wRange: [70, 110], dRange: [75, 100], hRange: [78, 115] },
    pricing: {
      complexityMultiplier:
        complexity === 'clean' ? 1.0 : complexity === 'detailed' ? 1.1 : complexity === 'ornate' ? 1.2 : 1.35,
      areaPricePerCm2: 0.12,
      tagPremiums: { 'hand-carved': 5500, 'imported-fabric': 2500 }
    }
  };
}
