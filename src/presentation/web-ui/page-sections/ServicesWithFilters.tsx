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
              service={service}
              href={`/services/${service.slug}`}
            />
          ))}
        </ContentGrid>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              No se encontraron servicios
            </h3>
            <p className="text-neutral-600">
              Intenta ajustar los filtros para ver más resultados.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
