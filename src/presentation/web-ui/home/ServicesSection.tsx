'use client';

import { motion } from 'framer-motion';
import { Card } from '../Card';
import { Button } from '../Button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type ServiceTone = 'green' | 'teal' | 'blue' | 'sun' | 'warm' | 'violet' | 'coral';

// Adaptado al domain Service
export interface Service {
  id?: string;
  slug: string;
  name: string;
  description?: string;
  icon?: { url: string; alt?: string }; // Domain Image type
  highlights?: string[];
  tone?: ServiceTone;
}

export interface ServicesSectionProps {
  services: Service[];
  viewAllHref?: string; // Enlace a página de todos los servicios
  maxVisible?: number; // Cantidad de servicios a mostrar (default: 3)
}

export const ServicesSection = ({
  services,
  viewAllHref = '/servicios',
  maxVisible = 3
}: ServicesSectionProps) => {
  // Mostrar solo los primeros N servicios
  const visibleServices = services.slice(0, maxVisible);
  const hasMore = services.length > maxVisible;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  // Helper para obtener clases dinámicas según el tone
  const getToneClasses = (tone?: ServiceTone) => {
    const toneMap: Record<ServiceTone, {
      overlayGradient: string;
      accentBorder: string;
      accentBg: string;
      textAccent: string;
      bulletBg: string;
    }> = {
      green: {
        overlayGradient: 'from-tone-green-900/80 via-tone-green-800/40 to-transparent',
        accentBorder: 'border-tone-green-500',
        accentBg: 'bg-tone-green-500',
        textAccent: 'text-tone-green-100',
        bulletBg: 'bg-tone-green-400'
      },
      teal: {
        overlayGradient: 'from-tone-teal-900/80 via-tone-teal-800/40 to-transparent',
        accentBorder: 'border-tone-teal-500',
        accentBg: 'bg-tone-teal-500',
        textAccent: 'text-tone-teal-50',
        bulletBg: 'bg-tone-teal-400'
      },
      blue: {
        overlayGradient: 'from-tone-blue-900/80 via-tone-blue-700/40 to-transparent',
        accentBorder: 'border-tone-blue-500',
        accentBg: 'bg-tone-blue-500',
        textAccent: 'text-tone-blue-50',
        bulletBg: 'bg-tone-blue-400'
      },
      sun: {
        overlayGradient: 'from-tone-sun-900/80 via-tone-sun-700/40 to-transparent',
        accentBorder: 'border-tone-sun-600',
        accentBg: 'bg-tone-sun-600',
        textAccent: 'text-tone-sun-50',
        bulletBg: 'bg-tone-sun-400'
      },
      warm: {
        overlayGradient: 'from-tone-warm-900/80 via-tone-warm-700/40 to-transparent',
        accentBorder: 'border-tone-warm-500',
        accentBg: 'bg-tone-warm-500',
        textAccent: 'text-tone-warm-50',
        bulletBg: 'bg-tone-warm-400'
      },
      violet: {
        overlayGradient: 'from-tone-violet-900/80 via-tone-violet-700/40 to-transparent',
        accentBorder: 'border-tone-violet-500',
        accentBg: 'bg-tone-violet-500',
        textAccent: 'text-tone-violet-50',
        bulletBg: 'bg-tone-violet-400'
      },
      coral: {
        overlayGradient: 'from-tone-coral-900/80 via-tone-coral-700/40 to-transparent',
        accentBorder: 'border-tone-coral-500',
        accentBg: 'bg-tone-coral-500',
        textAccent: 'text-tone-coral-50',
        bulletBg: 'bg-tone-coral-300'
      }
    };

    return toneMap[tone || 'green'];
  };

  return (
    <div className="space-y-10">
      {/* Grid de Servicios - Diseño Único con Imagen Predominante */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {visibleServices.map((service, index) => {
          const toneClasses = getToneClasses(service.tone);
          const serviceHref = `/servicios/${service.slug}`;

          return (
            <motion.div key={service.id || index} variants={item}>
              <Link href={serviceHref} className="group block">
                <div className="relative h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Imagen a pantalla completa como fondo */}
                  <div className="relative h-[450px] overflow-hidden">
                    {service.icon?.url ? (
                      <>
                        <Image
                          src={service.icon.url}
                          alt={service.icon.alt || service.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay gradient más fuerte para mejor legibilidad */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${toneClasses.overlayGradient}`} />
                        {/* Capa adicional de oscurecimiento en la parte inferior */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </>
                    ) : (
                      /* Fallback con gradiente sólido */
                      <div className={`absolute inset-0 bg-gradient-to-br ${toneClasses.overlayGradient}`} />
                    )}

                    {/* Badge numérico con mejor contraste */}
                    <div className="absolute top-5 right-5 z-10">
                      <div className={`w-12 h-12 rounded-full ${toneClasses.accentBg} flex items-center justify-center text-white font-bold shadow-xl border-2 border-white/20 backdrop-blur-sm`}>
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                    </div>

                    {/* Borde accent superior con mejor visibilidad */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${toneClasses.accentBg} opacity-90 group-hover:h-2 transition-all duration-300`} />

                    {/* Contenido con caja semi-transparente para mejor legibilidad */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      {/* Contenedor de contenido con backdrop */}
                      <div className="relative bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-[2px] -mx-6 -mb-6 px-6 pt-8 pb-6 rounded-t-xl">
                        {/* Título con shadow para mayor contraste */}
                        <h3 className={`text-2xl font-bold mb-3 text-white drop-shadow-lg transition-transform duration-300 group-hover:translate-y-[-2px]`}>
                          {service.name}
                        </h3>

                        {/* Descripción con mejor contraste */}
                        {service.description && (
                          <p className="text-white/95 text-[15px] leading-relaxed mb-4 line-clamp-2 drop-shadow-md">
                            {service.description}
                          </p>
                        )}

                        {/* Highlights con mejor visibilidad */}
                        {service.highlights && service.highlights.length > 0 && (
                          <ul className="space-y-2.5 mb-5">
                            {service.highlights.slice(0, 3).map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-white/90">
                                <div className={`${toneClasses.accentBg} rounded-full p-1 flex-shrink-0 mt-0.5`}>
                                  <ChevronRight size={12} className="text-white" strokeWidth={3} />
                                </div>
                                <span className="line-clamp-1 drop-shadow-md">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* CTA con contenedor destacado */}
                        <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl ${toneClasses.accentBg} text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/cta`}>
                          <span>Conocer más</span>
                          <ArrowRight
                            size={18}
                            strokeWidth={2.5}
                            className="transition-transform duration-300 group-hover/cta:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Botón "Ver más servicios" */}
      {hasMore && viewAllHref && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center pt-4"
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="group border-2 border-brand-500 hover:bg-brand-500 hover:text-white transition-all duration-300"
          >
            <Link href={viewAllHref} className="flex items-center gap-3">
              <span>Ver todos los servicios</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-sm group-hover:bg-white group-hover:text-brand-500 transition-all">
                {services.length}
              </span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
};
