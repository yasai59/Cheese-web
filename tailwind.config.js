/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from "@iconify/tailwind";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      anto: ["Anton"],
    },
    extend: {
      colors: {
        primary: "#FFD100",
        primaryDark: "#FFA000",
        secondary: "#C06E52",
        terciary: "#1A936F",
        light: "#D6D6D6",
        base: "#333533",
        placeholder: "#333533",
        "base-dark": "#202020",
        "base-light": "#515451",
      },
      screens: {
        tablet: "670px", // => @media (min-width: 670px)
        laptop: "1024px", // => @media (min-width: 1024px)
      },
      screens: {
        tablet: "670px", // => @media (min-width: 670px)
        laptop: "1024px", // => @media (min-width: 1024px)
      },
    },
  },
  plugins: [addDynamicIconSelectors(), daisyui],
};
