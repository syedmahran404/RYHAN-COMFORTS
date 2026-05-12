'use client';

import { useConfiguratorStore } from '@/lib/state/configurator';
import { Slider } from '@/components/ui/Slider';

/**
 * DimensionsPanel — live W × D × H sliders (light theme).
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
        <span className="h-px w-6 bg-champagne-300" />
        <h4 className="text-[10px] uppercase tracking-luxe text-walnut-500">Dimensions</h4>
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

      <p className="text-[10px] uppercase tracking-luxe text-pewter-400">
        Tolerances within ± 2 cm · measured in our atelier before cutting
      </p>
    </div>
  );
}
