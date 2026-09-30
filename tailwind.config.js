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
          base: '#080A0F',
          secondary: '#0D1118',
          navy: '#111827',
        },
        accent: {
          DEFAULT: '#5B8CFF',
          light: '#7AA2FF',
          glow: 'rgba(91, 140, 255, 0.18)',
        },
        content: {
          heading: '#F5F7FA',
          body: '#D7DCE5',
          secondary: '#9AA4B2',
          muted: '#6F7A89',
        },
        card: {
          bg: 'rgba(17, 24, 39, 0.55)',
          hover: 'rgba(22, 32, 50, 0.75)',
        },
        stroke: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(91, 140, 255, 0.35)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'lift': '0 12px 30px -4px rgba(0, 0, 0, 0.6)',
        'accent-subtle': '0 0 24px rgba(91, 140, 255, 0.18)',
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
