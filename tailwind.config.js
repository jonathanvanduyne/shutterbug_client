module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Your light mode styles here
    },
    darkSelector: '.dark-mode', // Specify the dark mode selector
    darkMode: ['class', '[data-mode="dark"]'], // Use the 'class' mode
  },
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
