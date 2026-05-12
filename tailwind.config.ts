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
        /* ══════════════════════════════════════════════════════════════
           LIGHT LUXURY EDITORIAL PALETTE
           porcelain · ivory · sand · walnut · champagne · ink
           ══════════════════════════════════════════════════════════════ */
        porcelain: {
          50: '#ffffff',
          100: '#fbf9f6',
          200: '#f5f1ea',
          300: '#ede7dc',
          400: '#e0d7c7',
          500: '#cdc1ab',
          600: '#aa9a81',
          700: '#7c6f5b',
          800: '#4a4335',
          900: '#29251d'
        },
        ivory: {
          50: '#fdfcf9',
          100: '#faf6ee',
          200: '#f3ecdf',
          300: '#e9dec9',
          400: '#d8c7a8',
          500: '#c0a77e',
          600: '#a1895f'
        },
        sand: {
          50: '#f8f3ea',
          100: '#ede3ce',
          200: '#ddc9a3',
          300: '#c9ab77',
          400: '#b4904f',
          500: '#9a7838',
          600: '#7a5c29'
        },
        walnut: {
          50: '#faf4ec',
          100: '#ecdcc3',
          200: '#d6b88b',
          300: '#b88f58',
          400: '#8f6a3c',
          500: '#6b4e2a',
          600: '#4e3820',
          700: '#362618',
          800: '#221810',
          900: '#120b07'
        },
        champagne: {
          DEFAULT: '#c8a96a',
          50: '#fbf4de',
          100: '#f3e3a8',
          200: '#e6c86c',
          300: '#c8a96a',
          400: '#a88947',
          500: '#8b6f31',
          600: '#6e5820',
          700: '#4a3a16'
        },
        pewter: {
          50: '#f3f1ec',
          100: '#e2ddd3',
          200: '#c3bcae',
          300: '#9d9587',
          400: '#75705f',
          500: '#54503f',
          600: '#3a382b',
          700: '#23211a',
          800: '#121008'
        },
        /* Legacy aliases kept so existing class strings remain valid. */
        obsidian: {
          50: '#fbf9f6',
          100: '#f5f1ea',
          200: '#ede7dc',
          300: '#c3bcae',
          400: '#75705f',
          500: '#3a382b',
          600: '#e0d7c7',
          700: '#23211a',
          800: '#121008',
          900: '#0a0907',
          950: '#050403'
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
          DEFAULT: '#c8a96a',
          50: '#fbf4de',
          100: '#f3e3a8',
          200: '#e6c86c',
          300: '#c8a96a',
          400: '#a88947',
          500: '#8b6f31',
          600: '#6e5820',
          700: '#463110',
          800: '#241808'
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf6ee',
          200: '#4a4335',
          300: '#29251d',
          400: '#23211a',
          500: '#121008'
        },
        ink: '#23211a',
        parchment: '#faf6ee',
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
        luxe: '0 30px 60px -24px rgba(74, 67, 53, 0.22), 0 8px 24px -12px rgba(200, 169, 106, 0.18)',
        editorial:
          '0 50px 100px -40px rgba(37, 32, 23, 0.28), 0 20px 40px -20px rgba(74, 67, 53, 0.16)',
        soft:
          '0 2px 4px rgba(74, 67, 53, 0.04), 0 12px 28px -12px rgba(74, 67, 53, 0.14)',
        bevel:
          'inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(74,67,53,0.08)',
        glow: '0 0 0 1px rgba(200,169,106,0.45), 0 18px 40px -10px rgba(200,169,106,0.30)'
      },
      backgroundImage: {
        'noise': "url('/textures/noise.svg')",
        'grain': 'radial-gradient(transparent, rgba(74,67,53,0.08))',
        'gold-line': 'linear-gradient(90deg, transparent, rgba(200,169,106,0.6), transparent)',
        'ivory-paper':
          'radial-gradient(1200px 600px at 30% 20%, rgba(232,220,192,0.55), transparent 60%), radial-gradient(800px 400px at 80% 80%, rgba(200,169,106,0.18), transparent 60%), #faf6ee',
        'walnut-grain':
          'radial-gradient(1200px 600px at 30% 20%, rgba(184,144,90,0.12), transparent 60%), radial-gradient(800px 400px at 80% 80%, rgba(107,78,42,0.10), transparent 60%)',
        'cinema-vignette':
          'radial-gradient(ellipse at center, transparent 55%, rgba(74, 67, 53, 0.22) 100%)',
        'editorial-frame':
          'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,241,234,0.6) 100%)'
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
        'pulse-gold': 'pulse-gold 2.2s ease-out infinite',
        'spin-slow': 'spin 8s linear infinite'
      }
    }
  },
  plugins: [animate]
};

export default config;
