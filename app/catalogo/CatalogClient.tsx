"use client";

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import type { Product } from '@prisma/client';

const sorters: Record<string, (a: Product, b: Product) => number> = {
  featured: (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  best: (a, b) => (b.soldCount || 0) - (a.soldCount || 0) || (a.manualRank || 99) - (b.manualRank || 99)
};

export default function CatalogClient({
  items,
  categories,
  tags
}: {
  items: Product[];
  categories: string[];
  tags: string[];
}) {
  const searchParams = useSearchParams();
  const onlyOffers = searchParams.get('ofertas') === '1';
  const initialMaxPrice = items.length ? Math.max(...items.map((item) => item.price)) : 100;
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: initialMaxPrice,
    rating: 0,
    fast: false,
    tags: []
  });
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    return items
      .filter((p) => (filters.category === 'all' ? true : p.category === filters.category))
      .filter((p) => p.price <= filters.maxPrice)
      .filter((p) => (filters.rating ? (p.rating || 0) >= filters.rating : true))
      .filter((p) => (filters.fast ? p.isFastShipping : true))
      .filter((p) => (onlyOffers ? p.isOfferOfTheDay : true))
      .filter((p) => (filters.tags.length ? filters.tags.some((tag) => p.tags.includes(tag)) : true))
      .filter((p) => (query ? `${p.title} ${p.shortDescription} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()) : true))
      .sort(sorters[sort] || sorters.featured);
  }, [items, filters, query, sort, onlyOffers]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px,1fr]">
      <Filters
        categories={categories}
        tags={tags}
        filters={filters}
        onChange={setFilters}
        priceMax={Math.ceil(initialMaxPrice / 10) * 10}
      />
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Busca instantanea</p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, categoria, tags..."
              className="w-full rounded-full border border-[var(--border-subtle)] bg-transparent px-4 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
            Ordenar
            <select
              className="rounded-full border border-[var(--border-subtle)] bg-transparent px-4 py-2 text-xs"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Destaque</option>
              <option value="price_asc">Menor preco</option>
              <option value="price_desc">Maior preco</option>
              <option value="best">Mais vendidos</option>
            </select>
          </div>
        </div>

        <div className="mb-6 text-sm text-slate-300">{filtered.length} itens encontrados</div>
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-10 text-sm text-slate-300">
            Nenhum produto encontrado para os filtros atuais.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
