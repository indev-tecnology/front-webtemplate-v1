import "../globals.css";
import { Navbar } from "@/presentation/web-ui/Navbar";
import { Footer } from "@/presentation/web-ui/Footer";
import { siteMeta, contactInfo, socialLinks, footerSections } from "@/config/siteStatic";
import { getCachedNav, getCachedFooter } from "@/application/cached";

export const revalidate = 86400;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  let nav: any = null;
  try {
    nav = await getCachedNav();
  } catch {
    nav = { items: [] };
  }
  let footer: any = null;
  try {
    footer = await getCachedFooter();
  } catch {
    footer = null;
  }
  const maintenance = process.env.MAINTENANCE === 'soft';
  
  return (
    <>
      {maintenance && (
          <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-900 text-sm text-center py-2">
            {process.env.MAINTENANCE_MSG || 'Sitio en mantenimiento. Algunas funciones pueden fallar.'}
          </div>
        )}
        <Navbar
                logo={
                  siteMeta.logo ? (
                    <img
                      src={siteMeta.logo}
                      alt={siteMeta.brandName}
                      className="h-8 md:h-10"
                    />
                  ) :
                  <span className="text-xl md:text-2xl font-bold text-brand">
                    {siteMeta.brandName}
                  </span>
                }
                links={nav.items || []}
                ctaLabel="Contáctanos"
                ctaHref="/contacto"
                socialLinks={socialLinks}
                contactInfo={contactInfo}
              />
        <main className="flex-1">{children}</main>
        {/* Footer */}
      <Footer
        sections={footerSections}
        socialLinks={socialLinks}
        contactInfo={contactInfo}
        copyright="© 2025 Cooperativa del Sector Solidario. Vigilada por Supersolidaria. Todos los derechos reservados."
      />
    </>
  );
}
