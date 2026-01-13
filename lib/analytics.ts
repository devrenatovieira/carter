type EventParams = Record<string, any>;

function hasConsent() {
  try {
    return localStorage.getItem('carter_consent') === 'true';
  } catch (e) {
    return false;
  }
}

export function sendEvent(name: string, params: EventParams = {}) {
  // Placeholder: push to dataLayer for GTM or send to GA4
  if (typeof window !== 'undefined') {
    if (!hasConsent()) return;
    // dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: name, ...params });
    // console for dev visibility
    console.info('[analytics]', name, params);
  }
}

export const view_item = (product: any) => sendEvent('view_item', { items: [product] });
export const add_to_cart = (product: any, quantity = 1) => sendEvent('add_to_cart', { items: [product], quantity });
export const begin_checkout = (cart: any) => sendEvent('begin_checkout', { cart });
export const purchase_redirect = (orderRef: string, affiliate?: string) => sendEvent('purchase_redirect', { orderRef, affiliate });
