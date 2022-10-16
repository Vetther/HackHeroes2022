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
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#8957f4",
          "primary-focus": "#8957f4",
        },
        // light: {
        //   ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        //   primary: "#8957f4",
        //   "primary-focus": "#8957f4",
        // },
      },
      "light",
    ],
    darkTheme: "light",
  },
  plugins: [require("daisyui")],
}
