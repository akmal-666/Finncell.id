/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050505',
          cardDark: '#111111',
          surfaceDark: '#1A1A1A',
          light: '#FFFFFF',
          bgLight: '#F7F7F7',
          textPrimary: '#111111',
          textSecondary: '#6B7280',
          accent: '#E7B65A',
          accentDark: '#B88632',
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
