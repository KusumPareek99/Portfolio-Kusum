import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── FONTS ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-epilogue)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },

      // ─── COLORS ────────────────────────────────────────────────────────
      colors: {
        bg: {
          base: "#050508",
          surface: "#0D0D14",
          hover: "#13131E",
        },
        border: {
          DEFAULT: "#1A1A2E",
          glow: "#2D2D52",
        },
        accent: {
          violet: "#8B5CF6",
          cyan: "#22D3EE",
          amber: "#F59E0B",
          emerald: "#10B981",
        },
        text: {
          primary: "#F0F0FF",
          secondary: "#A0A0C0",
          muted: "#4A4A70",
        },
      },

      // ─── BACKGROUND GRADIENTS ──────────────────────────────────────────
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #8B5CF6, #22D3EE)",
        "grad-hero": "linear-gradient(135deg, #F0F0FF 40%, #8B5CF6 70%, #22D3EE 100%)",
        "grad-card": "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(34,211,238,0.05))",
        "grad-timeline": "linear-gradient(to bottom, #8B5CF6, #22D3EE, transparent)",
        "noise": "url('/noise.png')",
        "dot-grid":
          "radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)",
      },

      // ─── SPACING ───────────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "128": "32rem",
      },

      // ─── BORDER RADIUS ─────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },

      // ─── BOX SHADOW ────────────────────────────────────────────────────
      boxShadow: {
        "glow-violet": "0 0 20px rgba(139,92,246,0.3)",
        "glow-cyan": "0 0 20px rgba(34,211,238,0.3)",
        "glow-emerald": "0 0 10px rgba(16,185,129,0.6)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 20px 48px rgba(139,92,246,0.15)",
      },

      // ─── KEYFRAMES ─────────────────────────────────────────────────────
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 6px rgba(16,185,129,0.6)" },
          "50%": { boxShadow: "0 0 18px rgba(16,185,129,0.9)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease forwards",
        "draw-line": "draw-line 1.5s ease-in-out forwards",
      },

      // ─── BACKGROUND SIZE ───────────────────────────────────────────────
      backgroundSize: {
        "dot-sm": "24px 24px",
        "200%": "200%",
      },
    },
  },
  plugins: [],
};

export default config;
