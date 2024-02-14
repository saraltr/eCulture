import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Kindora Bufferly', 'Georgia', 'serif'],
      },
      colors: {
          primary: "#973535",
          secondary: "#4B1B1B", // darker red
          accent: "#466286", // blue
          neutral: "#F7F2EA",
          "base-100": "#ffffff",
       }
    },
  },
  plugins: [require('daisyui')],
};
export default config;
