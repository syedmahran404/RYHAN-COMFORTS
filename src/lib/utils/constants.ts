/**
 * Global constants — configurator defaults, animation easings, routes.
 */

export const EASE = {
  silk: [0.22, 1, 0.36, 1] as const,
  cinema: [0.83, 0, 0.17, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const
};

export const ROUTES = {
  home: '/',
  collections: '/collections',
  configurator: '/configurator',
  configuratorSofa: '/configurator/sofas',
  craft: '/craft',
  about: '/about',
  contact: '/contact'
} as const;

export const SOFA_DEFAULTS = {
  seatingCount: 3,
  seatFoamDensity: 50,
  backFoamDensity: 40,
  basePrice: 25000
} as const;
