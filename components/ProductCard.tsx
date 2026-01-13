'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import WishlistButton from '@/components/WishlistButton';
import { Badge } from '@/components/ui/badge';
import { formatPriceBRL } from '@/lib/format';
import type { Product } from '@prisma/client';

export default function ProductCard({ product }: { product: Product }) {
  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
  const discount = product.compareAtPrice ? product.price / product.compareAtPrice : null;
  const deliveryLabel =
    product.deliveryType === 'DELIVERY' ? 'Delivery' : product.deliveryType === 'PICKUP' ? 'Retirada' : 'Ambos';

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)]"
    >
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative h-72 w-full overflow-hidden bg-[var(--surface-muted)] sm:h-80 sm:w-[102%] sm:-ml-[1%]">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="space-y-2 px-5 pb-5 pt-4">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{product.category}</div>
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-xs text-slate-300">{product.shortDescription}</p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          {product.isFastShipping && <Badge>Envio rápido</Badge>}
          {product.isFeatured && <Badge>Destaque</Badge>}
          {savings > 0 && <Badge>Economize {formatPriceBRL(savings)}</Badge>}
          {discount && <Badge>{Math.round((1 - discount) * 100)}% desconto</Badge>}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="rounded-full border border-[var(--border-subtle)] px-2 py-1">{deliveryLabel}</span>
          {product.rating ? <span className="rounded-full border border-[var(--border-subtle)] px-2 py-1">Nota {product.rating.toFixed(1)}</span> : null}
          {typeof product.soldCount === 'number' ? (
            <span className="rounded-full border border-[var(--border-subtle)] px-2 py-1">Vendidos {product.soldCount}</span>
          ) : null}
        </div>
        {product.pickupLocation && product.deliveryType !== 'DELIVERY' ? (
          <div className="text-[11px] text-slate-400">Retirada: {product.pickupLocation}</div>
        ) : null}
        {product.tags?.length ? (
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border-subtle)] px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-baseline gap-2 text-sm">
          <span className="text-ink-500">{formatPriceBRL(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-slate-400 line-through">{formatPriceBRL(product.compareAtPrice)}</span>
          ) : null}
        </div>
        <WishlistButton productId={product.id} />
      </div>
    </motion.article>
  );
}
