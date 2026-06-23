/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: '#0A0A0A',
          text: '#F5F5F5',
          gold: '#D4AF37',
          gray: '#1A1A1A',
          lightGray: '#8A8A8A',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-glow-strong': '0 0 30px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 60s linear infinite',
      }
    },
  },
  plugins: [],
}
