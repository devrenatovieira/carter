"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function shouldTriggerLoading(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    const current = new URL(window.location.href);
    return url.pathname + url.search !== current.pathname + current.search;
  } catch {
    return false;
  }
}

export default function LoadingOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (!shouldTriggerLoading(anchor)) return;
      setLoading(true);
    };

    const handleBeforeUnload = () => {
      setLoading(true);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--surface-elevated)] backdrop-blur-sm">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-300">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-brand-100" aria-hidden="true" />
        Carregando
      </div>
    </div>
  );
}
