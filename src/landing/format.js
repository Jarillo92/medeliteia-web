// Formato español fijo (punto de millares también con 4 cifras), igual en servidor y navegador
export function formatNumber(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatEuros(n) {
  return `${formatNumber(n)} €`;
}
