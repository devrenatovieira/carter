'use client';

import { useState } from 'react';
import SearchModal from '@/components/SearchModal';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] backdrop-blur-md">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-4">
        <Link href="/" className="text-base font-serif tracking-[0.12em] uppercase sm:text-lg">
          Carter
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.24em] text-[var(--text-muted)] sm:gap-6 sm:text-[10px]">
          <nav className="flex items-center gap-4 overflow-x-auto sm:gap-6">
            <Link href="/" className="hover:text-[var(--accent)]">Início</Link>
            <Link href="/catalogo" className="hover:text-[var(--accent)]">Catálogo</Link>
            <Link href="/favoritos" className="hover:text-[var(--accent)]">Favoritos</Link>
            <Link href="/suporte" className="hover:text-[var(--accent)]">Suporte</Link>
            <Link href="/politicas" className="hover:text-[var(--accent)]">Políticas</Link>
          </nav>
          <button aria-label="Abrir busca" className="hover:text-[var(--accent)]" onClick={() => setOpen(true)}>
            BUSCAR
          </button>
          <Link href="/carrinho?checkout=1" className="hover:text-[var(--accent)]">
            Carrinho
          </Link>
        </div>
      </div>
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
