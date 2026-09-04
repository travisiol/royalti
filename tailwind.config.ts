import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#10240f",
          60: "#10240f94",
          40: "#10240f66",
        },
        lime: {
          DEFAULT: "#c9ff2e",
          deep: "#a5c603",
          text: "#43590a",
          soft: "#e9ff9a",
        },
        glass: {
          DEFAULT: "#ffffff85",
          strong: "#ffffffd6",
          border: "#ffffffcc",
        },
        primary: "#10240f",
        muted: "#10240f94",
        subtle: "#10240f66",
        divider: "#10240f14",
        elevated: "#ffffff",
        success: "#2e9e5b",
        danger: "#d94a4a",
      },
      textColor: {
        primary: "#10240f",
        muted: "#10240f94",
        subtle: "#10240f66",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Montserrat", "system-ui", "sans-serif"],
        balloon: ["var(--font-balloon)", "Baloo 2", "Arial Rounded MT Bold", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        kicker: "0.13em",
        btn: "0.08em",
        hero: "-0.035em",
        tight: "-0.025em",
      },
      borderRadius: {
        pill: "999px",
        card: "26px",
        "card-sm": "20px",
      },
      boxShadow: {
        glass: "inset 0 1px 0 #fffffff2, 0 18px 40px #18426033",
        "glass-sm": "inset 0 1px 0 #ffffffeb, 0 12px 30px #18426029",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
