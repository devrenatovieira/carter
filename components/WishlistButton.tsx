'use client';

import { useState, useEffect } from 'react';

export default function WishlistButton({
  productId,
  className,
  savedLabel = '',
  unsavedLabel = '',
}:
{
  productId: string;
  className?: string;
  savedLabel?: string;
  unsavedLabel?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('carter_wishlist') || '[]');
    setSaved(list.includes(productId));
  }, [productId]);

  const toggle = () => {
    const list = JSON.parse(localStorage.getItem('carter_wishlist') || '[]');
    if (list.includes(productId)) {
      const next = list.filter((id: string) => id !== productId);
      localStorage.setItem('carter_wishlist', JSON.stringify(next));
      setSaved(false);
      window.dispatchEvent(new Event('carter-wishlist-updated'));
    } else {
      list.push(productId);
      localStorage.setItem('carter_wishlist', JSON.stringify(list));
      setSaved(true);
      window.dispatchEvent(new Event('carter-wishlist-updated'));
    }
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className={className || "text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--accent)]"}
    >
      {saved ? savedLabel : unsavedLabel}
    </button>
  );
}
