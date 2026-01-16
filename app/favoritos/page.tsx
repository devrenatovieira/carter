"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@prisma/client";

const WISHLIST_KEY = "carter_wishlist";

function getWishlistIds() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY) || "[]";
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export default function FavoritosPage() {
  const [ids, setIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const hasIds = useMemo(() => ids.length > 0, [ids]);

  useEffect(() => {
    setIds(getWishlistIds());

    const handleUpdate = () => setIds(getWishlistIds());
    window.addEventListener("carter-wishlist-updated", handleUpdate);
    return () => window.removeEventListener("carter-wishlist-updated", handleUpdate);
  }, []);

  useEffect(() => {
    if (!hasIds) {
      setProducts([]);
      return;
    }

    setLoading(true);
    fetch(`/api/products/by-ids?ids=${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [hasIds, ids]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Favoritos</p>
        <h1 className="text-3xl font-serif">Itens salvos</h1>
      </header>

      {!hasIds ? (
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-10 text-sm text-slate-300">
          Voce ainda não tem favoritos. Salve produtos para ver aqui.
          <div className="mt-4">
            <Link href="/catalogo" className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--accent)]">
              Ir para o catalogo
            </Link>
          </div>
        </div>
      ) : loading ? (
        <div className="text-sm text-slate-400">Carregando favoritos...</div>
      ) : products.length === 0 ? (
        <div className="text-sm text-slate-400">Nenhum favorito encontrado.</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
