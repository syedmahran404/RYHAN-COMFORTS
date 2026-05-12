'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type PropsWithChildren } from 'react';

interface ParallaxProps {
  offset?: number;
  className?: string;
}

/**
 * Parallax — subtle translate-Y on scroll. Intended for hero art,
 * section accents, and oversized typography.
 */
export function Parallax({
  children,
  offset = 80,
  className
}: PropsWithChildren<ParallaxProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
