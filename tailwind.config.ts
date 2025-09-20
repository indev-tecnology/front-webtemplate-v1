import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: { sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        brand: {
          DEFAULT: "#16633f",
          50:  "#e8f3ed",
          100: "#cbe3d6",
          200: "#9ac6b2",
          500: "#16633f", // headers/footer, botones alt
          600: "#125636",
          700: "#0f492e",
          900: "#092b1b",
        },
        accent: {
          DEFAULT: "#f4d22c",
          50:  "#fffae6",
          100: "#fff1b8",
          200: "#ffe47a",
          500: "#f4d22c", // CTA
          600: "#d9b70d",
          700: "#b7950a",
          900: "#6b5703",
        },
        neutral: {
          DEFAULT: "#737373",
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          900: "#171717",
        },
        // extra tones for Hero component
        tone: {
          blue: {
            DEFAULT: "#004f5d" , 
            50:  "#e6f4f6",
            100: "#c0e3e8",
            200: "#7fc0c9",
            500: "#004f5d",
            600: "#003f4a",
            700: "#00313a",
            900: "#001b21",
          },
          teal: {
            DEFAULT: "#3cb8b4",
            50:  "#e9fbfa",
            100: "#c7f3f2",
            200: "#95e5e2",
            500: "#3cb8b4",
            600: "#329e9b",
            700: "#297f7d",
            900: "#164745",
          },
          green: {
            DEFAULT: "#208644",
            50:  "#e9f6ef",
            100: "#c9ebdc",
            200: "#99d7bd",
            500: "#208644", // base institucional
            600: "#1b753c",
            700: "#175f33",
            900: "#0d3a20",
          },
          violet: {
            DEFAULT: "#8b5cf6", 
            50:  "#f5f3ff",
            100: "#ede9fe",
            200: "#ddd6fe",
            500: "#8b5cf6",
            600: "#7c3aed",
            700: "#6d28d9",
            900: "#4c1d95", },
          coral: { 
            DEFAULT: "#ff6b6b" , 
            50:  "#fff0f0",
            100: "#ffd9d9",
            200: "#ffb3b3",
            500: "#ff6b6b",
            600: "#e05252",
            700: "#be3f3f",
            900: "#6b2222",
          },
          sun:  { 
            DEFAULT: "#e1c79b" ,  
            50:  "#fdf9f1",
            100: "#faf1de",
            200: "#f5e6cc",
            500: "#e1c79b",
            600: "#caa875",
            700: "#a98556",
            900: "#5c4426", 
          } ,
          warm: { 
            DEFAULT: "#fb923c" ,
            50:  "#fff7ed",
            100: "#ffedd5",
            200: "#fed7aa",
            500: "#fb923c",
            600: "#f97316",
            700: "#ea580c",
            900: "#7c2d12",}  ,
          muted:  { 
            DEFAULT: "#9ca3af" , 
            50:  "#f7f8f9",
            100: "#e6e8eb",
            200: "#cfd3d9",
            500: "#9ca3af",
            600: "#7b828f",
            700: "#616775",
            900: "#3a3f48",}
        },
        ink: { 0:"#1E201E", 50:"#f9faf9", 100:"#f0f1f0", 200:"#d9dcd9", 500:"#1E201E", 600:"#161716", 700:"#0e0f0e" },
        surface: {
          DEFAULT:"#e5e7eb",  
          50:  "#ffffff",
          100: "#f9fafb", // blanco humo (fondos principales)
          200: "#f3f4f6",
          500: "#e5e7eb", // gris cálido
          600: "#d1d5db",
          700: "#9ca3af",
          900: "#1a1a1a",
        },
        danger: {
          DEFAULT: "#b32727" ,
          50:  "#fdecec",
          100: "#f9cfcf",
          200: "#f29a9a",
          500: "#b32727",
          600: "#991f1f",
          700: "#7f1a1a",
          900: "#470e0e",
        }
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
