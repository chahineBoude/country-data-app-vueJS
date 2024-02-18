/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  jit: true,
  theme: {
    extend: {
      fontFamily: {
        PT: ["PT Sans Narrow", "sans-serif"],
        teko: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
};
