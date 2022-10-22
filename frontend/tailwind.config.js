/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js", 
    "node_modules/react-daisyui/dist/**/*.js"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#8660da",
          "primary-focus": "#8660da",
          "info": "#0784b5",
          "error": "#8c453f",
          "success": "#517349",
          "warning": "#836236",
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
