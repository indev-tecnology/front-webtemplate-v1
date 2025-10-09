import type { Metadata } from 'next';
import { PageLayout } from '@/presentation/web-ui/layouts/PageLayout';
import { ServicesWithFilters } from '@/presentation/web-ui/page-sections/ServicesWithFilters';
import { getCachedServices } from '@/application/cached/CacheService';

// ISR: Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

// Metadata dinámica basada en servicios disponibles
export async function generateMetadata(): Promise<Metadata> {
  try {
    const services = await getCachedServices();
    const serviceCount = services.length;
    const serviceNames = services.slice(0, 5).map(s => s.title).join(', ');

    return {
      title: 'Nuestros Servicios | Cooperativa del Sector Solidario',
      description: `Descubre nuestros ${serviceCount} servicios financieros y de bienestar: ${serviceNames}${serviceCount > 5 ? ' y más' : ''}. Soluciones diseñadas para tu crecimiento en el sector solidario.`,
      keywords: [
        'servicios cooperativa',
        'servicios financieros',
        'sector solidario',
        'créditos',
        'ahorro',
        'bienestar social',
        ...services.slice(0, 10).map(s => s.title),
      ],
      openGraph: {
        title: 'Nuestros Servicios - Cooperativa',
        description: `${serviceCount} soluciones financieras y de bienestar diseñadas para tu crecimiento.`,
        type: 'website',
        siteName: 'Cooperativa',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Nuestros Servicios',
        description: 'Soluciones financieras del sector solidario para tu bienestar.',
      },
    };
  } catch (error) {
    // Fallback estático si falla la carga
    return {
      title: 'Nuestros Servicios | Cooperativa',
      description: 'Descubre todos los servicios financieros y de bienestar que ofrecemos para ti y tu familia en el sector solidario.',
    };
  }
}

export default async function ServiciosPage() {
  const services = await getCachedServices();

  return (
    <PageLayout
      hero={{
        title: 'Nuestros Servicios',
        subtitle: 'Servicios financieros',
        description: 'Descubre todas las soluciones que tenemos diseñadas para apoyar tu crecimiento personal, familiar y empresarial en el sector solidario.',
        tone: 'green',
        align: 'center',
        size: 'large',
      }}
      breadcrumbs={[{ label: 'Servicios' }]}
    >
      {/* Barra informativa minimalista */}
      {services.length > 0 && (
        <div className="mb-12 -mt-8">
          <div className="bg-gradient-to-r from-brand to-brand-700 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white/90">
                    Catálogo completo
                  </p>
                  <p className="text-white">
                    <span className="font-bold text-2xl">{services.length}</span> servicios disponibles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90 bg-white/10 px-4 py-2 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Todos activos y vigentes
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services with Filters */}
      <ServicesWithFilters services={services} />

      {/* CTA Section - Minimalista y solidario */}
      <div className="mt-20">
        <div className="bg-gradient-to-br from-accent to-accent-600 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-neutral-700 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Nuestros asesores están listos para ayudarte a encontrar la solución perfecta para tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand text-white font-bold rounded-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
              >
                Hablar con un asesor
              </a>
              <a
                href="/nosotros"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-neutral-900 text-neutral-900 font-bold rounded-lg hover:bg-neutral-50 transition-all"
              >
                Conocer más
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
