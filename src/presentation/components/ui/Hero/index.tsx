"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type HeroTone =
  | "blue"
  | "indigo"
  | "green"
  | "purple"
  | "orange"
  | "pink";

export type HeroSlide = {
  title: string;
  description: string;
  image: string;
  badge?: string;
  cta?: { label: string; href: string };
  tone?: HeroTone;
};

export type HeroSliderProps = {
  slides: HeroSlide[];
  intervalMs?: number;
  className?: string;
};

const TONE_STYLES: Record<
  HeroTone,
  { bg: string; textAccent: string; button: string }
> = {
  blue: {
    bg: "bg-gradient-to-br from-[#F2F6FF] to-[#FFFFFF]",
    textAccent: "text-[#1E40AF]",
    button: "bg-[#1E40AF] hover:bg-[#1E3A8A] focus-visible:ring-[#1E40AF]",
  },
  indigo: {
    bg: "bg-gradient-to-br from-[#EEF2FF] to-white",
    textAccent: "text-indigo-700",
    button: "bg-indigo-700 hover:bg-indigo-800 focus-visible:ring-indigo-700",
  },
  green: {
    bg: "bg-gradient-to-br from-[#ECFDF5] to-white",
    textAccent: "text-emerald-700",
    button: "bg-emerald-700 hover:bg-emerald-800 focus-visible:ring-emerald-700",
  },
  purple: {
    bg: "bg-gradient-to-br from-[#F5F3FF] to-white",
    textAccent: "text-purple-700",
    button: "bg-purple-700 hover:bg-purple-800 focus-visible:ring-purple-700",
  },
  orange: {
    bg: "bg-gradient-to-br from-[#FFF7ED] to-white",
    textAccent: "text-orange-700",
    button: "bg-orange-700 hover:bg-orange-800 focus-visible:ring-orange-700",
  },
  pink: {
    bg: "bg-gradient-to-br from-[#FDF2F8] to-white",
    textAccent: "text-pink-700",
    button: "bg-pink-700 hover:bg-pink-800 focus-visible:ring-pink-700",
  },
};

const isTone = (v: any): v is HeroTone =>
  ["blue", "indigo", "green", "purple", "orange", "pink"].includes(v);

export function HeroSlider({
  slides,
  intervalMs = 6000,
  className,
}: HeroSliderProps) {
  const safeSlides = Array.isArray(slides) ? slides : [];
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!safeSlides.length) return;
    if (index >= safeSlides.length) setIndex(0);
  }, [safeSlides.length]);

  const toneKey: HeroTone = isTone(safeSlides[index]?.tone)
    ? (safeSlides[index]!.tone as HeroTone)
    : "blue";
  const tone = TONE_STYLES[toneKey] ?? TONE_STYLES.blue;

  useEffect(() => {
    if (!safeSlides.length) return;
    if (pausedRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % safeSlides.length),
      intervalMs
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, safeSlides.length, intervalMs]);

  const onMouseEnter = () => {
    pausedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const onMouseLeave = () => {
    pausedRef.current = false;
  };

  const goTo = (i: number) => {
    if (!safeSlides.length) return;
    setIndex(((i % safeSlides.length) + safeSlides.length) % safeSlides.length);
  };

  if (!safeSlides.length) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Hero destacado"
      className={`relative isolate overflow-hidden rounded-2xl border border-slate-200 shadow-sm ${
        className ?? ""
      } ${tone.bg}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-16 lg:py-18">
        {/* Texto */}
        <div className="order-2 md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-4"
            >
              {safeSlides[index]?.badge && (
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tone.textAccent} border-current bg-white/60 backdrop-blur-sm`}
                >
                  {safeSlides[index].badge}
                </span>
              )}

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                <AutoAccent
                  text={safeSlides[index]?.title ?? ""}
                  accentClass={tone.textAccent}
                />
              </h1>

              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                {safeSlides[index]?.description}
              </p>

              <div className="flex items-center gap-4 pt-2">
                {safeSlides[index]?.cta && (
                  <Link
                    href={safeSlides[index].cta.href}
                    className={`inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 ${tone.button}`}
                  >
                    {safeSlides[index].cta.label}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Imagen */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-md sm:max-w-lg rounded-2xl bg-transparent">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Image
                  src={safeSlides[index]?.image ?? ""}
                  alt={safeSlides[index]?.title ?? ""}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 60vw, 90vw"
                  className="rounded-xl object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controles inferiores: flechas + indicadores (solo desktop) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-3 hidden justify-center md:flex"
        aria-hidden
      >
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-2 py-1.5 backdrop-blur-md shadow-sm">
          {/* Prev */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => goTo(index - 1)}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" aria-hidden />
          </button>

          {/* Dots */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Paginación"
          >
            {safeSlides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir al slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 w-7 rounded-full transition-all ${
                  i === index
                    ? "bg-slate-900"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => goTo(index + 1)}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

function AutoAccent({
  text,
  accentClass,
}: {
  text: string;
  accentClass: string;
}) {
  if (!text) return null;
  const tokens = text.split(" ");
  const re = /(IT|Tech|Cloud|Data|AI)/i;
  const idx =
    tokens.findIndex((t, i) => i === tokens.length - 1 || re.test(tokens[i])) ??
    tokens.length - 1;

  return (
    <span>
      {tokens.map((t, i) => (
        <span key={i} className={i === idx ? accentClass : undefined}>
          {t}
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
