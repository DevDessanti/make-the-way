/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        ink: "var(--ink)",
        pos: "var(--pos)",
        warn: "var(--warn)",
        neg: "var(--neg)",
        info: "var(--info)",
      },
    },
  },
  plugins: [],
};