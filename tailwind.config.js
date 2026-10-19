/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: '#060A08',
          secondary: '#0B1310',
          navy: '#111C18',
        },
        accent: {
          DEFAULT: '#10B981',
          light: '#34D399',
          glow: 'rgba(16, 185, 129, 0.18)',
        },
        content: {
          heading: '#F2FDF7',
          body: '#CFDDD6',
          secondary: '#93A79E',
          muted: '#647870',
        },
        card: {
          bg: 'rgba(17, 28, 24, 0.65)',
          hover: 'rgba(23, 38, 32, 0.85)',
        },
        stroke: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(52, 211, 153, 0.45)',
        }
      },
      fontFamily: {
        sans: ['"Times New Roman"', 'Times', 'serif'],
        display: ['"Times New Roman"', 'Times', 'serif'],
        mono: ['"Times New Roman"', 'Times', 'serif'],
        serif: ['"Times New Roman"', 'Times', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'lift': '0 14px 32px -4px rgba(0, 0, 0, 0.7)',
        'accent-subtle': '0 0 24px rgba(16, 185, 129, 0.20)',
        'accent-glow': '0 0 35px rgba(16, 185, 129, 0.35)',
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
