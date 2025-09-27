import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { EventItem } from "./EventsMosaic";
import { SectionHeader, type SectionHeaderProps } from "./SectionHeader";

export interface EventsShowcaseProps {
  items: EventItem[];
  className?: string;
  locale?: string;
  title?: string;
  pastLabel?: string;
  detailsLabel?: string;
  detailsHref?: string | ((event: EventItem, index: number) => string | undefined);
  allEventsHref?: string;
  allEventsLabel?: string;
  headerDescription?: string;
  headerBadge?: string;
  headerTone?: SectionHeaderProps["tone"];
}

const toDate = (value?: string | Date): Date | undefined => {
  if (!value) return undefined;
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const formatDateRange = (start?: Date, end?: Date, locale: string = "es-ES") => {
  if (!start) return "Fecha por confirmar";
  if (!end || start.toDateString() === end.toDateString()) {
    return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(start);
  }
  const initial = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(start);
  const final = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(end);
  return `${initial} – ${final}`;
};

const resolveHeroBadge = (start?: Date) => {
  if (!start) return "Evento destacado";
  const now = new Date();
  return start.getTime() >= now.getTime() ? "Próximo evento" : "Evento destacado";
};

export default function EventsShowcase({
  items,
  className = "",
  locale = "es-ES",
  title,
  pastLabel = "Eventos anteriores",
  detailsLabel = "View Details",
  detailsHref,
  allEventsHref,
  allEventsLabel = "Ver todos los eventos",
  headerDescription,
  headerBadge,
  headerTone = "sun",
}: EventsShowcaseProps) {
  const visible = (items || []).filter((it) => it.published !== false);
  if (!visible.length) return null;

  const [hero, ...rest] = visible;
  const heroStart = toDate(hero.date);
  const heroEnd = toDate(hero.endDate);
  const heroDate = formatDateRange(heroStart, heroEnd, locale);
  const heroBadge = resolveHeroBadge(heroStart);
  const heroHeading = hero.title ? `Upcoming Event: ${hero.title}` : "Upcoming Event";

  const headerTitle = title ?? "Eventos";

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title={headerTitle}
          description={headerDescription}
          badge={headerBadge}
          align="left"
          tone={headerTone}
          className="md:max-w-2xl"
        />
        {allEventsHref && (
          <Link
            href={allEventsHref}
            className="inline-flex items-center gap-2 self-start rounded-full bg-tone-blue-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-tone-blue-600 md:self-center"
          >
            {allEventsLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <section className="relative overflow-hidden rounded-2xl bg-ink-700 shadow-[0_24px_52px_rgba(15,23,42,0.22)]">
        <div className="absolute inset-0">
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            priority
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-ink-900/50 to-ink-900/35" aria-hidden />
        </div>

        <div className="relative flex flex-col gap-4 px-6 py-10 text-white sm:px-10 sm:py-14 lg:max-w-2xl lg:px-14 lg:py-16">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            {heroBadge}
          </span>
          <h3 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {heroHeading}
          </h3>
          {hero.description && (
            <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-[1.05rem]">
              {hero.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5">
              <Calendar className="h-4 w-4" />
              {heroDate}
            </span>
            {hero.location && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5">
                <MapPin className="h-4 w-4" />
                {hero.location}
              </span>
            )}
          </div>

          {hero.cta && (
            <Link
              href={hero.cta.href}
              target={hero.cta.external ? "_blank" : undefined}
              rel={hero.cta.external ? "noopener noreferrer" : undefined}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-tone-blue-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-tone-blue-600"
            >
              {hero.cta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </section>

      {rest.length > 0 && (
        <section className="relative mt-4 overflow-hidden rounded-3xl border border-white/60 bg-white/75 p-6 shadow-[0_18px_52px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-8">
          <div className="pointer-events-none absolute -top-12 right-[-6rem] h-48 w-48 rounded-full bg-tone-blue-100/60 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 left-[-4rem] h-52 w-52 rounded-full bg-tone-sun-100/60 blur-3xl" aria-hidden />

          <div className="relative flex flex-col gap-4 border-b border-white/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="text-2xl font-semibold text-ink-700 sm:text-3xl">{pastLabel}</h4>
              <p className="text-sm text-neutral-600">Explora experiencias recientes y revive los momentos más destacados.</p>
            </div>
            {allEventsHref && (
              <Link
                href={allEventsHref}
                className="inline-flex items-center gap-2 self-start text-sm font-semibold text-tone-blue-600 transition-colors hover:text-tone-blue-700 sm:self-end"
              >
                {allEventsLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="relative mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((event, idx) => {
              const start = toDate(event.date);
              const end = toDate(event.endDate);
              const dateRange = formatDateRange(start, end, locale);
              const providedHref = typeof detailsHref === "function" ? detailsHref(event, idx) : detailsHref;
              const linkHref = event.cta?.href ?? providedHref;
              const linkLabel = event.cta?.label ?? (linkHref ? detailsLabel : undefined);
              const external = event.cta?.external ?? (linkHref ? linkHref.startsWith("http") : false);

              return (
                <article
                  key={`${event.title}-${idx}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.18)]"
                >
                  <div className="relative h-40 w-full sm:h-44">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 px-5 py-4 sm:px-6 sm:py-5">
                    <h5 className="text-[1.05rem] font-semibold text-ink-700">{event.title}</h5>
                    {event.description && (
                      <p className="text-sm leading-relaxed text-neutral-600">{event.description}</p>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-2 text-sm text-neutral-600">
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 font-medium">
                        <Calendar className="h-4 w-4 text-neutral-500" />
                        {dateRange}
                      </span>
                      {event.location && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 font-medium">
                          <MapPin className="h-4 w-4 text-neutral-500" />
                          {event.location}
                        </span>
                      )}
                    </div>

                    {linkHref && linkLabel && (
                      <Link
                        href={linkHref}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-tone-blue-600 transition-colors hover:text-tone-blue-700"
                      >
                        {linkLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
