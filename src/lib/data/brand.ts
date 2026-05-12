/**
 * Brand — single source of truth for identity and contact details.
 * Kept separate so CMS (Phase 2) can swap without touching UI code.
 */

export const BRAND = {
  name: 'Ryhan Comforts',
  tagline: 'Custom Luxury. Crafted to Order.',
  founded: 2000,
  owner: 'Azam Pasha',
  subManager: 'Syed Mahran',
  description:
    'Since 2000, Ryhan Comforts has been hand-crafting bespoke luxury furniture — from cinematic sofas and carved wooden beds to mattresses, curtains and wall headboards. Every piece is made after order, tailored to your dimensions, materials and soul.',
  phones: ['+91 72045 56776', '+91 86180 82641'],
  phonesRaw: ['+917204556776', '+918618082641'],
  whatsapp: '+917204556776',
  email: 'atelier@ryhancomforts.com',
  address: {
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India'
  },
  social: {
    instagram: 'https://instagram.com/ryhancomforts',
    facebook: 'https://facebook.com/ryhancomforts'
  }
} as const;

export type Brand = typeof BRAND;
