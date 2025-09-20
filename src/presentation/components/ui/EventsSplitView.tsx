"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { EventItem } from "./EventsMosaic";

export interface EventsSplitViewProps {
  items: EventItem[];
  className?: string;
  locale?: string; // default es-ES
  initialIndex?: number;
  maxList?: number; // cuántos items en la columna izquierda
  anchorId?: string; // id del contenedor de detalle para scroll
}

const toDate = (v?: string | Date): Date | undefined => {
  if (!v) return undefined;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? undefined : d;
};

const formatDateRange = (start?: Date, end?: Date, locale: string = "es-ES") => {
  if (!start) return "Fecha por confirmar";
  if (!end || start.toDateString() === end.toDateString()) {
    return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(start);
  }
  const d1 = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(start);
  const d2 = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(end);
  return `${d1} – ${d2}`;
};

export default function EventsSplitView({ items, className = "", locale = "es-ES", initialIndex = 0, maxList = 6, anchorId = "events-detail" }: EventsSplitViewProps) {
  const visible = useMemo(() => (items || []).filter((i) => i.published !== false), [items]);
  const safeIndex = Math.min(Math.max(initialIndex, 0), Math.max(visible.length - 1, 0));
  const [selected, setSelected] = useState<number>(safeIndex);
  const detailRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Si la lista cambia, reajustar selección
    if (selected > visible.length - 1) setSelected(0);
  }, [visible.length]);

  if (!visible.length) return null;

  const selectedItem = visible[selected];
  const start = toDate(selectedItem.date);
  const end = toDate(selectedItem.endDate);
  const dateText = formatDateRange(start, end, locale);

  const handleSelect = (i: number) => {
    setSelected(i);
    // scroll suave al detalle cuando se elige un item
    // se ejecuta sólo en cliente
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia && window.matchMedia('(max-width: 1023px)').matches;
      if (isMobile) {
        // permitir que el layout procese la selección
        requestAnimationFrame(() => {
          if (detailRef.current) {
            detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            // actualizar hash para anclar
            try {
              if (anchorId) history.replaceState(null, "", `#${anchorId}`);
            } catch {}
          }
        });
      }
    }
  };

  return (
    <div className={`grid grid-cols-1 gap-6 lg:grid-cols-5 ${className}`}>
      {/* Lista compacta izquierda */}
      <aside className="lg:col-span-2">
        <ul className="flex max-h-[560px] flex-col gap-1 overflow-y-auto pr-1">
          {visible.slice(0, maxList).map((ev, i) => {
            const isActive = i === selected;
            const s = toDate(ev.date);
            const e = toDate(ev.endDate);
            return (
              <li key={`${ev.title}-${i}`}>
                <button
                  onClick={() => handleSelect(i)}
                  className={`group grid w-full grid-cols-[56px_1fr] items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors duration-200 ${
                    isActive ? "bg-surface-100" : "hover:bg-surface-100/70"
                  }`}
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                    <Image src={ev.image} alt={ev.title} fill className="object-cover" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`truncate text-sm font-semibold ${isActive ? "text-ink-700" : "text-ink-600"}`}>{ev.title}</h4>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[12px] text-neutral-600">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="truncate">{formatDateRange(s, e, locale)}</span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Detalle derecha */}
      <section id={anchorId} ref={detailRef} className="lg:col-span-3 focus:outline-none" tabIndex={-1}>
        {/* Re-monta en cada selección para disparar transición */}
        <Detail key={selected} item={selectedItem} dateText={dateText} />
      </section>
    </div>
  );
}

function Detail({ item, dateText }: { item: EventItem; dateText: string }) {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`transition-all duration-300 ease-out ${enter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      <div className="relative mb-4 h-64 w-full overflow-hidden rounded-2xl lg:h-80">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
        {/* Overlay sutil para contraste de texto si se requiere sobre imagen
            Manteniendo el diseño minimalista, sin bordes ni sombras. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <h3 className="text-2xl font-semibold text-ink-700">{item.title}</h3>
      {item.description && (
        <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{item.description}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-100 px-3 py-1.5 text-sm font-medium text-ink-700">
          <Calendar className="h-4 w-4" />
          {dateText}
        </span>
        {item.location && (
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-100 px-3 py-1.5 text-sm font-medium text-ink-700">
            <MapPin className="h-4 w-4" />
            {item.location}
          </span>
        )}

        {item.cta && (
          <Link
            href={item.cta.href}
            target={item.cta.external ? "_blank" : undefined}
            rel={item.cta.external ? "noopener noreferrer" : undefined}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-ink-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-600"
          >
            {item.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
