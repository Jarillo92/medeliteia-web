// Modo demo: ?c=NombreClínica. Solo texto plano, máximo 40 caracteres.
// No se guarda ni se envía a ningún sitio: solo cambia lo que se ve en esta pestaña.
export const CLINIC_MAX = 40;

export function readClinicName(search) {
  const raw = new URLSearchParams(search).get('c');
  if (!raw) return null;
  const clean = Array.from(raw)
    .filter((ch) => ch.charCodeAt(0) > 31 && ch !== '\u007F' && ch !== '<' && ch !== '>')
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
  // Por caracteres, no por unidades UTF-16, para no partir emojis ni tildes compuestas
  const short = Array.from(clean).slice(0, CLINIC_MAX).join('').trim();
  return short || null;
}

export function fillClinic(text, name) {
  return text.replaceAll('{clinica}', name);
}
