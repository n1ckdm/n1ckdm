/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'light': '#ECC9C7',
        'light-accent': '#D5AD46',
        'main': '#6A858D',
        'dark-accent': '#6F7082',
        'dark': '#512D3D'
      }
    },
  },
  plugins: [],
};
