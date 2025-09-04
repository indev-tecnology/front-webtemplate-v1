import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
      colors: {
        brand: {default: "#2da57f", 50:"#f2f9f6", 100:"#d9f1e6", 200:"#b4e3cf", 500:"#2da57f", 600:"#1f8668", 700:"#1c6a56" },
        accent: { 600:"#16a34a" },
        // extra tones for Hero component
        tone: {
          blue: "#2563eb",
          teal: "#0ea5a4",
          green: "#16a34a",
          violet: "#7c3aed",
          coral: "#fb7185",
          sun: "#f59e0b",
          warm: "#f97316",
          muted: "#64748b",
        },
        ink: { 900:"#0f172a", 700:"#334155", 500:"#64748b" },
        surface: { 0:"#ffffff", 50:"#f8fafc" },
        danger: { 600:"#dc2626" }
      },
      borderRadius: { lg: "var(--radius)" },
      boxShadow: {
        sm: "0 1px 2px rgba(15,23,42,.06)",
        md: "0 8px 24px rgba(15,23,42,.06)",
        lg: "0 14px 42px rgba(15,23,42,.08)"
      },
    },
  },
  plugins: [],
};
export default config;
