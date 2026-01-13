import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import { categoryToSlug } from '@/lib/categories';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const category = categories.find((c) => categoryToSlug(c) === params.slug);
  if (!category) return {};
  return {
    title: category,
    description: `Produtos da categoria ${category} na Carter.`
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const category = categories.find((c) => categoryToSlug(c) === params.slug);
  if (!category) notFound();

  const items = products.filter((p) => p.category === category);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Categoria</p>
        <h1 className="text-3xl font-serif">{category}</h1>
        <p className="text-sm text-slate-300">Curadoria Carter com pagamentos via Shopay-Canvi.</p>
      </header>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>{items.length} itens</span>
        <Link href="/catalogo" className="hover:text-[var(--accent)]">
          Voltar ao catálogo
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
