'use client';

import { cn } from '@/lib/utils/cn';
import { formatINR } from '@/lib/utils/format';
import type { OptionGroup, Option } from '@/lib/schemas/product';
import { Slider } from '@/components/ui/Slider';

interface Props {
  group: OptionGroup;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
}

/**
 * OptionGroupPanel — renders a single configurable group.
 *
 * Phase 2 adds:
 *   · Swatch grid view for upholstery (visual > 8 items)
 *   · Tier badge (signature / premium / atelier) pulled from option.meta
 *   · Compact range/count inline label
 */
export function OptionGroupPanel({ group, value, onChange }: Props) {
  if (group.kind === 'single') {
    const isSwatchy =
      group.options.some((o) => o.visual?.startsWith('#')) && group.options.length >= 8;
    return (
      <div>
        <Header label={group.label} />
        {isSwatchy ? (
          <SwatchGrid options={group.options} value={value as string} onChange={onChange} />
        ) : (
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
                  {opt.visual?.startsWith('#') && <Swatch color={opt.visual} size={32} />}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm text-cream-50">{opt.label}</p>
                      {renderTierBadge(opt)}
                    </div>
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
        )}
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

function Swatch({ color, size = 36, active = false }: { color: string; size?: number; active?: boolean }) {
  return (
    <span
      className={cn('relative shrink-0 border', active ? 'border-gold-300' : 'border-obsidian-600')}
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/40" />
    </span>
  );
}

function SwatchGrid({
  options,
  value,
  onChange
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  const selected = options.find((o) => o.id === value);
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              aria-label={opt.label}
              title={`${opt.label}${opt.priceDelta ? ` · +${formatINR(opt.priceDelta)}` : ''}`}
              className={cn(
                'relative aspect-square border transition-all duration-300',
                active
                  ? 'border-gold-300 shadow-glow ring-1 ring-gold-400/40'
                  : 'border-obsidian-600/60 hover:border-gold-500/40'
              )}
              style={{ backgroundColor: opt.visual ?? 'transparent' }}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/40" />
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="flex items-center justify-between gap-4 border border-obsidian-600/60 bg-obsidian-900/40 p-3">
          <div className="flex items-center gap-3">
            <Swatch color={selected.visual ?? '#000'} size={28} />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-cream-50">{selected.label}</p>
                {renderTierBadge(selected)}
              </div>
              {selected.description && (
                <p className="text-[10px] uppercase tracking-luxe text-cream-200/50">
                  {selected.description}
                </p>
              )}
            </div>
          </div>
          <span
            className={cn(
              'font-mono text-[11px] tabular-nums',
              selected.priceDelta > 0
                ? 'text-gold-200'
                : selected.priceDelta < 0
                  ? 'text-red-300/80'
                  : 'text-cream-200/50'
            )}
          >
            {selected.priceDelta === 0
              ? 'Included'
              : `${selected.priceDelta > 0 ? '+' : ''}${formatINR(selected.priceDelta)}`}
          </span>
        </div>
      )}
    </div>
  );
}

function renderTierBadge(opt: Option) {
  const tier = (opt.meta as { tier?: string } | undefined)?.tier;
  if (!tier || tier === 'signature') return null;
  return (
    <span
      className={cn(
        'text-[8px] uppercase tracking-luxe border px-1.5 py-0.5',
        tier === 'atelier'
          ? 'border-gold-300/50 text-gold-200'
          : 'border-cream-200/30 text-cream-200/70'
      )}
    >
      {tier}
    </span>
  );
}
