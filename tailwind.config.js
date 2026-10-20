/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-core': '#0B1020',
        'accent-tech': '#16D8E3',
        'accent-strat': '#A58CFF',
        'accent-crisis': '#FF6478',
        'accent-warn': '#F5C66D',
      },
      fontFamily: {
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        vt: ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [],
}
