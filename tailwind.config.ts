import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        primaryMuted: "var(--color-primary-muted)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
      },
      boxShadow: {
        soft: "0 12px 32px -20px rgba(15, 23, 42, 0.35)",
        glow: "0 0 0 1px rgba(99, 102, 241, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
