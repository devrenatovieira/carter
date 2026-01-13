export const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export function formatPriceBRL(cents: number) {
  return brlFormatter.format(cents / 100);
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 0 }).format(value);
}

export function formatDateBR(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date);
}
