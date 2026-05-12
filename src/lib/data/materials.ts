import type { Material } from '@/lib/schemas/product';

/**
 * Material library — fabrics, woods, leathers, metals, foams.
 * Tier governs price delta:
 *  signature → included
 *  premium   → +₹3,500–₹6,000
 *  atelier   → +₹9,000–₹14,000
 */

export const FABRICS: Material[] = [
  {
    id: 'velvet-obsidian',
    name: 'Obsidian Velvet',
    kind: 'fabric',
    color: '#1c1b18',
    tier: 'premium',
    priceDelta: 4500,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.6, clearcoat: 0 }
  },
  {
    id: 'velvet-bordeaux',
    name: 'Bordeaux Velvet',
    kind: 'fabric',
    color: '#4a0f1a',
    tier: 'premium',
    priceDelta: 4500,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.65, clearcoat: 0 }
  },
  {
    id: 'velvet-emerald',
    name: 'Emerald Velvet',
    kind: 'fabric',
    color: '#1b3a2e',
    tier: 'premium',
    priceDelta: 4800,
    pbr: { roughness: 0.55, metalness: 0.02, sheen: 0.65, clearcoat: 0 }
  },
  {
    id: 'linen-sandstone',
    name: 'Sandstone Linen',
    kind: 'fabric',
    color: '#c9b58a',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.15, clearcoat: 0 }
  },
  {
    id: 'linen-ivory',
    name: 'Ivory Linen',
    kind: 'fabric',
    color: '#efe7d4',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.92, metalness: 0, sheen: 0.12, clearcoat: 0 }
  },
  {
    id: 'linen-charcoal',
    name: 'Charcoal Linen',
    kind: 'fabric',
    color: '#2b2a26',
    tier: 'signature',
    priceDelta: 0,
    pbr: { roughness: 0.9, metalness: 0, sheen: 0.15, clearcoat: 0 }
  },
  {
    id: 'boucle-cream',
    name: 'Cream Bouclé',
    kind: 'fabric',
    color: '#e7d6af',
    tier: 'atelier',
    priceDelta: 12000,
    pbr: { roughness: 0.95, metalness: 0, sheen: 0.25, clearcoat: 0 }
  },
  {
    id: 'leather-cognac',
    name: 'Cognac Full-Grain',
    kind: 'leather',
    color: '#6b3b17',
    tier: 'atelier',
    priceDelta: 14000,
    pbr: { roughness: 0.45, metalness: 0.03, sheen: 0.15, clearcoat: 0.2 }
  }
];

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
    id: 'rosewood-hand-carved',
    name: 'Hand-carved Rosewood',
    kind: 'wood',
    color: '#5a2a1e',
    tier: 'atelier',
    priceDelta: 13000,
    pbr: { roughness: 0.5, metalness: 0.05, sheen: 0, clearcoat: 0.25 }
  }
];

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
  }
];

export const ALL_MATERIALS: Material[] = [...FABRICS, ...WOODS, ...METALS];

export const getMaterial = (id: string): Material | undefined =>
  ALL_MATERIALS.find((m) => m.id === id);
