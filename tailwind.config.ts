import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // RR Brand colors
        "rr-yellow": "#F6F792",
        "rr-green": "#B3ECC8",
        "rr-pink": "#FEABC3",
        "rr-dark": "#334143",
        // Semantic aliases
        brand: {
          main: "#B3ECC8",      // Neon Green
          alt1: "#F6F792",      // Yellow
          alt2: "#FEABC3",      // Pink
          bg: "#334143",        // Dark Green
        },
      },
      boxShadow: {
        card: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;

