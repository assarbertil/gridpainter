/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["inter", "sans-serif"],
    },
    extend: {
      boxShadow: {
        cell: "0 0 10px #0ea5e9",
      },
    },
  },
  plugins: [],
}
