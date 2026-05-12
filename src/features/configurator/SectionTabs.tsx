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

/**
 * SectionTabs — horizontal (or vertical) tab nav over the product's sections.
 * A schema-driven navigation component — reads Product.sections.
 */
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
                ? 'border-gold-400/70 bg-gold-500/10 text-cream-50'
                : 'border-obsidian-600/70 text-cream-200/60 hover:border-gold-500/40 hover:text-cream-100'
            )}
          >
            <Icon className={cn('h-4 w-4', isActive ? 'text-gold-200' : 'text-cream-200/40')} />
            <span className="text-[10px] uppercase tracking-luxe">{s.label}</span>
            {isActive && (
              <motion.span
                layoutId="section-underline"
                className="absolute inset-x-0 bottom-0 h-px bg-gold-300"
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
