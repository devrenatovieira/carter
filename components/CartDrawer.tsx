'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useCart from '@/lib/cart';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatPriceBRL } from '@/lib/format';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cart = useCart();
  const subtotal = cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button className="hover:text-[var(--accent)]" aria-label="Abrir carrinho" onClick={() => setOpen(true)}>
        CARRINHO ({cart.items.length})
      </button>

      {open && (
        <div className="fixed inset-0 z-60">
          <button
            type="button"
            aria-label="Fechar carrinho"
            className="absolute inset-0 bg-[#0a1024]/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            onPointerDown={() => setOpen(false)}
          />
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md border-l border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif">Seu carrinho</h3>
              <button onClick={() => setOpen(false)} className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)]">
                Fechar
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {cart.items.length === 0 && <div className="text-sm text-slate-300">Seu carrinho esta vazio.</div>}
              {cart.items.map((i) => (
                <div key={i.product.id} className="flex items-center gap-4 border-b border-[var(--border-subtle)] pb-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image src={i.product.images[0]} alt={i.product.title} fill style={{ objectFit: 'cover' }} sizes="64px" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{i.product.title}</div>
                    <div className="text-xs uppercase tracking-[0.12em] text-slate-400">{formatPriceBRL(i.product.price)}</div>
                  </div>
                  <div className="ml-auto text-xs">x{i.quantity}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">{formatPriceBRL(subtotal)}</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Button asChild variant="outline">
                  <Link href="/carrinho?checkout=1" onClick={() => setOpen(false)}>Ver carrinho</Link>
                </Button>
                {cart.items.length > 0 && (
                  <Button asChild>
                    <Link href="/carrinho" onClick={() => setOpen(false)}>Finalizar</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
