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
        headline: ['Histandia', 'Georgia', 'serif'],
      },
      colors: {
        primary: "#973535",
        secondary: "#4B1B1B", // darker red
        accent: "#32527b", // blue
        neutral: "#F7F2EA",
        "base-100": "#ffffff",
      },
      boxShadow: {
        text: '2px 2px 3px #4B1B1B',
      },
    },
    screens: {
      'sm': '700px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    daisyui: {
      themes:["autumn"]
    },
  },
  plugins: [require('daisyui')],
};

export default config;
