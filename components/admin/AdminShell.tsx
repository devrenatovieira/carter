"use client";

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function AdminShell({
  userName,
  title = "Painel de Produtos",
  description = "Gerencie o catalogo e produtos da loja.",
  active = "produtos"
}: {
  userName?: string | null;
  title?: string;
  description?: string;
  active?: "produtos" | "usuarios";
}) {
  return (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin Carter</p>
        <h1 className="text-2xl font-serif">{title}</h1>
        <p className="text-sm text-slate-300">{description}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">Logado como {userName || 'admin'}.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant={active === "produtos" ? "default" : "outline"}>
          <Link href="/admin">Produtos</Link>
        </Button>
        <Button asChild variant={active === "usuarios" ? "default" : "outline"}>
          <Link href="/admin/usuarios">Informações de Usuários</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/new">Novo produto</Link>
        </Button>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: '/admin/login' })}>
          Sair
        </Button>
      </div>
    </div>
  );
}
