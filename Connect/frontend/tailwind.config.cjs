/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImg: "url('./src/assets/bg.png')"
      },
      colors: {
        'grey-blue': '#D9D9D9',
        'box-color': '#717B7A',
        'main-color': '#313C3E'
      }
    },
  },
  plugins: [],
}
