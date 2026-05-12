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
 * OptionGroupPanel — light-theme editorial option selector.
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
                      ? 'border-champagne-300 bg-ivory-100 shadow-soft'
                      : 'border-pewter-300/70 bg-ivory-50 hover:border-champagne-300/60'
                  )}
                >
                  {opt.visual?.startsWith('#') && <Swatch color={opt.visual} size={32} />}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm text-pewter-800">{opt.label}</p>
                      {renderTierBadge(opt)}
                    </div>
                    {opt.description && (
                      <p className="mt-0.5 truncate text-[11px] text-pewter-500">
                        {opt.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={cn(
                      'font-mono text-[11px] tabular-nums',
                      opt.priceDelta > 0
                        ? 'text-walnut-500'
                        : opt.priceDelta < 0
                          ? 'text-red-500/80'
                          : 'text-pewter-400'
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
          <p className="mt-3 text-[10px] uppercase tracking-luxe text-pewter-400">
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
      <span className="h-px w-6 bg-champagne-300" />
      <h4 className="text-[10px] uppercase tracking-luxe text-walnut-500">{label}</h4>
    </div>
  );
}

function Swatch({ color, size = 36, active = false }: { color: string; size?: number; active?: boolean }) {
  return (
    <span
      className={cn(
        'relative shrink-0 border shadow-bevel',
        active ? 'border-champagne-300' : 'border-pewter-300/70'
      )}
      style={{ width: size, height: size, backgroundColor: color }}
    />
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
                'relative aspect-square border transition-all duration-300 shadow-bevel',
                active
                  ? 'border-champagne-300 ring-2 ring-champagne-200/70'
                  : 'border-pewter-300/60 hover:border-champagne-300/60'
              )}
              style={{ backgroundColor: opt.visual ?? 'transparent' }}
            />
          );
        })}
      </div>
      {selected && (
        <div className="flex items-center justify-between gap-4 border border-pewter-300/60 bg-ivory-100 p-3">
          <div className="flex items-center gap-3">
            <Swatch color={selected.visual ?? '#000'} size={28} />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-pewter-800">{selected.label}</p>
                {renderTierBadge(selected)}
              </div>
              {selected.description && (
                <p className="text-[10px] uppercase tracking-luxe text-pewter-400">
                  {selected.description}
                </p>
              )}
            </div>
          </div>
          <span
            className={cn(
              'font-mono text-[11px] tabular-nums',
              selected.priceDelta > 0
                ? 'text-walnut-500'
                : selected.priceDelta < 0
                  ? 'text-red-500/80'
                  : 'text-pewter-400'
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
          ? 'border-champagne-300 bg-champagne-100/50 text-walnut-500'
          : 'border-pewter-300/70 bg-ivory-50 text-pewter-500'
      )}
    >
      {tier}
    </span>
  );
}
