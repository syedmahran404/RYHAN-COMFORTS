import { z } from 'zod';

/**
 * Product Schemas — single source of truth for every configurable product.
 * Phase 2 admin CMS validates writes against these Zod schemas.
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
  defaultValue: z.union([z.string(), z.number()]).optional()
});
export type OptionGroup = z.infer<typeof OptionGroupSchema>;

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
  /** Which 3D variant to render (procedural or GLTF key). */
  renderVariant: z.string().default('procedural-sofa'),
  /** Default material slots — used by the 3D engine. */
  defaultMaterials: z.record(z.string()).default({}),
  /** Cover image for cards. */
  cover: z.string().optional(),
  /** Configurable groups. */
  groups: z.array(OptionGroupSchema).default([])
});
export type Product = z.infer<typeof ProductSchema>;

/** Fabric / wood / finish catalog entry. */
export const MaterialSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.enum(['fabric', 'wood', 'metal', 'leather', 'foam']),
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
    .default({})
});
export type Material = z.infer<typeof MaterialSchema>;
