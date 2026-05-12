'use client';

import { useConfiguratorStore } from '@/lib/state/configurator';
import { Slider } from '@/components/ui/Slider';

/**
 * DimensionsPanel — live W × D × H sliders.
 *
 * Bound to store.dimensions; each axis is range-clamped by the product's
 * `dimensions.wRange / dRange / hRange` (falling back to sensible defaults).
 */
export function DimensionsPanel() {
  const product = useConfiguratorStore((s) => s.product);
  const dimensions = useConfiguratorStore((s) => s.dimensions);
  const setDimension = useConfiguratorStore((s) => s.setDimension);

  if (!product?.dimensions) return null;

  const { w, d, h, wRange, dRange, hRange } = product.dimensions;
  const current = {
    w: dimensions.w ?? w,
    d: dimensions.d ?? d,
    h: dimensions.h ?? h
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-gold-400/60" />
        <h4 className="text-[10px] uppercase tracking-luxe text-gold-200">Dimensions</h4>
      </div>

      <Slider
        label="Width"
        suffix="cm"
        value={current.w}
        min={wRange?.[0] ?? w - 60}
        max={wRange?.[1] ?? w + 120}
        step={1}
        onChange={(v) => setDimension('w', v)}
      />
      <Slider
        label="Depth"
        suffix="cm"
        value={current.d}
        min={dRange?.[0] ?? d - 20}
        max={dRange?.[1] ?? d + 40}
        step={1}
        onChange={(v) => setDimension('d', v)}
      />
      <Slider
        label="Height"
        suffix="cm"
        value={current.h}
        min={hRange?.[0] ?? h - 20}
        max={hRange?.[1] ?? h + 30}
        step={1}
        onChange={(v) => setDimension('h', v)}
      />

      <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">
        Tolerances within ± 2 cm · measured in our atelier before cutting
      </p>
    </div>
  );
}
