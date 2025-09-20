"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";

export type EventStatus = "upcoming" | "live" | "past" | "info";

export interface EventCTA {
  label: string;
  href: string;
  external?: boolean;
}

export interface EventItem {
  image: string;
  title: string;
  description?: string;
  cta?: EventCTA;
  date?: string | Date; // fecha de inicio
  endDate?: string | Date; // fecha de fin (opcional)
  time?: string; // texto libre, si quieres forzar hora
  location?: string; // lugar (opcional)
  published?: boolean; // true por defecto; si false, no se muestra
  category?: string; // opcional, para chips
  featured?: boolean; // resaltar tarjeta
}

export interface EventsMosaicProps {
  items: EventItem[];
  className?: string;
  variant?: "grid" | "list";
  locale?: string; // por defecto "es-ES"
}

const toDate = (v?: string | Date): Date | undefined => {
  if (!v) return undefined;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? undefined : d;
};

const getStatus = (start?: Date, end?: Date): EventStatus => {
  if (!start) return "info";
  const now = new Date();
  const starts = start.getTime();
  const ends = end?.getTime();

  if (ends && now.getTime() > ends) return "past";
  if (!ends && now.getTime() > starts && now.toDateString() !== start.toDateString()) return "past";
  if (starts <= now.getTime() && (!ends || now.getTime() <= ends)) return "live";
  return "upcoming";
};

const formatDateRange = (start?: Date, end?: Date, locale: string = "es-ES") => {
  if (!start) return "Fecha por confirmar";

  const sameDay = end && start.toDateString() === end.toDateString();
  const optsDay: Intl.DateTimeFormatOptions = { day: "2-digit" };
  const optsMonth: Intl.DateTimeFormatOptions = { month: "short" };
  const optsFull: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };

  if (!end) return new Intl.DateTimeFormat(locale, optsFull).format(start);
  if (sameDay) {
    return new Intl.DateTimeFormat(locale, optsFull).format(start);
  }
  const d1 = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(start);
  const d2 = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(end);
  return `${d1} – ${d2}`;
};

const statusCopy: Record<EventStatus, { label: string; color: string }> = {
  upcoming: { label: "Próximo", color: "bg-teal-600 text-white" },
  live: { label: "En vivo", color: "bg-brand-600 text-white" },
  past: { label: "Finalizado", color: "bg-neutral-200 text-neutral-700" },
  info: { label: "Info", color: "bg-neutral-200 text-neutral-700" },
};

const Card = ({ item, index, variant, locale = "es-ES" }: { item: EventItem; index: number; variant: "grid" | "list"; locale?: string }) => {
  const start = toDate(item.date);
  const end = toDate(item.endDate);
  const status = getStatus(start, end);
  const isEmphasis = variant === "grid" ? (index === 0 || item.featured) : false;

  const dateText = formatDateRange(start, end, locale);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-5 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1 ${
        isEmphasis ? "lg:col-span-2 lg:flex-row lg:items-stretch lg:gap-8 lg:p-6" : ""
      }`}
    >
      <div className="absolute inset-0 bg-surface-100/30 opacity-70 blur-3xl" aria-hidden />
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/60" aria-hidden />

      <div className={`relative ${isEmphasis ? "lg:w-3/5" : ""}`}>
        <div
          className={`relative h-44 w-full overflow-hidden rounded-2xl border border-white/50 bg-white/35 shadow-inner transition-transform duration-300 group-hover:scale-[1.02] ${
            isEmphasis ? "lg:h-full lg:min-h-[280px]" : ""
          }`}
        >
          <Image src={item.image} alt={item.title} fill sizes={isEmphasis ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 768px) 40vw, 100vw"} className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-700/30 via-transparent to-transparent" aria-hidden />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${statusCopy[status].color}`}>
              {statusCopy[status].label}
            </span>
            {item.category && (
              <span className="inline-flex items-center rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-700">
                {item.category}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-ink-700 shadow-sm">
              <Calendar className="h-4 w-4" />
              <span>{dateText}</span>
            </div>
            {item.location && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-ink-700 shadow-sm">
                <MapPin className="h-4 w-4" />
                <span className="truncate max-w-[10rem] lg:max-w-[16rem]">{item.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col gap-3 ${isEmphasis ? "lg:w-2/5 lg:justify-center lg:pl-4" : "mt-4"}`}>
        <h3 className="text-xl font-semibold leading-snug text-ink-700">{item.title}</h3>

        {item.description && <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {item.time && (
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-600">
              <Clock className="h-3.5 w-3.5" />
              <span>{item.time}</span>
            </div>
          )}

          {item.cta && (
            <Link
              href={item.cta.href}
              target={item.cta.external ? "_blank" : undefined}
              rel={item.cta.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-ink-700 transition-colors duration-200 hover:border-transparent hover:bg-ink-700 hover:text-white"
            >
              {item.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export const EventsMosaic = ({ items, className = "", variant = "grid", locale = "es-ES" }: EventsMosaicProps) => {
  const visible = (items || []).filter((i) => i.published !== false);
  if (!visible.length) return null;

  if (variant === "list") {
    return (
      <div className={`space-y-3 ${className}`}>
        {visible.map((item, index) => (
          <Card key={`${item.title}-${index}`} item={item} index={index} variant="list" locale={locale} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-5 lg:grid-cols-3 ${className}`}>
      {visible.map((item, index) => (
        <Card key={`${item.title}-${index}`} item={item} index={index} variant="grid" locale={locale} />
      ))}
    </div>
  );
};

export default EventsMosaic;

