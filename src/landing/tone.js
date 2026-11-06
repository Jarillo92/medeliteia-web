// Tono visual de cada landing. Cada componente define un mapa { dark, warm } con sus clases.
// `dark` es el aspecto de siempre (el de todos los sectores); `warm` (crema + cobre) lo activa solo
// sector.theme === 'warm' (hoy, dental). Un sector sin `theme` genera exactamente el mismo HTML que antes.
export const pickTone = (sector, tones) => tones[sector.theme] || tones.dark;
