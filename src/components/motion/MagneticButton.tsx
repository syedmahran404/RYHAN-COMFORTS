'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

interface MagneticButtonProps {
  strength?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * MagneticButton — cursor-reactive magnetic pull. Used sparingly
 * on hero CTAs to add tactile luxury.
 */
export function MagneticButton({
  children,
  strength = 18,
  className,
  onClick
}: PropsWithChildren<MagneticButtonProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set((mx / r.width) * strength);
    y.set((my / r.height) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
}
