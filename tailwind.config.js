/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0D2219',
          900: '#122D23',
          800: '#1B4332',
          700: '#2D6A4F',
          600: '#40916C',
          100: '#D8F3DC',
          50:  '#F0FBF3',
        },
        cream: {
          DEFAULT: '#F5F1E8',
          dark:    '#EDE8DC',
          darker:  '#E2DDD0',
        },
        burgundy: {
          900: '#3D1515',
          800: '#521D1D',
          700: '#6B2C2C',
          600: '#8B3A3A',
          100: '#F5E8E8',
          50:  '#FBF3F3',
        },
        gold: {
          DEFAULT: '#B8860B',
          dark:    '#8B6508',
          light:   '#D4A017',
          pale:    '#F0DCA0',
        },
        charcoal: {
          DEFAULT: '#2D3436',
          light:   '#636E72',
          lighter: '#B2BEC3',
        },
        paper: {
          DEFAULT: '#E8E6E1',
          dark:    '#D4D0C8',
        },
      },
      fontFamily: {
        serif:  ['"EB Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans:   ['Lato', '"Open Sans"', 'system-ui', 'sans-serif'],
        italic: ['"EB Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h1':      ['2.5rem',  { lineHeight: '1.2',  letterSpacing: '-0.005em' }],
        'h2':      ['2rem',    { lineHeight: '1.25' }],
        'h3':      ['1.5rem',  { lineHeight: '1.3' }],
        'h4':      ['1.25rem', { lineHeight: '1.35' }],
      },
      letterSpacing: {
        'widest-classic': '0.15em',
        'wide-classic':   '0.08em',
      },
      lineHeight: {
        'reading': '1.75',
        'elegant': '1.6',
      },
      boxShadow: {
        'classic':    '0 2px 8px rgba(27,67,50,0.08)',
        'classic-md': '0 4px 16px rgba(27,67,50,0.12)',
        'classic-lg': '0 8px 32px rgba(27,67,50,0.15)',
        'inset-top':  'inset 0 2px 0 #B8860B',
      },
      borderWidth: {
        '3': '3px',
      },
      maxWidth: {
        'reading': '70ch',
      },
    },
  },
  plugins: [],
}
