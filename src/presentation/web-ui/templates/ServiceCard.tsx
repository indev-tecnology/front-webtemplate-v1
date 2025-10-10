import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/domain/entities/Service';

export interface ServiceCardProps {
  service: Service;
  href: string;
}

export const ServiceCard = ({ service, href }: ServiceCardProps) => {
  return (
    <Link href={href} className="group block h-full">
      <article className="relative h-full flex flex-col overflow-hidden rounded-xl bg-white border border-neutral-200 hover:border-brand transition-all duration-300 hover:shadow-xl">

        {/* Hero Image con overlay de categoría */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand to-brand-700">
          {service.heroImage?.url ? (
            <>
              <img
                src={service.heroImage.url}
                alt={service.heroImage.alt || service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-2 border-white/40">
                {(service.title || 'S').charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          {/* Category badge */}
          {service.categories && service.categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1.5 rounded-md text-xs font-bold bg-white text-brand-700 uppercase tracking-wide">
                {service.categories[0]}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 space-y-3">
          {/* Title */}
          <h3 className="text-xl font-bold leading-snug text-neutral-900 group-hover:text-brand-700 transition-colors">
            {service.title || 'Servicio'}
          </h3>

          {/* Summary */}
          {service.summary && (
            <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 flex-1">
              {service.summary}
            </p>
          )}

          {/* Tags - Diseño minimalista */}
          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {service.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200"
                >
                  {tag}
                </span>
              ))}
              {service.tags.length > 2 && (
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-100 text-neutral-600">
                  +{service.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* CTA con línea divisoria */}
          <div className="pt-4 mt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between text-sm font-semibold text-brand-600 group-hover:text-brand-700">
              <span>Ver detalles</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
