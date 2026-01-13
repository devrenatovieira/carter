import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

function parseDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const from = parseDate(searchParams.get("from"));
  const to = parseDate(searchParams.get("to"));
  const origin = searchParams.get("origin");
  const country = searchParams.get("country");
  const device = searchParams.get("device");
  const returning = searchParams.get("returning");
  const skip = Number(searchParams.get("skip") || 0);
  const take = Math.min(200, Number(searchParams.get("take") || 50));

  const where: Record<string, unknown> = {};

  if (from || to) {
    where.lastVisit = {
      ...(from ? { gte: from } : {}),
      ...(to ? { lte: to } : {})
    };
  }

  if (origin) {
    where.OR = [
      { referrer: { contains: origin, mode: "insensitive" } },
      { utmSource: { contains: origin, mode: "insensitive" } }
    ];
  }

  if (country) {
    where.country = { equals: country, mode: "insensitive" };
  }

  if (device) {
    where.deviceType = device;
  }

  if (returning === "new") {
    where.isReturning = false;
  } else if (returning === "returning") {
    where.isReturning = true;
  }

  const [total, visitors] = await Promise.all([
    prisma.visitor.count({ where }),
    prisma.visitor.findMany({
      where,
      orderBy: { lastVisit: "desc" },
      skip,
      take
    })
  ]);

  return NextResponse.json({ ok: true, total, visitors });
}
