"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const CONSENT_KEY = "carter_consent";
const VISITOR_KEY = "carter_vid";
const SESSION_KEY = "carter_sid";
const LAST_ACTIVITY_KEY = "carter_last_activity";
const SESSION_TTL_MS = 30 * 60 * 1000;

type ConsentLevel = "none" | "basic" | "full";

function getConsentLevel(): ConsentLevel {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === "true") return "full";
    if (value === "false") return "basic";
    return "none";
  } catch {
    return "none";
  }
}

function getOrCreateVisitorId() {
  let id = "";
  try {
    id = localStorage.getItem(VISITOR_KEY) || "";
  } catch {
    id = "";
  }

  if (!id) {
    id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    try {
      localStorage.setItem(VISITOR_KEY, id);
    } catch {}
  }

  try {
    document.cookie = `${VISITOR_KEY}=${id}; path=/; max-age=31536000; samesite=lax`;
  } catch {}

  return id;
}

function getOrCreateSessionKey() {
  const now = Date.now();
  let last = 0;
  let sessionKey = "";
  try {
    last = Number(localStorage.getItem(LAST_ACTIVITY_KEY) || "0");
    sessionKey = localStorage.getItem(SESSION_KEY) || "";
  } catch {
    last = 0;
    sessionKey = "";
  }

  if (!sessionKey || now - last > SESSION_TTL_MS) {
    sessionKey = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${now}-${Math.random()}`;
  }

  try {
    localStorage.setItem(SESSION_KEY, sessionKey);
    localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
  } catch {}

  return sessionKey;
}

function updateLastActivity() {
  try {
    localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
  } catch {}
}

function parseDevice() {
  const ua = navigator.userAgent || "";
  const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua);
  const isMobile = /Mobi|Android/i.test(ua) && !isTablet;
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  let os = "unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua) && !/Mobile/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";

  const language = navigator.language || "unknown";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";

  return { deviceType, os, browser, language, timeZone };
}

function sanitizeUrl(raw: string) {
  try {
    const url = new URL(raw, window.location.href);
    const allowed = new Set([
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content"
    ]);
    const params = new URLSearchParams();
    url.searchParams.forEach((value, key) => {
      if (allowed.has(key)) params.set(key, value);
    });
    const search = params.toString();
    return `${url.pathname}${search ? `?${search}` : ""}`;
  } catch {
    return raw;
  }
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    utmContent: params.get("utm_content") || undefined
  };
}

async function sendTrack(payload: Record<string, unknown>, useBeacon = false) {
  const body = JSON.stringify(payload);
  if (useBeacon && navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/track", blob);
    return;
  }
  await fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  });
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageStartRef = useRef<number | null>(null);
  const lastUrlRef = useRef<string | null>(null);
  const scrollSentRef = useRef<boolean>(false);
  const basicVisitorRef = useRef<string | null>(null);
  const basicSessionRef = useRef<string | null>(null);

  const getIdentifiers = (consentLevel: ConsentLevel) => {
    if (consentLevel === "full") {
      return {
        visitorId: getOrCreateVisitorId(),
        sessionKey: getOrCreateSessionKey()
      };
    }

    if (!basicVisitorRef.current) {
      basicVisitorRef.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    }
    if (!basicSessionRef.current) {
      basicSessionRef.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    }

    return {
      visitorId: basicVisitorRef.current,
      sessionKey: basicSessionRef.current
    };
  };

  const trackPageView = (referrerOverride?: string) => {
    const consentLevel = getConsentLevel();
    if (consentLevel === "none") return;
    if (pathname.startsWith("/admin")) return;

    const previousStart = pageStartRef.current;
    const previousUrl = lastUrlRef.current;
    if (previousStart && previousUrl) {
      const durationSeconds = Math.max(1, Math.floor((Date.now() - previousStart) / 1000));
      const { visitorId, sessionKey } = getIdentifiers(consentLevel);
      sendTrack(
        {
          consentLevel,
          visitorId,
          sessionKey,
          event: { type: "time_on_page", url: previousUrl, durationSeconds }
        },
        true
      );
      updateLastActivity();
    }

    const { visitorId, sessionKey } = getIdentifiers(consentLevel);
    const device = consentLevel === "full" ? parseDevice() : null;
    const url = sanitizeUrl(window.location.href);
    const referrer = consentLevel === "full" ? referrerOverride || document.referrer || undefined : undefined;
    const utm = consentLevel === "full" ? getUtmParams() : {};

    pageStartRef.current = Date.now();
    lastUrlRef.current = url;
    scrollSentRef.current = false;

    sendTrack({
      consentLevel,
      visitorId,
      sessionKey,
      event: { type: "page_view", url },
      referrer,
      ...utm,
      ...(device || {})
    });

    updateLastActivity();
  };

  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams]);

  useEffect(() => {
    const consentLevel = getConsentLevel();
    if (consentLevel === "none") return;
    if (pathname.startsWith("/admin")) return;

    const handleClick = (event: MouseEvent) => {
      if (getConsentLevel() !== "full") return;
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest("a,button");
      if (!trigger) return;
      const { visitorId, sessionKey } = getIdentifiers("full");
      const url = sanitizeUrl(window.location.href);

      sendTrack({
        consentLevel: "full",
        visitorId,
        sessionKey,
        event: { type: "click", url }
      });

      updateLastActivity();
    };

    const handleScroll = () => {
      if (getConsentLevel() !== "full") return;
      if (scrollSentRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const percent = Math.round((window.scrollY / max) * 100);
      if (percent < 5) return;
      scrollSentRef.current = true;
      const { visitorId, sessionKey } = getIdentifiers("full");
      const url = sanitizeUrl(window.location.href);

      sendTrack({
        consentLevel: "full",
        visitorId,
        sessionKey,
        event: { type: "scroll", url, data: { scrollPercent: percent } }
      });

      updateLastActivity();
    };

    const handleVisibility = () => {
      if (document.visibilityState !== "hidden") return;
      const start = pageStartRef.current;
      const url = lastUrlRef.current;
      if (!start || !url) return;
      const durationSeconds = Math.max(1, Math.floor((Date.now() - start) / 1000));
      const level = getConsentLevel();
      if (level === "none") return;
      const { visitorId, sessionKey } = getIdentifiers(level);

      sendTrack(
        {
          consentLevel: level,
          visitorId,
          sessionKey,
          event: { type: "time_on_page", url, durationSeconds }
        },
        true
      );
      updateLastActivity();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    const handleConsent = () => {
      if (getConsentLevel() === "none") return;
      trackPageView();
    };
    window.addEventListener("carter-consent-updated", handleConsent);
    return () => {
      window.removeEventListener("carter-consent-updated", handleConsent);
    };
  }, [pathname, searchParams]);

  return null;
}
