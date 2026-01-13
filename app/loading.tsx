"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--surface-elevated)] backdrop-blur-sm">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-300">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-brand-100" aria-hidden="true" />
        Carregando
      </div>
    </div>
  );
}
