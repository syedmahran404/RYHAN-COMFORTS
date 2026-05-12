'use client';

import { Stage } from './Stage';
import { SofaModel } from './SofaModel';
import { SOFA_DEFAULTS } from '@/lib/utils/constants';

/**
 * HeroStage — the non-interactive cinematic 3D used on the landing page.
 * Mobile-safe, auto-rotating, and decoupled from the configurator store.
 */
export function HeroStage({ className }: { className?: string }) {
  return (
    <Stage
      className={className}
      camera={[3.6, 1.7, 5]}
      shadowOpacity={0.6}
      interactive={false}
    >
      <SofaModel
        upholsteryId="velvet-obsidian"
        baseWoodId="walnut-natural"
        seatCount={SOFA_DEFAULTS.seatingCount}
        variantId="atelier-lowback"
        autoRotate
        idle
      />
    </Stage>
  );
}
