import { prisma } from '@/lib/db';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      tags: true,
      price: true
    }
  });
  return Response.json(products);
}
