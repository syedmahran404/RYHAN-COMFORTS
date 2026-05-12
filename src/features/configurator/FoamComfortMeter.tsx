'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield, Flame } from 'lucide-react';
import { useConfiguratorStore } from '@/lib/state/configurator';
import { getFoam } from '@/lib/data/foams';
import { cn } from '@/lib/utils/cn';

/**
 * FoamComfortMeter — visualises the chosen foam tier as comfort,
 * support, and durability meters. Reads the active foam selections
 * from the configurator store.
 *
 *   40 density → Better Comfort         · 5-year warranty
 *   50 density → Premium Comfort        · 8-year warranty  (Best)
 *   60 density → Ultra Luxury Hotel Grade · 12-year warranty
 */

type Tier = 'better' | 'best' | 'luxury-premium';

const TIER_META: Record<
  Tier,
  {
    label: string;
    badge: string;
    comfort: number; // 0-1
    support: number; // 0-1
    durability: number; // 0-1
    warranty: string;
    description: string;
    Icon: typeof Sparkles;
  }
> = {
  better: {
    label: 'Better Comfort',
    badge: '40 Density',
    comfort: 0.55,
    support: 0.45,
    durability: 0.55,
    warranty: '5-year warranty',
    description: 'Medium-firm · everyday use',
    Icon: Shield
  },
  best: {
    label: 'Premium Comfort',
    badge: '50 Density',
    comfort: 0.78,
    support: 0.75,
    durability: 0.78,
    warranty: '8-year warranty',
    description: 'Signature support · our most-specified tier',
    Icon: Sparkles
  },
  'luxury-premium': {
    label: 'Ultra Luxury · Hotel Grade',
    badge: '60 Density',
    comfort: 0.94,
    support: 0.96,
    durability: 0.96,
    warranty: '12-year warranty',
    description: 'Architectural firm · high-use hospitality grade',
    Icon: Flame
  }
};

function tierFromFoamId(id?: string): Tier | null {
  if (!id) return null;
  const foam = getFoam(id);
  return foam?.tier ?? null;
}

export function FoamComfortMeter() {
  const selection = useConfiguratorStore((s) => s.selection);

  // Resolve seat + back tiers; this works for all products that use the
  // foam slot naming convention (seat-foam, back-foam, bed-foam, mattress-foam, headboard-foam)
  const slots = [
    { id: 'seat-foam', label: 'Seat' },
    { id: 'back-foam', label: 'Back' },
    { id: 'bed-foam', label: 'Bed platform' },
    { id: 'headboard-foam', label: 'Headboard' },
    { id: 'mattress-foam', label: 'Mattress core' }
  ]
    .map((slot) => {
      const val = selection[slot.id];
      if (typeof val !== 'string') return null;
      const tier = tierFromFoamId(val);
      if (!tier) return null;
      return { slot: slot.label, tier };
    })
    .filter((x): x is { slot: string; tier: Tier } => Boolean(x));

  if (slots.length === 0) return null;

  // Use the highest tier for the headline panel
  const ranking: Tier[] = ['better', 'best', 'luxury-premium'];
  const topTier: Tier = slots
    .map((s) => s.tier)
    .reduce((a, b) => (ranking.indexOf(b) > ranking.indexOf(a) ? b : a), 'better');

  const meta = TIER_META[topTier];
  const Icon = meta.Icon;

  return (
    <div className="paper-card p-6">
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-champagne-300" />
        <h4 className="text-[10px] uppercase tracking-luxe text-walnut-500">Comfort profile</h4>
      </div>

      <div className="mt-5 flex items-start gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center bg-gradient-to-b from-champagne-100 via-champagne-200 to-champagne-400 text-pewter-800 shadow-bevel">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-display text-xl text-pewter-800">{meta.label}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-luxe text-walnut-500">
            {meta.badge} · {meta.warranty}
          </p>
          <p className="mt-2 text-xs text-pewter-500">{meta.description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3.5">
        <Meter label="Comfort" value={meta.comfort} />
        <Meter label="Support" value={meta.support} />
        <Meter label="Durability" value={meta.durability} />
      </div>

      {slots.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-pewter-300/60 pt-4">
          {slots.map((s) => (
            <span
              key={s.slot}
              className={cn(
                'border px-2.5 py-1 text-[9px] uppercase tracking-luxe',
                s.tier === 'luxury-premium'
                  ? 'border-champagne-300 bg-champagne-100/40 text-walnut-500'
                  : s.tier === 'best'
                    ? 'border-champagne-200 bg-ivory-100 text-walnut-500'
                    : 'border-pewter-300 bg-ivory-50 text-pewter-500'
              )}
            >
              {s.slot} · {TIER_META[s.tier].badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-luxe text-pewter-500">{label}</span>
        <span className="font-mono text-[10px] text-walnut-500 tabular-nums">
          {Math.round(value * 100)}%
        </span>
      </div>
      <div className="mt-1.5 h-[3px] w-full overflow-hidden bg-pewter-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-champagne-400 to-walnut-400"
        />
      </div>
    </div>
  );
}
