/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raksha: {
          900: '#050505',
          800: '#080808',
          700: '#0D0D0D',
          text: '#FFFFFF',
          textMuted: '#EAEAEA',
          accent: '#00E5FF',
          accentLight: '#84FFFF',
          accentLighter: '#B2EBF2',
          hazard: '#FF5A36',
          safe: '#00E5FF'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'plex-mono': ['IBM Plex Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
