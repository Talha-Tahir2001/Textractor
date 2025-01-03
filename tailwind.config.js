/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#1f1f1f',
        },
      },
    },
  },
  plugins: [],
}