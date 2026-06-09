/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,scss}'],
  theme: {
    extend: {
      colors: {
        midnight: '#FFFFFF',
        deep: '#F3F7FC',
        surface: '#F8FAFD',
        /** Azul APA — botones primarios y enlaces */
        accent: '#1A3F8C',
        accentLight: '#06B6D4',
        brand: {
          DEFAULT: '#1A3F8C',
          dark: '#152F6A',
          light: '#2563EB',
          50: '#EEF4FF',
          100: '#D9E6FF',
          200: '#B8CCF5',
        },
        flow: {
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
          light: '#A5F3FC',
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
        },
        cream: '#FFFFFF',
        ink: '#0A0A0A',
        'ink-secondary': '#404040',
        'ink-muted': '#737373',
        'ink-faint': '#A3A3A3',
        line: '#E2E8F0',
        'line-strong': '#CBD5E1',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        wp: '9999px',
        'wp-lg': '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(26, 63, 140, 0.06), 0 12px 32px rgba(26, 63, 140, 0.05)',
        lift: '0 8px 28px rgba(26, 63, 140, 0.12), 0 2px 8px rgba(26, 63, 140, 0.06)',
        flow: '0 4px 20px rgba(6, 182, 212, 0.2)',
        'btn-primary': '0 4px 14px rgba(26, 63, 140, 0.28), 0 1px 3px rgba(26, 63, 140, 0.12)',
        'btn-primary-hover': '0 6px 20px rgba(26, 63, 140, 0.35)',
        card: '0 2px 12px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(26, 63, 140, 0.06)',
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(165deg, #EEF4FF 0%, #FFFFFF 38%, #ECFEFF 100%)',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(6, 182, 212, 0.12) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 10%, rgba(26, 63, 140, 0.1) 0%, transparent 50%)',
        'section-brand': 'linear-gradient(180deg, #EEF4FF 0%, #F8FAFD 100%)',
        'section-flow': 'linear-gradient(180deg, #ECFEFF 0%, #F3F7FC 100%)',
        'btn-brand': 'linear-gradient(180deg, #2563EB 0%, #1A3F8C 100%)',
      },
    },
  },
  plugins: [],
};
