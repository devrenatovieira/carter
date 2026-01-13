import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/db';
import AdminShell from '@/components/admin/AdminShell';
import AdminProductTable from '@/components/admin/AdminProductTable';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-8">
      <AdminShell
        userName={session?.user?.name}
        title="Painel de Produtos"
        description="Gerencie o catalogo, precos e links de pagamento."
        active="produtos"
      />
      <AdminProductTable products={products} />
    </div>
  );
}
