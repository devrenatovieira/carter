import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return <ProductForm title="Editar produto" action={updateProduct} product={product} />;
}
