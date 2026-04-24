/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: '#1A0A0A',
          900: '#2D0F0F',
          800: '#5C2222',
          700: '#7D3333',
          DEFAULT: '#8B3A3A',
          600: '#9E4747',
          500: '#B35858',
          400: '#C87070',
          300: '#DDA0A0',
          200: '#ECC8C8',
          100: '#F7EDED',
          50:  '#FDF6F6',
        },
        charcoal: {
          DEFAULT: '#2D3436',
          light:   '#636E72',
          lighter: '#B2BEC3',
        },
        forest: {
          800: '#1B4332',
          700: '#2D6A4F',
          50:  '#F0FBF3',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
        serif:   ['"Crimson Text"',     'Georgia', '"Times New Roman"', 'serif'],
        sans:    ['Inter',              'system-ui', 'sans-serif'],
        quote:   ['Merriweather',       'Georgia', 'serif'],
        ui:      ['Poppins',            'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'h1':      ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.005em' }],
        'h2':      ['2rem',   { lineHeight: '1.2' }],
        'h3':      ['1.5rem', { lineHeight: '1.3' }],
        'h4':      ['1.25rem',{ lineHeight: '1.35' }],
      },
      letterSpacing: {
        'widest-ui': '0.12em',
        'wide-ui':   '0.06em',
      },
      lineHeight: {
        'reading': '1.75',
        'elegant': '1.6',
      },
      boxShadow: {
        'classic':    '0 1px 6px rgba(0,0,0,0.06)',
        'classic-md': '0 4px 16px rgba(0,0,0,0.08)',
        'classic-lg': '0 8px 32px rgba(0,0,0,0.10)',
        'inset-top':  'inset 0 2px 0 #8B3A3A',
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
