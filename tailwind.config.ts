import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#4F46E5", light: "#818CF8", dark: "#3730A3" },
        accent:  { DEFAULT: "#A855F7", light: "#C084FC", dark: "#7E22CE" },
        success: { DEFAULT: "#10B981", light: "#34D399" },
        warning: { DEFAULT: "#F59E0B", light: "#FCD34D" },
        danger:  { DEFAULT: "#F43F5E", light: "#FB7185" },
        surface: { DEFAULT: "#1A1A2E", light: "#16213E", card: "#0D0D1F" },
        ink:     { DEFAULT: "#F1F5F9", muted: "#94A3B8", faint: "#475569" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease-out forwards",
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float:        "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 40px rgba(79,70,229,0.35)",
        "glow-accent":  "0 0 40px rgba(168,85,247,0.25)",
        card:           "0 4px 32px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
