/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          base: '#F7F3ED',
          secondary: '#EDE4D8',
          navy: '#FFFCF7',
          dark: '#141210',
          darkSecondary: '#1C1917',
          darkCard: '#24201D',
        },
        accent: {
          DEFAULT: '#A8875A',
          light: '#C4A67B',
          glow: 'rgba(168, 135, 90, 0.16)',
        },
        content: {
          heading: '#292522',
          body: '#5F5750',
          secondary: '#7D736A',
          muted: '#9B9187',
          darkHeading: '#F5EFEB',
          darkBody: '#D1C8C0',
          darkSecondary: '#9E9389',
        },
        card: {
          bg: '#FFFCF7',
          hover: '#FAF6EE',
          darkBg: '#24201D',
          darkHover: '#2D2824',
        },
        stroke: {
          subtle: '#DED3C5',
          hover: '#A8875A',
          darkSubtle: '#38332E',
        }
      },
      fontFamily: {
        sans: ['"Times New Roman"', 'Times', 'serif'],
        display: ['"Times New Roman"', 'Times', 'serif'],
        mono: ['"Times New Roman"', 'Times', 'serif'],
        serif: ['"Times New Roman"', 'Times', 'serif'],
        clean: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(41, 37, 34, 0.05)',
        'lift': '0 12px 28px -4px rgba(41, 37, 34, 0.08)',
        'accent-subtle': '0 0 20px rgba(168, 135, 90, 0.15)',
        'accent-glow': '0 0 30px rgba(168, 135, 90, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
