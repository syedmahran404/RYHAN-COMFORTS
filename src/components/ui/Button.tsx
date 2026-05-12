'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

/**
 * Editorial light-luxury button.
 *
 * Variants:
 *   · primary  — ink-on-ivory with a hover wash
 *   · gold     — champagne gradient (hero CTA)
 *   · outline  — walnut border on ivory
 *   · ghost    — link-style
 *   · dark     — ink block (reverse surfaces)
 *   · link     — underlined inline
 */
const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 font-sans text-[11px] uppercase tracking-luxe transition-all duration-500 ease-silk disabled:opacity-40 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-pewter-700 text-ivory-50 hover:bg-pewter-600 shadow-soft hover:shadow-editorial',
        gold:
          'bg-gradient-to-b from-champagne-200 via-champagne-300 to-champagne-500 text-pewter-700 shadow-soft hover:shadow-glow',
        outline:
          'border border-pewter-300 bg-transparent text-pewter-700 hover:border-champagne-300 hover:text-walnut-500 hover:bg-ivory-50',
        ghost: 'text-pewter-600 hover:text-walnut-500',
        dark:
          'bg-pewter-800 text-ivory-50 border border-pewter-700 hover:bg-pewter-700 hover:border-champagne-300/50',
        link: 'text-walnut-500 hover:text-walnut-400 underline-offset-4 hover:underline'
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
        {variant === 'gold' && (
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
