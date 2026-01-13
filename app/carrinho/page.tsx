'use client';

import Image from 'next/image';
import useCart from '@/lib/cart';
import { buildPaymentLink } from '@/lib/affiliate';
import { begin_checkout, purchase_redirect } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { formatPriceBRL } from '@/lib/format';
import { useSearchParams } from 'next/navigation';

export default function CartPage() {
  const searchParams = useSearchParams();
  const checkoutOnly = searchParams.get('checkout') === '1';
  const cart = useCart();
  const subtotal = cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const canCheckout = cart.items.length > 0;

  const checkout = () => {
    begin_checkout(cart.items);
    if (cart.items.length === 0) return;
    if (cart.items.length === 1) {
      const singleItem = cart.items[0];
      const link = buildPaymentLink(singleItem.product);
      purchase_redirect(`order-${cart.items[0].product.id}`);
      window.location.href = link;
      return;
    }
    multiItemFallback(true);
  };

  async function multiItemFallback(fromCheckout = false) {
    if (!fromCheckout) begin_checkout(cart.items);
    for (const item of cart.items) {
      const link = buildPaymentLink(item.product);
      window.open(link, '_blank');
      await new Promise((r) => setTimeout(r, 600));
    }
    purchase_redirect('order-sequence');
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Carrinho</p>
        <h1 className="text-3xl font-serif">Seus itens selecionados</h1>
      </header>

      {cart.items.length === 0 ? (
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-10 text-sm text-slate-300">
          Seu carrinho esta vazio. Explore nossas colecoes para adicionar produtos.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            {cart.items.map((i) => (
              <div key={i.product.id} className="flex items-center gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                  <Image src={i.product.images[0]} alt={i.product.title} fill style={{ objectFit: 'cover' }} sizes="96px" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{i.product.title}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{formatPriceBRL(i.product.price)}</div>
                </div>
                {checkoutOnly ? (
                  <div className="flex items-center gap-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Qtd {i.quantity}</div>
                    <button onClick={() => cart.remove(i.product.id)} className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Remover
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={i.quantity}
                      onChange={(e) => cart.update(i.product.id, Number(e.target.value || 1))}
                      className="w-16 rounded-full border border-[var(--border-subtle)] bg-transparent px-3 py-1 text-sm"
                      aria-label="Quantidade"
                    />
                    <button onClick={() => cart.remove(i.product.id)} className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Remover
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <aside className="space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Subtotal</div>
              <div className="mt-2 text-2xl font-serif">{formatPriceBRL(subtotal)}</div>
            </div>
            <Button onClick={checkout} className="w-full" disabled={!canCheckout}>
              Finalizar pagamento
            </Button>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Pagamentos processados por Shopay-Canvi
            </p>
            {!checkoutOnly && cart.items.length > 1 && (
              <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] p-4 text-sm text-slate-300">
                <p className="mb-3 font-medium text-ink-500">Finalize um item por vez (rapido e seguro).</p>
                <p className="mb-4">Abriremos um link por item em nova aba.</p>
                <Button onClick={() => multiItemFallback()} variant="outline" className="w-full" disabled={!canCheckout}>
                  Gerar links individuais
                </Button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
