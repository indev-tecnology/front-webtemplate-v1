'use client';

import { motion } from 'framer-motion';
import { Card } from '../Card';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

// ==================== TIPOS ====================

export interface Event {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  location?: string;
  startsAt: Date;
  endsAt?: Date;
  tags?: string[];
}

export interface EventsSectionProps {
  events: Event[];
  viewAllHref?: string;
}

// ==================== UTILIDADES ====================

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const formatDayMonth = (date: Date) => ({
  day: date.toLocaleDateString('es-CO', { day: '2-digit' }),
  month: date.toLocaleDateString('es-CO', { month: 'short' }).toUpperCase().slice(0, 3),
});

const isUpcoming = (date?: Date): boolean => {
  if(!date) return true;
  return date > new Date();
};

// ==================== COMPONENTE PRINCIPAL ====================

export const EventsSection = ({
  events,
  viewAllHref = '/eventos'
}: EventsSectionProps) => {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="space-y-4">
      {/* Header compacto */}
      <div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">
          Próximos Eventos
        </h3>
        <p className="text-sm text-neutral-600">
          Actividades de la cooperativa
        </p>
      </div>

      {/* Lista compacta */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-3"
      >
        {events.map((event) => (
          <EventCompactCard
            key={event.id}
            event={event}
            variants={item}
          />
        ))}
      </motion.div>

      {/* CTA */}
      {viewAllHref && events.length > 0 && (
        <a
          href={viewAllHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all group"
        >
          Ver calendario completo
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  );
};

// ==================== COMPONENTE CARD COMPACTO ====================

interface EventCompactCardProps {
  event: Event;
  variants: any;
}

const EventCompactCard = ({ event, variants }: EventCompactCardProps) => {
  const dateInfo = formatDayMonth(event.startsAt);

  return (
    <motion.div variants={variants}>
      <a
        href={`/eventos/${event.slug || event.id}`}
        className="block group"
      >
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
          {/* Calendario mini */}
          <div className={"flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex flex-col items-center justify-center text-white shadow-sm" + (isUpcoming(event.endsAt)? " ": " opacity-50 ")}>
            <div className="text-[9px] font-bold opacity-90 leading-none">
              {dateInfo.month}
            </div>
            <div className="text-xl font-bold leading-none my-0.5">
              {dateInfo.day}
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-neutral-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
              {event.title}
            </h4>

            {event.location && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                <MapPin size={11} className="text-teal-600 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
          </div>

          {/* Indicador */}
          <div className={"flex-shrink-0 w-2 h-2 rounded-full group-hover:scale-125 transition-transform" + (isUpcoming(event.endsAt)? " bg-brand-500 ": " bg-danger-500 ")} />
        </div>
      </a>
    </motion.div>
  );
};
