'use client';

import { motion, type Variants } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { EASE } from '@/lib/utils/constants';

interface RevealProps {
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

/**
 * Reveal — the house-standard entrance animation.
 * Used for text blocks, cards, and section headers.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  once = true,
  className
}: PropsWithChildren<RevealProps>) {
  const variants: Variants = {
    hidden: { opacity: 0, y, filter: 'blur(10px)' },
    shown: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, delay, ease: EASE.silk }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: '-10% 0px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
