import "../globals.css";
import { Navbar } from "@/presentation/components/Navbar";
import { Footer } from "@/presentation/components/Footer";
import { siteMeta, contactInfo, socialLinks } from "@/config/siteStatic";
import { env } from "@/config/env";
import { getCachedNav, getCachedFooter } from "@/application/cached";

export const revalidate = env.NEXT_REVALIDATE_SECONDS;

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
  const fallbackFooter = {
    columns: [
      {
        title: "Contacto",
        links: [
          contactInfo.email ? { href: `mailto:${contactInfo.email}`, label: contactInfo.email } : null,
          contactInfo.phone ? { href: `tel:${contactInfo.phone.replace(/\s+/g, '')}`, label: contactInfo.phone } : null,
          contactInfo.address ? { href: "#", label: contactInfo.address } : null,
          contactInfo.schedule ? { href: "#", label: contactInfo.schedule } : null,
        ].filter(Boolean),
      },
    ],
    socials: Object.entries(socialLinks)
      .filter(([, href]) => typeof href === 'string' && href)
      .map(([name, href]) => ({ name, href })),
    note: `© ${new Date().getFullYear()} ${siteMeta.brandName}. Todos los derechos reservados.`,
  };
  const footerData = footer && (footer.columns?.length || footer.socials?.length || footer.note) ? footer : fallbackFooter;
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
        <Footer data={footerData} />
    </>
  );
}
