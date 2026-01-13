import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import { getProductBySlug, getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} | Carter`,
      description: product.shortDescription,
      images: product.images.map((src) => ({ url: `${base}${src}` }))
    }
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  const products = await getProducts();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return <ProductClient product={product} related={related} />;
}
