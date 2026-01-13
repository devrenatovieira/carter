import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Ctx = {
  params: Promise<{ visitorId: string }>;
};

export async function GET(req: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { visitorId } = await params;
  const { searchParams } = new URL(req.url);
  const take = Math.min(500, Number(searchParams.get("take") || 200));

  const events = await prisma.event.findMany({
    where: { visitorId },
    orderBy: { createdAt: "desc" },
    take
  });

  return NextResponse.json({ ok: true, events });
}
