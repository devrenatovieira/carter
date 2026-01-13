import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawIds = searchParams.get("ids") || "";
  const ids = rawIds
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (ids.length === 0) {
    return Response.json([]);
  }

  const products = await prisma.product.findMany({
    where: { id: { in: ids }, isActive: true },
    orderBy: { createdAt: "desc" }
  });

  return Response.json(products);
}
