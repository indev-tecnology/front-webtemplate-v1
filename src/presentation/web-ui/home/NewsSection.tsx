'use client';

import { AnnouncementsSection, type Announcement } from './AnnouncementsSection';
import { EventsSection, type Event } from './EventsSection';
import { motion } from 'framer-motion';

// ==================== TIPOS ====================

export interface NewsSectionProps {
  announcements: Announcement[];
  events: Event[];
  viewAllAnnouncementsHref?: string;
  viewAllEventsHref?: string;
}

// ==================== COMPONENTE PRINCIPAL ====================

/**
 * NewsSection - Diseño Bento Grid Asimétrico
 *
 * Desktop: Comunicados (70% izq, Bento Grid 2x2) | Eventos (30% der, Lista compacta)
 * Mobile: Comunicados arriba | Eventos abajo (apilado)
 */
export const NewsSection = ({
  announcements,
  events,
  viewAllAnnouncementsHref = '/comunicados',
  viewAllEventsHref = '/eventos',
}: NewsSectionProps) => {
  return (
    <div className="w-full">
      {/* Grid asimétrico: 70/30 en desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10"
      >
        {/* Área principal: Comunicados (Bento Grid) */}
        <div className="order-1">
          <AnnouncementsSection
            announcements={announcements}
            viewAllHref={viewAllAnnouncementsHref}
          />
        </div>

        {/* Sidebar: Eventos (Lista compacta) */}
        <div className="order-2">
          {/* Card contenedor con fondo */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200 shadow-sm">
              <EventsSection
                events={events}
                viewAllHref={viewAllEventsHref}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Re-exportar tipos
export type { Announcement, Event };
