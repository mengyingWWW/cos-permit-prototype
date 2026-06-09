/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        seattle: {
          50:  '#f0f4fb',
          100: '#dde8f5',
          200: '#b9d0ea',
          300: '#86aedb',
          400: '#4f87c9',
          500: '#2d6ab4',
          600: '#1d5299',
          700: '#1a4380',
          800: '#1a3668',
          900: '#1b2f56',
          950: '#0f1d38',
        },
        ai: {
          50:  '#f0fbff',
          100: '#dff5fe',
          200: '#b8ecfe',
          300: '#79dcfd',
          400: '#33c4f9',
          500: '#0aacec',
          600: '#0089ca',
          700: '#016da4',
          800: '#065b87',
          900: '#0b4c70',
        },
      },
    },
  },
  plugins: [],
};
