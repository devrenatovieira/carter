"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import TrustBadges from '@/components/TrustBadges';
import WishlistButton from '@/components/WishlistButton';
import ProductCard from '@/components/ProductCard';
import PriceBlock from '@/components/PriceBlock';
import useCart from '@/lib/cart';
import type { Product } from '@prisma/client';
import { add_to_cart, view_item } from '@/lib/analytics';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPriceBRL } from '@/lib/format';
import { categoryToSlug } from '@/lib/categories';

export default function ProductClient({ product, related }: { product: Product; related: Product[] }) {
  const router = useRouter();
  const cart = useCart();
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    view_item(product);
  }, [product]);

  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
  const discount = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;

  const handleAddToCart = () => {
    cart.add(product, 1);
    add_to_cart(product, 1);
    setMessage('Adicionado ao carrinho com sucesso.');
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setMessage(''), 2500);
  };

  return (
    <div className="space-y-12 pb-24 lg:pb-0">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
        <button type="button" onClick={() => router.back()} className="hover:text-[var(--accent)]">
          Voltar
        </button>
        <span aria-hidden="true">•</span>
        <Link href="/" className="hover:text-[var(--accent)]">
          Inicio
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <ProductGallery images={product.images} />
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                href={`/categoria/${categoryToSlug(product.category)}`}
                className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--accent)]"
              >
                {product.category}
              </Link>
              <h1 className="mt-2 text-3xl font-serif">{product.title}</h1>
            </div>
            <WishlistButton productId={product.id} />
          </div>
          <p className="text-sm text-slate-300">{product.shortDescription}</p>
          <div className="flex flex-wrap gap-2">
            {product.isFastShipping && <Badge>Envio rápido</Badge>}
            {product.rating ? <Badge>Nota {product.rating.toFixed(1)}</Badge> : null}
            {savings > 0 && <Badge>Economize {formatPriceBRL(savings)}</Badge>}
            {discount > 0 && <Badge>{discount}% desconto</Badge>}
          </div>
          <PriceBlock price={product.price} compare={product.compareAtPrice} />
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Pagamentos processados por Shopay-Canvi.
          </p>

          {message ? (
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAddToCart}>Adicionar ao carrinho</Button>
            <WishlistButton
              productId={product.id}
              savedLabel="Favorito"
              unsavedLabel="Adicionar aos favoritos"
              className="rounded-full border border-[var(--border-subtle)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 hover:text-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cross-sell</p>
            <h2 className="text-2xl font-serif">Outros produtos desta categoria</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Detalhes</p>
            <h2 className="text-2xl font-serif">Sobre o produto</h2>
          </div>
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 text-sm text-slate-300">
          {product.description}
        </div>
      </section>

      <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Confiança</p>
            <h2 className="text-2xl font-serif">Comprar com segurança</h2>
          </div>
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 text-sm text-slate-300">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">Selos de pagamento seguro</div>
          <TrustBadges />
          <div className="mt-4">
            <p>Selo Shopay-Canvi para pagamentos via PIX.</p>
            <p>Garantia Carter: suporte e reembolso em ate 07 dias feito por shopay-canvi de acordo com o código de defesa do consumidor.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
