'use client';

import { Zap, ZapOff, Gauge, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useConfiguratorStore, type RenderQuality } from '@/lib/state/configurator';

/**
 * StageControls — floating toolbar over the 3D canvas.
 *
 * Controls auto-rotate and GPU quality tier.
 */
export function StageControls() {
  const quality = useConfiguratorStore((s) => s.renderQuality);
  const setQuality = useConfiguratorStore((s) => s.setRenderQuality);
  const autoRotate = useConfiguratorStore((s) => s.autoRotate);
  const setAutoRotate = useConfiguratorStore((s) => s.setAutoRotate);

  const qualities: { id: RenderQuality; label: string; Icon: typeof Zap }[] = [
    { id: 'performance', label: 'Fast', Icon: Gauge },
    { id: 'balanced', label: 'Balanced', Icon: Zap },
    { id: 'high', label: 'Cinematic', Icon: Sparkles }
  ];

  return (
    <div className="pointer-events-auto flex items-center gap-1 glass-dark border border-gold-500/15 p-1">
      {qualities.map(({ id, label, Icon }) => {
        const active = quality === id;
        return (
          <button
            key={id}
            onClick={() => setQuality(id)}
            aria-label={`Render quality · ${label}`}
            className={cn(
              'flex items-center gap-2 px-2.5 py-1.5 text-[9px] uppercase tracking-luxe transition-colors',
              active
                ? 'bg-gold-500/15 text-gold-100'
                : 'text-cream-200/60 hover:text-cream-100'
            )}
          >
            <Icon className="h-3 w-3" />
            <span className="hidden md:inline">{label}</span>
          </button>
        );
      })}

      <span className="mx-1 h-4 w-px bg-obsidian-600" />

      <button
        onClick={() => setAutoRotate(!autoRotate)}
        aria-label="Toggle auto-rotate"
        className={cn(
          'flex items-center gap-2 px-2.5 py-1.5 text-[9px] uppercase tracking-luxe transition-colors',
          autoRotate
            ? 'bg-gold-500/15 text-gold-100'
            : 'text-cream-200/60 hover:text-cream-100'
        )}
      >
        <RefreshCw className={cn('h-3 w-3', autoRotate && 'animate-spin-slow')} />
        <span className="hidden md:inline">Auto-rotate</span>
      </button>
    </div>
  );
}
