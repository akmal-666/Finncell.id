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
        navy: {
          deep: '#061426',
          secondary: '#0B1F3A',
        },
        accentBlue: {
          DEFAULT: '#1769E0',
          light: '#5EA7FF',
          bg: '#EAF2FC',
        },
        surface: {
          bg: '#F7F9FC',
          border: '#DCE5EF',
          dark: '#05070A',
        },
        brand: {
          dark: '#061426',
          secondaryNavy: '#0B1F3A',
          light: '#FFFFFF',
          bgLight: '#F7F9FC',
          textPrimary: '#0B1F3A',
          textSecondary: '#64748B',
          accent: '#1769E0',
          accentLight: '#5EA7FF',
          border: '#DCE5EF',
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
};
