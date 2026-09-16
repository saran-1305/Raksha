/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000', // full black
        panel: '#000000', // solid black for all blocks
        primary: '#FFD700', // true gold/yellow
        secondary: '#00e5ff', // cyan/teal
        success: '#00ff88', // neon green
        danger: '#ff3333', // critical red
        warning: '#ff9900', // high orange
        caution: '#ffcc00', // moderate yellow
        safe: '#00cc66', // safer green
        border: 'rgba(0, 229, 255, 0.25)', // slightly more prominent cyan borders
        textMuted: '#8b9bb4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
