/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#EDF1F7', // Texto principal
          soft: '#C3CCDA',    // Texto de apoyo fuerte
        },
        muted: '#96A1B4',     // Párrafos y descripciones
        subtle: '#6E7A8F',    // Metadatos y textos terciarios
        ground: '#05070C',    // Fondo de página (casi negro con matiz azul)
        surface: '#0A0E16',   // Paneles y tarjetas
        raised: '#101624',    // Superficie elevada (hover, elementos encima de paneles)
        line: '#1A2231',      // Bordes y separadores
        accent: {
          DEFAULT: '#5B8CFF', // Azul del logo para texto e iconos sobre oscuro
          solid: '#2F6BFF',   // Fondo de botones (contraste AA con texto blanco)
          strong: '#4A7DFF',  // Hover de botones
          bright: '#9CBBFF',  // Brillos y resaltes
          soft: '#0E1B38',    // Fondos suaves de acento
          deep: '#0A1633',    // Campo de color para bloques destacados
        },
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Borde de luz superior + sombra profunda: piezas con volumen sobre fondo oscuro
        soft: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 40px -24px rgba(0, 0, 0, 0.9)',
        lift: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 30px 60px -30px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.04)',
        button: 'inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px -8px rgba(47, 107, 255, 0.55)',
      },
      maxWidth: {
        prose: '65ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
