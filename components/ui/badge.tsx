'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[var(--border-subtle)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-500',
        className
      )}
      {...props}
    />
  );
}
