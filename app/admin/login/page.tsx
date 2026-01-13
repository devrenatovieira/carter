"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const errorParam = searchParams.get("error");

  // Se já estiver logado, manda direto pro admin
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [status, router]);

  // Se veio ?error=... do NextAuth, mostra erro
  useEffect(() => {
    if (errorParam) setFormError("Credenciais inválidas.");
  }, [errorParam]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false
    });

    setLoading(false);

    if (res?.error) {
      setFormError("Credenciais inválidas.");
      return;
    }

    router.replace(callbackUrl);
  };

  // Enquanto checa sessão, evita flicker do form
  if (status === "loading") {
    return (
      <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8">
        <p className="text-sm text-slate-300">Verificando sessão...</p>
      </div>
    );
  }

  // Se autenticado, o useEffect já vai redirecionar
  if (status === "authenticated") return null;

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Carter Admin
        </p>
        <h1 className="text-2xl font-serif">Acesso restrito</h1>
        <p className="text-sm text-slate-300">
          Entre com usuário e senha para gerenciar produtos.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Usuário"
          className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
          required
          autoComplete="username"
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
          required
          autoComplete="current-password"
        />

        {formError ? (
          <p className="text-sm text-red-300">{formError}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
