/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat : ['Montserrat', 'sans-serif'],
      },
      colors: {
        "poke-primary": '#111827'
      },
    },
  },
  plugins: [],
}

