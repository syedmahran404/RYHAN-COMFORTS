'use client';

import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover
}: PropsWithChildren<MarqueeProps>) {
  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden mask-fade-x',
        className
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-16 pr-16',
          'animate-marquee',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
