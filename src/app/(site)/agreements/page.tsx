import type { Metadata } from 'next';
import { PageLayout } from '@/presentation/web-ui/layouts/PageLayout';
import { AgreementsWithFilters } from '@/presentation/web-ui/page-sections/AgreementsWithFilters';
import { getCachedAgreements } from '@/application/cached';

export const metadata: Metadata = {
  title: 'Convenios y Beneficios | Cooperativa',
  description: 'Explora los convenios y beneficios exclusivos para asociados con nuestros aliados estratégicos. Accede a descuentos en educación, salud, tecnología y más.',
};

export default async function AgreementsPage() {
  const agreements = await getCachedAgreements();

  return (
    <PageLayout
      hero={{
        title: 'Convenios y Beneficios',
        subtitle: 'Convenios',
        description: 'Conoce los convenios vigentes con instituciones y aliados para acceso a beneficios exclusivos.',
        tone: 'warm',
        align: 'center',
      }}
      breadcrumbs={[{ label: 'Convenios', href: '/agreements' }]}
    >
      {/* Barra informativa con contador */}
      {agreements.length > 0 && (
        <div className="mb-12 -mt-8">
          <div className="bg-gradient-to-r from-tone-green to-tone-green-700 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white/90">
                    Convenios activos
                  </p>
                  <p className="text-white">
                    <span className="font-bold text-2xl">{agreements.length}</span> aliados disponibles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90 bg-white/10 px-4 py-2 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Beneficios exclusivos para asociados
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agreements with Filters */}
      <AgreementsWithFilters agreements={agreements} />

      {/* CTA Section */}
      <div className="mt-20">
        <div className="bg-gradient-to-br from-accent to-accent-600 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              ¿Aún no eres asociado?
            </h2>
            <p className="text-neutral-700 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Únete a nuestra comunidad y accede a todos estos beneficios exclusivos junto con nuestros servicios financieros.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/vinculacion"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand text-white font-bold rounded-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
              >
                Vincúlate ahora
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-neutral-900 text-neutral-900 font-bold rounded-lg hover:bg-neutral-50 transition-all"
              >
                Más información
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
