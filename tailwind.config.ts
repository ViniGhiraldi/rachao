import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        museo: ['var(--font-museo-moderno)'],
        londrina: ['var(--font-londrina-solid)'],
        kalam: ['var(--font-kalam)'],
      }
    },
  },
  plugins: [],
};
export default config;
