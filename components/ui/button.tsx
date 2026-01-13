'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'muted';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && 'bg-brand-500 text-white hover:bg-brand-700',
      variant === 'outline' && 'border border-[var(--border-subtle)] text-ink-500 hover:border-brand-500/50',
      variant === 'ghost' && 'text-ink-500 hover:bg-white/5',
      variant === 'muted' && 'bg-[var(--surface-muted)] text-ink-500 hover:bg-[var(--surface-elevated)]',
      size === 'default' && 'h-11 px-6',
      size === 'sm' && 'h-9 px-4 text-xs uppercase tracking-[0.12em]',
      size === 'lg' && 'h-12 px-8 text-base',
      size === 'icon' && 'h-10 w-10',
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, (children.props as { className?: string }).className),
        ...props
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
