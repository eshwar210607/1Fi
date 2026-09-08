import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fi: {
          primary: "#601CEB",
          hover: "#4E12C8",
          light: "#F5F0FE",
          border: "#E9DFFC",
          dark: "#1A0643",
          bannerStart: "#1B0645",
          bannerMid: "#340974",
          bannerEnd: "#5210AD",
          bg: "#F8F9FB",
          surface: "#FFFFFF",
          textPrimary: "#111827",
          textSecondary: "#6B7280",
          textMuted: "#9CA3AF",
          borderLight: "#F0F1F5",
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        card: "0 2px 10px -2px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 10px 25px -5px rgba(96, 28, 235, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        floating: "0 12px 32px -4px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
