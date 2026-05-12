import { z } from 'zod';

/**
 * Product Schemas — single source of truth for every configurable product.
 *
 * Phase 2 extends Phase 1 additively:
 *   - New sub-schemas (Section, Dimensions, Style, Tag, Complexity, PricingRule)
 *   - Product gains OPTIONAL fields (sections, style, tags, dimensions, complexity,
 *     collections, pricing rules) — every Phase 1 product still validates.
 *
 * Admin CMS (Phase 2) validates writes against these schemas.
 * ---------------------------------------------------------------
 */

export const ProductCategorySchema = z.enum([
  'sofa',
  'chair',
  'bed',
  'hydraulic-bed',
  'mattress',
  'curtain',
  'headboard',
  'deewan',
  'custom'
]);
export type ProductCategory = z.infer<typeof ProductCategorySchema>;

/** A selectable option with a price delta. */
export const OptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  priceDelta: z.number().default(0),
  /** Optional visual token (hex / image URL / texture key). */
  visual: z.string().optional(),
  meta: z.record(z.unknown()).optional()
});
export type Option = z.infer<typeof OptionSchema>;

/** A group of options the user picks from. */
export const OptionGroupSchema = z.object({
  id: z.string(),
  label: z.string(),
  /** 'single' picks one, 'range' uses min/max/step, 'count' steps integers. */
  kind: z.enum(['single', 'range', 'count']),
  required: z.boolean().default(true),
  options: z.array(OptionSchema).default([]),
  range: z
    .object({
      min: z.number(),
      max: z.number(),
      step: z.number().default(1),
      /** Price delta per unit above `baseUnit`. */
      pricePerUnit: z.number().default(0),
      baseUnit: z.number().default(0),
      unitLabel: z.string().optional()
    })
    .optional(),
  defaultValue: z.union([z.string(), z.number()]).optional(),
  /** Phase 2: groups can belong to a named section (seat, back, arms, ...). */
  section: z.string().optional()
});
export type OptionGroup = z.infer<typeof OptionGroupSchema>;

// ────────────────────────────────────────────────────────────────
// PHASE 2 EXTENSIONS
// ────────────────────────────────────────────────────────────────

/**
 * Section — a named region of the product the user can customise independently.
 * A single group may either belong to a section (via group.section) or apply globally.
 */
export const SectionSchema = z.object({
  id: z.string(),
  label: z.string(),
  /** Short description shown on the section tab. */
  hint: z.string().optional(),
  /** Which Lucide icon key to render alongside the tab. */
  icon: z
    .enum([
      'sofa',
      'armchair',
      'bed',
      'layers',
      'pillow',
      'frame',
      'hand',
      'leg',
      'lamp',
      'sparkles'
    ])
    .optional(),
  order: z.number().default(0)
});
export type Section = z.infer<typeof SectionSchema>;

/** Style system — global typology of silhouettes. */
export const ProductStyleSchema = z.enum([
  'modern',
  'minimal',
  'scandinavian',
  'chesterfield',
  'italian-luxury',
  'royal-carved',
  'arabic-luxury',
  'asian-premium',
  'curved',
  'recliner',
  'sectional',
  'l-shape',
  'modular',
  // — new luxury typologies
  'mid-century',
  'tuxedo',
  'lawson',
  'camelback',
  'english-roll-arm',
  'art-deco',
  'cloud',
  'hotel-lounge',
  'low-profile',
  'japanese-minimal',
  'sculpted',
  'velvet-lounge',
  'floating-base',
  'contemporary-luxury',
  'signature-series'
]);
export type ProductStyle = z.infer<typeof ProductStyleSchema>;

/** Product tag system (freeform, used by admin CMS + filters). */
export const ProductTagSchema = z.enum([
  'new',
  'bestseller',
  'editors-pick',
  'trending',
  'heritage',
  'limited',
  'export-quality',
  'hotel-grade',
  'orthopedic',
  'hand-carved',
  'imported-fabric'
]);
export type ProductTag = z.infer<typeof ProductTagSchema>;

/** Dimensional envelope — drives both rendering and pricing. */
export const DimensionsSchema = z.object({
  /** Length / width / height in cm. */
  w: z.number().positive(),
  d: z.number().positive(),
  h: z.number().positive(),
  /** Optional allowed ranges for live resize. */
  wRange: z.tuple([z.number(), z.number()]).optional(),
  dRange: z.tuple([z.number(), z.number()]).optional(),
  hRange: z.tuple([z.number(), z.number()]).optional()
});
export type Dimensions = z.infer<typeof DimensionsSchema>;

/** Complexity tier — governs craftsmanship premium. */
export const ComplexitySchema = z.enum(['clean', 'detailed', 'ornate', 'masterwork']);
export type Complexity = z.infer<typeof ComplexitySchema>;

/** Pricing rules — complement schema-driven option pricing. */
export const PricingRuleSchema = z.object({
  /** Multiplier applied to subtotal (e.g. 1.25 for Masterwork tier). */
  complexityMultiplier: z.number().positive().optional(),
  /** ₹ per cm² above the base footprint (w × d). */
  areaPricePerCm2: z.number().optional(),
  /** ₹ per cm of additional height above base. */
  heightPricePerCm: z.number().optional(),
  /** Flat premium added for each tag (hotel-grade, hand-carved, ...). */
  tagPremiums: z.record(z.string(), z.number()).optional()
});
export type PricingRule = z.infer<typeof PricingRuleSchema>;

/** Product definition — drives the configurator UI AND the pricing engine. */
export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: ProductCategorySchema,
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  basePrice: z.number(),
  currency: z.literal('INR').default('INR'),
  /** Which 3D variant to render (procedural style key or GLTF key). */
  renderVariant: z.string().default('procedural-sofa'),
  /** Default material slots — used by the 3D engine. */
  defaultMaterials: z.record(z.string()).default({}),
  /** Cover image for cards. */
  cover: z.string().optional(),
  /** Configurable groups. */
  groups: z.array(OptionGroupSchema).default([]),

  // ── Phase 2 ──────────────────────────────────────────────────
  /** Named sections (seat/back/arms/...). Optional; absent → flat groups. */
  sections: z.array(SectionSchema).optional(),
  /** Visual typology. */
  style: ProductStyleSchema.optional(),
  /** Tags for filters + CMS. */
  tags: z.array(ProductTagSchema).default([]).optional(),
  /** Named collection IDs this product belongs to. */
  collections: z.array(z.string()).default([]).optional(),
  /** Craftsmanship complexity tier. */
  complexity: ComplexitySchema.optional(),
  /** Base dimensions. */
  dimensions: DimensionsSchema.optional(),
  /** Advanced pricing rules. */
  pricing: PricingRuleSchema.optional()
});
export type Product = z.infer<typeof ProductSchema>;

/** Fabric / wood / finish catalog entry. */
export const MaterialSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.enum([
    'fabric',
    'wood',
    'metal',
    'leather',
    'foam',
    'rexine',
    'suede',
    'velvet',
    'cotton',
    'boucle',
    'linen',
    'spring'
  ]),
  /** Base tint (hex) — drives 3D PBR albedo. */
  color: z.string(),
  /** Perceived premium tier — drives price tier. */
  tier: z.enum(['signature', 'premium', 'atelier']).default('signature'),
  /** Price delta applied when chosen. */
  priceDelta: z.number().default(0),
  /** PBR hints for the 3D engine. */
  pbr: z
    .object({
      roughness: z.number().min(0).max(1).default(0.65),
      metalness: z.number().min(0).max(1).default(0.05),
      sheen: z.number().min(0).max(1).default(0),
      clearcoat: z.number().min(0).max(1).default(0)
    })
    .default({}),
  /** Optional compact label for swatches. */
  badge: z.string().optional()
});
export type Material = z.infer<typeof MaterialSchema>;

/** Foam density spec. */
export const FoamSchema = z.object({
  id: z.string(),
  density: z.number(),
  name: z.string(),
  tier: z.enum(['better', 'best', 'luxury-premium']),
  description: z.string(),
  pricePerDensity: z.number().default(160),
  /** Which foam slot this applies to (seat, back, mattress, bed, headboard). */
  slot: z.enum(['seat', 'back', 'mattress', 'bed', 'headboard']).default('seat')
});
export type Foam = z.infer<typeof FoamSchema>;

/** Collection — a curated selection surfaced on /collections/[slug]. */
export const CollectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  label: z.string(),
  subtitle: z.string(),
  description: z.string(),
  tone: z.enum(['walnut', 'obsidian', 'cream', 'bronze', 'emerald']),
  /** Tag used to filter products into this collection. */
  filterTag: ProductTagSchema.optional(),
  /** Or an explicit list of product IDs. */
  productIds: z.array(z.string()).optional(),
  /** Display position on /collections. */
  order: z.number().default(0),
  featured: z.boolean().default(false)
});
export type Collection = z.infer<typeof CollectionSchema>;
