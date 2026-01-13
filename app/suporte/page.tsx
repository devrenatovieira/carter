import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Suporte',
  description: 'Atendimento via WhatsApp e email.'
};

export default function Support() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Suporte</p>
        <h1 className="text-3xl font-serif">Atendimento facilitado</h1>
        <p className="text-sm text-slate-300">Equipe Carter disponivel de segunda a sexta, 9h - 17h.</p>
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
          <h5 className="text-xs uppercase tracking-[0.2em] text-slate-400">Atendimento</h5>
          <p className="mt-3 text-sm text-slate-300">WhatsApp: +55 11 99999-0000</p>
          <p className="text-sm text-slate-300">Email: suporte@carter.com</p>
          <Button asChild className="mt-4">
            <a href="https://wa.me/5511999990000" target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
          </Button>
        </div>
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
          <h5 className="text-xs uppercase tracking-[0.2em] text-slate-400">FAQ</h5>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Trocas em ate 07 dias</li>
            <li>Envio premium com rastreio</li>
            <li>Garantia estendida para pecas selecionadas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
