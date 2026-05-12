'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/schemas/product';
import { useConfiguratorStore } from '@/lib/state/configurator';
import { OptionGroupPanel } from './OptionGroupPanel';
import { PriceSummary } from './PriceSummary';
import { ConfiguratorStage } from './ConfiguratorStage';
import { Badge } from '@/components/ui/Badge';
import { Move3d, Rotate3d } from 'lucide-react';

/**
 * ConfiguratorShell — the Phase 1 sofa prototype configurator.
 * Architecture is schema-driven; swapping in a chair / bed product
 * requires zero changes to this component.
 */
export function ConfiguratorShell({ product }: { product: Product }) {
  const setProduct = useConfiguratorStore((s) => s.setProduct);
  const selection = useConfiguratorStore((s) => s.selection);
  const setOption = useConfiguratorStore((s) => s.setOption);

  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);

  return (
    <section className="relative min-h-[100svh] pt-24">
      <div className="absolute inset-0 -z-10 bg-walnut-grain opacity-80" />
      <div className="noise-overlay" />

      <div className="luxe-container py-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge>Configurator · Sofa · Prototype</Badge>
            <h1 className="mt-5 font-display text-4xl text-cream-50 sm:text-5xl">
              {product.name}
              <span className="ml-3 gold-text italic">·</span>{' '}
              <span className="text-cream-200/70">{product.tagline}</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-200/70 text-pretty">
              {product.description}
            </p>
          </div>
          <div className="hidden items-center gap-4 text-[10px] uppercase tracking-luxe text-cream-200/60 md:flex">
            <span className="flex items-center gap-2">
              <Rotate3d className="h-3.5 w-3.5 text-gold-300" /> Drag to rotate
            </span>
            <span className="flex items-center gap-2">
              <Move3d className="h-3.5 w-3.5 text-gold-300" /> Scroll to zoom
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
          {/* 3D Stage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[60svh] min-h-[440px] overflow-hidden border border-obsidian-600/70 bg-obsidian-900/40 lg:h-[78svh]"
          >
            <ConfiguratorStage className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-cinema-vignette opacity-60" />
            <div className="pointer-events-none absolute bottom-4 left-4 glass-dark px-3 py-2 text-[10px] uppercase tracking-luxe text-gold-300">
              Live atelier · PBR · HDR
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="glass-dark border border-gold-500/10 p-6"
            >
              <div className="flex flex-col gap-8">
                {product.groups.map((group) => (
                  <OptionGroupPanel
                    key={group.id}
                    group={group}
                    value={selection[group.id]}
                    onChange={(v) => setOption(group.id, v)}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <PriceSummary />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
