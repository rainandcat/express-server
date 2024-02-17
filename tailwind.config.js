/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#415A77',
        secondary: '#1B263B',
        backgroundColor:'#E0E1DD',
        menuColor:'#0D1B2A',
        tableColor:'#778DA9'
      },
      lineHeight: {
        '11': '3rem',
        '12': '4rem',
        '13': '5rem',
        '14': '6rem',
       }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['visited'],
    },
  },
  plugins: [],
}

