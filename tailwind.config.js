const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: 'class', // Use the 'class' mode
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addBase, theme }) {
      addBase({
        '.glow-yellow': {
          filter: 'drop-shadow(0 0 6px yellow)',
          transition: 'transform 0.3s, filter 0.3s',
        },
      });
    },
  ],
};
