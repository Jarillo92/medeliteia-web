// Envío del formulario de acceso a /recursos.
// Pega aquí la URL del webhook de GoHighLevel. Mientras esté vacío no se envía nada
// (se avisa en consola) y el acceso se desbloquea igualmente.
export const FORM_ENDPOINT = '';

export const ORIGEN = 'redes';
export const ACCESS_KEY = 'medelite_recursos_acceso';

export function hasAccess() {
  try {
    return window.localStorage.getItem(ACCESS_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveAccess() {
  try {
    window.localStorage.setItem(ACCESS_KEY, '1');
  } catch {
    /* sin almacenamiento (modo privado): el acceso dura solo esta visita */
  }
}

// Nunca lanza: un fallo de red no debe bloquear el acceso a los recursos
export async function submitLead(data) {
  if (!FORM_ENDPOINT) {
    console.warn('[recursos] FORM_ENDPOINT está vacío: los datos no se han enviado.', data);
    return false;
  }
  try {
    // Formulario codificado: petición "simple", sin preflight CORS
    const body = new URLSearchParams(data);
    const res = await fetch(FORM_ENDPOINT, { method: 'POST', body, keepalive: true });
    if (!res.ok) console.warn('[recursos] El endpoint respondió', res.status);
    return res.ok;
  } catch (err) {
    console.warn('[recursos] No se pudo enviar el formulario:', err);
    return false;
  }
}
