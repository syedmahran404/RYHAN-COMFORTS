/**
 * Imagery — curated editorial photography library.
 *
 * All images are sourced from Unsplash (free, attributable). Each URL uses
 * Unsplash's native transform params (`w`, `q`, `auto`, `fit`) so Next.js
 * can further resize via its image optimiser.
 *
 * Phase 3 replaces these with the atelier's own catalogue photography.
 */

export interface EditorialImage {
  /** Unsplash photo ID (used for srcSet construction + attribution). */
  id: string;
  /** Stable, Next/Image-optimised URL. */
  url: string;
  /** Short human description for <img alt>. */
  alt: string;
  /** Focal point classname for object-position. */
  focal?: string;
  /** Photographer credit. */
  credit?: { name: string; profile: string };
}

const u = (id: string, opts?: { w?: number; q?: number }) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=${opts?.q ?? 82}&w=${
    opts?.w ?? 1800
  }`;

/* ══════════════════════════════════════════════════════════════════
   HERO — cinematic architectural living rooms
   ══════════════════════════════════════════════════════════════════ */

export const HERO_IMAGES: EditorialImage[] = [
  {
    id: '1567016526105-22da7c13161a',
    url: u('1567016526105-22da7c13161a', { w: 2200 }),
    alt: 'Softly lit luxury living room with cream sofa and walnut accents',
    focal: 'object-center',
    credit: { name: 'Minh Pham', profile: 'https://unsplash.com/@minhphamdesign' }
  },
  {
    id: '1616486338812-3dadae4b4ace',
    url: u('1616486338812-3dadae4b4ace', { w: 2200 }),
    alt: 'Minimalist beige interior with velvet lounge and soft morning light',
    focal: 'object-center',
    credit: { name: 'Spacejoy', profile: 'https://unsplash.com/@spacejoy' }
  },
  {
    id: '1540574163026-643ea20ade25',
    url: u('1540574163026-643ea20ade25', { w: 2200 }),
    alt: 'Editorial interior with low-slung sofa and brass lighting',
    credit: { name: 'Spacejoy', profile: 'https://unsplash.com/@spacejoy' }
  }
];

/* ══════════════════════════════════════════════════════════════════
   CATEGORY COVERS — used in SignatureCollections + CategoryLanding
   ══════════════════════════════════════════════════════════════════ */

export const CATEGORY_COVERS: Record<string, EditorialImage> = {
  sofa: {
    id: '1555041469-a586c61ea9bc',
    url: u('1555041469-a586c61ea9bc', { w: 1800 }),
    alt: 'Beige low-slung luxury sofa in soft daylight',
    credit: { name: 'Collov Home Design', profile: 'https://unsplash.com/@collovhome' }
  },
  chair: {
    id: '1506439773649-a6e82037f1f8',
    url: u('1506439773649-a6e82037f1f8', { w: 1800 }),
    alt: 'Sculpted lounge chair in a quiet reading corner',
    credit: { name: 'Nathan Fertig', profile: 'https://unsplash.com/@nathanfertig' }
  },
  bed: {
    id: '1616594039964-ae9021a400a0',
    url: u('1616594039964-ae9021a400a0', { w: 1800 }),
    alt: 'Upholstered platform bed in a serene bedroom',
    credit: { name: 'Collov Home Design', profile: 'https://unsplash.com/@collovhome' }
  },
  mattress: {
    id: '1631049552240-59c37f38802b',
    url: u('1631049552240-59c37f38802b', { w: 1800 }),
    alt: 'Layered linen bedding on a luxury mattress',
    credit: { name: 'Volha Flaxeco', profile: 'https://unsplash.com/@flaxeco' }
  },
  curtain: {
    id: '1493663284031-b7e3aefcae8e',
    url: u('1493663284031-b7e3aefcae8e', { w: 1800 }),
    alt: 'Floor-to-ceiling linen curtains diffusing morning light',
    credit: { name: 'Francesca Tosolini', profile: 'https://unsplash.com/@fromitaly' }
  },
  headboard: {
    id: '1540518614846-7eded433c457',
    url: u('1540518614846-7eded433c457', { w: 1800 }),
    alt: 'Fluted upholstered headboard with warm lamplight',
    credit: { name: 'Spacejoy', profile: 'https://unsplash.com/@spacejoy' }
  }
};

/* ══════════════════════════════════════════════════════════════════
   LIFESTYLE / ROOM STAGING
   ══════════════════════════════════════════════════════════════════ */

export const ROOM_STAGING: EditorialImage[] = [
  {
    id: '1586023492125-27b2c045efd7',
    url: u('1586023492125-27b2c045efd7', { w: 1800 }),
    alt: 'Ivory living room with arched window and linen sofa'
  },
  {
    id: '1615873968403-89e068629265',
    url: u('1615873968403-89e068629265', { w: 1800 }),
    alt: 'Curved sofa in a sculptural architectural apartment'
  },
  {
    id: '1600210492486-724fe5c67fb0',
    url: u('1600210492486-724fe5c67fb0', { w: 1800 }),
    alt: 'Warm toned living room with cognac leather armchair'
  },
  {
    id: '1618221195710-dd6b41faaea6',
    url: u('1618221195710-dd6b41faaea6', { w: 1800 }),
    alt: 'Bedroom with fluted headboard and soft linen drapery'
  },
  {
    id: '1583847268964-b28dc8f51f92',
    url: u('1583847268964-b28dc8f51f92', { w: 1800 }),
    alt: 'Reading nook with boucle chair and brass lamp'
  },
  {
    id: '1598300042247-d088f8ab3a91',
    url: u('1598300042247-d088f8ab3a91', { w: 1800 }),
    alt: 'Atelier workbench with walnut wood shavings'
  }
];

/* ══════════════════════════════════════════════════════════════════
   SOFA SILHOUETTE LIBRARY — mapped 1:1 to catalog slugs
   A compact curated set; slugs without a direct photo fall back
   to a style-matched image from the same bank.
   ══════════════════════════════════════════════════════════════════ */

const sofaImg = (id: string, alt: string): EditorialImage => ({
  id,
  url: u(id, { w: 1600 }),
  alt
});

/** Slug → image, with graceful fallback by style. */
export const SOFA_IMAGES: Record<string, EditorialImage> = {
  // Modern / atelier
  'atelier-signature': sofaImg('1555041469-a586c61ea9bc', 'Atelier Signature sofa'),
  'atelier-low-lounge': sofaImg('1540574163026-643ea20ade25', 'Atelier Low Lounge'),
  'atelier-chaise-continental': sofaImg('1616486338812-3dadae4b4ace', 'Atelier Chaise'),
  // Chair — independent entries so /configurator/chairs renders varied images
  'lune-lounge': sofaImg('1506439773649-a6e82037f1f8', 'Lune Lounge wingback'),
  'lune-low': sofaImg('1615873968403-89e068629265', 'Lune Low architectural lounge'),
  'k-an-accent': sofaImg('1583847268964-b28dc8f51f92', 'Compact accent chair'),
  'nord-reading': sofaImg('1506439773649-a6e82037f1f8', 'Scandinavian reading chair'),
  'chesterfield-wingback': sofaImg('1600210492486-724fe5c67fb0', 'Chesterfield wingback in cognac'),
  'milano-swivel': sofaImg('1618221195710-dd6b41faaea6', 'Milano swivel lounge'),
  'maharani-throne': sofaImg('1540518614846-7eded433c457', 'Carved throne chair'),
  'majlis-carver': sofaImg('1540518614846-7eded433c457', 'Arabic carved chair'),
  'egg-curve': sofaImg('1615873968403-89e068629265', 'Curved egg lounge chair'),
  'zero-g-recliner': sofaImg('1616486338812-3dadae4b4ace', 'Zero-gravity recliner'),
  // Bed variants
  'nocturne-carved': sofaImg('1618221195710-dd6b41faaea6', 'Carved rosewood bed'),
  'nocturne-hydraulic': sofaImg('1616594039964-ae9021a400a0', 'Hydraulic lift bed'),
  'nocturne-storage': sofaImg('1540518614846-7eded433c457', 'Storage-drawer bed'),
  'floating-halo': sofaImg('1616594039964-ae9021a400a0', 'Floating bed with underglow'),
  'velvet-upholstered': sofaImg('1540518614846-7eded433c457', 'Velvet upholstered bed'),
  // Headboard
  'oracle-fluted': sofaImg('1540518614846-7eded433c457', 'Oracle fluted headboard'),
  'oracle-tufted': sofaImg('1540518614846-7eded433c457', 'Diamond tufted headboard'),
  'oracle-hand-carved': sofaImg('1618221195710-dd6b41faaea6', 'Hand-carved rosewood headboard'),
  'wall-architecture': sofaImg('1540518614846-7eded433c457', 'Architectural wall headboard'),
  'oracle-channel': sofaImg('1618221195710-dd6b41faaea6', 'Channel-stitched headboard'),
  // Mattress
  'aura-latex': sofaImg('1631049552240-59c37f38802b', 'Aura latex mattress'),
  'orion-spring': sofaImg('1631049552240-59c37f38802b', 'Orion spring mattress'),
  'cloud-memory': sofaImg('1631049552240-59c37f38802b', 'Cloud memory foam mattress'),
  'ortho-prime': sofaImg('1631049552240-59c37f38802b', 'Ortho prime mattress'),
  'hotel-signature': sofaImg('1631049552240-59c37f38802b', 'Hotel-grade mattress'),
  // Curtain
  'veil-linen': sofaImg('1493663284031-b7e3aefcae8e', 'Veil linen drape'),
  'veil-sheer': sofaImg('1493663284031-b7e3aefcae8e', 'Veil sheer drape'),
  'veil-velvet': sofaImg('1493663284031-b7e3aefcae8e', 'Veil velvet drape'),
  'veil-blackout': sofaImg('1493663284031-b7e3aefcae8e', 'Veil blackout drape'),
  'veil-motorised': sofaImg('1493663284031-b7e3aefcae8e', 'Motorised curtain system'),
  // Minimal
  'k-an-platform': sofaImg('1586023492125-27b2c045efd7', 'Platform minimalist sofa'),
  'shibui-island': sofaImg('1618221195710-dd6b41faaea6', 'Island minimalist sofa'),
  // Scandinavian
  'nord-three': sofaImg('1506439773649-a6e82037f1f8', 'Scandinavian three seater'),
  'nord-daybed': sofaImg('1583847268964-b28dc8f51f92', 'Scandinavian daybed'),
  // Chesterfield
  'kensington-chesterfield': sofaImg('1600210492486-724fe5c67fb0', 'Chesterfield in cognac leather'),
  'regent-wingback-chesterfield': sofaImg('1615873968403-89e068629265', 'Wingback Chesterfield'),
  // Italian
  'milano-curved': sofaImg('1615873968403-89e068629265', 'Curved Italian sofa'),
  'milano-executive': sofaImg('1600210492486-724fe5c67fb0', 'Milano executive sofa'),
  // Royal carved
  'maharaja-throne': sofaImg('1540518614846-7eded433c457', 'Carved throne sofa'),
  'imperial-carved-settee': sofaImg('1540518614846-7eded433c457', 'Imperial carved settee'),
  // Arabic
  'majlis-royale': sofaImg('1618221195710-dd6b41faaea6', 'Majlis Royale'),
  'diwan-al-fakhama': sofaImg('1540518614846-7eded433c457', 'Carved diwan'),
  // Asian
  'teak-line': sofaImg('1583847268964-b28dc8f51f92', 'Teak-frame Asian sofa'),
  // Curved
  'crescent-bespoke': sofaImg('1615873968403-89e068629265', 'Crescent curved sofa'),
  'kidney-soft': sofaImg('1616486338812-3dadae4b4ace', 'Kidney soft curved sofa'),
  // Recliner
  'cinema-recliner': sofaImg('1600210492486-724fe5c67fb0', 'Cinema recliner row'),
  'zero-g-lounge': sofaImg('1616486338812-3dadae4b4ace', 'Zero gravity lounge'),
  // Sectional
  'u-vault-sectional': sofaImg('1586023492125-27b2c045efd7', 'U-shape sectional'),
  'island-sectional': sofaImg('1615873968403-89e068629265', 'Island sectional'),
  // L-shape
  'corner-l': sofaImg('1555041469-a586c61ea9bc', 'Corner L'),
  'deep-l': sofaImg('1540574163026-643ea20ade25', 'Deep L'),
  // Modular
  'module-five': sofaImg('1586023492125-27b2c045efd7', 'Modular five-block sofa'),
  'module-seven': sofaImg('1540574163026-643ea20ade25', 'Modular seven-block sofa'),
  // Mid century
  'halston-mid-century': sofaImg('1506439773649-a6e82037f1f8', 'Mid-Century walnut-legged sofa'),
  // Tuxedo
  'manhattan-tuxedo': sofaImg('1600210492486-724fe5c67fb0', 'Manhattan Tuxedo sofa'),
  // Lawson
  'montclair-lawson': sofaImg('1555041469-a586c61ea9bc', 'Montclair Lawson sofa'),
  // Camelback
  'georgian-camelback': sofaImg('1540518614846-7eded433c457', 'Georgian Camelback sofa'),
  // English Roll Arm
  'belgrave-english': sofaImg('1583847268964-b28dc8f51f92', 'Belgrave English Roll Arm sofa'),
  // Art Deco
  'parisian-art-deco': sofaImg('1540574163026-643ea20ade25', 'Parisian Art Deco sofa'),
  // Cloud
  'nimbus-cloud': sofaImg('1586023492125-27b2c045efd7', 'Cloud sofa in ivory'),
  // Hotel Lounge
  'concord-hotel-lounge': sofaImg('1555041469-a586c61ea9bc', 'Hotel-grade lounge sofa'),
  // Low profile
  'osaka-low-profile': sofaImg('1586023492125-27b2c045efd7', 'Low profile architectural sofa'),
  // Japanese minimal
  'kyoto-minimal': sofaImg('1583847268964-b28dc8f51f92', 'Kyoto minimal floor seating'),
  // Sculpted
  'marea-sculpted': sofaImg('1615873968403-89e068629265', 'Sculpted organic-form sofa'),
  // Velvet Lounge
  'verona-velvet-lounge': sofaImg('1600210492486-724fe5c67fb0', 'Verona velvet lounge sofa'),
  // Floating base
  'celeste-floating': sofaImg('1618221195710-dd6b41faaea6', 'Floating base sofa'),
  // Contemporary luxury
  'soho-editorial': sofaImg('1555041469-a586c61ea9bc', 'Soho contemporary-luxury sofa'),
  // Signature series
  'azam-signature': sofaImg('1540518614846-7eded433c457', 'Azam Signature sofa')
};

/** Chair/bed/etc fallback by category. */
export const FALLBACK_BY_CATEGORY: Record<string, EditorialImage> = {
  sofa: CATEGORY_COVERS.sofa,
  chair: CATEGORY_COVERS.chair,
  bed: CATEGORY_COVERS.bed,
  'hydraulic-bed': CATEGORY_COVERS.bed,
  mattress: CATEGORY_COVERS.mattress,
  curtain: CATEGORY_COVERS.curtain,
  headboard: CATEGORY_COVERS.headboard,
  deewan: CATEGORY_COVERS.sofa,
  custom: CATEGORY_COVERS.sofa
};

/* ══════════════════════════════════════════════════════════════════
   FABRIC / WOOD SWATCH TEXTURES
   Real macro photography of the materials — used on swatches +
   configurator hero tint overlay.
   ══════════════════════════════════════════════════════════════════ */

export const SWATCH_TEXTURES: Record<
  'velvet' | 'linen' | 'leather' | 'boucle' | 'suede' | 'wood' | 'rexine',
  string
> = {
  velvet: u('1618220252344-8ec99ec624b1', { w: 600, q: 70 }),
  linen: u('1606107557195-0e29a4b5b4aa', { w: 600, q: 70 }),
  leather: u('1544816155-12df9643f363', { w: 600, q: 70 }),
  boucle: u('1586190848861-99aa4a171e90', { w: 600, q: 70 }),
  suede: u('1506439773649-a6e82037f1f8', { w: 600, q: 70 }),
  wood: u('1503602642458-232111445657', { w: 600, q: 70 }),
  rexine: u('1544816155-12df9643f363', { w: 600, q: 70 })
};

/** Resolve the best image for a product by slug + category. */
export const resolveProductImage = (slug: string, category: string): EditorialImage => {
  return SOFA_IMAGES[slug] ?? FALLBACK_BY_CATEGORY[category] ?? CATEGORY_COVERS.sofa;
};
