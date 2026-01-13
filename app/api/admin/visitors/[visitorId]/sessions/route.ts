import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { visitorId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sessions = await prisma.session.findMany({
    where: { visitorId: params.visitorId },
    orderBy: { startedAt: "desc" }
  });

  return NextResponse.json({ ok: true, sessions });
}
