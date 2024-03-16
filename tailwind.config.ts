import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        "museo": 'var(--font-museo)',
        "londrina": 'var(--font-londrina)',
        "kalam": 'var(--font-kalam)',
      },
      colors: {
        "primary": "#C4D600",
        "secondary": "#11111F",
        "background": "#F5F5F5",
        "background-foreground": "#11111F",
        "muted": "#767676",
        "muted-foreground": "#9A9A9A",
        "danger": "#E73C3C"
      }
    },
  },
  plugins: [],
};
export default config;
