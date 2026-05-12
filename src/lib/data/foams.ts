import type { Foam } from '@/lib/schemas/product';

/**
 * Foam system — tiered densities across every foam slot.
 *
 * Three tiers the showroom actually sells:
 *   - Better        · 40 density
 *   - Best          · 50 density
 *   - Luxury Premium· 60 density
 *
 * Each tier is duplicated across slots (seat / back / mattress / bed / headboard)
 * so the configurator can surface the right options per product category.
 */

type FoamSlot = Foam['slot'];

const TIER_META: Record<
  Foam['tier'],
  { name: string; density: number; description: string; pricePerDensity: number }
> = {
  better: {
    name: 'Better',
    density: 40,
    description: 'Medium-firm support · everyday comfort · 5-year warranty',
    pricePerDensity: 120
  },
  best: {
    name: 'Best',
    density: 50,
    description: 'Signature support · our most-specified density · 8-year warranty',
    pricePerDensity: 180
  },
  'luxury-premium': {
    name: 'Luxury Premium',
    density: 60,
    description: 'Firm architectural support · high-use, high-density · 12-year warranty',
    pricePerDensity: 260
  }
};

const SLOT_MULTIPLIER: Record<FoamSlot, number> = {
  seat: 1.0,
  back: 0.78,
  mattress: 2.4, // mattresses use far more foam volume
  bed: 1.6,
  headboard: 0.55
};

const SLOTS: FoamSlot[] = ['seat', 'back', 'mattress', 'bed', 'headboard'];

/** All foam options, keyed by slot + tier. */
export const FOAMS: Foam[] = SLOTS.flatMap((slot) =>
  (Object.keys(TIER_META) as Foam['tier'][]).map((tier) => {
    const meta = TIER_META[tier];
    return {
      id: `foam-${slot}-${tier}`,
      slot,
      tier,
      density: meta.density,
      name: `${meta.name} · ${meta.density}D`,
      description: meta.description,
      pricePerDensity: Math.round(meta.pricePerDensity * SLOT_MULTIPLIER[slot])
    };
  })
);

export const getFoamsForSlot = (slot: FoamSlot): Foam[] =>
  FOAMS.filter((f) => f.slot === slot).sort((a, b) => a.density - b.density);

export const getFoam = (id: string) => FOAMS.find((f) => f.id === id);
