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
          base: '#F7F3ED',
          secondary: '#EDE4D8',
          navy: '#FFFCF7',
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
        },
        card: {
          bg: '#FFFCF7',
          hover: '#FAF6EE',
        },
        stroke: {
          subtle: '#DED3C5',
          hover: '#A8875A',
        }
      },
      fontFamily: {
        sans: ['"Times New Roman"', 'Times', 'serif'],
        display: ['"Times New Roman"', 'Times', 'serif'],
        mono: ['"Times New Roman"', 'Times', 'serif'],
        serif: ['"Times New Roman"', 'Times', 'serif'],
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
