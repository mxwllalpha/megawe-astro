import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Mobile-first breakpoints for Indonesian devices
      screens: {
        'xs': '375px',    /* iPhone SE */
        'sm': '640px',    /* Standard mobile */
        'md': '768px',    /* Tablet */
        'lg': '1024px',   /* Desktop */
        'xl': '1280px',   /* Large desktop */
        '2xl': '1536px',  /* Extra large */
        'touch': 'hover', /* Touch-friendly hover alternative */
      },

      // Enhanced spacing for mobile and Indonesian content
      spacing: {
        '18': '4.5rem',    /* 72px - better mobile spacing */
        '88': '22rem',     /* 352px - social media cards */
        '104': '26rem',    /* 416px - optimized content */
        '112': '28rem',    /* 448px - max mobile width */
        '128': '32rem',    /* 512px - large mobile */
      },

      // Mobile-optimized typography for Indonesian text
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],   /* 10px */
        'xs': ['0.75rem', { lineHeight: '1rem' }],         /* 12px */
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],      /* 14px */
        'base': ['1rem', { lineHeight: '1.5rem' }],        /* 16px */
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],      /* 18px */
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],       /* 20px */
        '2xl': ['1.5rem', { lineHeight: '2rem' }],         /* 24px */
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],    /* 30px */
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],      /* 36px */
        '5xl': ['3rem', { lineHeight: '3rem' }],           /* 48px */
        '6xl': ['3.75rem', { lineHeight: '3.75rem' }],     /* 60px */
      },

      // Touch-friendly sizes following iOS HIG
      minHeight: {
        '44': '44px',  /* iOS HIG minimum touch target */
        '48': '48px',  /* Standard button height */
        '56': '56px',  /* Large touch target */
        '64': '64px',  /* Extra large touch target */
      },

      // Enhanced Indonesian color system
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',    /* Merah Indonesia - Primary */
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',    /* Hijau ekonomi - Secondary */
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22'
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',    /* Orange - Accent */
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407'
        },
        // Social media colors
        social: {
          whatsapp: '#25D366',
          linkedin: '#0077B5',
          facebook: '#1877F2',
          twitter: '#000000',
          telegram: '#2CA5E0',
          instagram: '#E4405F',
          tiktok: '#000000',
          youtube: '#FF0000'
        },
        // Indonesian national colors
        indonesia: {
          red: '#DC2626',      /* Merah Indonesia */
          white: '#FFFFFF',    /* Putih Indonesia */
          green: '#009739',    /* Hijau ekonomi */
          gold: '#FFD700',     /* Emas kemakmuran */
          ocean: '#0A6EBD',    /* Birau laut */
          earth: '#8B4513'     /* Cokelat tanah */
        }
      },

      // Enhanced animations for mobile performance
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-left': 'slideLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-right': 'slideRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'shake': 'shake 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },

      // Enhanced shadows for depth
      boxShadow: {
        'mobile': '0 2px 8px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'header': '0 2px 20px rgba(0, 0, 0, 0.1)',
        'social': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },

      // Enhanced border radius for mobile
      borderRadius: {
        'mobile': '0.75rem',
        'card': '1rem',
        'button': '0.5rem',
        'social': '0.75rem',
      }
    }
  },
  plugins: []
} satisfies Config