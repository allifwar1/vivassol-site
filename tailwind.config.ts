import type { Config } from "tailwindcss";

/**
 * Design System da Vivassol
 * Cores extraídas da logo oficial (mandala de 9 pétalas arco-íris).
 * Mantemos a marca como sistema, não como enfeite: o gradiente é a assinatura.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores da marca (extraídas da logo)
        brand: {
          coral: "#E84525",
          orange: "#F5801A",
          yellow: "#F5C200",
          green: "#68B82A",
          teal: "#00A88A",
          blue: "#1A7ACA",
          violet: "#7B2DBE",
          magenta: "#D02060",
        },
        // Sistema de superfícies / texto
        ink: {
          DEFAULT: "#111118", // texto principal
          soft: "#6B7080", // texto secundário
          line: "#E8E8F0", // divisores
        },
        surface: {
          dark: "#0D0D18", // hero escuro / navbar dark
          DEFAULT: "#FAFAFA", // fundo geral
          soft: "#F5F0FF", // cards / seções alternadas
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // O arco-íris assinatura da Vivassol
        "brand-rainbow":
          "linear-gradient(90deg, #E84525, #F5801A, #F5C200, #68B82A, #00A88A, #1A7ACA, #7B2DBE, #D02060)",
        "brand-rainbow-soft":
          "linear-gradient(135deg, #E84525 0%, #F5801A 18%, #F5C200 33%, #68B82A 50%, #00A88A 62%, #1A7ACA 76%, #7B2DBE 88%, #D02060 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(17, 17, 24, 0.12)",
        lift: "0 16px 48px -16px rgba(17, 17, 24, 0.20)",
      },
      keyframes: {
        "rainbow-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "rainbow-pan": "rainbow-pan 8s ease infinite",
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
