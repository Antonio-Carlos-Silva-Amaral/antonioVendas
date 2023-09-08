/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}","./*.{html,js}"],
  theme: {
    screens: {
      'sm': {'max': '900px'},
      // => @media (max-width: 767px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
