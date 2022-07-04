module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom': '#9b8027',
        'enquire':'#f0e5d0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
