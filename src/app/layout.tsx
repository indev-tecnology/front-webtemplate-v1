import "./globals.css";

export const metadata = {
  title: "Sitio dinámico",
  description: "Next.js + MongoDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
