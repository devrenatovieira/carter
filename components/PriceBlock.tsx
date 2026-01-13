import { formatPriceBRL } from '@/lib/format';

export default function PriceBlock({ price, compare }: { price: number; compare?: number | null }) {
  return (
    <div>
      <div className="text-3xl font-serif">{formatPriceBRL(price)}</div>
      {compare ? <div className="text-sm text-slate-400 line-through">{formatPriceBRL(compare)}</div> : null}
    </div>
  );
}
