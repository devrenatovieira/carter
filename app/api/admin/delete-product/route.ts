import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return new Response('Não autorizado', { status: 401 });
  }

  const body = await req.json();
  const id = body?.id as string | undefined;
  if (!id) return new Response('ID ausente', { status: 400 });

  await prisma.product.delete({ where: { id } });
  return new Response('OK', { status: 200 });
}
