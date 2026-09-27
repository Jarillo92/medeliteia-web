import { useEffect, useState } from 'react'

export const MESSAGES = [
  { from: 'patient', text: 'Hola, ¿tenéis hueco para una revisión mañana por la tarde?', time: '19:42' },
  { from: 'agent', text: '¡Hola! Sí: mañana tengo libre a las 16:30 y a las 18:00. ¿Cuál te va mejor?', time: '19:42' },
  { from: 'patient', text: 'A las 18:00, perfecto.', time: '19:43' },
  { from: 'agent', text: 'Listo, te la dejo reservada. Te enviaré un recordatorio unas horas antes.', time: '19:43' },
];

// Momentos (ms) en los que avanza la conversación; al final vuelve a empezar
const TIMELINE = [
  { at: 500, visible: 1 },
  { at: 1300, typing: true },
  { at: 2600, visible: 2 },
  { at: 4200, visible: 3 },
  { at: 5000, typing: true },
  { at: 6300, visible: 4 },
  { at: 7100, confirmed: true },
];
const LOOP_MS = 11500;

const FINAL_STATE = { visible: MESSAGES.length, typing: false, confirmed: true };
const INITIAL_STATE = { visible: 0, typing: false, confirmed: false };

/**
 * Estado de la conversación de demostración.
 * - playing=false la congela donde esté (p. ej. fuera de pantalla).
 * - static=true muestra la conversación completa, sin animar (movimiento reducido).
 */
export function useConversation({ playing = true, static: isStatic = false } = {}) {
  const [state, setState] = useState(isStatic ? FINAL_STATE : INITIAL_STATE);

  useEffect(() => {
    if (isStatic) {
      setState(FINAL_STATE);
      return undefined;
    }
    if (!playing) return undefined;

    let timers = [];
    const run = () => {
      setState(INITIAL_STATE);
      timers = TIMELINE.map((step) =>
        setTimeout(() => {
          setState((prev) => ({
            visible: step.visible ?? prev.visible,
            typing: Boolean(step.typing),
            confirmed: step.confirmed ?? prev.confirmed,
          }));
        }, step.at)
      );
      timers.push(setTimeout(run, LOOP_MS));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [playing, isStatic]);

  return state;
}
