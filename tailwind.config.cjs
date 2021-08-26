const colors = require("tailwindcss/colors");

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      black: colors.black,
      gray: colors.gray,
      white: colors.white,
      blue: colors.blue,
      sky: colors.sky,
    },
    screens: {
      xs: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      borderRadius: {
        half: "50%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};

module.exports = config;
