import { ProductSkeleton } from '@/components/Skeleton';

export default function LoadingProduct() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="h-[320px] rounded-3xl skeleton sm:h-[420px] lg:h-[520px]" />
      <div className="space-y-4">
        <div className="h-6 w-1/2 skeleton" />
        <div className="h-4 w-3/4 skeleton" />
        <ProductSkeleton />
      </div>
    </div>
  );
}
