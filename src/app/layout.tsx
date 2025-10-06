import { siteMeta } from "@/config/siteStatic";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata = {
  title: siteMeta.shortName,
  description: "Cointramin web site, empresa del sector cooperativo financiero solidario.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-dvh flex flex-col font-sans">{children}</body>
    </html>
  );
}
