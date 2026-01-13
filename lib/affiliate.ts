import { Product } from './types';

export function buildPaymentLink(product: Product) {
  return product.paymentLink;
}
