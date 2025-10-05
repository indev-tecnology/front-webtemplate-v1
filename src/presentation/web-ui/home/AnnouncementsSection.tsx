'use client';

import { motion } from 'framer-motion';
import { Card } from '../Card';
import { Button } from '../Button';
import { ArrowRight, Pin, Bell, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

// ==================== TIPOS ====================

export interface Announcement {
  slug: string;
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  tags?: string[];
  pinned?: boolean;
  priority?: number;
  publishedAt?: Date;
  createdAt?: Date;
}

export interface AnnouncementsSectionProps {
  announcements: Announcement[];
  viewAllHref?: string;
}

// ==================== CONFIGURACIÓN ====================

const CATEGORY_CONFIG: Record<string, { bg: string; overlay: string }> = {
  'Institucional': {
    bg: 'from-violet-500/20 to-purple-600/20',
    overlay: 'bg-gradient-to-br from-violet-900/40 to-purple-900/60'
  },
  'Créditos': {
    bg: 'from-emerald-500/20 to-teal-600/20',
    overlay: 'bg-gradient-to-br from-emerald-900/40 to-teal-900/60'
  },
  'Educación': {
    bg: 'from-amber-500/20 to-orange-600/20',
    overlay: 'bg-gradient-to-br from-amber-900/40 to-orange-900/60'
  },
  'Beneficios': {
    bg: 'from-blue-500/20 to-indigo-600/20',
    overlay: 'bg-gradient-to-br from-blue-900/40 to-indigo-900/60'
  },
  'default': {
    bg: 'from-neutral-400/20 to-neutral-600/20',
    overlay: 'bg-gradient-to-br from-neutral-800/40 to-neutral-900/60'
  },
};

// ==================== UTILIDADES ====================

const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays}d`;

  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short'
  });
};

const isNew = (date: Date): boolean => {
  const diffDays = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 2;
};

const getCategoryStyle = (category?: string) => {
  if (!category) return CATEGORY_CONFIG.default;
  return CATEGORY_CONFIG[category] || CATEGORY_CONFIG.default;
};

// ==================== COMPONENTE PRINCIPAL ====================

export const AnnouncementsSection = ({
  announcements,
  viewAllHref = '/comunicados'
}: AnnouncementsSectionProps) => {
  // Ordenar y tomar los primeros 4 (para bento grid 2x2)
  const sortedAnnouncements = [...announcements]
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      const aDate = a.publishedAt || a.createdAt || new Date(0);
      const bDate = b.publishedAt || b.createdAt || new Date(0);
      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, 4);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Comunicados Oficiales
          </h2>
          <p className="text-neutral-600">
            Noticias y anuncios importantes de la cooperativa
          </p>
        </div>
        {viewAllHref && (
          <Button variant="outline" size="sm" asChild className="group">
            <a href={viewAllHref} className="flex items-center gap-2">
              Ver todos
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        )}
      </div>

      {/* Bento Grid 2x2 */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {sortedAnnouncements.map((announcement, index) => (
          <BentoCard
            key={announcement.slug}
            announcement={announcement}
            variants={item}
            size={getBentoSize(index)}
          />
        ))}
      </motion.div>
    </div>
  );
};

// ==================== UTILIDAD BENTO SIZE ====================

type BentoSize = 'large' | 'medium';

const getBentoSize = (index: number): BentoSize => {
  // Primer card (pinned) más grande
  if (index === 0) return 'large';
  return 'medium';
};

// ==================== COMPONENTE BENTO CARD ====================

interface BentoCardProps {
  announcement: Announcement;
  variants: any;
  size: BentoSize;
}

const BentoCard = ({ announcement, variants, size }: BentoCardProps) => {
  const date = announcement.publishedAt || announcement.createdAt || new Date();
  const relativeTime = getRelativeTime(date);
  const isNewAnnouncement = isNew(date);
  const category = announcement.tags?.[0];
  const categoryStyle = getCategoryStyle(category);

  // Altura según tamaño
  const heightClass = size === 'large' ? 'h-80 md:h-96' : 'h-64 md:h-72';

  return (
    <motion.div
      variants={variants}
      className={clsx(
        size === 'large' && 'md:col-span-2'
      )}
    >
      <a
        href={`/comunicados/${announcement.slug}`}
        className="block h-full group"
      >
        <Card
          variant="elevated"
          padding="none"
          className={clsx(
            heightClass,
            'overflow-hidden relative transition-all duration-500 hover:shadow-2xl',
            announcement.pinned && 'ring-2 ring-blue-500/30'
          )}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            {announcement.image ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${announcement.image.url})` }}
              />
            ) : (
              <div className={clsx(
                'absolute inset-0 bg-gradient-to-br',
                categoryStyle.bg
              )} />
            )}

            {/* Overlay gradiente */}
            <div className={clsx(
              'absolute inset-0',
              categoryStyle.overlay
            )} />
          </div>

          {/* Contenido */}
          <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
            {/* Header con badges */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {announcement.pinned && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                    <Pin size={12} className="fill-current" />
                    Destacado
                  </span>
                )}
                {isNewAnnouncement && !announcement.pinned && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                    <Bell size={12} />
                    Nuevo
                  </span>
                )}
              </div>

              {/* Categoría */}
              {category && (
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 shadow-lg">
                  {category}
                </span>
              )}
            </div>

            {/* Footer con título y descripción */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Sparkles size={14} />
                {relativeTime}
              </div>

              <h3 className={clsx(
                'font-bold text-white leading-tight group-hover:scale-[1.02] transition-transform',
                size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
              )}>
                {announcement.title}
              </h3>

              {announcement.description && (
                <p className={clsx(
                  'text-white/90 leading-relaxed',
                  size === 'large' ? 'text-base line-clamp-2 md:line-clamp-3' : 'text-sm line-clamp-2'
                )}>
                  {announcement.description}
                </p>
              )}

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                Leer más
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Decoración borde si pinned */}
          {announcement.pinned && (
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
          )}
        </Card>
      </a>
    </motion.div>
  );
};
