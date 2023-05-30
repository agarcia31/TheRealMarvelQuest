/** @type {import('tailwindcss').Config} */
const scrollbarPlugin = require("tailwind-scrollbar");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarPlugin,
  ],
};


