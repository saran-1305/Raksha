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
          accent: '#38bdf8',
          accentLight: '#7dd3fc',
          accentLighter: '#bae6fd',
          hazard: '#FF5A36',
          safe: '#38bdf8'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Poppins', 'Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'plex-mono': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
