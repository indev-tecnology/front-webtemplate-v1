"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type TipsTone =
  | "blue"
  | "teal"
  | "green"
  | "violet"
  | "coral"
  | "sun"
  | "warm"
  | "muted";

export interface TipItem {
  image: string;
  title: string;
  description?: string;
  badge?: string;
  tone?: TipsTone | string;
  cta?: { label: string; href: string };
  meta?: string;
}

export interface TipsMosaicProps {
  items: TipItem[];
  className?: string;
  variant?: "grid" | "list";
}

const tonePalette: Record<TipsTone, { ring: string; bg: string; text: string; badge: string; badgeText: string; description: string }> = {
  blue: {
    ring: "ring-tone-blue-100/50",
    bg: "bg-tone-blue-50/60",
    text: "text-tone-blue-700",
    badge: "bg-tone-blue-500/10",
    badgeText: "text-tone-blue-700",
    description: "text-tone-blue-700/80",
  },
  teal: {
    ring: "ring-tone-teal-100/50",
    bg: "bg-tone-teal-50/60",
    text: "text-tone-teal-700",
    badge: "bg-tone-teal-500/10",
    badgeText: "text-tone-teal-700",
    description: "text-tone-teal-700/80",
  },
  green: {
    ring: "ring-tone-green-100/50",
    bg: "bg-tone-green-50/60",
    text: "text-tone-green-700",
    badge: "bg-tone-green-500/10",
    badgeText: "text-tone-green-700",
    description: "text-tone-green-700/80",
  },
  violet: {
    ring: "ring-tone-violet-100/50",
    bg: "bg-tone-violet-50/60",
    text: "text-tone-violet-700",
    badge: "bg-tone-violet-500/10",
    badgeText: "text-tone-violet-700",
    description: "text-tone-violet-700/80",
  },
  coral: {
    ring: "ring-tone-coral-100/50",
    bg: "bg-tone-coral-50/60",
    text: "text-tone-coral-700",
    badge: "bg-tone-coral-500/10",
    badgeText: "text-tone-coral-700",
    description: "text-tone-coral-700/80",
  },
  sun: {
    ring: "ring-tone-sun-100/50",
    bg: "bg-tone-sun-50/60",
    text: "text-tone-sun-700",
    badge: "bg-tone-sun-500/10",
    badgeText: "text-tone-sun-700",
    description: "text-tone-sun-700/85",
  },
  warm: {
    ring: "ring-tone-warm-100/50",
    bg: "bg-tone-warm-50/60",
    text: "text-tone-warm-700",
    badge: "bg-tone-warm-500/10",
    badgeText: "text-tone-warm-700",
    description: "text-tone-warm-700/80",
  },
  muted: {
    ring: "ring-tone-muted-100/50",
    bg: "bg-tone-muted-50/60",
    text: "text-tone-muted-700",
    badge: "bg-tone-muted-500/10",
    badgeText: "text-tone-muted-700",
    description: "text-tone-muted-700/80",
  },
};

const getTone = (tone?: string): (typeof tonePalette)[TipsTone] => {
  const key = tone as TipsTone;
  return tonePalette[key] || tonePalette.muted;
};

const Card = ({ item, index, variant }: { item: TipItem; index: number; variant: "grid" | "list" }) => {
  const tone = getTone(item.tone);
  const isEmphasis = variant === "grid" ? index === 0 : false;

  return (
    <article
      className={`group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-5 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1 ${
        isEmphasis ? "lg:col-span-2 lg:flex-row lg:items-stretch lg:gap-8 lg:p-6" : ""
      }`}
    >
      <div className={`absolute inset-0 ${tone.bg} opacity-70 blur-3xl`} aria-hidden />
      <div className={`absolute inset-0 rounded-3xl ring-1 ${tone.ring}`} aria-hidden />

      <div className={`relative ${isEmphasis ? "lg:w-3/5" : ""}`}>
        <div
          className={`relative h-44 w-full overflow-hidden rounded-2xl border border-white/50 bg-white/35 shadow-inner transition-transform duration-300 group-hover:scale-[1.02] ${
            isEmphasis ? "lg:h-full lg:min-h-[280px]" : ""
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes={isEmphasis ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" aria-hidden />
          {item.badge && (
            <span
              className={`absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] ${tone.badge} ${tone.badgeText}`}
            >
              {item.badge}
            </span>
          )}
        </div>
      </div>

      <div className={`relative flex flex-1 flex-col gap-3 ${isEmphasis ? "lg:w-2/5 lg:justify-center lg:pl-4" : ""}`}>
        <div className="flex flex-col gap-2">
          <h3 className={`text-lg font-semibold leading-snug text-slate-900 ${tone.text}`}>
            {item.title}
          </h3>
          {item.meta && (
            <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500">{item.meta}</div>
          )}
        </div>

        {item.description && (
          <p className={`text-sm leading-relaxed ${tone.description}`}>
            {item.description}
          </p>
        )}

        {item.cta && (
          <Link
            href={item.cta.href}
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3 py-1.5 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:border-transparent hover:bg-slate-900 hover:text-white"
          >
            {item.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
};

export const TipsMosaic = ({ items, className = "", variant = "grid" }: TipsMosaicProps) => {
  if (!items.length) return null;

  if (variant === "list") {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((item, index) => (
          <Card key={`${item.title}-${index}`} item={item} index={index} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-5 lg:grid-cols-3 ${className}`}>
      {items.map((item, index) => (
        <Card key={`${item.title}-${index}`} item={item} index={index} variant="grid" />
      ))}
    </div>
  );
};

export default TipsMosaic;
