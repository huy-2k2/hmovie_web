/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        menu: "#25252c",
        primary: "#e9292c",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
