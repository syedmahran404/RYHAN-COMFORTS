import type { Material } from '@/lib/schemas/product';

/**
 * Material library — the full atelier palette.
 *
 * Tier governs price delta:
 *   signature → included
 *   premium   → +₹3,500–₹6,000
 *   atelier   → +₹9,000–₹16,000
 *
 * Phase 2 expands the palette to cover every cloth type the atelier offers:
 *   Leather · Rexine · Suede · Velvet · Cotton · Linen · Bouclé · Premium imports
 * plus mattress-grade materials (pocket-spring, memory foam, latex, orthopedic).
 */

// ═══════════════════════════════════════════════════════════════════
// LEATHERS
// ═══════════════════════════════════════════════════════════════════

export const LEATHERS: Material[] = [
  {
    id: 'leather-cognac',
    name: 'Cognac Full-Grain',
    kind: 'leather',
    color: '#6b3b17',
    tier: 'atelier',
    priceDelta: 14000,
    badge: 'Italian',
    pbr: { roughness: 0.45, metalness: 0.03, sheen: 0.15, clearcoat: 0.2 }
  },
  {
    id: 'leather-noir',
    name: 'Noir Full-Grain',
    kind: 'leather',
    color: '#17130f',
    tier: 'atelier',
    priceDelta: 14000,
    badge: 'Italian',
    pbr: { roughness: 0.42, metalness: 0.03, sheen: 0.15, clearcoat: 0.22 }
  },
  {
    id: 'leather-saddle',
    name: 'Saddle Full-Grain',
    kind: 'leather',
    color: '#8b5a2b',
    tier: 'atelier',
    priceDelta: 13500,
    pbr: { roughness: 0.5, metalness: 0.03, sheen: 0.12, clearcoat: 0.18 }
  },
  {
    id: 'leather-oxblood',
    name: 'Oxblood Nubuck',
    kind: 'leather',
    color: '#3f0f14',
    tier: 'atelier',
    priceDelta: 15000,
    badge: 'Nubuck',
    pbr: { roughness: 0.68, metalness: 0.02, sheen: 0.05, clearcoat: 0.08 }
  },
  {
    id: 'leather-stone',
    name: 'Stone Nappa',
    kind: 'leather',
    color: '#7b7368',
    tier: 'premium',
    priceDelta: 9500,
    badge: 'Nappa',
    pbr: { roughness: 0.48, metalness: 0.02, sheen: 0.1, clearcoat: 0.18 }
  }
];

// ═══════════════════════════════════════════════════════════════════
// REXINE — faux leather, durable, hotel-grade
// ═══════════════════════════════════════════════════════════════════

export const REXINE: Material[] = [
  {
    id: 'rexine-jet',
    name: 'Jet Rexine',
    kind: 'rexine',
    color: '#0d0c0a',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.42, metalness: 0.04, sheen: 0.18, clearcoat: 0.25 }
  },
  {
    id: 'rexine-tan',
    name: 'Tan Rexine',
    kind: 'rexine',
    color: '#8b6a44',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.45, metalness: 0.04, sheen: 0.18, clearcoat: 0.25 }
  },
  {
    id: 'rexine-espresso',
    name: 'Espresso Rexine',
    kind: 'rexine',
    color: '#3b2414',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.45, metalness: 0.04, sheen: 0.18, clearcoat: 0.25 }
  },
  {
    id: 'rexine-ivory',
    name: 'Ivory Rexine',
    kind: 'rexine',
    color: '#e7dfc8',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.5, metalness: 0.03, sheen: 0.15, clearcoat: 0.2 }
  }
];

// ═══════════════════════════════════════════════════════════════════
// SUEDE
// ═══════════════════════════════════════════════════════════════════

export const SUEDE: Material[] = [
  {
    id: 'suede-graphite',
    name: 'Graphite Suede',
    kind: 'suede',
    color: '#2f2d2a',
    tier: 'premium',
    priceDelta: 5500,
    pbr: { roughness: 0.85, metalness: 0, sheen: 0.3, clearcoat: 0 }
  },
  {
    id: 'suede-camel',
    name: 'Camel Suede',
    kind: 'suede',
    color: '#a27b4e',
    tier: 'premium',
    priceDelta: 5500,
    pbr: { roughness: 0.85, metalness: 0, sheen: 0.3, clearcoat: 0 }
  },
  {
    id: 'suede-dust',
    name: 'Rose Dust Suede',
    kind: 'suede',
    color: '#b08a80',
    tier: 'premium',
    priceDelta: 5800,
    pbr: { roughness: 0.85, metalness: 0, sheen: 0.32, clearcoat: 0 }
  },
  {
    id: 'suede-midnight',
    name: 'Midnight Suede',
    kind: 'suede',
    color: '#1a1f2e',
    tier: 'premium',
    priceDelta: 5500,
    pbr: { roughness: 0.82, metalness: 0, sheen: 0.35, clearcoat: 0 }
  }
];

// ═══════════════════════════════════════════════════════════════════
// VELVET
// ═══════════════════════════════════════════════════════════════════

export const VELVETS: Material[] = [
  {
    id: 'velvet-obsidian',
    name: 'Obsidian Velvet',
    kind: 'velvet',
    color: '#1c1b18',
    tier: 'premium',
    priceDelta: 4500,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.6, clearcoat: 0 }
  },
  {
    id: 'velvet-bordeaux',
    name: 'Bordeaux Velvet',
    kind: 'velvet',
    color: '#4a0f1a',
    tier: 'premium',
    priceDelta: 4500,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.65, clearcoat: 0 }
  },
  {
    id: 'velvet-emerald',
    name: 'Emerald Velvet',
    kind: 'velvet',
    color: '#1b3a2e',
    tier: 'premium',
    priceDelta: 4800,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.65, clearcoat: 0 }
  },
  {
    id: 'velvet-sapphire',
    name: 'Sapphire Velvet',
    kind: 'velvet',
    color: '#1c2f55',
    tier: 'premium',
    priceDelta: 4800,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.65, clearcoat: 0 }
  },
  {
    id: 'velvet-champagne',
    name: 'Champagne Velvet',
    kind: 'velvet',
    color: '#c2a66b',
    tier: 'atelier',
    priceDelta: 9200,
    badge: 'Imported',
    pbr: { roughness: 0.5, metalness: 0.03, sheen: 0.75, clearcoat: 0 }
  },
  {
    id: 'velvet-rose',
    name: 'Rose Velvet',
    kind: 'velvet',
    color: '#a1485a',
    tier: 'premium',
    priceDelta: 4800,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.65, clearcoat: 0 }
  }
];

// ═══════════════════════════════════════════════════════════════════
// LINEN · COTTON · BOUCLÉ · FABRIC
// ═══════════════════════════════════════════════════════════════════

export const LINENS: Material[] = [
  {
    id: 'linen-sandstone',
    name: 'Sandstone Linen',
    kind: 'linen',
    color: '#c9b58a',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.15, clearcoat: 0 }
  },
  {
    id: 'linen-ivory',
    name: 'Ivory Linen',
    kind: 'linen',
    color: '#efe7d4',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.92, metalness: 0, sheen: 0.12, clearcoat: 0 }
  },
  {
    id: 'linen-charcoal',
    name: 'Charcoal Linen',
    kind: 'linen',
    color: '#2b2a26',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.15, clearcoat: 0 }
  },
  {
    id: 'linen-moss',
    name: 'Moss Linen',
    kind: 'linen',
    color: '#556b4b',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.15, clearcoat: 0 }
  }
];

export const COTTONS: Material[] = [
  {
    id: 'cotton-bone',
    name: 'Bone Cotton',
    kind: 'cotton',
    color: '#e7e0cc',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.94, metalness: 0, sheen: 0.08, clearcoat: 0 }
  },
  {
    id: 'cotton-slate',
    name: 'Slate Cotton',
    kind: 'cotton',
    color: '#4a4f55',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.94, metalness: 0, sheen: 0.08, clearcoat: 0 }
  }
];

export const BOUCLES: Material[] = [
  {
    id: 'boucle-cream',
    name: 'Cream Bouclé',
    kind: 'boucle',
    color: '#e7d6af',
    tier: 'atelier',
    priceDelta: 12000,
    badge: 'Imported',
    pbr: { roughness: 0.95, metalness: 0, sheen: 0.25, clearcoat: 0 }
  },
  {
    id: 'boucle-clay',
    name: 'Clay Bouclé',
    kind: 'boucle',
    color: '#b08a6e',
    tier: 'atelier',
    priceDelta: 12000,
    badge: 'Imported',
    pbr: { roughness: 0.95, metalness: 0, sheen: 0.25, clearcoat: 0 }
  },
  {
    id: 'boucle-ash',
    name: 'Ash Bouclé',
    kind: 'boucle',
    color: '#8c8780',
    tier: 'atelier',
    priceDelta: 12500,
    badge: 'Imported',
    pbr: { roughness: 0.95, metalness: 0, sheen: 0.25, clearcoat: 0 }
  }
];

/** Premium imported fabrics — silks, jacquards, heritage weaves. */
export const PREMIUM_FABRICS: Material[] = [
  {
    id: 'fabric-silk-ivory',
    name: 'Silk Jacquard · Ivory',
    kind: 'fabric',
    color: '#efe3c4',
    tier: 'atelier',
    priceDelta: 16000,
    badge: 'Silk',
    pbr: { roughness: 0.45, metalness: 0.02, sheen: 0.8, clearcoat: 0 }
  },
  {
    id: 'fabric-damask-emerald',
    name: 'Emerald Damask',
    kind: 'fabric',
    color: '#214a3a',
    tier: 'atelier',
    priceDelta: 15500,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.55, clearcoat: 0 }
  }
];

/**
 * Convenience unions.
 *   FABRICS — all cloth-type materials the sofa/chair/bed configurator surfaces.
 */
export const FABRICS: Material[] = [
  ...VELVETS,
  ...LINENS,
  ...COTTONS,
  ...BOUCLES,
  ...SUEDE,
  ...REXINE,
  ...LEATHERS,
  ...PREMIUM_FABRICS
];

// ═══════════════════════════════════════════════════════════════════
// WOODS
// ═══════════════════════════════════════════════════════════════════

export const WOODS: Material[] = [
  {
    id: 'walnut-natural',
    name: 'Natural Walnut',
    kind: 'wood',
    color: '#6b4e2a',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.55, metalness: 0.04, sheen: 0, clearcoat: 0.1 }
  },
  {
    id: 'walnut-ebonized',
    name: 'Ebonised Walnut',
    kind: 'wood',
    color: '#141310',
    tier: 'premium',
    priceDelta: 5500,
    pbr: { roughness: 0.5, metalness: 0.05, sheen: 0, clearcoat: 0.2 }
  },
  {
    id: 'teak-burnt',
    name: 'Burnt Teak',
    kind: 'wood',
    color: '#4e3820',
    tier: 'premium',
    priceDelta: 4500,
    pbr: { roughness: 0.58, metalness: 0.04, sheen: 0, clearcoat: 0.1 }
  },
  {
    id: 'teak-honey',
    name: 'Honey Teak',
    kind: 'wood',
    color: '#a77a3f',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.55, metalness: 0.04, sheen: 0, clearcoat: 0.12 }
  },
  {
    id: 'oak-smoked',
    name: 'Smoked Oak',
    kind: 'wood',
    color: '#5c4a36',
    tier: 'premium',
    priceDelta: 4200,
    pbr: { roughness: 0.62, metalness: 0.03, sheen: 0, clearcoat: 0.1 }
  },
  {
    id: 'rosewood-hand-carved',
    name: 'Hand-carved Rosewood',
    kind: 'wood',
    color: '#5a2a1e',
    tier: 'atelier',
    priceDelta: 13000,
    badge: 'Hand-carved',
    pbr: { roughness: 0.5, metalness: 0.05, sheen: 0, clearcoat: 0.25 }
  },
  {
    id: 'mahogany-deep',
    name: 'Deep Mahogany',
    kind: 'wood',
    color: '#3d1a15',
    tier: 'atelier',
    priceDelta: 10500,
    pbr: { roughness: 0.5, metalness: 0.05, sheen: 0, clearcoat: 0.25 }
  }
];

// ═══════════════════════════════════════════════════════════════════
// METALS
// ═══════════════════════════════════════════════════════════════════

export const METALS: Material[] = [
  {
    id: 'brushed-bronze',
    name: 'Brushed Bronze',
    kind: 'metal',
    color: '#8f5f24',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.35, metalness: 0.9, sheen: 0, clearcoat: 0 }
  },
  {
    id: 'antique-gold',
    name: 'Antique Gold',
    kind: 'metal',
    color: '#b88d33',
    tier: 'premium',
    priceDelta: 3500,
    pbr: { roughness: 0.3, metalness: 0.95, sheen: 0, clearcoat: 0 }
  },
  {
    id: 'matte-black',
    name: 'Matte Black',
    kind: 'metal',
    color: '#0d0c0a',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.7, metalness: 0.5, sheen: 0, clearcoat: 0 }
  },
  {
    id: 'polished-chrome',
    name: 'Polished Chrome',
    kind: 'metal',
    color: '#c0c2c4',
    tier: 'premium',
    priceDelta: 3500,
    pbr: { roughness: 0.12, metalness: 1, sheen: 0, clearcoat: 0 }
  }
];

// ═══════════════════════════════════════════════════════════════════
// MATTRESS-specific materials (cores, tops)
// ═══════════════════════════════════════════════════════════════════

export const MATTRESS_CORES: Material[] = [
  {
    id: 'core-pocket-spring',
    name: 'Pocket Spring · 7 Zone',
    kind: 'spring',
    color: '#9aa0a6',
    tier: 'premium',
    priceDelta: 6500,
    badge: 'Spring',
    pbr: { roughness: 0.4, metalness: 0.8, sheen: 0, clearcoat: 0 }
  },
  {
    id: 'core-memory-foam',
    name: 'Gel Memory Foam',
    kind: 'foam',
    color: '#e5d8c3',
    tier: 'premium',
    priceDelta: 8500,
    badge: 'Memory',
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.1, clearcoat: 0 }
  },
  {
    id: 'core-latex',
    name: 'Natural Latex',
    kind: 'foam',
    color: '#f2e6cf',
    tier: 'atelier',
    priceDelta: 11500,
    badge: 'Latex',
    pbr: { roughness: 0.88, metalness: 0, sheen: 0.1, clearcoat: 0 }
  },
  {
    id: 'core-orthopedic',
    name: 'Orthopedic HR',
    kind: 'foam',
    color: '#d9cfb6',
    tier: 'premium',
    priceDelta: 6200,
    badge: 'Ortho',
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.08, clearcoat: 0 }
  },
  {
    id: 'core-hybrid',
    name: 'Hybrid Luxury',
    kind: 'foam',
    color: '#eadfcb',
    tier: 'atelier',
    priceDelta: 13500,
    badge: 'Hybrid',
    pbr: { roughness: 0.88, metalness: 0, sheen: 0.12, clearcoat: 0 }
  },
  {
    id: 'core-hotel',
    name: 'Hotel-Grade Pillow-top',
    kind: 'foam',
    color: '#f1e9d5',
    tier: 'atelier',
    priceDelta: 14800,
    badge: 'Hotel',
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.1, clearcoat: 0 }
  }
];

// ═══════════════════════════════════════════════════════════════════
// UNIONS + LOOKUP
// ═══════════════════════════════════════════════════════════════════

export const ALL_MATERIALS: Material[] = [
  ...FABRICS,
  ...WOODS,
  ...METALS,
  ...MATTRESS_CORES
];

export const getMaterial = (id: string): Material | undefined =>
  ALL_MATERIALS.find((m) => m.id === id);

/** Filter materials by kind union — used by configurator to group swatches. */
export const getMaterialsByKinds = (kinds: Material['kind'][]): Material[] =>
  ALL_MATERIALS.filter((m) => kinds.includes(m.kind));

/** All cloth-type materials (used by sofa/chair/bed upholstery pickers). */
export const CLOTH_MATERIALS: Material[] = FABRICS;
