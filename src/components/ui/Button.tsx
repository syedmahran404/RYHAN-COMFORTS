'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-luxe transition-all duration-500 ease-silk disabled:opacity-40 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-b from-gold-200 via-gold-300 to-gold-500 text-obsidian-900 shadow-luxe hover:from-gold-100 hover:via-gold-200 hover:to-gold-400 hover:shadow-glow',
        outline:
          'border border-gold-300/40 text-gold-100 hover:border-gold-200 hover:text-gold-50 hover:bg-gold-500/5',
        ghost: 'text-foreground/80 hover:text-gold-100',
        dark: 'bg-obsidian-800 text-cream-100 border border-obsidian-600 hover:bg-obsidian-700 hover:border-gold-500/40',
        link: 'text-gold-200 hover:text-gold-100 underline-offset-4 hover:underline'
      },
      size: {
        sm: 'h-9 px-4 text-[10px]',
        md: 'h-11 px-6 text-[11px]',
        lg: 'h-14 px-9 text-xs',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {variant === 'primary' && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <span className="shimmer absolute inset-0" />
          </span>
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
