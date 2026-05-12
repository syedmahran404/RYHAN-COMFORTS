import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 border border-gold-500/30 bg-obsidian-800/60 px-3 py-1 text-[10px] uppercase tracking-luxe text-gold-100 backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <span className="h-1 w-1 rounded-full bg-gold-300 animate-pulse-gold" />
      {children}
    </span>
  );
}
