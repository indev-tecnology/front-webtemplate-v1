import "../globals.css";
import { Navbar } from "@/presentation/components/Navbar";
import { Footer } from "@/presentation/components/Footer";
import { apiConsumer } from "@/presentation/adapters/apiConsumer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [nav, footer] = await Promise.all([apiConsumer.nav(), apiConsumer.footer()]);
  const maintenance = process.env.MAINTENANCE === 'soft';
  
  return (
    <>
      {maintenance && (
          <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-900 text-sm text-center py-2">
            {process.env.MAINTENANCE_MSG || 'Sitio en mantenimiento. Algunas funciones pueden fallar.'}
          </div>
        )}
        <Navbar data={nav} />
        <main className="flex-1">{children}</main>
        <Footer data={footer} />
    </>
  );
}
