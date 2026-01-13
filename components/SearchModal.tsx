"use client";
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPriceBRL } from '@/lib/format';
export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return setResults([]);
    const q = query.toLowerCase();
    const res = (products as any[]).filter((p) => p.title.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q));
    setResults(res.slice(0, 8));
  }, [query, products]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-[#0a1024]/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-auto mt-10 w-[92vw] max-w-2xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4 shadow-xl sm:mt-20 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 border-b border-[var(--border-subtle)] pb-4">
          <input
            autoFocus
            placeholder="Buscar produtos, materiais, colecoes..."
            className="flex-1 bg-transparent text-sm outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar produtos"
          />
          <button onClick={onClose} className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)]">
            Fechar
          </button>
        </div>

        <div className="mt-4">
          {loading && <div className="text-sm text-slate-300">Carregando...</div>}
          {!loading && !query && <div className="text-sm text-slate-300">Digite para buscar.</div>}
          {query && results.length === 0 && <div className="text-sm text-slate-300">Sem resultados</div>}
          <ul>
            {results.map((r) => (
              <li key={r.id} className="py-4 border-b border-[var(--border-subtle)]">
                <Link href={`/produto/${r.slug}`} className="block text-sm font-medium" onClick={onClose}>
                  {r.title}
                </Link>
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">{formatPriceBRL(r.price)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
