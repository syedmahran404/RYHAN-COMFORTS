'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  suffix?: string;
  className?: string;
}

/**
 * Luxury horizontal slider — custom-styled range input.
 * No heavy libraries; pure accessible native input with styled track.
 */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  suffix,
  className
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-3 flex items-end justify-between">
          <span className="text-2xs uppercase tracking-luxe text-cream-200/60">{label}</span>
          <span className="font-mono text-sm text-gold-200 tabular-nums">
            {value}
            {suffix ? ` ${suffix}` : ''}
          </span>
        </div>
      )}
      <div className="relative h-6 select-none">
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-obsidian-600" />
        <div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-200"
          style={{ width: `${percent}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${percent}%` }}
        >
          <div className="relative h-4 w-4">
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-gold-200 to-gold-500 shadow-glow" />
            <span className="absolute inset-[3px] rounded-full bg-obsidian-900" />
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          aria-label={label}
        />
      </div>
    </div>
  );
}
