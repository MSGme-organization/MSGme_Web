import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      emoji: [
        "Twemoji Mozilla",
        "Apple Color Emoji",
        "Noto Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Segoe UI",
        "EmojiOne Color",
        "Android Emoji",
      ],
    },
    colors: {
      bgColor: {
        DEFAULT: "#FFFFFF",
        light: "#FFFFFF",
        dark: "#000000",
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
        black: "#2D3748",
        blackBg: "#262E3B",
      },

      warning: "#E75F5F",
      primary: "#38C585",
    },
    extend: {
      keyframes: {
        flyEmoji: {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.7",
          },
          "100%": {
            transform: "translateY(-150px) scale(2)",
            opacity: "0",
          },
        },
      },
      animation: {
        flyEmoji: "flyEmoji 1s forwards",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwindcss-animate")],
};
export default config;
