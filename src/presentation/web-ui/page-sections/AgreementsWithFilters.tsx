'use client';

import { useState } from 'react';
import type { Agreement } from '@/domain/entities/Agreement';
import { AgreementFilters } from '@/presentation/web-ui/filters/AgreementFilters';
import { ContentGrid } from '@/presentation/web-ui/layouts/ContentGrid';
import { AgreementCard } from '@/presentation/web-ui/templates/AgreementCard';

interface AgreementsWithFiltersProps {
  agreements: Agreement[];
}

export const AgreementsWithFilters = ({ agreements }: AgreementsWithFiltersProps) => {
  const [filteredAgreements, setFilteredAgreements] = useState<Agreement[]>(agreements);

  return (
    <>
      {/* Filter Component */}
      <AgreementFilters agreements={agreements} onFilterChange={setFilteredAgreements} />

      {/* Agreements Grid */}
      {filteredAgreements.length > 0 ? (
        <ContentGrid columns={3} gap="lg">
          {filteredAgreements.map((agreement) => (
            <AgreementCard
              key={agreement.id ?? agreement.slug}
              agreement={agreement}
              href={`/agreements/${agreement.slug}`}
            />
          ))}
        </ContentGrid>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              No se encontraron convenios
            </h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Intenta ajustar los filtros o la búsqueda para ver más resultados.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-700 transition-all shadow-md hover:shadow-lg"
            >
              Reiniciar búsqueda
            </button>
          </div>
        </div>
      )}
    </>
  );
};
