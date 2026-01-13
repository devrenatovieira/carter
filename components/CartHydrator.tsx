'use client';

import { useEffect } from 'react';
import useCart from '@/lib/cart';

export default function CartHydrator() {
  const hydrate = useCart((state) => state.hydrate);
  const hydrated = useCart((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  return null;
}
