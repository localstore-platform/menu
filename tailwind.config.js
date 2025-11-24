/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Vietnamese-inspired color palette
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD1C2',
          300: '#FFB19A',
          400: '#FF8B66',
          500: '#FF6B35',
          600: '#E64D1A',
          700: '#C23A0F',
          800: '#992E0C',
          900: '#70220A',
        },
        secondary: {
          DEFAULT: '#004E89',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B0FF',
          400: '#3396FF',
          500: '#007BFF',
          600: '#0062CC',
          700: '#004E89',
          800: '#003B66',
          900: '#002844',
        },
        accent: {
          DEFAULT: '#F7931E',
          50: '#FFF8ED',
          100: '#FFEFD6',
          200: '#FFE0AD',
          300: '#FFCF7F',
          400: '#FFBD4D',
          500: '#F7931E',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        // Mobile-first font sizes (minimum 16px)
        base: ['16px', { lineHeight: '1.5' }],
        lg: ['18px', { lineHeight: '1.5' }],
        xl: ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['30px', { lineHeight: '1.2' }],
        '4xl': ['36px', { lineHeight: '1.1' }],
      },
      spacing: {
        // Touch-friendly spacing (44x44px minimum)
        touch: '44px',
      },
      maxWidth: {
        menu: '480px', // Mobile-optimized max width
      },
    },
  },
  plugins: [],
};
