const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      blue: colors.blue,
      gray: colors.gray,
      sky: colors.sky,
      white: colors.white,
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
      fontFamily: {
        sans: ["Open sans", ...defaultTheme.fontFamily.sans],
        cursive: ["Merienda", "cursive"],
      },
      gridTemplateColumns: {
        "layout-1": "min(30%, 260px) auto",
        "layout-2": "min(35%, 360px) auto",
        "layout-3": "auto repeat(2, 42px)",
      },
      height: {
        rest: "calc(100vh - 48px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};

module.exports = config;
