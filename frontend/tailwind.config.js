/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "light",
  },
  plugins: [require("daisyui")],
}
