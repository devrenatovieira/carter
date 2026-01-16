import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-6 py-14 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute -top-24 left-8 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(123,118,255,0.45),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(155,141,255,0.35),_transparent_70%)] blur-3xl" />
      <div className="relative grid min-h-[60vh] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Erro 404</p>
          <h1 className="mt-4 text-4xl font-serif sm:text-5xl">Página não encontrada</h1>
          <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
            A página que você procura não existe na Carter ou mudou de endereço. Vamos te colocar na rota certa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">Voltar ao início</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/catalogo">Ver catálogo</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/suporte">Falar com suporte</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
            <span className="rounded-full border border-[var(--border-subtle)] px-4 py-2">Curadoria manauara</span>
            <span className="rounded-full border border-[var(--border-subtle)] px-4 py-2">Coleções sazonais</span>
            <span className="rounded-full border border-[var(--border-subtle)] px-4 py-2">Checkout seguro</span>
          </div>
        </div>

        <div className="relative">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Mapa</span>
              <span>Rota perdida</span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-brand-100">
                <span className="text-xl font-semibold">?</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Coordenadas</p>
                <p className="text-lg font-semibold text-[var(--text-primary)]">Desconhecidas</p>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-4">
              <svg viewBox="0 0 240 120" className="h-28 w-full" role="img" aria-label="Mapa abstrato">
                <path
                  d="M12 24 C 58 8, 78 60, 118 46 C 160 32, 178 8, 228 24"
                  fill="none"
                  stroke="rgba(155, 141, 255, 0.7)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20 92 C 64 74, 96 96, 136 84 C 176 72, 198 52, 228 64"
                  fill="none"
                  stroke="rgba(123, 118, 255, 0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 8"
                />
                <circle cx="24" cy="26" r="6" fill="rgba(231, 236, 255, 0.9)" />
                <circle cx="212" cy="62" r="6" fill="rgba(231, 236, 255, 0.7)" />
                <circle cx="124" cy="46" r="4" fill="rgba(231, 236, 255, 0.5)" />
              </svg>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Dica: revise o endereço ou use a busca no topo da página.
            </p>
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-slate-400 sm:block">
            Sinal perdido
          </div>
        </div>
      </div>
    </section>
  );
}
