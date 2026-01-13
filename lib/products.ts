import { prisma } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

export const getProducts = async () => {
  noStore();
  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });
};

export const getProductBySlug = async (slug: string) => {
  noStore();
  return prisma.product.findFirst({ where: { slug, isActive: true } });
};
