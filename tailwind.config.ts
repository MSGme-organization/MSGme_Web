import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    colors: {
      bgColor: {
        DEFAULT: "#FFFFFF",
        light: "#FFFFFF",
        dark: "#262E3B",
      },
      white: "#FFFFFF",
      black: "#000000",
      textColor: {
        DEFAULT: "#000000",
        light: "#000000",
        dark: "#FFFFFF",
      },
      customGrey: {
        DEFAULT: "#96A1AF",
        light: "#E9ECEF",
        dark: "#39455A",
      },
      warning: "#E75F5F",
      primary: "#38C585",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
