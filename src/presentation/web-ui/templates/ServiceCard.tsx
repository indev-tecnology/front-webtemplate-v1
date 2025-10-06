import Link from 'next/link';
import { ArrowRight, Tag, Folder } from 'lucide-react';
import { clsx } from 'clsx';
import type { Service } from '@/domain/entities/Service';

export interface ServiceCardProps {
  service: Service;
  href: string;
}

export const ServiceCard = ({ service, href }: ServiceCardProps) => {
  return (
    <Link href={href} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-2xl bg-white border-2 border-neutral-200 hover:border-primary-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

        {/* Category badge (top-right) */}
        {service.categories && service.categories.length > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white backdrop-blur-sm bg-opacity-90">
              {service.categories[0]}
            </div>
          </div>
        )}

        {/* Hero Image or Icon */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
          {service.heroImage?.url ? (
            <img
              src={service.heroImage.url}
              alt={service.heroImage.alt || service.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {(service.title || 'S').charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold leading-tight text-neutral-900 group-hover:text-primary-600 transition-colors">
            {service.title || 'Servicio'}
          </h3>

          {/* Summary */}
          {service.summary && (
            <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
              {service.summary}
            </p>
          )}

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {service.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
              {service.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-neutral-500">
                  +{service.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 font-semibold text-sm pt-2 text-primary-600 group-hover:text-primary-700 group-hover:gap-3 transition-all">
            <span>Conocer más</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
};
