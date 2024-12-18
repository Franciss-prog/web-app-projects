import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#1B1B1D", // #1B1B1D
        slateGray: "#64646A", // #64646A
        softMist: "#EEEEF1", // #EEEEF1
        cloudWhite: "#F3F4F5", // #F3F4F5
      },
    },
  },
  plugins: [],
} satisfies Config;
