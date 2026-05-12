import type {
  Product,
  ProductStyle,
  ProductTag,
  Section,
  OptionGroup,
  Complexity,
  Option
} from '@/lib/schemas/product';
import {
  CLOTH_OPTIONS,
  WOOD_OPTIONS,
  ARM_STYLES,
  BACK_STYLES,
  LEG_STYLES,
  PIPING_STYLES,
  STITCHING_STYLES,
  SEAT_PATTERNS,
  STYLE_META,
  foamOptionsForSlot,
  slugify
} from './shared';

/**
 * Sofa generator — parametric builder covering 13 styles × multiple sub-models.
 *
 * Every sofa generated here exposes:
 *   · silhouette (sub-model pick)
 *   · structure (seating count)
 *   · seat (upholstery, pattern, foam tier)
 *   · back (upholstery, style, foam tier)
 *   · arms (style)
 *   · legs (wood + leg style)
 *   · pillows (count + upholstery)
 *   · finish (piping + stitching)
 *
 * Phase 1 contract preserved — group IDs `model`, `seating`, `upholstery`,
 * `base`, `seat-foam`, `back-foam` keep their semantics so the Phase 1
 * configurator shell keeps rendering without changes.
 */

export const SOFA_SECTIONS: Section[] = [
  { id: 'silhouette', label: 'Silhouette', hint: 'Sub-model', icon: 'sofa', order: 1 },
  { id: 'structure', label: 'Structure', hint: 'Seat count', icon: 'frame', order: 2 },
  { id: 'seat', label: 'Seat', hint: 'Fabric · foam', icon: 'layers', order: 3 },
  { id: 'back', label: 'Back', hint: 'Style · foam', icon: 'armchair', order: 4 },
  { id: 'arms', label: 'Arms', hint: 'Silhouette', icon: 'hand', order: 5 },
  { id: 'legs', label: 'Legs & Base', hint: 'Wood · style', icon: 'leg', order: 6 },
  { id: 'pillows', label: 'Pillows', hint: 'Accents', icon: 'pillow', order: 7 },
  { id: 'finish', label: 'Finish', hint: 'Piping · stitch', icon: 'sparkles', order: 8 }
];

// ─────────────────────────────────────────────────────────────────────
// SUB-MODELS — ultra-compact per-style tuples
// ─────────────────────────────────────────────────────────────────────

type SubModel = { id: string; label: string; description: string; priceDelta: number };

const SUB_MODELS: Record<ProductStyle, SubModel[]> = {
  modern: [
    { id: 'atelier-lowback', label: 'Low-back Atelier', description: 'Cinematic low silhouette · 82 cm', priceDelta: 0 },
    { id: 'atelier-highback', label: 'High-back Atelier', description: 'Architectural · 104 cm', priceDelta: 6500 },
    { id: 'atelier-chaise', label: 'Atelier Chaise', description: 'Extended chaise lounge', priceDelta: 11000 }
  ],
  minimal: [
    { id: 'flat-platform', label: 'Platform Minimal', description: 'Floor-grazing slab', priceDelta: 0 },
    { id: 'flat-floor', label: 'Floor Minimal', description: 'Ultra-low Japanese-grade', priceDelta: 3200 },
    { id: 'flat-island', label: 'Island Minimal', description: 'Centrepiece, all sides visible', priceDelta: 5400 }
  ],
  scandinavian: [
    { id: 'nord-3s', label: 'Nord 3-seater', description: 'Light oak frame, linen', priceDelta: 0 },
    { id: 'nord-4s', label: 'Nord 4-seater', description: 'Extended', priceDelta: 8500 },
    { id: 'nord-daybed', label: 'Nord Daybed', description: 'Single-arm daybed', priceDelta: 6200 }
  ],
  chesterfield: [
    { id: 'chester-classic', label: 'Classic Chesterfield', description: 'Deep button-tufted', priceDelta: 0 },
    { id: 'chester-wing', label: 'Wingback Chesterfield', description: 'High winged sides', priceDelta: 14500 },
    { id: 'chester-deep', label: 'Deep Chesterfield', description: 'Extra-deep seat', priceDelta: 9800 }
  ],
  'italian-luxury': [
    { id: 'milano-curved', label: 'Milano Curved', description: 'Soft kidney form', priceDelta: 0 },
    { id: 'milano-low', label: 'Milano Low-slung', description: 'Nappa leather, low', priceDelta: 18500 },
    { id: 'milano-executive', label: 'Milano Executive', description: 'Deep-pocket recline', priceDelta: 22000 }
  ],
  'royal-carved': [
    { id: 'royal-throne', label: 'Throne Sofa', description: 'Carved back, gold cord', priceDelta: 0 },
    { id: 'royal-maharaja', label: 'Maharaja', description: 'Hand-carved rosewood', priceDelta: 28000 },
    { id: 'royal-imperial', label: 'Imperial', description: 'Throne scale, mirror inlay', priceDelta: 42000 }
  ],
  'arabic-luxury': [
    { id: 'majlis-low', label: 'Majlis Low', description: 'Floor-seating luxury', priceDelta: 0 },
    { id: 'majlis-diwan', label: 'Diwan Majlis', description: 'Carved-frame diwan', priceDelta: 18500 },
    { id: 'majlis-carved', label: 'Carved-back Majlis', description: 'Hand-carved back panel', priceDelta: 26000 }
  ],
  'asian-premium': [
    { id: 'asia-teak', label: 'Teak-frame', description: 'Burnt teak exposed frame', priceDelta: 0 },
    { id: 'asia-low', label: 'Low-profile Asian', description: 'Japanese proportion', priceDelta: 4800 },
    { id: 'asia-modular', label: 'Modular Asian', description: 'Reconfigurable', priceDelta: 8900 }
  ],
  curved: [
    { id: 'curve-kidney', label: 'Kidney Curved', description: 'Soft S-curve', priceDelta: 0 },
    { id: 'curve-crescent', label: 'Crescent', description: '180° crescent', priceDelta: 9800 },
    { id: 'curve-semi', label: 'Semi-circle', description: 'Architectural semi-circle', priceDelta: 14500 }
  ],
  recliner: [
    { id: 'rec-single', label: 'Single Recliner', description: 'Electric recline', priceDelta: 0 },
    { id: 'rec-double', label: 'Double Recliner', description: 'Twin electric', priceDelta: 24000 },
    { id: 'rec-theatre', label: 'Home Theatre', description: '5-seat row, cup holders', priceDelta: 62000 }
  ],
  sectional: [
    { id: 'sect-u', label: 'U-Shape Sectional', description: 'Full-room wrap', priceDelta: 0 },
    { id: 'sect-l', label: 'L-Sectional', description: 'Classic L corner', priceDelta: -9500 },
    { id: 'sect-island', label: 'Island Sectional', description: 'Floating centre', priceDelta: 14500 }
  ],
  'l-shape': [
    { id: 'l-left', label: 'Left-hand L', description: 'Corner on left', priceDelta: 0 },
    { id: 'l-right', label: 'Right-hand L', description: 'Corner on right', priceDelta: 0 },
    { id: 'l-deep', label: 'Deep L', description: 'Extra seat depth', priceDelta: 5800 }
  ],
  modular: [
    { id: 'mod-3', label: '3-Module', description: '3 interlocking blocks', priceDelta: 0 },
    { id: 'mod-5', label: '5-Module', description: '5 interlocking blocks', priceDelta: 18500 },
    { id: 'mod-7', label: '7-Module', description: '7 interlocking blocks', priceDelta: 34000 }
  ],
  'mid-century': [
    { id: 'mid-tapered', label: 'Tapered Mid-Century', description: 'Walnut tapered legs', priceDelta: 0 },
    { id: 'mid-bench', label: 'Bench Mid-Century', description: 'Single bench seat', priceDelta: 3500 }
  ],
  tuxedo: [
    { id: 'tux-classic', label: 'Classic Tuxedo', description: 'Equal-height arm + back', priceDelta: 0 },
    { id: 'tux-channel', label: 'Channel Tuxedo', description: 'Channel-stitched back', priceDelta: 4800 }
  ],
  lawson: [
    { id: 'lawson-classic', label: 'Classic Lawson', description: 'Loose cushion ease', priceDelta: 0 },
    { id: 'lawson-deep', label: 'Deep Lawson', description: 'Extra-deep seat', priceDelta: 3200 }
  ],
  camelback: [
    { id: 'camel-georgian', label: 'Georgian Camelback', description: 'Arched crown back', priceDelta: 0 },
    { id: 'camel-double', label: 'Double Camelback', description: 'Two-hump crown', priceDelta: 5500 }
  ],
  'english-roll-arm': [
    { id: 'era-classic', label: 'English Roll Arm', description: 'Low-set back with rolled arms', priceDelta: 0 },
    { id: 'era-studio', label: 'Studio English', description: 'Compact studio size', priceDelta: -2500 }
  ],
  'art-deco': [
    { id: 'deco-parisian', label: 'Parisian Art Deco', description: 'Brass legs, geometric back', priceDelta: 0 },
    { id: 'deco-gatsby', label: 'Gatsby', description: 'Large-scale geometric', priceDelta: 9500 }
  ],
  cloud: [
    { id: 'cloud-3s', label: 'Cloud 3-seater', description: 'Down-fill pillowy depth', priceDelta: 0 },
    { id: 'cloud-4s', label: 'Cloud 4-seater', description: 'Oversized cloud', priceDelta: 12500 }
  ],
  'hotel-lounge': [
    { id: 'hotel-boutique', label: 'Boutique Hotel', description: 'Scaled for lobby lounges', priceDelta: 0 },
    { id: 'hotel-grand', label: 'Grand Hotel', description: 'Full-room hospitality scale', priceDelta: 14500 }
  ],
  'low-profile': [
    { id: 'low-arch', label: 'Architectural Low', description: 'Floor-grazing low', priceDelta: 0 }
  ],
  'japanese-minimal': [
    { id: 'jm-floor', label: 'Floor Seat', description: 'Tatami floor-level', priceDelta: 0 },
    { id: 'jm-low', label: 'Low Bench', description: 'Ultra-low bench', priceDelta: 2800 }
  ],
  sculpted: [
    { id: 'sculpt-organic', label: 'Organic Sculpt', description: 'Artisan organic form', priceDelta: 0 },
    { id: 'sculpt-museum', label: 'Museum Edition', description: 'One-off sculptural piece', priceDelta: 24500 }
  ],
  'velvet-lounge': [
    { id: 'vl-deep', label: 'Deep Velvet Lounge', description: 'Velvet-wrapped deep seat', priceDelta: 0 },
    { id: 'vl-piped', label: 'Piped Velvet', description: 'Gold-piped trim', priceDelta: 5200 }
  ],
  'floating-base': [
    { id: 'float-plinth', label: 'Hidden Plinth', description: 'Suspended-look plinth', priceDelta: 0 },
    { id: 'float-glow', label: 'Underglow Plinth', description: 'Ambient underglow LED', priceDelta: 6800 }
  ],
  'contemporary-luxury': [
    { id: 'cl-editorial', label: 'Editorial Lounge', description: 'Modern luxe editorial', priceDelta: 0 },
    { id: 'cl-gallery', label: 'Gallery Lounge', description: 'Oversized scale', priceDelta: 12500 }
  ],
  'signature-series': [
    { id: 'sig-azam', label: 'Azam Signature', description: 'Signed by Azam Pasha', priceDelta: 0 },
    { id: 'sig-mahran', label: 'Mahran Edition', description: 'Curated by Syed Mahran', priceDelta: 18500 }
  ]
};

export const getSofaSubModels = (style: ProductStyle): SubModel[] =>
  SUB_MODELS[style] ?? SUB_MODELS.modern;

// ─────────────────────────────────────────────────────────────────────
// GROUP BUILDERS
// ─────────────────────────────────────────────────────────────────────

const buildGroups = (style: ProductStyle): OptionGroup[] => {
  const subs = getSofaSubModels(style);
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
      id: 'seating',
      label: 'Seating count',
      section: 'structure',
      kind: 'count',
      required: true,
      defaultValue: 3,
      options: [],
      range: { min: 2, max: 6, step: 1, baseUnit: 3, pricePerUnit: 7500, unitLabel: 'seat' }
    },
    {
      id: 'upholstery',
      label: 'Seat upholstery',
      section: 'seat',
      kind: 'single',
      required: true,
      defaultValue: 'linen-sandstone',
      options: CLOTH_OPTIONS
    },
    {
      id: 'seat-pattern',
      label: 'Seat pattern',
      section: 'seat',
      kind: 'single',
      required: false,
      defaultValue: 'seat-plain',
      options: SEAT_PATTERNS
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
      id: 'back-upholstery',
      label: 'Back upholstery',
      section: 'back',
      kind: 'single',
      required: true,
      defaultValue: 'linen-sandstone',
      options: CLOTH_OPTIONS
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
      defaultValue:
        style === 'chesterfield'
          ? 'arm-rolled'
          : style === 'minimal'
            ? 'arm-track'
            : 'arm-track',
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
      id: 'pillow-count',
      label: 'Accent pillows',
      section: 'pillows',
      kind: 'count',
      required: false,
      defaultValue: 2,
      options: [],
      range: { min: 0, max: 8, step: 1, baseUnit: 2, pricePerUnit: 1200, unitLabel: 'pillow' }
    },
    {
      id: 'pillow-upholstery',
      label: 'Pillow upholstery',
      section: 'pillows',
      kind: 'single',
      required: false,
      defaultValue: 'velvet-obsidian',
      options: CLOTH_OPTIONS
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

// ─────────────────────────────────────────────────────────────────────
// MAIN BUILDER
// ─────────────────────────────────────────────────────────────────────

interface SofaSpec {
  id?: string;
  slug?: string;
  name: string;
  tagline: string;
  description: string;
  style: ProductStyle;
  basePrice?: number;
  complexity?: Complexity;
  tags?: ProductTag[];
  collections?: string[];
  defaultUpholstery?: string;
  defaultBase?: string;
  dimensionsCm?: { w: number; d: number; h: number };
}

const COMPLEXITY_BY_STYLE: Record<ProductStyle, Complexity> = {
  modern: 'clean',
  minimal: 'clean',
  scandinavian: 'clean',
  chesterfield: 'ornate',
  'italian-luxury': 'detailed',
  'royal-carved': 'masterwork',
  'arabic-luxury': 'ornate',
  'asian-premium': 'detailed',
  curved: 'detailed',
  recliner: 'detailed',
  sectional: 'detailed',
  'l-shape': 'clean',
  modular: 'clean',
  'mid-century': 'clean',
  tuxedo: 'detailed',
  lawson: 'clean',
  camelback: 'ornate',
  'english-roll-arm': 'detailed',
  'art-deco': 'ornate',
  cloud: 'detailed',
  'hotel-lounge': 'detailed',
  'low-profile': 'clean',
  'japanese-minimal': 'clean',
  sculpted: 'masterwork',
  'velvet-lounge': 'detailed',
  'floating-base': 'detailed',
  'contemporary-luxury': 'detailed',
  'signature-series': 'masterwork'
};

const COMPLEXITY_MULTIPLIER: Record<Complexity, number> = {
  clean: 1.0,
  detailed: 1.08,
  ornate: 1.18,
  masterwork: 1.32
};

export function buildSofa(spec: SofaSpec): Product {
  const meta = STYLE_META[spec.style];
  const basePrice = (spec.basePrice ?? 25000) + meta.premium;
  const complexity: Complexity = spec.complexity ?? COMPLEXITY_BY_STYLE[spec.style];
  const id = spec.id ?? `sofa-${slugify(spec.name)}`;
  const slug = spec.slug ?? slugify(spec.name);

  return {
    id,
    slug,
    category: 'sofa',
    name: spec.name,
    tagline: spec.tagline,
    description: spec.description,
    basePrice,
    currency: 'INR',
    renderVariant: `sofa-${spec.style}`,
    defaultMaterials: {
      upholstery: spec.defaultUpholstery ?? 'linen-sandstone',
      base: spec.defaultBase ?? 'walnut-natural'
    },
    style: spec.style,
    tags: spec.tags ?? [],
    collections: spec.collections ?? [],
    complexity,
    sections: SOFA_SECTIONS,
    groups: buildGroups(spec.style),
    dimensions: spec.dimensionsCm
      ? {
          w: spec.dimensionsCm.w,
          d: spec.dimensionsCm.d,
          h: spec.dimensionsCm.h,
          wRange: [spec.dimensionsCm.w - 60, spec.dimensionsCm.w + 120],
          dRange: [spec.dimensionsCm.d - 20, spec.dimensionsCm.d + 40],
          hRange: [spec.dimensionsCm.h - 20, spec.dimensionsCm.h + 30]
        }
      : { w: 240, d: 98, h: 84, wRange: [180, 360], dRange: [80, 140], hRange: [70, 110] },
    pricing: {
      complexityMultiplier: COMPLEXITY_MULTIPLIER[complexity],
      areaPricePerCm2: 0.14,
      heightPricePerCm: 85,
      tagPremiums: {
        'hand-carved': 9000,
        'imported-fabric': 3500,
        'hotel-grade': 6500,
        'export-quality': 2500
      }
    }
  };
}
