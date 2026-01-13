'use client';

import { formatPriceBRL } from '@/lib/format';

type FiltersState = {
  category: string;
  maxPrice: number;
  rating: number;
  fast: boolean;
  tags: string[];
};

export default function Filters({
  categories,
  tags,
  filters,
  onChange,
  priceMax
}: {
  categories: string[];
  tags: string[];
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  priceMax: number;
}) {
  const toggleTag = (tag: string) => {
    const exists = filters.tags.includes(tag);
    const next = exists ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag];
    onChange({ ...filters, tags: next });
  };

  return (
    <aside className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
      <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">Filtrar</h4>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-slate-400">Categoria</label>
          <select
            className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3 text-sm"
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
          >
            <option value="all">Todas</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-slate-400">Preco maximo</label>
          <input
            type="range"
            min={0}
            max={priceMax}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full"
            aria-label="Preco maximo"
          />
          <div className="mt-2 text-sm text-slate-300">Ate {formatPriceBRL(filters.maxPrice)}</div>
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-slate-400">Avaliacao minima</label>
          <select
            className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3 text-sm"
            value={filters.rating}
            onChange={(e) => onChange({ ...filters, rating: Number(e.target.value) })}
          >
            <option value={0}>Qualquer</option>
            <option value={4}>4.0+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={filters.fast}
            onChange={(e) => onChange({ ...filters, fast: e.target.checked })}
          />
          Envio rapido
        </label>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-slate-400">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
                  filters.tags.includes(tag) ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--border-subtle)] text-slate-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
