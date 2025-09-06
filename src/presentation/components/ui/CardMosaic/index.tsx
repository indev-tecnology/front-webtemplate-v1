import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Play, Eye, Heart } from 'lucide-react';

// Tipos de datos para el componente
export interface NewsItem {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  ctaLabel?: string;
  href?: string;
  dateLabel?: string;
  imageUrl?: string;
  videoUrl?: string;
  isVideo?: boolean;
  videoDuration?: string;
  tone?: ToneName;
  startsAt?: string | Date; // para eventos
  publishedAt?: string | Date;
  stats?: {
    views?: number;
    likes?: number;
  };
}

export interface SectionData {
  title: string;
  items: NewsItem[];
  ctaLabel?: string;
  ctaHref?: string;
  featuredId?: string;
  tone?: ToneName;
}

// Utilidad: fecha relativa simple en ES
export function formatRelativeEs(input?: string | Date): string | undefined {
  if (!input) return undefined;
  const date = typeof input === 'string' ? new Date(input) : input;
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  if (isNaN(diffMs)) return undefined;
  const absMs = Math.abs(diffMs);
  const sec = Math.floor(absMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const prefix = diffMs >= 0 ? 'en' : 'hace';
  if (sec < 60) return `${prefix} ${sec}s`;
  if (min < 60) return `${prefix} ${min} min`;
  if (hr < 24) return `${prefix} ${hr} h`;
  if (day <= 7) return `${prefix} ${day} d`;
  // Formato corto: DD MMM (y año si distinto)
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const d = date.getDate().toString().padStart(2, '0');
  const m = months[date.getMonth()];
  const y = date.getFullYear();
  const sameYear = y === now.getFullYear();
  return sameYear ? `${d} ${m}` : `${d} ${m} ${y}`;
}

// Tono soportado según paleta tailwind tone + brand
export type ToneName = 'brand' | 'blue' | 'teal' | 'green' | 'violet' | 'coral' | 'sun' | 'warm' | 'muted';

// Configuración de colores por tono usando la paleta tone del proyecto
export const toneClasses: Record<ToneName, { section: string; badge: string; cta: string; date: string; accent: string }> = {
  brand: {
    section: 'text-brand-600',
    badge: 'bg-brand-100 text-brand-700 border-brand-200',
    cta: 'text-brand-600 hover:text-brand-700 hover:bg-brand-50',
    date: 'bg-brand-600 text-white',
    accent: 'text-brand-600',
  },
  blue: {
    section: 'text-tone-blue-600',
    badge: 'bg-tone-blue-100 text-tone-blue-700 border-tone-blue-200',
    cta: 'text-tone-blue-600 hover:text-tone-blue-700 hover:bg-tone-blue-50',
    date: 'bg-tone-blue-600 text-white',
    accent: 'text-tone-blue-600',
  },
  teal: {
    section: 'text-tone-teal-600',
    badge: 'bg-tone-teal-100 text-tone-teal-700 border-tone-teal-200',
    cta: 'text-tone-teal-600 hover:text-tone-teal-700 hover:bg-tone-teal-50',
    date: 'bg-tone-teal-600 text-white',
    accent: 'text-tone-teal-600',
  },
  green: {
    section: 'text-tone-green-600',
    badge: 'bg-tone-green-100 text-tone-green-700 border-tone-green-200',
    cta: 'text-tone-green-600 hover:text-tone-green-700 hover:bg-tone-green-50',
    date: 'bg-tone-green-600 text-white',
    accent: 'text-tone-green-600',
  },
  violet: {
    section: 'text-tone-violet-600',
    badge: 'bg-tone-violet-100 text-tone-violet-700 border-tone-violet-200',
    cta: 'text-tone-violet-600 hover:text-tone-violet-700 hover:bg-tone-violet-50',
    date: 'bg-tone-violet-600 text-white',
    accent: 'text-tone-violet-600',
  },
  coral: {
    section: 'text-tone-coral-600',
    badge: 'bg-tone-coral-100 text-tone-coral-700 border-tone-coral-200',
    cta: 'text-tone-coral-600 hover:text-tone-coral-700 hover:bg-tone-coral-50',
    date: 'bg-tone-coral-600 text-white',
    accent: 'text-tone-coral-600',
  },
  sun: {
    section: 'text-tone-sun-600',
    badge: 'bg-tone-sun-100 text-tone-sun-700 border-tone-sun-200',
    cta: 'text-tone-sun-600 hover:text-tone-sun-700 hover:bg-tone-sun-50',
    date: 'bg-tone-sun-600 text-white',
    accent: 'text-tone-sun-600',
  },
  warm: {
    section: 'text-tone-warm-600',
    badge: 'bg-tone-warm-100 text-tone-warm-700 border-tone-warm-200',
    cta: 'text-tone-warm-600 hover:text-tone-warm-700 hover:bg-tone-warm-50',
    date: 'bg-tone-warm-600 text-white',
    accent: 'text-tone-warm-600',
  },
  muted: {
    section: 'text-tone-muted-600',
    badge: 'bg-tone-muted-100 text-tone-muted-700 border-tone-muted-200',
    cta: 'text-tone-muted-600 hover:text-tone-muted-700 hover:bg-tone-muted-50',
    date: 'bg-tone-muted-600 text-white',
    accent: 'text-tone-muted-600',
  },
};

// Componente para elementos de video
const VideoItem: React.FC<{ item: NewsItem; colors: any }> = ({ item, colors }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-lg mb-3">
      <div className="relative w-full h-40">
        <Image
          src={item.imageUrl || '/api/placeholder/280/160'}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Play button overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <Play className="w-5 h-5 text-gray-900 ml-1" fill="currentColor" />
        </div>
      </div>
      {/* Duration badge */}
      {item.videoDuration && (
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {item.videoDuration}
        </div>
      )}
    </div>
    
    <div className="space-y-2">
      {item.badge && (
        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full border ${colors.badge}`}>
          {item.badge}
        </span>
      )}
      
      <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
        {item.title}
      </h3>
      
      {item.description && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>
      )}
      
      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        {item.stats?.likes && (
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{item.stats.likes}</span>
          </div>
        )}
        {item.stats?.views && (
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{item.stats.views}</span>
          </div>
        )}
        {item.dateLabel && (
          <span>{item.dateLabel}</span>
        )}
      </div>
    </div>
  </div>
);

// Componente para elementos de noticias/eventos
const NewsEventItem: React.FC<{ item: NewsItem; colors: any; showDate?: boolean }> = ({ item, colors, showDate = false }) => (
  <div className="group cursor-pointer flex gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
    {/* Fecha (para eventos) */}
    {showDate && item.dateLabel && (
      <div className={`flex-shrink-0 w-9 h-10 ${colors.date} rounded text-center flex flex-col justify-center text-[11px] font-bold`}>
        <div className="text-base leading-none">{item.dateLabel.split(' ')[0]}</div>
        <div className="text-[10px]">{item.dateLabel.split(' ')[1]}</div>
      </div>
    )}
    
    {/* Imagen */}
    <div className="flex-shrink-0 w-14 h-10 rounded overflow-hidden relative">
      <Image
        src={item.imageUrl || '/api/placeholder/64/48'}
        alt={item.title}
        fill
        sizes="64px"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    
    {/* Contenido */}
    <div className="flex-1 min-w-0">
      {item.badge && (
        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-1 ${colors.badge}`}>
          {item.badge}
        </span>
      )}
      
      <h4 className="font-medium text-gray-900 text-sm leading-tight mb-0.5 group-hover:text-gray-700 transition-colors">
        {item.href ? (
          <Link href={item.href} className="hover:underline">
            {item.title}
          </Link>
        ) : (
          item.title
        )}
      </h4>
      
      {item.description && (
        <p className="text-xs text-gray-600 line-clamp-2">
          {item.description}
        </p>
      )}
      
      {/* Stats */}
      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
        {item.stats?.likes && (
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{item.stats.likes}</span>
          </div>
        )}
        {item.stats?.views && (
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{item.stats.views}</span>
          </div>
        )}
        {!showDate && (
          <span>{item.dateLabel || formatRelativeEs(item.publishedAt)}</span>
        )}
      </div>
    </div>
  </div>
);

// Sección de noticias: 2 columnas (destacada + lista)
const NewsMosaic: React.FC<{ section: SectionData }> = ({ section }) => {
  const colors = toneClasses[section.tone || 'brand'];
  // ordenar por fecha (desc). Si no hay fecha o es inválida, va al final
  const parseTs = (v?: string | Date) => {
    if (!v) return 0;
    const t = new Date(v).getTime();
    return Number.isNaN(t) ? 0 : t;
  };
  const byTimeDesc = (a: NewsItem, b: NewsItem) => parseTs(b.publishedAt) - parseTs(a.publishedAt);
  const sorted = [...section.items].sort(byTimeDesc);
  // featured por id, o más reciente
  const featuredIndex = section.featuredId
    ? sorted.findIndex((i) => i.id === section.featuredId)
    : sorted.length > 0 ? 0 : -1;
  const featured = featuredIndex >= 0 ? sorted[featuredIndex] : undefined;
  const others = featuredIndex >= 0 ? sorted.filter((_, idx) => idx !== featuredIndex) : [];

  return (
    <section className="bg-white rounded-md p-3 h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className={`text-base font-semibold ${colors.section}`}>{section.title}</h2>
        {section.ctaLabel && (
          <Link href={section.ctaHref || '#'} className={`flex items-center gap-1 text-xs font-medium transition-colors px-2 py-1 rounded ${colors.cta}`}>
            {section.ctaLabel}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(!featured) && (
          <p className="text-sm text-gray-600 mb-3">Sin noticias por mostrar.</p>
        )}
        {/* Destacada */}
        {featured && (
          <article className="group">
            <div className="relative w-full overflow-hidden rounded-lg aspect-[16/9]">
              {featured.href ? (
                <Link href={featured.href} className="absolute inset-0">
                  <Image
                    src={featured.imageUrl || '/api/placeholder/640/360'}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              ) : (
                <Image
                  src={featured.imageUrl || '/api/placeholder/640/360'}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {featured.badge && (
                <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded-full border ${colors.badge}`}>
                  {featured.badge}
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1.5">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                {featured.href ? (
                  <Link href={featured.href} className="hover:underline">
                    {featured.title}
                  </Link>
                ) : (
                  featured.title
                )}
              </h3>
              {featured.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{featured.description}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {featured.stats?.likes && (
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{featured.stats.likes}</span>
                )}
                {featured.stats?.views && (
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featured.stats.views}</span>
                )}
                <span>{featured.dateLabel || formatRelativeEs(featured.publishedAt)}</span>
              </div>
            </div>
          </article>
        )}
        {/* Lista de resto de noticias */}
        <div className="space-y-1">
          {others.map((item) => (
            <NewsEventItem key={item.id} item={item} colors={colors} />
          ))}
        </div>
      </div>
    </section>
  );
};

export interface MosaicCardsProps {
  title?: string;
  items?: NewsItem[];
  ctaLabel?: string;
  ctaHref?: string;
  featuredId?: string;
  tone?: ToneName;
  className?: string;
  newsData?: SectionData; // opcional para compatibilidad
}

// Componente principal
const MosaicCards: React.FC<MosaicCardsProps> = ({
  title,
  items,
  ctaLabel,
  ctaHref,
  featuredId,
  tone,
  className = '',
  newsData,
}) => {
  // Datos de ejemplo basados en la imagen (fallbacks)
  const defaultNewsData: SectionData = {
    title: 'Ultimas novedades',
    ctaLabel: 'Ver mas',
    tone: 'warm',
    items: [
    ]
  };

  const section: SectionData = newsData || {
    title: title ?? defaultNewsData.title,
    items: items ?? defaultNewsData.items,
    ctaLabel: ctaLabel,
    ctaHref: ctaHref,
    featuredId: featuredId,
    tone: tone ?? defaultNewsData.tone,
  };

  return (
    <div className={`w-full ${className}`}>
      <NewsMosaic section={section} />
    </div>
  );
};

export default MosaicCards;
