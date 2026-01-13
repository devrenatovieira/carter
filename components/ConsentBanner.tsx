"use client";

import { useEffect, useState } from 'react';

export default function ConsentBanner() {
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const v = localStorage.getItem('carter_consent');
    setAccepted(v === 'true' ? true : v === 'false' ? false : null);
  }, []);

  const accept = () => {
    localStorage.setItem('carter_consent', 'true');
    setAccepted(true);
    window.dispatchEvent(new Event('carter-consent-updated'));
  };

  const decline = () => {
    localStorage.setItem('carter_consent', 'false');
    setAccepted(false);
    window.dispatchEvent(new Event('carter-consent-updated'));
  };

  if (accepted === true) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-medium">Privacidade e cookies</div>
          {accepted === false ? (
            <div className="text-xs text-slate-300">
              Coleta basica ativa (sem cookies): apenas visualizacoes e tempo de pagina. Aceite para analytics completos anonimizados.
            </div>
          ) : (
            <div className="text-xs text-slate-300">
              Usamos apenas dados anonimizados (cidade/estado/pais, dispositivo, navegador, origem e IP mascarado) para analytics.
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={decline} className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Recusar
          </button>
          <button onClick={accept} className="rounded-full bg-brand-500 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
