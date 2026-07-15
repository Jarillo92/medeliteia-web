/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#030712',      // Deep premium dark background
          graphite: '#080c14',  // Blue-graphite dark tone for cards
          cobalt: '#1d4ed8',    // Strong electric cobalt blue
          electric: '#2563eb',  // Bright hover electric blue
          silver: '#94a3b8',    // Muted silver for subtitles
          accent: '#38bdf8',    // Cyan glow accents
          border: 'rgba(255, 255, 255, 0.05)', // Border for glassmorphism
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
