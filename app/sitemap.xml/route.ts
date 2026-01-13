import { prisma } from '@/lib/db';
import { categoryToSlug } from '@/lib/categories';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const staticUrls = [
    '/',
    '/catalogo',
    '/suporte',
    '/carrinho',
    '/politicas',
    '/privacidade',
    '/termos',
    '/sobre',
    '/transparencia'
  ];
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true, category: true },
    where: { isActive: true }
  });
  const categories = Array.from(new Set(products.map((p) => p.category)));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const u of staticUrls) {
    xml += `<url><loc>${base}${u}</loc></url>\n`;
  }
  for (const p of products) {
    xml += `<url><loc>${base}/produto/${p.slug}</loc><lastmod>${p.updatedAt.toISOString()}</lastmod></url>\n`;
  }
  for (const category of categories) {
    xml += `<url><loc>${base}/categoria/${categoryToSlug(category)}</loc></url>\n`;
  }

  xml += `</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
