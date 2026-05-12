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
 * Luxury horizontal slider — light editorial version.
 * Walnut rail + champagne thumb.
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
          <span className="text-[10px] uppercase tracking-luxe text-pewter-500">{label}</span>
          <span className="font-mono text-sm text-walnut-500 tabular-nums">
            {value}
            {suffix ? ` ${suffix}` : ''}
          </span>
        </div>
      )}
      <div className="relative h-6 select-none">
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-pewter-200" />
        <div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-champagne-400 via-champagne-300 to-champagne-200"
          style={{ width: `${percent}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${percent}%` }}
        >
          <div className="relative h-4 w-4">
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-champagne-100 to-champagne-400 shadow-glow" />
            <span className="absolute inset-[3px] rounded-full bg-ivory-50" />
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
