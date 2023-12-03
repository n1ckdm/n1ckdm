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
      },
      keyframes: {
        'bounce-left': {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'bounce-right': {
          '0%, 100%': {
            transform: 'translateX(25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'bounce-up': {
          '0%, 100%': {
            transform: 'translateY(25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        }
      },
      animation: {
        'bounce-left': 'bounce-left 1s infinite',
        'bounce-right': 'bounce-right 1s infinite',
        'bounce-up': 'bounce-up 1s infinite'
      }
    },
  },
  plugins: [],
};
