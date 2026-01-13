import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type TrackEvent = {
  type: "page_view" | "click" | "scroll" | "time_on_page";
  url: string;
  data?: Prisma.InputJsonValue | null;
  durationSeconds?: number;
};

type TrackPayload = {
  visitorId: string;
  sessionKey: string;
  consentLevel: "full" | "basic";
  event: TrackEvent;
  deviceType?: string;
  os?: string;
  browser?: string;
  language?: string;
  timeZone?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

function maskIp(raw: string | null) {
  if (!raw) return null;
  const ip = raw.split(",")[0]?.trim();
  if (!ip) return null;
  if (ip.includes(":")) {
    const parts = ip.split(":");
    const head = parts.slice(0, 4).map((p) => (p ? p : "0"));
    return `${head.join(":")}::`;
  }
  const octets = ip.split(".");
  if (octets.length !== 4) return null;
  return `${octets[0]}.${octets[1]}.${octets[2]}.0`;
}

function toPrismaJson(value: unknown): Prisma.InputJsonValue | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null as unknown as Prisma.InputJsonValue;
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export async function POST(req: NextRequest) {
  let payload: TrackPayload | null = null;
  try {
    payload = (await req.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!payload?.consentLevel) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const { visitorId, sessionKey, event } = payload;
  if (!visitorId || !sessionKey || !event?.type || !event?.url) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const now = new Date();
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ipMasked = payload.consentLevel === "full" ? maskIp(forwarded || realIp) : null;

  const geoCity = payload.consentLevel === "full" ? req.headers.get("x-vercel-ip-city") : null;
  const geoRegion = payload.consentLevel === "full" ? req.headers.get("x-vercel-ip-country-region") : null;
  const geoCountry = payload.consentLevel === "full" ? req.headers.get("x-vercel-ip-country") : null;

  const pageViewInc = event.type === "page_view" ? 1 : 0;
  const timeInc =
    event.type === "time_on_page" && typeof event.durationSeconds === "number"
      ? Math.max(0, Math.floor(event.durationSeconds))
      : 0;

  const existing = await prisma.visitor.findUnique({ where: { visitorId } });

  if (!existing) {
    await prisma.visitor.create({
      data: {
        visitorId,
        firstVisit: now,
        lastVisit: now,
        isReturning: false,
        city: geoCity || undefined,
        region: geoRegion || undefined,
        country: geoCountry || undefined,
        deviceType: payload.consentLevel === "full" ? payload.deviceType : undefined,
        os: payload.consentLevel === "full" ? payload.os : undefined,
        browser: payload.consentLevel === "full" ? payload.browser : undefined,
        language: payload.consentLevel === "full" ? payload.language : undefined,
        timeZone: payload.consentLevel === "full" ? payload.timeZone : undefined,
        totalPageViews: pageViewInc,
        totalTimeSeconds: timeInc,
        referrer: payload.consentLevel === "full" ? payload.referrer : undefined,
        utmSource: payload.consentLevel === "full" ? payload.utmSource : undefined,
        utmMedium: payload.consentLevel === "full" ? payload.utmMedium : undefined,
        utmCampaign: payload.consentLevel === "full" ? payload.utmCampaign : undefined,
        utmTerm: payload.consentLevel === "full" ? payload.utmTerm : undefined,
        utmContent: payload.consentLevel === "full" ? payload.utmContent : undefined,
        ipMasked
      }
    });
  } else {
    await prisma.visitor.update({
      where: { visitorId },
      data: {
        lastVisit: now,
        isReturning: true,
        city: existing.city || geoCity || undefined,
        region: existing.region || geoRegion || undefined,
        country: existing.country || geoCountry || undefined,
        deviceType: existing.deviceType || (payload.consentLevel === "full" ? payload.deviceType : undefined),
        os: existing.os || (payload.consentLevel === "full" ? payload.os : undefined),
        browser: existing.browser || (payload.consentLevel === "full" ? payload.browser : undefined),
        language: existing.language || (payload.consentLevel === "full" ? payload.language : undefined),
        timeZone: existing.timeZone || (payload.consentLevel === "full" ? payload.timeZone : undefined),
        totalPageViews: pageViewInc ? { increment: pageViewInc } : undefined,
        totalTimeSeconds: timeInc ? { increment: timeInc } : undefined,
        referrer: existing.referrer || (payload.consentLevel === "full" ? payload.referrer : undefined),
        utmSource: existing.utmSource || (payload.consentLevel === "full" ? payload.utmSource : undefined),
        utmMedium: existing.utmMedium || (payload.consentLevel === "full" ? payload.utmMedium : undefined),
        utmCampaign: existing.utmCampaign || (payload.consentLevel === "full" ? payload.utmCampaign : undefined),
        utmTerm: existing.utmTerm || (payload.consentLevel === "full" ? payload.utmTerm : undefined),
        utmContent: existing.utmContent || (payload.consentLevel === "full" ? payload.utmContent : undefined),
        ipMasked: existing.ipMasked || ipMasked || undefined
      }
    });
  }

  const session = await prisma.session.upsert({
    where: { sessionKey },
    create: {
      sessionKey,
      visitorId,
      startedAt: now,
      endedAt: now,
      pageViews: pageViewInc
    },
    update: {
      endedAt: now,
      ...(pageViewInc ? { pageViews: { increment: pageViewInc } } : {})
    }
  });

  const durationSeconds = Math.max(0, Math.floor((now.getTime() - session.startedAt.getTime()) / 1000));
  await prisma.session.update({
    where: { sessionKey },
    data: { durationSeconds }
  });

  await prisma.event.create({
    data: {
      visitorId,
      sessionKey,
      type: event.type,
      url: event.url,
      data: toPrismaJson(event.data ?? (timeInc ? { durationSeconds: timeInc } : undefined))
    }
  });

  return NextResponse.json({ ok: true });
}
