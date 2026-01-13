import create from 'zustand';
import { Product } from './types';

type CartItem = { product: Product; quantity: number };

type CartState = {
  items: CartItem[];
  hydrated: boolean;
  hydrate: () => void;
  add: (_product: Product, _quantity?: number) => void;
  remove: (_productId: string) => void;
  update: (_productId: string, _quantity: number) => void;
  clear: () => void;
};

function normalizeQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.floor(quantity));
}

const useCart = create<CartState>((set, get) => ({
  items: [],
  hydrated: false,
  hydrate() {
    try {
      const raw = localStorage.getItem('carter_cart');
      const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
      set({ items, hydrated: true });
    } catch (e) {
      set({ hydrated: true });
    }
  },
  add(product, quantity = 1) {
    const safeQty = normalizeQuantity(quantity);
    const items = get().items.slice();
    const found = items.find((i) => i.product.id === product.id);
    if (found) {
      found.quantity += safeQty;
    } else {
      items.push({ product, quantity: safeQty });
    }
    set({ items });
    try { localStorage.setItem('carter_cart', JSON.stringify(items)); } catch (e) { console.error('cart persist error', e); }
  },
  remove(productId) {
    const items = get().items.filter((i) => i.product.id !== productId);
    set({ items });
    try { localStorage.setItem('carter_cart', JSON.stringify(items)); } catch (e) { console.error('cart persist error', e); }
  },
  update(productId, quantity) {
    const safeQty = normalizeQuantity(quantity);
    const items = get().items.slice();
    const found = items.find((i) => i.product.id === productId);
    if (found) found.quantity = safeQty;
    set({ items });
    try { localStorage.setItem('carter_cart', JSON.stringify(items)); } catch (e) { console.error('cart persist error', e); }
  },
  clear() {
    set({ items: [] });
    try { localStorage.removeItem('carter_cart'); } catch (e) { console.error('cart clear error', e); }
  }
}));

export default useCart;
