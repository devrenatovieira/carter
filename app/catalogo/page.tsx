import type { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import ImageMosaic from '@/components/ImageMosaic';
import Link from 'next/link';
import { categoryToSlug } from '@/lib/categories';
import CatalogClient from './CatalogClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Catalogo',
  description: 'Explore o catálogo Carter com filtros e busca instântanea.'
};

export default async function CatalogPage() {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();
  const tags = Array.from(new Set(products.flatMap((p) => p.tags))).sort();
  const galleryImages = products.flatMap((p) => p.images || []).filter(Boolean).slice(0, 60);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Catalogo</p>
        <h1 className="text-3xl font-serif">Coleção de produto</h1>
        <p className="text-sm text-slate-300">Explore coleções de produtos selecionados por nossa equipe especializada.</p>
      </header>
      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categoria/${categoryToSlug(category)}`}
              className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 hover:text-[var(--accent)]"
            >
              {category}
            </Link>
          ))}
        </div>
      ) : null}
      <ImageMosaic eyebrow="Galeria" title="Mais imagens da coleção" images={galleryImages} />
      <CatalogClient items={products} categories={categories} tags={tags} />
    </div>
  );
}
