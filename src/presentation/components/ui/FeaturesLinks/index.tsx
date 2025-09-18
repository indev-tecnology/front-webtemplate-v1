import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { apiConsumer } from '@/presentation/adapters/apiConsumer';
import type { Feature } from '@/domain/entities/Feature';
import { cn } from '@/shared/cn';
import type { ToneName } from '@/presentation/components/ui/CardMosaic';

export interface FeaturesLinksProps {
  title?: string;
  items?: Feature[];          // usa entidad de dominio Feature
  tone?: ToneName;            // tono por defecto si el item no define brand/tone
  className?: string;
  size?: 'compact' | 'comfortable';
}

// Mapeo explícito para clases seguras por tono
const overlayBgByTone: Record<ToneName, string> = {
  brand: 'bg-brand-700/85',
  blue: 'bg-tone-blue-700/85',
  teal: 'bg-tone-teal-700/85',
  green: 'bg-tone-green-700/85',
  violet: 'bg-tone-violet-700/85',
  coral: 'bg-tone-coral-700/85',
  sun: 'bg-tone-sun-700/90',
  warm: 'bg-tone-warm-700/85',
  muted: 'bg-tone-muted-700/85',
};

function normalizeImage(img: Feature['image'] | string | undefined, alt: string) {
  const asAny: any = img as any;
  if (!img) return { url: '/images/wcs_default.png', alt };
  if (typeof asAny === 'string') return { url: asAny, alt };
  if (typeof asAny?.url === 'string') return { url: asAny.url, alt: asAny.alt || alt };
  return { url: '/images/wcs_default.png', alt };
}

// Server component (async) para SSR y revalidate
const FeaturesLinks = async ({ title, items, tone = 'brand', className = '', size = 'compact' }: FeaturesLinksProps) => {
  let data: Feature[] = items || [];
  if (!items) {
    try {
      data = await apiConsumer.features();
    } catch {
      data = [];
    }
  }

  return (
    <section className={cn('w-full', className)} aria-label={title || 'Accesos rápidos'}>
      {title && (
        <h2 className="sr-only">{title}</h2>
      )}
      <div className={cn(
        'w-full grid grid-cols-[repeat(auto-fit,_minmax(max(25%,_16rem),_1fr))]',
        size === 'compact' ? 'gap-3' : 'gap-4',
      )}>
        {data.map((item) => {
          const img = normalizeImage(item.image as any, item.label);
          const itemTone: ToneName = ((item.tone || item.brand) as ToneName) || tone;
          const overlayBg = overlayBgByTone[itemTone] || overlayBgByTone.brand;
          return (
            <div
              key={item.id || item.cta || item.label}
              className={cn(
                'group relative overflow-hidden border bg-white shadow-sm',
              )}
            >
              {/* Imagen */}
              <div className={cn(
                'relative',
                size === 'compact' ? 'h-28 sm:h-32 md:h-36' : 'h-40 sm:h-44 md:h-48',
              )}>
                <Image
                  src={img.url}
                  alt={img.alt || item.label}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              {/* Gradiente sutil para legibilidad */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* Placa angular con título y flecha */}
              <div className={cn('absolute left-3 right-3', size === 'compact' ? 'bottom-2' : 'bottom-3')}>
                <div className="relative inline-flex max-w-full items-center">
                  <div
                    className={cn('absolute inset-0', overlayBg)}
                    style={{ clipPath: 'polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%)' }}
                  />
                  <span
                    className={cn(
                      'relative z-10 font-semibold tracking-wide text-white drop-shadow-sm truncate',
                      size === 'compact' ? 'px-2 py-1.5 text-[11px]' : 'px-3 py-2 text-xs',
                    )}
                  >
                    {item.label}
                  </span>
                  <ChevronRight className={cn('relative z-10 -ml-1 mr-2 text-white opacity-90', size === 'compact' ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
                </div>
              </div>

              {/* Link absoluto para accesibilidad */}
              <Link
                href={item.cta || '#'}
                aria-label={item.label}
                className={cn('absolute inset-0 focus:outline-none focus:ring-2 focus:ring-brand-500/60')}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesLinks;
