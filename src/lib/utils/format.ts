/**
 * Formatters — single source of truth for money, dimensions, etc.
 */

export const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-IN').format(value);

export const formatDimension = (cm: number) => `${cm} cm`;

/** Smooth number interpolation used by price counters */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
