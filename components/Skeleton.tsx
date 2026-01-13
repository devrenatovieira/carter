export function ProductSkeleton() {
  return (
    <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
      <div className="h-48 skeleton mb-4 rounded-2xl"></div>
      <div className="h-4 w-3/4 skeleton mb-2 rounded-full"></div>
      <div className="h-4 w-1/4 skeleton rounded-full"></div>
    </div>
  );
}
