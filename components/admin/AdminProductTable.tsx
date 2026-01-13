"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatPriceBRL } from '@/lib/format';
import { Product } from '@/lib/types';

export default function AdminProductTable({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este produto?')) return;
    const res = await fetch('/api/admin/delete-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (!res.ok) {
      alert('Falha ao excluir produto.');
      return;
    }
    router.refresh();
  };

  const filtered = useMemo(() => {
    if (!query) return products;
    const q = query.toLowerCase();
    return products.filter((p) => `${p.title} ${p.slug} ${p.category}`.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produto..."
          className="w-full max-w-md rounded-full border border-[var(--border-subtle)] bg-transparent px-4 py-2 text-sm"
        />
        <div className="text-sm text-slate-300">{filtered.length} itens</div>
      </div>
      <div className="overflow-auto rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr className="border-b border-[var(--border-subtle)]">
              <th className="px-4 py-3 text-left">Produto</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-left">Preco</th>
              <th className="px-4 py-3 text-left">Entrega</th>
              <th className="px-4 py-3 text-left">Ativo</th>
              <th className="px-4 py-3 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-[var(--border-subtle)]">
                <td className="px-4 py-3">
                  <div className="font-medium">{product.title}</div>
                  <div className="text-xs text-slate-400">{product.slug}</div>
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{formatPriceBRL(product.price)}</td>
                <td className="px-4 py-3">
                  {product.deliveryType === 'DELIVERY'
                    ? 'Delivery'
                    : product.deliveryType === 'PICKUP'
                      ? 'Retirada'
                      : 'Ambos'}
                </td>
                <td className="px-4 py-3">{product.isActive ? 'Ativo' : 'Inativo'}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/${product.id}/edit`}
                      className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--accent)]"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="text-xs uppercase tracking-[0.2em] text-red-300"
                      onClick={() => handleDelete(product.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
