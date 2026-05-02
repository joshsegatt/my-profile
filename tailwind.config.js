/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#09090B',
          window: '#0D0D0D',
          card: '#1A1A1A',
          yellow: '#FFC107',
          textPrimary: '#FAFAFA',
          textSecondary: '#A1A1AA',
          textTertiary: '#52525B',
          paintRed: '#D946EF',
          paintCyan: '#22D3EE',
          paintYellow: '#FDE047',
          paintOrange: '#8B5CF6',
          codeGray: '#27272A',
          // Adding brand-yellow for common utility usage
          'yellow/50': 'rgba(255, 193, 7, 0.5)',
          'yellow/60': 'rgba(255, 193, 7, 0.6)',
          'yellow/30': 'rgba(255, 193, 7, 0.3)',
        }
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
