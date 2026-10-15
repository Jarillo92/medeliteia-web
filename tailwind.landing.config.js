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
        // Acento de cada sector: variable CSS --sector en el contenedor de la landing (canales RGB)
        sector: 'rgb(var(--sector) / <alpha-value>)',
      },
    },
  },
}
