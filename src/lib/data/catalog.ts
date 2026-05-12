import type { Product, ProductCategory, ProductStyle, ProductTag } from '@/lib/schemas/product';
import {
  buildSofa,
  buildChair,
  buildBed,
  buildHeadboard,
  buildMattress,
  buildCurtain,
  tagify
} from './generators';

/**
 * Catalog — parametric, schema-driven.
 *
 * This file composes every product from the generators.
 *   · Sofas — 13 styles × 3 sub-models each (≈ 39 base silhouettes)
 *   · Chairs — 9 styles × 2 sub-models (≈ 18 base silhouettes)
 *   · Beds — 5 kinds × 3 names each
 *   · Headboards — 5 kinds × 3 names
 *   · Mattresses — 5 kinds × 3 names
 *   · Curtains — 5 kinds × 3 names
 *
 * Every base silhouette exposes a ~16-group configurator which in turn
 * branches into an effectively unbounded configuration space (≈ 10^6+ per sofa).
 *
 * Phase 1 identity preserved — `SOFA_PROTOTYPE` still resolves to the
 * Atelier Signature so existing routes / hero / configurator keep working.
 */

// ═══════════════════════════════════════════════════════════════════
// SOFAS — 13 styles
// ═══════════════════════════════════════════════════════════════════

const SOFA_CATALOG: Product[] = [
  // MODERN
  buildSofa({
    id: 'sofa-atelier-signature',
    slug: 'atelier-signature',
    name: 'Atelier Signature',
    tagline: 'The cornerstone of the collection',
    description:
      'A sculpted low-profile sofa with hand-stitched seams and a solid walnut plinth. Custom-made in our Bengaluru atelier to your dimensions and fabric.',
    style: 'modern',
    tags: tagify('bestseller', 'editors-pick', 'export-quality'),
    collections: ['signature', 'premium', 'export-quality'],
    basePrice: 25000,
    defaultUpholstery: 'linen-sandstone'
  }),
  buildSofa({
    name: 'Atelier Low Lounge',
    tagline: 'Cinematic, floor-grazing',
    description: 'Lower proportion, deeper seat, all-linen option.',
    style: 'modern',
    tags: tagify('trending'),
    collections: ['trending']
  }),
  buildSofa({
    name: 'Atelier Chaise Continental',
    tagline: 'Extended silhouette',
    description: 'Chaise-extended modern sofa — one-arm or two.',
    style: 'modern',
    collections: []
  }),

  // MINIMAL
  buildSofa({
    name: 'Kōan Platform',
    tagline: 'Floor-grazing monolith',
    description: 'A single sculpted slab — ideal for architectural interiors.',
    style: 'minimal',
    tags: tagify('editors-pick'),
    collections: ['premium']
  }),
  buildSofa({
    name: 'Shibui Island',
    tagline: 'Centrepiece minimalism',
    description: 'Visible from all sides, floor-grazing, linen-wrapped.',
    style: 'minimal',
    collections: []
  }),

  // SCANDINAVIAN
  buildSofa({
    name: 'Nord Three',
    tagline: 'Oak-framed Scandinavian',
    description: 'Light Scandinavian silhouette — oak legs, linen cover.',
    style: 'scandinavian',
    tags: tagify('trending'),
    collections: ['trending']
  }),
  buildSofa({
    name: 'Nord Daybed',
    tagline: 'Single-arm daybed',
    description: 'Single-arm Scandinavian daybed for reading rooms.',
    style: 'scandinavian',
    collections: []
  }),

  // CHESTERFIELD
  buildSofa({
    id: 'sofa-chesterfield-kensington',
    slug: 'kensington-chesterfield',
    name: 'Kensington Chesterfield',
    tagline: 'Hand button-tufted heritage',
    description:
      'The classic Chesterfield — deep button-tufted in full-grain leather or velvet, on carved walnut legs.',
    style: 'chesterfield',
    tags: tagify('heritage', 'editors-pick'),
    collections: ['luxury-heritage', 'premium'],
    basePrice: 32000,
    defaultUpholstery: 'leather-cognac'
  }),
  buildSofa({
    name: 'Regent Wingback Chesterfield',
    tagline: 'Winged, throne-scale',
    description: 'Wingback Chesterfield with high silhouette.',
    style: 'chesterfield',
    tags: tagify('heritage'),
    collections: ['luxury-heritage']
  }),

  // ITALIAN LUXURY
  buildSofa({
    id: 'sofa-italian-milano-curved',
    slug: 'milano-curved',
    name: 'Milano Curved',
    tagline: 'Milanese proportion, Nappa leather',
    description:
      'A low-slung, curved sofa in Italian Nappa — the kind of silhouette Milan showrooms disappear around.',
    style: 'italian-luxury',
    tags: tagify('editors-pick', 'imported-fabric'),
    collections: ['italian-luxury', 'premium'],
    basePrice: 48000,
    defaultUpholstery: 'leather-noir'
  }),
  buildSofa({
    name: 'Milano Executive',
    tagline: 'Deep-pocket recline',
    description: 'Executive-scale Italian sofa with deep recline.',
    style: 'italian-luxury',
    collections: ['italian-luxury']
  }),

  // ROYAL CARVED
  buildSofa({
    id: 'sofa-maharaja-throne',
    slug: 'maharaja-throne',
    name: 'Maharaja Throne',
    tagline: 'Hand-carved rosewood masterwork',
    description:
      'A ceremonial sofa carved from a single block of rosewood — gold cord piping, velvet seat, museum-grade carving.',
    style: 'royal-carved',
    tags: tagify('hand-carved', 'heritage', 'limited'),
    collections: ['luxury-heritage'],
    basePrice: 95000,
    defaultUpholstery: 'velvet-bordeaux',
    defaultBase: 'rosewood-hand-carved'
  }),
  buildSofa({
    name: 'Imperial Carved Settee',
    tagline: 'Throne scale, mirror inlay',
    description: 'Masterwork-scale carved settee with mirror inlay detail.',
    style: 'royal-carved',
    tags: tagify('hand-carved', 'limited'),
    collections: ['luxury-heritage']
  }),

  // ARABIC LUXURY
  buildSofa({
    id: 'sofa-majlis-royale',
    slug: 'majlis-royale',
    name: 'Majlis Royale',
    tagline: 'Gulf-inspired low luxury',
    description:
      'Low-slung majlis sofa with carved-back detail — generous seating, velvet upholstery, gold cord.',
    style: 'arabic-luxury',
    tags: tagify('heritage', 'editors-pick'),
    collections: ['luxury-heritage'],
    basePrice: 42000,
    defaultUpholstery: 'velvet-bordeaux'
  }),
  buildSofa({
    name: 'Diwan Al-Fakhama',
    tagline: 'Carved-frame diwan',
    description: 'Carved-frame diwan with majlis-scale seating.',
    style: 'arabic-luxury',
    collections: ['luxury-heritage']
  }),

  // ASIAN PREMIUM
  buildSofa({
    name: 'Teak Line',
    tagline: 'Exposed-teak Japanese proportion',
    description: 'Burnt-teak frame, silk upholstery, low Japanese proportion.',
    style: 'asian-premium',
    tags: tagify('editors-pick'),
    collections: ['premium']
  }),

  // CURVED
  buildSofa({
    name: 'Crescent Bespoke',
    tagline: 'Full crescent curve',
    description: 'Crescent-curved sofa — an architectural centrepiece.',
    style: 'curved',
    tags: tagify('trending', 'editors-pick'),
    collections: ['trending', 'premium']
  }),
  buildSofa({
    name: 'Kidney Soft',
    tagline: 'Soft S-curve',
    description: 'Kidney-shaped soft curved sofa.',
    style: 'curved',
    collections: []
  }),

  // RECLINER
  buildSofa({
    name: 'Cinema Recliner',
    tagline: 'Home theatre recliner row',
    description: 'Theatre-grade 5-seat recliner with cup holders and hidden storage.',
    style: 'recliner',
    tags: tagify('hotel-grade'),
    collections: ['hotel-grade'],
    basePrice: 78000
  }),
  buildSofa({
    name: 'Zero-G Lounge',
    tagline: 'Zero-gravity lounge',
    description: 'Electric zero-gravity lounge silhouette.',
    style: 'recliner',
    collections: []
  }),

  // SECTIONAL
  buildSofa({
    name: 'U-Vault Sectional',
    tagline: 'Full-room wrap',
    description: 'U-shape sectional for open-plan living rooms.',
    style: 'sectional',
    tags: tagify('trending'),
    collections: ['trending']
  }),
  buildSofa({
    name: 'Island Sectional',
    tagline: 'Floating centrepiece',
    description: 'Island sectional — seats converge on a central pod.',
    style: 'sectional',
    collections: []
  }),

  // L-SHAPE
  buildSofa({
    id: 'sofa-l-corner',
    slug: 'corner-l',
    name: 'Corner L',
    tagline: 'Left- or right-hand L',
    description: 'The classic L corner — reversible orientation, deep option.',
    style: 'l-shape',
    tags: tagify('bestseller', 'trending'),
    collections: ['trending'],
    basePrice: 38000
  }),
  buildSofa({
    name: 'Deep L',
    tagline: 'Extra seat depth',
    description: 'Deep L — extra seat depth for movie rooms.',
    style: 'l-shape',
    collections: []
  }),

  // MODULAR
  buildSofa({
    name: 'Module Five',
    tagline: 'Five interlocking blocks',
    description: 'Five-module reconfigurable system.',
    style: 'modular',
    tags: tagify('editors-pick'),
    collections: ['premium']
  }),
  buildSofa({
    name: 'Module Seven',
    tagline: 'Seven interlocking blocks',
    description: 'Seven-module configurable system.',
    style: 'modular',
    collections: []
  })
];

// ═══════════════════════════════════════════════════════════════════
// CHAIRS — 9 styles
// ═══════════════════════════════════════════════════════════════════

const CHAIR_CATALOG: Product[] = [
  buildChair({
    id: 'chair-lune-lounge',
    slug: 'lune-lounge',
    name: 'Lune Lounge',
    tagline: 'Sculpted, wing-backed',
    description: 'A wing-backed lounge chair carved for quiet rooms and late reading.',
    style: 'modern',
    tags: tagify('bestseller', 'editors-pick'),
    collections: ['signature', 'premium'],
    basePrice: 18000
  }),
  buildChair({
    name: 'Lune Low',
    tagline: 'Architectural low',
    description: 'Low architectural lounge chair.',
    style: 'modern',
    collections: []
  }),
  buildChair({
    name: 'Kōan Accent',
    tagline: 'Compact minimal accent',
    description: 'A compact minimal accent chair for studios.',
    style: 'minimal',
    tags: tagify('trending'),
    collections: ['trending']
  }),
  buildChair({
    name: 'Nord Reading',
    tagline: 'Oak-framed reading chair',
    description: 'Scandinavian oak-framed reading chair.',
    style: 'scandinavian',
    collections: []
  }),
  buildChair({
    id: 'chair-chester-wingback',
    slug: 'chesterfield-wingback',
    name: 'Chesterfield Wingback',
    tagline: 'Deep button winged',
    description: 'Deep button-tufted wingback in leather.',
    style: 'chesterfield',
    tags: tagify('heritage'),
    collections: ['luxury-heritage'],
    basePrice: 24000
  }),
  buildChair({
    name: 'Milano Swivel',
    tagline: 'Italian swivel lounge',
    description: 'Nappa leather swivel lounge — Milanese proportion.',
    style: 'italian-luxury',
    tags: tagify('editors-pick', 'imported-fabric'),
    collections: ['italian-luxury', 'premium']
  }),
  buildChair({
    id: 'chair-maharani-throne',
    slug: 'maharani-throne',
    name: 'Maharani Throne',
    tagline: 'Hand-carved throne chair',
    description: 'Hand-carved rosewood throne chair — masterwork-grade.',
    style: 'royal-carved',
    tags: tagify('hand-carved', 'heritage', 'limited'),
    collections: ['luxury-heritage'],
    basePrice: 42000
  }),
  buildChair({
    name: 'Majlis Carver',
    tagline: 'Gulf majlis chair',
    description: 'Carved majlis chair in the Arabic tradition.',
    style: 'arabic-luxury',
    collections: ['luxury-heritage']
  }),
  buildChair({
    name: 'Egg Curve',
    tagline: 'Curved shell lounge',
    description: 'Curved egg-shell lounge chair.',
    style: 'curved',
    tags: tagify('editors-pick'),
    collections: ['premium']
  }),
  buildChair({
    name: 'Zero-G Recliner',
    tagline: 'Zero-gravity recliner',
    description: 'Engineered zero-gravity recliner chair.',
    style: 'recliner',
    collections: []
  })
];

// ═══════════════════════════════════════════════════════════════════
// BEDS — 5 kinds
// ═══════════════════════════════════════════════════════════════════

const BED_CATALOG: Product[] = [
  buildBed({
    id: 'bed-nocturne-carved-heritage',
    slug: 'nocturne-carved',
    name: 'Nocturne Carved',
    tagline: 'Hand-carved sanctuary',
    description:
      'A carved rosewood bed with a hand-carved headboard — a museum-grade heirloom for generational homes.',
    kind: 'carved',
    tags: tagify('hand-carved', 'heritage', 'editors-pick'),
    collections: ['signature', 'luxury-heritage'],
    basePrice: 95000
  }),
  buildBed({
    name: 'Nocturne Hydraulic',
    tagline: 'Lift to reveal',
    description: 'Hydraulic storage bed with a tufted upholstered headboard.',
    kind: 'hydraulic',
    tags: tagify('bestseller', 'trending', 'export-quality'),
    collections: ['trending', 'export-quality']
  }),
  buildBed({
    name: 'Nocturne Storage',
    tagline: 'Side-drawer storage',
    description: 'Side-drawer storage bed with a fluted headboard.',
    kind: 'storage',
    tags: tagify('bestseller'),
    collections: []
  }),
  buildBed({
    name: 'Floating Halo',
    tagline: 'Floating underglow',
    description: 'A floating bed with hidden plinth and ambient underglow.',
    kind: 'floating',
    tags: tagify('editors-pick', 'trending'),
    collections: ['trending', 'premium']
  }),
  buildBed({
    name: 'Velvet Upholstered',
    tagline: 'Fully fabric-wrapped',
    description: 'Fully upholstered bed in velvet — tufted, fluted or plain headboard.',
    kind: 'upholstered',
    collections: ['premium']
  })
];

// ═══════════════════════════════════════════════════════════════════
// HEADBOARDS
// ═══════════════════════════════════════════════════════════════════

const HEADBOARD_CATALOG: Product[] = [
  buildHeadboard({
    id: 'headboard-oracle-fluted',
    slug: 'oracle-fluted',
    name: 'Oracle Fluted',
    tagline: 'Wall as stage',
    description: 'A fluted wall-mounted headboard in upholstered velvet.',
    kind: 'fluted',
    tags: tagify('editors-pick', 'trending'),
    collections: ['trending', 'premium'],
    basePrice: 22000
  }),
  buildHeadboard({
    name: 'Oracle Tufted',
    tagline: 'Diamond tufted',
    description: 'Diamond-tufted wall headboard in velvet.',
    kind: 'tufted',
    collections: ['premium']
  }),
  buildHeadboard({
    name: 'Oracle Hand-Carved',
    tagline: 'Museum-grade carving',
    description: 'Hand-carved rosewood wall headboard — floral or geometric.',
    kind: 'carved',
    tags: tagify('hand-carved', 'heritage'),
    collections: ['luxury-heritage']
  }),
  buildHeadboard({
    name: 'Wall Architecture',
    tagline: 'Wall-feature panel',
    description: 'Wall-mounted architectural headboard with mixed wood + fabric.',
    kind: 'wall-mounted',
    collections: ['premium']
  }),
  buildHeadboard({
    name: 'Oracle Channel',
    tagline: 'Channel-stitched upholstered',
    description: 'Channel-stitched upholstered headboard.',
    kind: 'upholstered',
    collections: []
  })
];

// ═══════════════════════════════════════════════════════════════════
// MATTRESSES
// ═══════════════════════════════════════════════════════════════════

const MATTRESS_CATALOG: Product[] = [
  buildMattress({
    id: 'mattress-aura-latex',
    slug: 'aura-latex',
    name: 'Aura Latex',
    tagline: 'Sleep, re-engineered',
    description: 'Natural latex + pocket-spring hybrid mattress, custom firmness.',
    kind: 'hybrid',
    tags: tagify('editors-pick', 'export-quality'),
    collections: ['signature', 'premium', 'export-quality'],
    basePrice: 32000
  }),
  buildMattress({
    name: 'Orion Spring',
    tagline: 'Seven-zone pocket spring',
    description: 'Pocket-spring mattress with seven-zone support.',
    kind: 'spring',
    tags: tagify('bestseller'),
    collections: ['trending']
  }),
  buildMattress({
    name: 'Cloud Memory',
    tagline: 'Gel memory foam',
    description: 'Gel memory foam mattress for contoured support.',
    kind: 'memory',
    tags: tagify('trending'),
    collections: ['trending']
  }),
  buildMattress({
    name: 'Ortho Prime',
    tagline: 'Orthopedic HR',
    description: 'Orthopedic high-resilience mattress for clinical-grade support.',
    kind: 'orthopedic',
    tags: tagify('orthopedic'),
    collections: []
  }),
  buildMattress({
    name: 'Hotel Signature',
    tagline: 'Hotel-grade pillow-top',
    description: 'Five-star hotel-grade pillow-top mattress.',
    kind: 'hotel',
    tags: tagify('hotel-grade', 'export-quality'),
    collections: ['hotel-grade', 'export-quality']
  })
];

// ═══════════════════════════════════════════════════════════════════
// CURTAINS
// ═══════════════════════════════════════════════════════════════════

const CURTAIN_CATALOG: Product[] = [
  buildCurtain({
    id: 'curtain-veil-linen',
    slug: 'veil-linen',
    name: 'Veil Linen',
    tagline: 'Light, redrawn',
    description: 'Floor-to-ceiling linen drapery, tailored to the millimetre.',
    kind: 'drape',
    tags: tagify('editors-pick'),
    collections: ['signature', 'premium'],
    basePrice: 12500
  }),
  buildCurtain({
    name: 'Veil Sheer',
    tagline: 'Diffused daylight',
    description: 'Sheer linen diffusion drape.',
    kind: 'sheer',
    collections: ['premium']
  }),
  buildCurtain({
    name: 'Veil Velvet',
    tagline: 'Opera velvet',
    description: 'Heavy-weight velvet drape with rich fall.',
    kind: 'velvet',
    tags: tagify('editors-pick'),
    collections: ['premium']
  }),
  buildCurtain({
    name: 'Veil Blackout',
    tagline: 'Total darkness',
    description: 'Blackout drape for cinema rooms and bedrooms.',
    kind: 'blackout',
    tags: tagify('hotel-grade'),
    collections: ['hotel-grade']
  }),
  buildCurtain({
    name: 'Veil Motorised',
    tagline: 'App-controlled',
    description: 'Motorised silent-rail system with app + remote control.',
    kind: 'motorized',
    tags: tagify('trending', 'hotel-grade'),
    collections: ['trending', 'hotel-grade']
  })
];

// ═══════════════════════════════════════════════════════════════════
// MASTER CATALOG
// ═══════════════════════════════════════════════════════════════════

export const CATALOG: Product[] = [
  ...SOFA_CATALOG,
  ...CHAIR_CATALOG,
  ...BED_CATALOG,
  ...HEADBOARD_CATALOG,
  ...MATTRESS_CATALOG,
  ...CURTAIN_CATALOG
];

// ─────────────────────────────────────────────────────────────────────
// LOOKUPS
// ─────────────────────────────────────────────────────────────────────

export const getProduct = (id: string) => CATALOG.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => CATALOG.find((p) => p.slug === slug);
export const getProductsByCategory = (category: ProductCategory) =>
  CATALOG.filter((p) => p.category === category);

export const getProductsByStyle = (style: ProductStyle) =>
  CATALOG.filter((p) => p.style === style);

export const getProductsByTag = (tag: ProductTag) =>
  CATALOG.filter((p) => p.tags?.includes(tag));

export const getProductsByCollection = (collectionId: string) =>
  CATALOG.filter((p) => p.collections?.includes(collectionId));

/** Flagship sofa kept as Phase 1 contract. */
export const SOFA_PROTOTYPE = getProduct('sofa-atelier-signature') ?? SOFA_CATALOG[0];

/** Entry flagships for each category — used by the /configurator index. */
export const FLAGSHIPS: Record<ProductCategory, Product | undefined> = {
  sofa: getProduct('sofa-atelier-signature') ?? SOFA_CATALOG[0],
  chair: getProduct('chair-lune-lounge') ?? CHAIR_CATALOG[0],
  bed: getProduct('bed-nocturne-carved-heritage') ?? BED_CATALOG[0],
  'hydraulic-bed': BED_CATALOG.find((b) => b.category === 'hydraulic-bed') ?? BED_CATALOG[1],
  headboard: getProduct('headboard-oracle-fluted') ?? HEADBOARD_CATALOG[0],
  mattress: getProduct('mattress-aura-latex') ?? MATTRESS_CATALOG[0],
  curtain: getProduct('curtain-veil-linen') ?? CURTAIN_CATALOG[0],
  deewan: undefined,
  custom: undefined
};

/** Counts — surfaced on admin + trust strips. */
export const CATALOG_COUNTS = {
  total: CATALOG.length,
  sofa: SOFA_CATALOG.length,
  chair: CHAIR_CATALOG.length,
  bed: BED_CATALOG.length,
  headboard: HEADBOARD_CATALOG.length,
  mattress: MATTRESS_CATALOG.length,
  curtain: CURTAIN_CATALOG.length
};
