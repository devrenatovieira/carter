import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Ctx = {
  params: Promise<{ visitorId: string }>;
};

export async function GET(_req: NextRequest, { params }: Ctx) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { visitorId } = await params;
  const sessions = await prisma.session.findMany({
    where: { visitorId },
    orderBy: { startedAt: "desc" }
  });

  return NextResponse.json({ ok: true, sessions });
}
