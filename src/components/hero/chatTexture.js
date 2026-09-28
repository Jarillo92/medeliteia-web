import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MESSAGES } from './useConversation'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './ChatScreen'

// Pantalla del chat dibujada en un lienzo 2D y aplicada como textura sobre el móvil 3D:
// va pegada al cristal y gira con él. Mismo diseño que ChatScreen.jsx (versión HTML).
const S = 2.5; // resolución de la textura respecto a los px de diseño
const W = SCREEN_WIDTH;
const H = SCREEN_HEIGHT;
const FONT = '"Bricolage Grotesque Variable", system-ui, sans-serif';
const ENTER_MS = 380;

// Iconos de lucide (viewBox 24)
const ICONS = {
  chevronLeft: ['m15 18-6-6 6-6'],
  video: ['m22 8-6 4 6 4V8Z', 'M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'],
  mic: ['M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z', 'M19 10v2a7 7 0 0 1-14 0v-2', 'M12 19v3'],
  checkCheck: ['M18 6 7 17l-5-5', 'm22 10-7.5 7.5L13 16'],
  calendarCheck: ['M8 2v4', 'M16 2v4', 'M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8', 'M3 10h18', 'm16 20 2 2 4-4'],
};
const iconPaths = {};

function icon(ctx, name, x, y, size, color, width = 2) {
  if (!iconPaths[name]) iconPaths[name] = ICONS[name].map((d) => new Path2D(d));
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  iconPaths[name].forEach((p) => ctx.stroke(p));
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  const [tl, tr, br, bl] = Array.isArray(r) ? r : [r, r, r, r];
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.arcTo(x + w, y, x + w, y + h, tr);
  ctx.arcTo(x + w, y + h, x, y + h, br);
  ctx.arcTo(x, y + h, x, y, bl);
  ctx.arcTo(x, y, x + w, y, tl);
  ctx.closePath();
}

function wrap(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const easeOut = (p) => 1 - Math.pow(1 - p, 3);

// Aparición de un elemento: sube 10 px y gana opacidad
function enter(ctx, appearedAt, now) {
  const p = appearedAt == null ? 1 : Math.min(1, Math.max(0, (now - appearedAt) / ENTER_MS));
  const e = easeOut(p);
  ctx.globalAlpha = e;
  return (1 - e) * 10;
}

function drawChat(ctx, { visible, typing, confirmed }, appear, now) {
  ctx.setTransform(S, 0, 0, S, 0, 0);
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#070B12';
  ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = 'alphabetic';

  // Barra de estado con isla
  ctx.fillStyle = '#E6EBF3';
  ctx.font = `600 12px ${FONT}`;
  ctx.fillText('19:43', 30, 29);
  ctx.fillStyle = '#000';
  roundRect(ctx, W / 2 - 44, 12, 88, 24, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(230,235,243,0.8)';
  ctx.lineWidth = 1;
  roundRect(ctx, W - 50, 20.5, 20, 10, 3);
  ctx.stroke();
  ctx.fillStyle = 'rgba(230,235,243,0.85)';
  roundRect(ctx, W - 48, 22.5, 13, 6, 1.5);
  ctx.fill();

  // Cabecera del chat
  const headY = 44;
  ctx.fillStyle = '#0B111B';
  ctx.fillRect(0, headY, W, 58);
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, headY + 58, W, 1);
  icon(ctx, 'chevronLeft', 10, headY + 19, 20, '#7FA8FF');
  const grad = ctx.createLinearGradient(40, headY + 11, 76, headY + 47);
  grad.addColorStop(0, '#2F6BFF');
  grad.addColorStop(1, '#1A3FA8');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(58, headY + 29, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `700 12px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('CS', 58, headY + 33.5);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#EDF1F7';
  ctx.font = `600 15px ${FONT}`;
  ctx.fillText('Clínica Sonrisa', 86, headY + 27);
  ctx.fillStyle = '#7FA8FF';
  ctx.font = `400 11.5px ${FONT}`;
  ctx.fillText(typing ? 'escribiendo…' : 'en línea', 86, headY + 43);
  icon(ctx, 'video', W - 62, headY + 20, 18, '#7FA8FF');
  icon(ctx, 'phone', W - 30, headY + 21, 16, '#7FA8FF');

  // Mensajes
  let y = headY + 59 + 14;
  ctx.font = `400 11px ${FONT}`;
  const hoyW = ctx.measureText('Hoy').width + 16;
  ctx.fillStyle = '#101826';
  roundRect(ctx, W / 2 - hoyW / 2, y, hoyW, 18, 5);
  ctx.fill();
  ctx.fillStyle = '#8A96AB';
  ctx.textAlign = 'center';
  ctx.fillText('Hoy', W / 2, y + 13);
  ctx.textAlign = 'left';
  y += 18 + 12;

  const pad = 12;
  const maxBubble = (W - pad * 2) * 0.84;
  const lineH = 20;

  MESSAGES.slice(0, visible).forEach((msg, i) => {
    const isPatient = msg.from === 'patient';
    ctx.font = `400 14.5px ${FONT}`;
    const lines = wrap(ctx, msg.text, maxBubble - 24);
    ctx.font = `400 10.5px ${FONT}`;
    const stampW = ctx.measureText(msg.time).width + (isPatient ? 16 : 0) + 8;
    ctx.font = `400 14.5px ${FONT}`;
    const lastW = ctx.measureText(lines[lines.length - 1]).width;
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
    const stampInline = lastW + stampW <= maxBubble - 24;
    const textW = Math.max(widest, stampInline ? lastW + stampW : stampW);
    const bw = Math.min(maxBubble, textW + 24);
    const bh = lines.length * lineH + (stampInline ? 0 : 16) + 14;
    const bx = isPatient ? W - pad - bw : pad;

    const dy = enter(ctx, appear[`m${i}`], now);
    const by = y + dy;
    ctx.fillStyle = isPatient ? '#1D4ED8' : '#1A2334';
    roundRect(ctx, bx, by, bw, bh, isPatient ? [16, 16, 6, 16] : [16, 16, 16, 6]);
    ctx.fill();
    if (isPatient) {
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(bx + 12, by, bw - 24, 1);
    }
    ctx.fillStyle = isPatient ? '#FFFFFF' : '#E9EEF6';
    lines.forEach((l, li) => ctx.fillText(l, bx + 12, by + 22 + li * lineH));

    // Hora y doble check
    const stampY = stampInline ? by + 22 + (lines.length - 1) * lineH : by + 22 + lines.length * lineH - 2;
    const stampX = bx + bw - 12 - stampW + 8;
    ctx.font = `400 10.5px ${FONT}`;
    ctx.fillStyle = isPatient ? '#BFD1FF' : '#8A96AB';
    ctx.fillText(msg.time, stampX, stampY);
    if (isPatient) icon(ctx, 'checkCheck', stampX + ctx.measureText(msg.time).width + 3, stampY - 9, 12, '#BFD1FF');

    ctx.globalAlpha = 1;
    y += bh + 8;
  });

  // Indicador "escribiendo"
  if (typing) {
    const dy = enter(ctx, appear.typing, now);
    ctx.fillStyle = '#1A2334';
    roundRect(ctx, pad, y + dy, 58, 34, [16, 16, 16, 6]);
    ctx.fill();
    for (let d = 0; d < 3; d++) {
      const phase = ((now / 900) - d * 0.155) % 1;
      const bounce = phase < 0.5 ? Math.sin(phase * Math.PI * 2) * 4 : 0;
      ctx.fillStyle = '#8A96AB';
      ctx.beginPath();
      ctx.arc(pad + 17 + d * 12, y + dy + 17 - bounce, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    y += 42;
  }

  // Tarjeta de cita confirmada
  if (confirmed) {
    const dy = enter(ctx, appear.confirmed, now);
    const cw = maxBubble;
    const cy = y + 4 + dy;
    ctx.fillStyle = '#0C1A36';
    roundRect(ctx, pad, cy, cw, 84, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(47,107,255,0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();
    icon(ctx, 'calendarCheck', pad + 12, cy + 12, 16, '#9CBBFF');
    ctx.fillStyle = '#9CBBFF';
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText('Cita confirmada', pad + 36, cy + 25);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 15px ${FONT}`;
    ctx.fillText('Revisión dental', pad + 12, cy + 52);
    ctx.fillStyle = '#AFC0DE';
    ctx.font = `400 13px ${FONT}`;
    ctx.fillText('Mañana, 18:00', pad + 12, cy + 71);
    ctx.globalAlpha = 1;
  }

  // Barra de escritura
  const barY = H - 20 - 38;
  ctx.fillStyle = '#121A27';
  roundRect(ctx, 10, barY, W - 20 - 46, 38, 19);
  ctx.fill();
  ctx.fillStyle = '#6E7A8F';
  ctx.font = `400 12.5px ${FONT}`;
  ctx.fillText('Mensaje', 26, barY + 23.5);
  ctx.fillStyle = '#2F6BFF';
  ctx.beginPath();
  ctx.arc(W - 10 - 18, barY + 19, 18, 0, Math.PI * 2);
  ctx.fill();
  icon(ctx, 'mic', W - 10 - 26, barY + 11, 16, '#FFFFFF');
}

/**
 * Textura del chat que se actualiza con la conversación.
 * Solo se redibuja mientras hay algo animándose (entradas o "escribiendo").
 */
export function useChatTexture(conversation) {
  const canvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = W * S;
    c.height = H * S;
    return c;
  }, []);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, [canvas]);
  const appear = useRef({});
  const dirty = useRef(true);
  const first = useRef(true);

  // Momento en que aparece cada elemento; los del arranque ya están, sin animar
  useEffect(() => {
    const now = first.current ? -Infinity : performance.now();
    first.current = false;
    const a = appear.current;
    for (let i = 0; i < MESSAGES.length; i++) {
      if (i < conversation.visible) a[`m${i}`] ??= now;
      else delete a[`m${i}`];
    }
    if (conversation.typing) a.typing ??= now;
    else delete a.typing;
    if (conversation.confirmed) a.confirmed ??= now;
    else delete a.confirmed;
    dirty.current = true;
  }, [conversation.visible, conversation.typing, conversation.confirmed]);

  // Redibujar cuando la tipografía termine de cargar
  useEffect(() => {
    let alive = true;
    Promise.all([
      document.fonts.load(`400 14px ${FONT}`),
      document.fonts.load(`600 14px ${FONT}`),
      document.fonts.load(`700 14px ${FONT}`),
    ]).then(() => {
      if (alive) dirty.current = true;
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(() => {
    const now = performance.now();
    const animating =
      conversation.typing || Object.values(appear.current).some((t) => now - t < ENTER_MS + 50);
    if (!dirty.current && !animating) return;
    dirty.current = false;
    drawChat(canvas.getContext('2d'), conversation, appear.current, now);
    texture.needsUpdate = true;
  });

  return texture;
}
