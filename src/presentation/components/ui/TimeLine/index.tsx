"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { toneClasses, ToneName } from '@/presentation/components/ui/CardMosaic';

export type TimeLineItem = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  cta: { label: string; href: string };
  dateLabel?: string;
  tone?: ToneName;
  imageUrl?: string; // opcional para ilustración
  kind?: 'info' | 'success' | 'warning' | 'note'; // para tips/recomendaciones
};

export type TimeLineProps = {
  items: TimeLineItem[];
  title?: string;
  subtitle?: string;
  tonePrimary?: ToneName; // tono por defecto de la sección
  className?: string;
  animate?: boolean;
  variant?: 'standard' | 'tips';
};

const dotBg: Record<ToneName, string> = {
  brand: 'bg-brand-600',
  blue: 'bg-tone-blue-600',
  teal: 'bg-tone-teal-600',
  green: 'bg-tone-green-600',
  violet: 'bg-tone-violet-600',
  coral: 'bg-tone-coral-600',
  sun: 'bg-tone-sun-600',
  warm: 'bg-tone-warm-600',
  muted: 'bg-tone-muted-600',
};

const blobGrad: Record<ToneName, string> = {
  brand: 'from-brand-100 to-brand-50',
  blue: 'from-tone-blue-100 to-tone-blue-50',
  teal: 'from-tone-teal-100 to-tone-teal-50',
  green: 'from-tone-green-100 to-tone-green-50',
  violet: 'from-tone-violet-100 to-tone-violet-50',
  coral: 'from-tone-coral-100 to-tone-coral-50',
  sun: 'from-tone-sun-100 to-tone-sun-50',
  warm: 'from-tone-warm-100 to-tone-warm-50',
  muted: 'from-tone-muted-100 to-tone-muted-50',
};

const toneLight: Record<ToneName, string> = {
  brand: 'bg-brand-100',
  blue: 'bg-tone-blue-100',
  teal: 'bg-tone-teal-100',
  green: 'bg-tone-green-100',
  violet: 'bg-tone-violet-100',
  coral: 'bg-tone-coral-100',
  sun: 'bg-tone-sun-100',
  warm: 'bg-tone-warm-100',
  muted: 'bg-tone-muted-100',
};

function PatternDots({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <defs>
        <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" className="fill-current opacity-20" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

function useInView<T extends HTMLElement>(opts: { rootMargin?: string } = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: opts.rootMargin || '-10% 0px -10% 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [opts.rootMargin]);
  return { ref, visible } as const;
}

function ItemCard({ item, index, fallbackTone, animate = true }: { item: TimeLineItem; index: number; fallbackTone: ToneName; animate?: boolean }) {
  const side = index % 2 === 0 ? 'left' : 'right';
  // Derivar tono por tipo de tip si no viene
  const toneFromKind: Partial<Record<NonNullable<TimeLineItem['kind']>, ToneName>> = {
    info: 'blue',
    success: 'green',
    warning: 'warm',
    note: 'violet',
  };
  const effectiveTone = item.tone || toneFromKind[item.kind || 'info'] || fallbackTone;
  const colors = toneClasses[effectiveTone];
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className={`relative grid gap-4 lg:grid-cols-2 items-center ${side === 'left' ? '' : 'lg:[&>div:first-child]:order-2'} transition-all duration-500 ${
        animate ? (visible ? 'opacity-100 translate-y-0' : `opacity-0 translate-y-6 ${side === 'left' ? '-translate-x-3' : 'translate-x-3'}`) : ''
      }`}
    >
      {/* Contenido textual (soporte tips) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {item.badge && (
            <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}>{item.badge}</span>
          )}
          {item.kind && (
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
              {item.kind === 'success' ? 'Recomendado' : item.kind === 'warning' ? 'Atención' : item.kind === 'note' ? 'Nota' : 'Tip'}
            </span>
          )}
        </div>
        <div className="relative">
          <h3 className="text-xl font-semibold text-ink-0">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          {/* Tarjeta tipo callout para tips */}
          <div className={`mt-2 rounded-xl border ${colors.badge.split(' ').find((c)=>c.startsWith('border-')) ? '' : 'border-gray-100'} bg-white/80 backdrop-blur p-3 shadow-sm`}></div>
          <div className="flex items-center gap-3 pt-2">
            <Link href={item.cta.href} className={`inline-flex items-center gap-1 text-sm font-medium ${colors.cta} px-1.5 py-1 rounded`}>
              {item.cta.label}
              <ChevronRight className="h-4 w-4" />
            </Link>
            {item.dateLabel && <span className="text-xs text-gray-500">{item.dateLabel}</span>}
          </div>
        </div>
      </div>
      {/* Ilustración / figura */}
      <div className="relative h-52 sm:h-60">
        {/* Blob de fondo con gradiente y blur */}
        <div className={`absolute -top-8 ${side === 'left' ? '-right-8' : '-left-8'} h-44 w-44 rounded-full bg-gradient-to-br ${blobGrad[effectiveTone]} blur-2xl opacity-70`} />
        {/* Patrón de puntos sobre el blob */}
        <div className={`absolute ${side === 'left' ? 'right-1' : 'left-1'} top-1 h-24 w-24 text-slate-400`}>
          <PatternDots className="h-full w-full" />
        </div>
        {/* Halo suave para ilustraciones con transparencia */}
        <div className={`absolute inset-0 mx-auto my-auto h-40 w-40 rounded-full ${toneLight[effectiveTone]} opacity-40 blur-3xl`} />
        {/* Plataforma/sombra elíptica */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-3 w-28 rounded-full bg-slate-400/20 blur-md" />
        {/* Imaginería: se evita fondo para favorecer PNG/SVG transparentes */}
        <div className="relative h-full w-full">
          {item.imageUrl ? (
            <Image src={item.imageUrl} alt={item.title} fill className="object-contain drop-shadow-xl" sizes="(max-width: 1024px) 100vw, 40vw" />
          ) : (
            <svg viewBox="0 0 300 200" className="h-full w-full">
              <defs>
                <linearGradient id="tlg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
              </defs>
              <rect x="0" y="150" width="300" height="40" rx="20" fill="#e2e8f0" opacity="0.5" />
              <rect x="40" y="70" width="80" height="50" rx="10" fill="url(#tlg)" />
              <rect x="130" y="55" width="120" height="65" rx="12" fill="#e2e8f0" />
              <circle cx="200" cy="90" r="10" fill="#94a3b8" />
            </svg>
          )}
        </div>
        {/* Conector brazo hacia la línea central */}
        <span className={`hidden lg:block absolute ${side === 'left' ? '-right-6' : '-left-6'} top-10 w-6 border-t border-dashed border-slate-300`} />
      </div>
    </article>
  );
}

export function TimeLine({ items, title, subtitle, tonePrimary = 'brand', className = '', animate = true, variant = 'tips' }: TimeLineProps) {
  return (
    <section className={`relative ${className}`}>
      {(title || subtitle) && (
        <header className="mb-8 text-center">
          {title && <h2 className="text-2xl sm:text-3xl font-bold text-ink-0">{title}</h2>}
          {subtitle && <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </header>
      )}

      <div className="relative mx-auto max-w-6xl">
        {/* Línea central punteada */}
        <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l border-dashed border-slate-200 lg:block" />

        <div className="space-y-12">
          {items.map((it, idx) => {
            const { ref, visible } = animate ? useInView<HTMLSpanElement>({ rootMargin: '-20% 0px -20% 0px' }) : { ref: { current: null }, visible: true } as any;
            return (
              <div key={it.id} className="relative">
                <span
                  ref={ref as any}
                  className={`hidden lg:block absolute left-1/2 -translate-x-1/2 -top-2 h-4 w-4 rounded-full ring-4 ring-white ${dotBg[it.tone || tonePrimary]} transition-transform duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
                />
                <ItemCard item={it} index={idx} fallbackTone={tonePrimary} animate={animate} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TimeLine;
