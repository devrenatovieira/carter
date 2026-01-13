import { Suspense } from 'react';
import CartClient from './CartClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-sm text-slate-300">Carregando carrinho...</div>}>
      <CartClient />
    </Suspense>
  );
}
