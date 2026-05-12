import type { Product } from '@/lib/schemas/product';
import { FABRICS, WOODS } from './materials';
import { SOFA_DEFAULTS } from '@/lib/utils/constants';

/**
 * Catalog — schema-driven product definitions.
 * Each product is admin-editable in Phase 2 without touching UI code.
 */

const fabricOptions = FABRICS.map((f) => ({
  id: f.id,
  label: f.name,
  priceDelta: f.priceDelta,
  visual: f.color,
  meta: { kind: f.kind, tier: f.tier }
}));

const woodOptions = WOODS.map((w) => ({
  id: w.id,
  label: w.name,
  priceDelta: w.priceDelta,
  visual: w.color,
  meta: { kind: w.kind, tier: w.tier }
}));

// ------------------------------------------------------------------
// SOFAS — fully configurable prototype
// ------------------------------------------------------------------

const SOFA_ATELIER: Product = {
  id: 'sofa-atelier',
  slug: 'atelier-signature',
  category: 'sofa',
  name: 'Atelier Signature',
  tagline: 'The cornerstone of the collection',
  description:
    'A sculpted low-profile sofa with hand-stitched seams and a solid walnut plinth. Custom-made in our Bengaluru atelier to your dimensions and fabric.',
  basePrice: SOFA_DEFAULTS.basePrice,
  currency: 'INR',
  renderVariant: 'procedural-sofa',
  defaultMaterials: {
    upholstery: 'linen-sandstone',
    base: 'walnut-natural'
  },
  groups: [
    {
      id: 'model',
      label: 'Silhouette',
      kind: 'single',
      required: true,
      defaultValue: 'atelier-lowback',
      options: [
        {
          id: 'atelier-lowback',
          label: 'Low-back Atelier',
          description: 'Cinematic low silhouette · 82 cm height',
          priceDelta: 0
        },
        {
          id: 'atelier-highback',
          label: 'High-back Atelier',
          description: 'Architectural high silhouette · 104 cm height',
          priceDelta: 6500
        },
        {
          id: 'atelier-chaise',
          label: 'Atelier Chaise',
          description: 'Extended chaise lounge variant',
          priceDelta: 11000
        }
      ]
    },
    {
      id: 'seating',
      label: 'Seating count',
      kind: 'count',
      required: true,
      defaultValue: SOFA_DEFAULTS.seatingCount,
      range: {
        min: 2,
        max: 6,
        step: 1,
        baseUnit: 3,
        pricePerUnit: 7500,
        unitLabel: 'seat'
      },
      options: []
    },
    {
      id: 'upholstery',
      label: 'Upholstery',
      kind: 'single',
      required: true,
      defaultValue: 'linen-sandstone',
      options: fabricOptions
    },
    {
      id: 'base',
      label: 'Base & legs',
      kind: 'single',
      required: true,
      defaultValue: 'walnut-natural',
      options: woodOptions
    },
    {
      id: 'seat-foam',
      label: 'Seat foam density',
      kind: 'range',
      required: true,
      defaultValue: SOFA_DEFAULTS.seatFoamDensity,
      range: {
        min: 32,
        max: 70,
        step: 2,
        baseUnit: SOFA_DEFAULTS.seatFoamDensity,
        pricePerUnit: 180,
        unitLabel: 'density'
      },
      options: []
    },
    {
      id: 'back-foam',
      label: 'Back foam density',
      kind: 'range',
      required: true,
      defaultValue: SOFA_DEFAULTS.backFoamDensity,
      range: {
        min: 24,
        max: 60,
        step: 2,
        baseUnit: SOFA_DEFAULTS.backFoamDensity,
        pricePerUnit: 140,
        unitLabel: 'density'
      },
      options: []
    }
  ]
};

// ------------------------------------------------------------------
// Lightweight placeholders for other categories (Phase 2 expansion)
// ------------------------------------------------------------------

const CHAIR_LUNE: Product = {
  id: 'chair-lune',
  slug: 'lune-lounge',
  category: 'chair',
  name: 'Lune Lounge',
  tagline: 'Sculpted comfort',
  description: 'A wing-backed lounge chair carved for quiet rooms and late reading.',
  basePrice: 18000,
  renderVariant: 'procedural-chair',
  currency: 'INR',
  defaultMaterials: { upholstery: 'velvet-emerald', base: 'walnut-natural' },
  groups: []
};

const BED_NOCTURNE: Product = {
  id: 'bed-nocturne',
  slug: 'nocturne-carved',
  category: 'bed',
  name: 'Nocturne Carved Bed',
  tagline: 'Handcarved sanctuary',
  description: 'A carved rosewood bed with a fluted headboard and hydraulic storage option.',
  basePrice: 62000,
  renderVariant: 'procedural-bed',
  currency: 'INR',
  defaultMaterials: { frame: 'rosewood-hand-carved' },
  groups: []
};

const MATTRESS_AURA: Product = {
  id: 'mattress-aura',
  slug: 'aura-latex',
  category: 'mattress',
  name: 'Aura Latex',
  tagline: 'Sleep, re-engineered',
  description: 'Custom-layered latex and pocket-spring mattress, built to your firmness profile.',
  basePrice: 28000,
  renderVariant: 'procedural-mattress',
  currency: 'INR',
  defaultMaterials: {},
  groups: []
};

const CURTAIN_VEIL: Product = {
  id: 'curtain-veil',
  slug: 'veil-drape',
  category: 'curtain',
  name: 'Veil Drape',
  tagline: 'Light, redrawn',
  description: 'Floor-to-ceiling linen and velvet drapery, tailored to the millimetre.',
  basePrice: 9500,
  renderVariant: 'procedural-curtain',
  currency: 'INR',
  defaultMaterials: {},
  groups: []
};

const HEADBOARD_ORACLE: Product = {
  id: 'headboard-oracle',
  slug: 'oracle-fluted',
  category: 'headboard',
  name: 'Oracle Fluted Headboard',
  tagline: 'Wall as stage',
  description: 'A fluted wall-mounted headboard in upholstered velvet or carved walnut.',
  basePrice: 22000,
  renderVariant: 'procedural-headboard',
  currency: 'INR',
  defaultMaterials: {},
  groups: []
};

export const CATALOG: Product[] = [
  SOFA_ATELIER,
  CHAIR_LUNE,
  BED_NOCTURNE,
  MATTRESS_AURA,
  CURTAIN_VEIL,
  HEADBOARD_ORACLE
];

export const getProduct = (id: string) => CATALOG.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => CATALOG.find((p) => p.slug === slug);
export const getProductsByCategory = (category: Product['category']) =>
  CATALOG.filter((p) => p.category === category);

/** The flagship sofa that powers the Phase 1 prototype configurator. */
export const SOFA_PROTOTYPE = SOFA_ATELIER;
