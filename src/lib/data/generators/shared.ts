import type { Material, Option, ProductStyle, ProductTag } from '@/lib/schemas/product';
import {
  VELVETS,
  LINENS,
  COTTONS,
  BOUCLES,
  SUEDE,
  REXINE,
  LEATHERS,
  PREMIUM_FABRICS,
  WOODS,
  METALS,
  CLOTH_MATERIALS
} from '../materials';
import { getFoamsForSlot } from '../foams';
import type { Foam } from '@/lib/schemas/product';

/**
 * Shared generator helpers — option builders reused across sofa/chair/bed/…
 *
 * Design principle:
 *   Every generator composes the same small, tested option builders.
 *   Extending the catalog = adding a new style tuple or a new helper.
 */

export const toOptions = (mats: Material[]): Option[] =>
  mats.map((m) => ({
    id: m.id,
    label: m.name,
    description: m.badge,
    priceDelta: m.priceDelta,
    visual: m.color,
    meta: { kind: m.kind, tier: m.tier }
  }));

/** Every cloth the atelier stocks — sofas / chairs / beds. */
export const CLOTH_OPTIONS = toOptions(CLOTH_MATERIALS);

export const VELVET_OPTIONS = toOptions(VELVETS);
export const LINEN_OPTIONS = toOptions(LINENS);
export const COTTON_OPTIONS = toOptions(COTTONS);
export const BOUCLE_OPTIONS = toOptions(BOUCLES);
export const SUEDE_OPTIONS = toOptions(SUEDE);
export const REXINE_OPTIONS = toOptions(REXINE);
export const LEATHER_OPTIONS = toOptions(LEATHERS);
export const PREMIUM_FABRIC_OPTIONS = toOptions(PREMIUM_FABRICS);
export const WOOD_OPTIONS = toOptions(WOODS);
export const METAL_OPTIONS = toOptions(METALS);

/** Turn foam tier objects into Option entries (single-select swatches). */
export const foamOptionsForSlot = (slot: Foam['slot']): Option[] =>
  getFoamsForSlot(slot).map((f) => ({
    id: f.id,
    label: f.name,
    description: f.description,
    // Price delta ≈ tier density * per-density rate (shown as the premium vs. base 'better' tier)
    priceDelta:
      f.tier === 'better'
        ? 0
        : f.tier === 'best'
          ? Math.round((f.density - 40) * f.pricePerDensity)
          : Math.round((f.density - 40) * f.pricePerDensity),
    meta: { tier: f.tier, density: f.density, slot: f.slot }
  }));

// ─────────────────────────────────────────────────────────────────────
// STYLE META — labels + descriptive context for every sofa style.
// ─────────────────────────────────────────────────────────────────────
export const STYLE_META: Record<
  ProductStyle,
  { label: string; descriptor: string; heritage?: string; premium: number }
> = {
  modern: { label: 'Modern', descriptor: 'Sculpted, low-profile', premium: 0 },
  minimal: { label: 'Minimal', descriptor: 'Architectural restraint', premium: 0 },
  scandinavian: { label: 'Scandinavian', descriptor: 'Light woods, clean lines', premium: 2500 },
  chesterfield: {
    label: 'Chesterfield',
    descriptor: 'Button-tufted heritage',
    heritage: 'British, 1720s',
    premium: 12000
  },
  'italian-luxury': {
    label: 'Italian Luxury',
    descriptor: 'Milanese proportion, leather-forward',
    heritage: 'Milan',
    premium: 18000
  },
  'royal-carved': {
    label: 'Royal Carved',
    descriptor: 'Hand-carved wooden frame',
    heritage: 'Mysore',
    premium: 22000
  },
  'arabic-luxury': {
    label: 'Arabic Luxury',
    descriptor: 'Majlis-inspired, low, generous',
    heritage: 'Gulf',
    premium: 14000
  },
  'asian-premium': {
    label: 'Asian Premium',
    descriptor: 'Teak-framed, silk-upholstered',
    premium: 11000
  },
  curved: { label: 'Curved', descriptor: 'Crescent seating', premium: 9500 },
  recliner: { label: 'Recliner', descriptor: 'Engineered reclining modules', premium: 14500 },
  sectional: { label: 'Sectional', descriptor: 'Multi-module large-format', premium: 16000 },
  'l-shape': { label: 'L-Shape', descriptor: 'Corner-integrated', premium: 9500 },
  modular: { label: 'Modular', descriptor: 'Reconfigurable blocks', premium: 12000 }
};

// ─────────────────────────────────────────────────────────────────────
// COMMON option factories
// ─────────────────────────────────────────────────────────────────────

export const ARM_STYLES: Option[] = [
  { id: 'arm-track', label: 'Track', description: 'Clean rectangular', priceDelta: 0 },
  { id: 'arm-rolled', label: 'Rolled', description: 'Classic curved roll', priceDelta: 1800 },
  { id: 'arm-flared', label: 'Flared', description: 'Angled outward', priceDelta: 2200 },
  { id: 'arm-pleated', label: 'Pleated', description: 'Hand-pleated fan', priceDelta: 3600 },
  { id: 'arm-sled', label: 'Sled', description: 'Metal under-sled', priceDelta: 2800 },
  { id: 'arm-english', label: 'English Roll', description: 'Deep traditional roll', priceDelta: 3200 },
  { id: 'arm-none', label: 'Armless', description: 'Open silhouette', priceDelta: -1200 }
];

export const BACK_STYLES: Option[] = [
  { id: 'back-pillow', label: 'Loose Pillow', description: 'Separate removable cushions', priceDelta: 0 },
  { id: 'back-tight', label: 'Tight', description: 'Fitted tailored back', priceDelta: 1500 },
  { id: 'back-fluted', label: 'Fluted', description: 'Vertical channel stitching', priceDelta: 3800 },
  { id: 'back-button', label: 'Button Tufted', description: 'Hand button-tufted', priceDelta: 6500 },
  { id: 'back-chesterfield', label: 'Chesterfield Deep-button', description: 'Heritage deep-button', priceDelta: 8200 }
];

export const LEG_STYLES: Option[] = [
  { id: 'leg-tapered', label: 'Tapered Wood', description: 'Classic tapered walnut', priceDelta: 0 },
  { id: 'leg-block', label: 'Block Wood', description: 'Geometric block', priceDelta: 800 },
  { id: 'leg-metal-sled', label: 'Metal Sled', description: 'Bronze under-sled', priceDelta: 2500 },
  { id: 'leg-turned', label: 'Turned Wood', description: 'Lathe-turned heritage', priceDelta: 2200 },
  { id: 'leg-hidden', label: 'Hidden / Floating', description: 'Invisible plinth', priceDelta: 3400 },
  { id: 'leg-carved', label: 'Hand Carved', description: 'Atelier-carved foot', priceDelta: 6500 }
];

export const PIPING_STYLES: Option[] = [
  { id: 'piping-none', label: 'No Piping', priceDelta: 0 },
  { id: 'piping-tone', label: 'Tone-on-Tone Piping', priceDelta: 900 },
  { id: 'piping-contrast', label: 'Contrast Piping', priceDelta: 1400 },
  { id: 'piping-gold', label: 'Gold Cord Piping', description: 'Hand-stitched', priceDelta: 3500 }
];

export const STITCHING_STYLES: Option[] = [
  { id: 'stitch-single', label: 'Single Needle', priceDelta: 0 },
  { id: 'stitch-double', label: 'Double Needle', priceDelta: 800 },
  { id: 'stitch-saddle', label: 'Saddle Stitch', description: 'Hand-stitched detail', priceDelta: 2400 },
  { id: 'stitch-hand', label: 'Full Hand-Stitched', priceDelta: 6500 }
];

export const SEAT_PATTERNS: Option[] = [
  { id: 'seat-plain', label: 'Plain', priceDelta: 0 },
  { id: 'seat-tufted', label: 'Tufted', priceDelta: 2400 },
  { id: 'seat-channel', label: 'Channel', priceDelta: 2800 },
  { id: 'seat-diamond', label: 'Diamond Tufted', priceDelta: 4600 }
];

/** Deterministic slugifier. */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Tag list helper. */
export const tagify = (...tags: ProductTag[]): ProductTag[] => Array.from(new Set(tags));
