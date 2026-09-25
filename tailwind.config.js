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
          DEFAULT: '#0F172A', // Texto principal (mismo tono que "Elite IA" en el logo)
          soft: '#334155',    // Texto de apoyo fuerte
        },
        muted: '#475569',     // Párrafos y descripciones
        subtle: '#64748B',    // Metadatos, solo sobre blanco o en tamaños grandes
        ground: '#F5F7FA',    // Fondo de página
        surface: '#FFFFFF',   // Tarjetas y paneles
        line: '#E3E8EF',      // Bordes y separadores
        accent: {
          DEFAULT: '#2563EB', // Azul del logo: único color de acción
          strong: '#1D4ED8',  // Hover / pulsado
          soft: '#EAF1FF',    // Fondos suaves de acento
          deep: '#0B2A66',    // Campo de color para bloques destacados
        },
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.05), 0 8px 24px -12px rgba(15, 23, 42, 0.12)',
        lift: '0 2px 4px rgba(15, 23, 42, 0.06), 0 24px 48px -20px rgba(15, 23, 42, 0.28)',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
}
