import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ember: "#ff5c35", ink: "#070707", mist: "#a3a3a3" },
      fontFamily: { sans: ["var(--font-geist-sans)", "Arial", "sans-serif"] },
      letterSpacing: { tighter: "-0.055em" }
    }
  },
  plugins: []
};
export default config;
