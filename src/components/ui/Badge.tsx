import * as React from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * Editorial badge — light ivory with a walnut text.
 * Supports `tone="light" | "dark"` for reverse surfaces.
 */
export function Badge({
  className,
  children,
  tone = 'light',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: 'light' | 'dark' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 border px-3 py-1 text-[10px] uppercase tracking-luxe backdrop-blur-sm',
        tone === 'light'
          ? 'border-champagne-300/50 bg-ivory-50/80 text-walnut-500'
          : 'border-champagne-300/40 bg-pewter-800/80 text-champagne-100',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'h-1 w-1 rounded-full animate-pulse-gold',
          tone === 'light' ? 'bg-champagne-300' : 'bg-champagne-200'
        )}
      />
      {children}
    </span>
  );
}
