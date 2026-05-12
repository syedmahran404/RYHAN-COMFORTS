'use client';

import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Move3d, Rotate3d } from 'lucide-react';
import type { Product } from '@/lib/schemas/product';
import { useConfiguratorStore } from '@/lib/state/configurator';
import { OptionGroupPanel } from './OptionGroupPanel';
import { PriceSummary } from './PriceSummary';
import { ProductHero } from './ProductHero';
import { SectionTabs } from './SectionTabs';
import { DimensionsPanel } from './DimensionsPanel';
import { FoamComfortMeter } from './FoamComfortMeter';
import { Badge } from '@/components/ui/Badge';
import { EASE } from '@/lib/utils/constants';

/**
 * ConfiguratorShell — image-primary editorial configurator.
 *
 * The visual identity is now a catalogue page, not a 3D demo:
 *   · Left column — ProductHero (image / 3D / room toggle)
 *   · Right column — sectioned controls + price + foam comfort meter
 */
export function ConfiguratorShell({ product }: { product: Product }) {
  const setProduct = useConfiguratorStore((s) => s.setProduct);
  const selection = useConfiguratorStore((s) => s.selection);
  const setOption = useConfiguratorStore((s) => s.setOption);
  const activeSection = useConfiguratorStore((s) => s.activeSectionId);

  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);

  const sections = useMemo(
    () => (product.sections ? [...product.sections].sort((a, b) => a.order - b.order) : []),
    [product]
  );

  const groupsForActiveSection = useMemo(() => {
    if (!sections.length) return product.groups;
    return product.groups.filter((g) => g.section === activeSection);
  }, [sections, activeSection, product.groups]);

  const showDimensionsPanel =
    (activeSection === 'dimensions' ||
      (activeSection &&
        ['frame', 'structure', 'silhouette'].includes(activeSection))) &&
    product.dimensions !== undefined;

  const showFoamMeter =
    activeSection === 'seat' ||
    activeSection === 'back' ||
    activeSection === 'foam' ||
    activeSection === 'core';

  return (
    <section className="relative min-h-[100svh] bg-ivory-100 pt-24">
      <div className="absolute inset-0 -z-10 bg-ivory-paper opacity-80" />
      <div className="noise-overlay" />

      <div className="luxe-container py-10">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Badge>
              Configurator ·{' '}
              {product.category[0].toUpperCase() + product.category.slice(1)}
              {product.style ? ` · ${product.style.replace(/-/g, ' ')}` : ''}
            </Badge>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] text-pewter-800">
              {product.name}{' '}
              <span className="italic text-walnut-500">· {product.tagline}</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-pewter-500 text-pretty">
              {product.description}
            </p>
          </div>
          <div className="hidden items-center gap-4 text-[10px] uppercase tracking-luxe text-pewter-500 md:flex">
            <span className="flex items-center gap-2">
              <Rotate3d className="h-3.5 w-3.5 text-walnut-500" /> Drag to rotate
            </span>
            <span className="flex items-center gap-2">
              <Move3d className="h-3.5 w-3.5 text-walnut-500" /> Scroll to zoom
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_minmax(0,1fr)]">
          {/* Product Hero (image / 3D / room) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE.silk }}
            className="relative h-[60svh] min-h-[460px] overflow-hidden border border-pewter-300/60 bg-ivory-50 shadow-editorial lg:h-[78svh]"
          >
            <ProductHero />
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col gap-6">
            {sections.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: EASE.silk }}
              >
                <SectionTabs sections={sections} />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: EASE.silk, delay: 0.08 }}
              className="paper-card p-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection ?? 'all'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE.silk }}
                  className="flex flex-col gap-8"
                >
                  {groupsForActiveSection.length === 0 && !showDimensionsPanel && (
                    <p className="text-sm text-pewter-500">
                      No adjustments for this section. Select another tab above.
                    </p>
                  )}

                  {showDimensionsPanel && <DimensionsPanel />}

                  {groupsForActiveSection.map((group) => (
                    <OptionGroupPanel
                      key={group.id}
                      group={group}
                      value={selection[group.id]}
                      onChange={(v) => setOption(group.id, v)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {showFoamMeter && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE.silk }}
              >
                <FoamComfortMeter />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE.silk, delay: 0.15 }}
            >
              <PriceSummary />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
