import * as React from "react";
import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3", className)} {...props} />;
}

function AccordionItem({ className, ...props }: React.HTMLAttributes<HTMLDetailsElement>) {
  return (
    <details
      className={cn("group rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink-500",
        className
      )}
      {...props}
    />
  );
}

function AccordionContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-3 text-sm text-slate-300", className)} {...props} />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
