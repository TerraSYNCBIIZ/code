/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        knoxorange: '#ed9708',
      },
    },
  },
  plugins: [],
} 