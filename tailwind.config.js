/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-gradient-to-r',
    'from-cyan-500',
    'to-blue-500',
    'from-orange-500',
    'to-pink-500',
  ],
}
