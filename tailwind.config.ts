import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: { sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        brand: {DEFAULT: "#2da57f", 50:"#f2f9f6", 100:"#d9f1e6", 200:"#b4e3cf", 500:"#2da57f", 600:"#1f8668", 700:"#1c6a56" },
        accent: { 600:"#16a34a" },
        // extra tones for Hero component
        tone: {
          blue: {DEFAULT:"#2563eb", 50:"#eff6ff", 100:"#dbeafe", 200:"#bfdbfe", 500:"#2563eb", 600:"#1d4ed8", 700:"#1e40af" },
          teal: {DEFAULT: "#54BAB9" , 50:"#f0fdfa", 100:"#ccfbf1", 200:"#99f6e4", 500:"#54BAB9", 600:"#14b8a6", 700:"#0d9488" },
          green: {DEFAULT: "#219C90" , 50:"#f0fdf4", 100:"#dcfce7", 200:"#bbf7d0", 500:"#219C90", 600:"#16a34a", 700:"#15803d" },
          violet: { DEFAULT: "#8b5cf6" , 50:"#f5f3ff", 100:"#ede9fe", 200:"#ddd6fe", 500:"#8b5cf6", 600:"#7c3aed", 700:"#6d28d9" },
          coral: { DEFAULT: "#f43f5e" , 50:"#fff1f2", 100:"#ffe4e6", 200:"#fecdd3", 500:"#f43f5e", 600:"#e11d48", 700:"#be123c" },
          sun:  { DEFAULT: "#FFC700" , 50:"#fffbeb", 100:"#fef3c7", 200:"#fde68a", 500:"#FFC700", 600:"#ca8a04", 700:"#a16207" } ,
          warm: { DEFAULT: "#f97316" , 50:"#fff7ed", 100:"#ffedd5", 200:"#fed7aa", 500:"#f97316", 600:"#ea580c", 700:"#c2410c" }  ,
          muted:  { DEFAULT: "#8eb8afff" , 50:"#f5f7fa", 100:"#e4e8ed", 200:"#cbd2d9", 500:"#8eb8afff", 600:"#52606d", 700:"#323f4b" }
        },
        ink: { 0:"#1E201E", 50:"#f9faf9", 100:"#f0f1f0", 200:"#d9dcd9", 500:"#1E201E", 600:"#161716", 700:"#0e0f0e" },
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
