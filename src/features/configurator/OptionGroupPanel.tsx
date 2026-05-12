'use client';

import { cn } from '@/lib/utils/cn';
import { formatINR } from '@/lib/utils/format';
import type { OptionGroup } from '@/lib/schemas/product';
import { Slider } from '@/components/ui/Slider';

interface Props {
  group: OptionGroup;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
}

/**
 * OptionGroupPanel — renders a single configurable group.
 * Handles: single-select swatches, range sliders, and count steppers.
 * Schema-driven; adding a new kind is a pure extension.
 */
export function OptionGroupPanel({ group, value, onChange }: Props) {
  if (group.kind === 'single') {
    return (
      <div>
        <Header label={group.label} />
        <div className="mt-4 grid gap-2">
          {group.options.map((opt) => {
            const active = value === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onChange(opt.id)}
                className={cn(
                  'group flex items-center gap-4 border p-3 text-left transition-all duration-300',
                  active
                    ? 'border-gold-400/70 bg-gold-500/5 shadow-glow'
                    : 'border-obsidian-600/70 hover:border-gold-500/40'
                )}
              >
                {opt.visual?.startsWith('#') && (
                  <span
                    className="relative h-8 w-8 shrink-0 border border-obsidian-600"
                    style={{ backgroundColor: opt.visual }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/40" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-cream-50">{opt.label}</p>
                  {opt.description && (
                    <p className="mt-0.5 truncate text-[11px] text-cream-200/60">
                      {opt.description}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    'font-mono text-[11px] tabular-nums',
                    opt.priceDelta > 0
                      ? 'text-gold-200'
                      : opt.priceDelta < 0
                        ? 'text-red-300/80'
                        : 'text-cream-200/50'
                  )}
                >
                  {opt.priceDelta === 0
                    ? 'Included'
                    : `${opt.priceDelta > 0 ? '+' : ''}${formatINR(opt.priceDelta)}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if ((group.kind === 'range' || group.kind === 'count') && group.range) {
    const numeric = typeof value === 'number' ? value : group.range.baseUnit;
    return (
      <div>
        <Header label={group.label} />
        <div className="mt-6">
          <Slider
            value={numeric}
            min={group.range.min}
            max={group.range.max}
            step={group.range.step}
            suffix={group.range.unitLabel}
            onChange={(v) => onChange(v)}
          />
          <p className="mt-3 text-[10px] uppercase tracking-luxe text-cream-200/50">
            Base · {group.range.baseUnit}
            {group.range.unitLabel ? ` ${group.range.unitLabel}` : ''} · +
            {formatINR(group.range.pricePerUnit)} per unit
          </p>
        </div>
      </div>
    );
  }

  return null;
}

function Header({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-gold-400/60" />
      <h4 className="text-[10px] uppercase tracking-luxe text-gold-200">{label}</h4>
    </div>
  );
}
