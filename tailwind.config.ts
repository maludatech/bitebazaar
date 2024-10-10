import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
        lato: ['Lato', 'cursive'],
        rubik: ['Rubik', 'sans-serif'],
        noto: ['Noto Color Emoji', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        error: ['Error', 'sans-serif']
      },
      colors: {
        primary_color: "#16423C",
        secondary_color: "#FFE5CF",
        tertiary_color: "#FFEBEE",
        complementary_color: "#FEFAE0"
      },
    },
  },
  plugins: [],
};
export default config;

