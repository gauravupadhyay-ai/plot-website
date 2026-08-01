import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0A0A0A',
          secondary: '#0A0A0A',
          accent: '#525252',
          light: '#F2F3F5',
          surface: '#FFFFFF',
          muted: '#E8EAED',
          charcoal: '#0A0A0A',
          terracotta: '#0A0A0A',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#525252',
          muted: '#8A8F98',
        },
        border: '#E5E7EB',
        success: '#16A34A',
        warning: '#0A0A0A',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Outfit', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Space Mono', 'monospace'],
        display: ['var(--font-display)', 'Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(10,10,10,0.06)',
        'card-hover': '0 16px 48px rgba(10,10,10,0.10)',
        cta: '0 8px 24px rgba(10,10,10,0.18)',
        nav: '0 2px 16px rgba(10,10,10,0.06)',
        filter: '0 20px 60px rgba(10,10,10,0.14)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'pulse-ring': 'pulseRing 3s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0' },
          '50%': { transform: 'scale(1.5)', opacity: '0.4' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
