'use client';

import { motion } from 'framer-motion';
import {
  Armchair,
  Bed,
  Frame,
  Hand,
  Lamp,
  Layers,
  PocketKnife,
  Sparkles,
  Sofa
} from 'lucide-react';
import type { Section } from '@/lib/schemas/product';
import { useConfiguratorStore } from '@/lib/state/configurator';
import { cn } from '@/lib/utils/cn';

const ICONS: Record<NonNullable<Section['icon']>, typeof Sparkles> = {
  sofa: Sofa,
  armchair: Armchair,
  bed: Bed,
  layers: Layers,
  pillow: Layers,
  frame: Frame,
  hand: Hand,
  leg: PocketKnife,
  lamp: Lamp,
  sparkles: Sparkles
};

/** Schema-driven section navigation, light-theme. */
export function SectionTabs({
  sections,
  orientation = 'horizontal'
}: {
  sections: Section[];
  orientation?: 'horizontal' | 'vertical';
}) {
  const active = useConfiguratorStore((s) => s.activeSectionId);
  const setActive = useConfiguratorStore((s) => s.setActiveSection);

  const ordered = [...sections].sort((a, b) => a.order - b.order);

  return (
    <nav
      aria-label="Configurator sections"
      className={cn(
        'relative',
        orientation === 'horizontal'
          ? 'flex gap-1 overflow-x-auto mask-fade-x pb-1'
          : 'flex flex-col gap-1'
      )}
    >
      {ordered.map((s) => {
        const Icon = ICONS[s.icon ?? 'sparkles'];
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              'group relative flex shrink-0 items-center gap-3 border px-4 py-3 text-left transition-all duration-300',
              isActive
                ? 'border-champagne-300 bg-ivory-50 text-pewter-800 shadow-soft'
                : 'border-pewter-300/60 bg-ivory-100 text-pewter-500 hover:border-champagne-300/60 hover:text-pewter-700'
            )}
          >
            <Icon
              className={cn(
                'h-4 w-4',
                isActive ? 'text-walnut-500' : 'text-pewter-400'
              )}
            />
            <span className="text-[10px] uppercase tracking-luxe">{s.label}</span>
            {isActive && (
              <motion.span
                layoutId="section-underline"
                className="absolute inset-x-0 bottom-0 h-px bg-champagne-300"
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
