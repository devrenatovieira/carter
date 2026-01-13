import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { visitorId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const take = Math.min(500, Number(searchParams.get("take") || 200));

  const events = await prisma.event.findMany({
    where: { visitorId: params.visitorId },
    orderBy: { createdAt: "desc" },
    take
  });

  return NextResponse.json({ ok: true, events });
}
