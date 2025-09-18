import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Eye, Heart } from 'lucide-react';
import { SectionData, toneClasses, formatRelativeEs, ToneName } from '@/presentation/components/ui/CardMosaic';

export interface EventsPanelProps {
  title?: string;
  items?: SectionData['items'];
  ctaLabel?: string;
  ctaHref?: string;
  tone?: ToneName;
  badgeTone?: ToneName;
  showEventDates?: boolean;
  className?: string;
  eventsData?: SectionData; // compatibilidad opcional
}

const EventListItem: React.FC<{ item: SectionData['items'][number]; colors: any; badgeColors: any; showDate?: boolean }> = ({ item, colors, badgeColors, showDate = false }) => (
  <div className="group cursor-pointer flex gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
    {showDate && (
      <div className={`flex-shrink-0 w-9 h-10 ${colors.date} rounded text-center flex flex-col justify-center text-[11px] font-bold`}
        title={item.dateLabel || formatRelativeEs(item.startsAt)}>
        {(() => {
          const date = item.startsAt ? new Date(item.startsAt) : undefined;
          const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
          const dd = date ? date.getDate().toString().padStart(2,'0') : (item.dateLabel?.split(' ')[0] || '');
          const mm = date ? months[date.getMonth()] : (item.dateLabel?.split(' ')[1] || '');
          return (
            <>
              <div className="text-base leading-none">{dd}</div>
              <div className="text-[10px]">{mm}</div>
            </>
          );
        })()}
      </div>
    )}
    <div className="flex-shrink-0 w-14 h-10 rounded overflow-hidden relative">
      {item.href ? (
        <Link href={item.href} className="absolute inset-0">
          <Image
            src={item.imageUrl || '/api/placeholder/64/48'}
            alt={item.title}
            fill
            sizes="64px"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
      ) : (
        <Image
          src={item.imageUrl || '/api/placeholder/64/48'}
          alt={item.title}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      )}
    </div>
    <div className="flex-1 min-w-0">
      {item.badge && (
        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-1 ${badgeColors.badge}`}>
          {item.badge}
        </span>
      )}
      <h4 className="font-medium text-gray-900 text-sm leading-tight mb-0.5 group-hover:text-gray-700 transition-colors">
        {item.href ? (
          <Link href={item.href} className="hover:underline">{item.title}</Link>
        ) : (
          item.title
        )}
      </h4>
      {item.description && (
        <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
      )}
      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
        {item.stats?.likes && (
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{item.stats.likes}</span>
        )}
        {item.stats?.views && (
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{item.stats.views}</span>
        )}
        {!showDate && (
          <span>{item.dateLabel || formatRelativeEs(item.startsAt)}</span>
        )}
      </div>
    </div>
  </div>
);

const EventsPanel: React.FC<EventsPanelProps> = ({ title, items, ctaLabel, ctaHref, tone, badgeTone, eventsData, showEventDates = true, className = '' }) => {
  const defaults: SectionData = {
    title: 'Nuestros eventos',
    ctaLabel: 'Ver todos',
    tone: 'teal',
    items: [],
  };
  const section: SectionData = eventsData || {
    title: title ?? defaults.title,
    items: items ?? defaults.items,
    ctaLabel: ctaLabel,
    ctaHref: ctaHref,
    tone: tone ?? defaults.tone,
  };
  const colors = toneClasses[section.tone || 'brand'];
  const badgeColors = toneClasses[badgeTone || section.tone || 'brand'];
  return (
    <section className={`bg-white rounded-md p-3 h-full ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className={`text-base font-semibold ${colors.section}`}>{section.title}</h2>
        {section.ctaLabel && (
          <Link href={section.ctaHref || '#'} className={`flex items-center gap-1 text-xs font-medium transition-colors px-2 py-1 rounded ${colors.cta}`}>
            {section.ctaLabel}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      <div className="space-y-1">
        {section.items.length === 0 && (
          <p className="text-sm text-gray-600 mb-3">Sin eventos por mostrar.</p>
        )}
        {section.items.map((item) => (
          <EventListItem key={item.id} item={item} colors={colors} badgeColors={badgeColors} showDate={showEventDates} />
        ))}
      </div>
    </section>
  );
};

export default EventsPanel;
