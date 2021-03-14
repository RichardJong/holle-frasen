module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'bounce-h': {
          '0% 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(3px)' },
        },
      },
      animation: {
        'bounce-h': 'bounce-h 1s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
