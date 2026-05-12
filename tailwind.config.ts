import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/features/**/*.{ts,tsx,mdx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem'
      },
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      colors: {
        // Core luxury palette — drives the entire system
        obsidian: {
          50: '#f5f4f1',
          100: '#e7e4dc',
          200: '#c7c1b1',
          300: '#8b8778',
          400: '#524f47',
          500: '#2b2a26',
          600: '#1c1b18',
          700: '#141310',
          800: '#0d0c0a',
          900: '#060605',
          950: '#020202'
        },
        walnut: {
          50: '#f7efe4',
          100: '#eddcc2',
          200: '#d9b98a',
          300: '#b8905a',
          400: '#8f6a3c',
          500: '#6b4e2a',
          600: '#4e3820',
          700: '#362618',
          800: '#221810',
          900: '#120b07'
        },
        bronze: {
          50: '#fbf1e2',
          100: '#f4dcb3',
          200: '#e6bd7a',
          300: '#cf9a4f',
          400: '#b57d34',
          500: '#8f5f24',
          600: '#6a461b',
          700: '#4a3013',
          800: '#2c1c0b'
        },
        gold: {
          DEFAULT: '#c9a24a',
          50: '#fbf4de',
          100: '#f3e3a8',
          200: '#e6c86c',
          300: '#d2ac4a',
          400: '#b88d33',
          500: '#966e22',
          600: '#6e4f18',
          700: '#463110',
          800: '#241808'
        },
        cream: {
          50: '#fbf7ee',
          100: '#f4ecd9',
          200: '#e7d6af',
          300: '#d4bb83',
          400: '#b89a63',
          500: '#8e7549'
        },
        ink: '#0a0907',
        parchment: '#efe7d4',
        // Semantic aliases (ShadCN-compatible)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace']
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
        hero: ['clamp(3.25rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        display: ['clamp(2.5rem, 6vw, 5.75rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }]
      },
      letterSpacing: {
        luxe: '0.22em'
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '14px',
        xl: '20px'
      },
      boxShadow: {
        luxe: '0 40px 80px -32px rgba(0,0,0,0.7), 0 8px 24px -12px rgba(201,162,74,0.15)',
        bevel: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)',
        glow: '0 0 0 1px rgba(201,162,74,0.35), 0 10px 40px -10px rgba(201,162,74,0.35)'
      },
      backgroundImage: {
        'noise': "url('/textures/noise.svg')",
        'grain': 'radial-gradient(transparent, rgba(0,0,0,0.25))',
        'gold-line': 'linear-gradient(90deg, transparent, rgba(201,162,74,0.6), transparent)',
        'walnut-grain':
          'radial-gradient(1200px 600px at 30% 20%, rgba(184,144,90,0.15), transparent 60%), radial-gradient(800px 400px at 80% 80%, rgba(107,78,42,0.18), transparent 60%)',
        'cinema-vignette':
          'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)'
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        cinema: 'cubic-bezier(0.83, 0, 0.17, 1)'
      },
      keyframes: {
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,74,0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201,162,74,0)' }
        }
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 45s linear infinite',
        'pulse-gold': 'pulse-gold 2.2s ease-out infinite'
      }
    }
  },
  plugins: [animate]
};

export default config;
