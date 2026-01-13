import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import TrustBadges from '@/components/TrustBadges';
import ImageMosaic from '@/components/ImageMosaic';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import type { Product } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((p: Product) => p.isFeatured).slice(0, 4);
  const editorPick = products.filter((p: Product) => p.isEditorPick).slice(0, 4);
  const fastShipping = products.filter((p: Product) => p.isFastShipping).slice(0, 4);
  const galleryImages = products.flatMap((p: Product) => p.images || []).filter(Boolean).slice(0, 60);
  const bestSellers = [...products]
    .sort(
      (a: Product, b: Product) =>
        (b.soldCount || 0) - (a.soldCount || 0) || (a.manualRank || 99) - (b.manualRank || 99)
    )
    .slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Carter</p>
          <h1 className="text-4xl font-serif leading-tight md:text-5xl">Carter - lojas manauara exclusivas shopay-canvi.</h1>
          <p className="max-w-xl text-slate-300">
            Peças essenciais, acabamento impecavel e experiencia premium. Produtos originais. Pagamentos processados pelo parceiro Shopay-Canvi.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/catalogo">Ver Coleção</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/catalogo?ofertas=1">Ofertas do Dia</Link>
            </Button>
          </div>
          <TrustBadges />
        </div>
        <div className="relative h-[320px] overflow-hidden rounded-[36px] sm:h-[380px] lg:h-[420px]">
          <Image
            src="/images/logocarter.png"
            alt="Carter curadoria"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      </section>

      <ImageMosaic eyebrow="Galeria" title="Seleção visual Carter" images={galleryImages} />

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Destaques</p>
            <h2 className="text-2xl font-serif">Destaques da Semana</h2>
          </div>
          <Link href="/catalogo" className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--accent)]">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Escolhas</p>
          <h2 className="text-2xl font-serif">Seleções Carter</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {editorPick.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mais vendidos</p>
          <h2 className="text-2xl font-serif">Mais Vendidos</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Envio rápido</p>
          <h2 className="text-2xl font-serif">Envio Rápido</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {fastShipping.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
