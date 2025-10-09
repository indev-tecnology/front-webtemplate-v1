'use client';

import { useState } from 'react';
import type { Service } from '@/domain/entities/Service';
import { ServiceFilters } from '@/presentation/web-ui/filters/ServiceFilters';
import { ContentGrid } from '@/presentation/web-ui/layouts/ContentGrid';
import { ServiceCard } from '@/presentation/web-ui/templates/ServiceCard';

interface ServicesWithFiltersProps {
  services: Service[];
}

export const ServicesWithFilters = ({ services }: ServicesWithFiltersProps) => {
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);

  return (
    <>
      {/* Filter Component */}
      <ServiceFilters services={services} onFilterChange={setFilteredServices} />

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <ContentGrid columns={3} gap="lg">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id ?? service.slug}
              service={service}
              href={`/services/${service.slug}`}
            />
          ))}
        </ContentGrid>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              No se encontraron servicios
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Intenta ajustar los filtros para ver más resultados o{' '}
              <button
                onClick={() => window.location.reload()}
                className="text-brand-600 font-semibold hover:text-brand-700 underline"
              >
                reinicia la búsqueda
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
