import base from './tailwind.config.js'

/** Tailwind de las landings: mismo tema que la web, solo con las clases que usan las landings. */
/** @type {import('tailwindcss').Config} */
export default {
  ...base,
  content: ['./landing.html', './src/landing/**/*.{js,jsx}', './src/landings/**/*.{js,jsx}'],
  theme: {
    ...base.theme,
    extend: {
      ...base.theme.extend,
      colors: {
        ...base.theme.extend.colors,
        // Acento de cada sector: variables CSS en el contenedor de la landing (canales RGB).
        // DEFAULT = texto e iconos sobre fondo oscuro; solid/on = botones y burbujas; deep = campo de color; ink = texto sobre la sección clara.
        sector: {
          DEFAULT: 'rgb(var(--sector) / <alpha-value>)',
          solid: 'rgb(var(--sector-solid) / <alpha-value>)',
          on: 'rgb(var(--sector-on) / <alpha-value>)',
          deep: 'rgb(var(--sector-deep) / <alpha-value>)',
          ink: 'rgb(var(--sector-ink) / <alpha-value>)',
        },
        // Sección clara de cada landing (cómo funciona y preguntas)
        paper: {
          DEFAULT: '#F1F4F9',
          card: '#FFFFFF',
          line: '#D5DCE8',
          ink: '#0B1220',
          muted: '#475066',
        },
      },
    },
  },
}
