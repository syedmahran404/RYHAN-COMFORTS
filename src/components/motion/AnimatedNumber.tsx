'use client';

import { useEffect, useRef, useState } from 'react';
import { formatINR, lerp } from '@/lib/utils/format';

/**
 * AnimatedNumber — cinematic price counter.
 * Interpolates toward the target value on every change.
 */
export function AnimatedNumber({
  value,
  duration = 650,
  format = formatINR
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = display;
    const to = value;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // eased cubic out
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(lerp(from, to, eased)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span className="tabular-nums">{format(display)}</span>;
}
