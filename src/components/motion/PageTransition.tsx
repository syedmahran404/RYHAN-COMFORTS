'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { EASE } from '@/lib/utils/constants';

/**
 * PageTransition — cinematic fade + blur between routes.
 *
 * Triggers on pathname change; respects prefers-reduced-motion via CSS.
 */
export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
      transition={{ duration: 0.7, ease: EASE.silk }}
    >
      {children}
    </motion.div>
  );
}
