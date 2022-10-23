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
          primary: "#8263FF",
          "primary-focus": "#8263FF",
          "info": "#0784b5",
          "error": "#8c453f",
          "success": "#517349",
          "warning": "#836236",
        },
         light: {
           ...require("daisyui/src/colors/themes")["[data-theme=light]"],
           primary: "#8263FF",
           "primary-focus": "#8263FF",
         },
      },
      "light",
    ],
    darkTheme: "light",
  },
  plugins: [require("daisyui")],
}
