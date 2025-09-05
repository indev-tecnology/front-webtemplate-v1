"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function cn(...cls: Array<string | undefined | false | null>) {
  return cls.filter(Boolean).join(" ");
}

export type HeroSlide = {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  badge?: string | null;
  cta?: { label: string; href: string; external?: boolean } | null;
  tone?:
    | "indigo"
    | "blue"
    | "secondary"
    | "success"
    | "warning"
    | "info"
    | "neutral"
    | "brand"
    | "teal"
    | "green"
    | "violet"
    | "coral"
    | "sun"
    | "warm"
    | "muted"
    | {
        bg?: string; // background gradient classes
        text?: string; // text color classes
        ring?: string; // ring color classes for badges
        accent?: string; // CTA button classes
        shapes?: string[]; // optional gradients for decorative shapes
      };
};

export type HeroSliderProps = {
  slides: HeroSlide[];
  className?: string;
  aspect?: "compact" | "wide" | "standard" | "tall";
  layout?: "overlay" | "split";
  contentPlacement?: "left" | "right";
  overlay?: boolean; // only for overlay variant
  autoPlay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  reduceMotion?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  imageFit?: "cover" | "contain";
  /** Hide the image column on small screens for better readability */
  hideImageOnMobile?: boolean;
  /** Hide navigation arrows on small screens */
  hideArrowsOnMobile?: boolean;
  bottomContent?: React.ReactNode;
};

// Tone presets aligned with Tailwind palette keys used in the project
const tonePresets: Record<
  Extract<HeroSlide["tone"], string>,
  { bg: string; text: string; ring: string; accent: string }
> = {
  indigo: {
    bg: "from-tone-blue to-ink-900",
    text: "text-white",
    ring: "ring-tone-blue/30",
    accent: "bg-ink-900 text-surface-0 hover:bg-ink-900/90",
  },
  blue: {
    bg: "from-tone-blue to-ink-900",
    text: "text-white",
    ring: "ring-tone-blue/30",
    accent: "bg-ink-900 text-surface-0 hover:bg-ink-900/90",
  },
  secondary: {
    bg: "from-tone-muted to-ink-900",
    text: "text-white",
    ring: "ring-tone-muted/30",
    accent: "bg-ink-900 text-surface-0 hover:bg-ink-900/90",
  },
  success: {
    bg: "from-tone-green to-ink-900",
    text: "text-white",
    ring: "ring-tone-green/30",
    accent: "bg-tone-green text-white hover:bg-tone-green/90",
  },
  warning: {
    bg: "from-tone-sun to-ink-900",
    text: "text-ink-900",
    ring: "ring-tone-sun/30",
    accent: "bg-tone-sun text-ink-900 hover:bg-tone-sun/90",
  },
  info: {
    bg: "from-tone-teal to-ink-900",
    text: "text-white",
    ring: "ring-tone-teal/30",
    accent: "bg-tone-teal text-white hover:bg-tone-teal/90",
  },
  neutral: {
    bg: "from-surface-50 to-ink-900",
    text: "text-white",
    ring: "ring-ink-500/30",
    accent: "bg-ink-900 text-surface-0 hover:bg-ink-900/90",
  },
  brand: {
    bg: "from-brand-500 to-ink-900",
    text: "text-white",
    ring: "ring-brand-500/30",
    accent: "bg-brand-600 text-white hover:bg-brand-600/90",
  },
  teal: {
    bg: "from-tone-teal to-ink-900",
    text: "text-white",
    ring: "ring-tone-teal/30",
    accent: "bg-tone-teal text-white hover:bg-tone-teal/90",
  },
  green: {
    bg: "from-tone-green to-ink-900",
    text: "text-white",
    ring: "ring-tone-green/30",
    accent: "bg-tone-green text-white hover:bg-tone-green/90",
  },
  violet: {
    bg: "from-tone-violet to-ink-900",
    text: "text-white",
    ring: "ring-tone-violet/30",
    accent: "bg-ink-900 text-surface-0 hover:bg-ink-900/90",
  },
  coral: {
    bg: "from-tone-coral to-ink-900",
    text: "text-white",
    ring: "ring-tone-coral/30",
    accent: "bg-tone-coral text-white hover:bg-tone-coral/90",
  },
  sun: {
    bg: "from-tone-sun to-ink-900",
    text: "text-ink-900",
    ring: "ring-tone-sun/30",
    accent: "bg-tone-sun text-ink-900 hover:bg-tone-sun/90",
  },
  warm: {
    bg: "from-tone-warm to-ink-900",
    text: "text-white",
    ring: "ring-tone-warm/30",
    accent: "bg-tone-warm text-white hover:bg-tone-warm/90",
  },
  muted: {
    bg: "from-tone-muted to-ink-900",
    text: "text-white",
    ring: "ring-tone-muted/30",
    accent: "bg-ink-900 text-surface-0 hover:bg-ink-900/90",
  },
};

function toneToClasses(tone: HeroSlide["tone"]) {
  if (!tone) return tonePresets.indigo;
  if (typeof tone === "string") return tonePresets[tone] ?? tonePresets.indigo;
  return {
    bg: tone.bg ?? tonePresets.indigo.bg,
    text: tone.text ?? tonePresets.indigo.text,
    ring: tone.ring ?? tonePresets.indigo.ring,
    accent: tone.accent ?? tonePresets.indigo.accent,
  };
}

function toneToShapes(tone: HeroSlide["tone"]) {
  const map: Record<Extract<HeroSlide["tone"], string>, string[]> = {
    indigo: [
      "from-tone-blue/35 to-tone-blue/15",
      "from-tone-blue/30 to-tone-blue/10",
      "from-tone-blue/25 to-tone-blue/10",
    ],
    blue: [
      "from-tone-blue/35 to-tone-blue/15",
      "from-tone-blue/30 to-tone-blue/10",
      "from-tone-blue/25 to-tone-blue/10",
    ],
    secondary: [
      "from-tone-muted/30 to-tone-muted/10",
      "from-tone-muted/25 to-tone-muted/10",
      "from-tone-muted/20 to-tone-muted/5",
    ],
    success: [
      "from-tone-green/30 to-tone-green/10",
      "from-tone-green/25 to-tone-green/10",
      "from-tone-green/20 to-tone-green/5",
    ],
    warning: [
      "from-tone-sun/35 to-tone-warm/15",
      "from-tone-sun/30 to-tone-warm/10",
      "from-tone-sun/25 to-tone-warm/10",
    ],
    info: [
      "from-tone-teal/35 to-tone-teal/15",
      "from-tone-teal/30 to-tone-teal/10",
      "from-tone-teal/25 to-tone-teal/10",
    ],
    neutral: [
      "from-surface-50/60 to-surface-0/0",
      "from-surface-50/40 to-surface-0/0",
      "from-surface-50/30 to-surface-0/0",
    ],
    brand: [
      "from-brand-500/35 to-brand-500/15",
      "from-brand-500/30 to-brand-500/10",
      "from-brand-500/25 to-brand-500/10",
    ],
    teal: [
      "from-tone-teal/35 to-tone-teal/15",
      "from-tone-teal/30 to-tone-teal/10",
      "from-tone-teal/25 to-tone-teal/10",
    ],
    green: [
      "from-tone-green/35 to-tone-green/15",
      "from-tone-green/30 to-tone-green/10",
      "from-tone-green/25 to-tone-green/10",
    ],
    violet: [
      "from-tone-violet/35 to-tone-violet/15",
      "from-tone-violet/30 to-tone-violet/10",
      "from-tone-violet/25 to-tone-violet/10",
    ],
    coral: [
      "from-tone-coral/35 to-tone-warm/15",
      "from-tone-coral/30 to-tone-warm/10",
      "from-tone-coral/25 to-tone-warm/10",
    ],
    sun: [
      "from-tone-sun/35 to-tone-warm/15",
      "from-tone-sun/30 to-tone-warm/10",
      "from-tone-sun/25 to-tone-warm/10",
    ],
    warm: [
      "from-tone-warm/35 to-tone-coral/15",
      "from-tone-warm/30 to-tone-coral/10",
      "from-tone-warm/25 to-tone-coral/10",
    ],
    muted: [
      "from-tone-muted/30 to-tone-muted/10",
      "from-tone-muted/25 to-tone-muted/10",
      "from-tone-muted/20 to-tone-muted/5",
    ],
  };
  if (tone && typeof tone !== "string" && tone.shapes?.length) return tone.shapes;
  if (!tone) return map.indigo;
  if (typeof tone === "string") return map[tone] ?? map.indigo;
  return map.indigo;
}

function usePrefersReducedMotion(forced?: boolean) {
  const [prefers, setPrefers] = useState(!!forced);
  useEffect(() => {
    if (typeof forced === "boolean") {
      setPrefers(forced);
      return;
    }
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [forced]);
  return prefers;
}

function aspectHeights(aspect: NonNullable<HeroSliderProps["aspect"]>) {
  switch (aspect) {
    case "compact":
      // Add min-height fallbacks to avoid tiny heroes on short viewports
      return "min-h-[280px] sm:min-h-[320px] md:min-h-[280px] h-[22svh] sm:h-[32svh] md:h-[30svh] lg:h-[36svh]";
    case "wide":
      return "min-h-[420px] sm:min-h-[480px] md:min-h-[520px] h-[50svh] md:h-[58svh] lg:h-[64svh]";
    case "tall":
      return "min-h-[560px] sm:min-h-[640px] md:min-h-[700px] h-[70svh] md:h-[78svh] lg:h-[84svh]";
    default:
      // standard
      return "min-h-[440px] sm:min-h-[520px] md:min-h-[560px] h-[56svh] md:h-[64svh] lg:h-[72svh]";
  }
}

function typographyByAspect(aspect: NonNullable<HeroSliderProps["aspect"]>) {
  if (aspect === "compact") {
    return {
      title: "text-3xl sm:text-4xl lg:text-5xl",
      desc: "text-sm sm:text-base",
      titleMargin: "mb-2",
      descMargin: "mb-4",
      // Prefer aspect-based sizing for predictability on small screens
      imageWrap: "relative mx-auto aspect-[4/3] w-full max-w-sm sm:max-w-md md:max-w-lg",
    } as const;
  }
  return {
    title: "text-4xl md:text-5xl lg:text-6xl",
    desc: "text-base md:text-lg",
    titleMargin: "mb-3",
    descMargin: "mb-6",
    // Scale image progressively while keeping a stable aspect
    imageWrap: "relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl",
  } as const;
}

function DecorativeShapes({ side, shapes }: { side: "left" | "right" | "full"; shapes: string[] }) {
  const base = "hidden sm:block pointer-events-none absolute inset-0 mix-blend-multiply";
  const mask = side === "full" ? "" : side === "left" ? "[mask-image:linear-gradient(to_right,black,65%,transparent)]" : "[mask-image:linear-gradient(to_left,black,65%,transparent)]";
  return (
    <div className={cn(base, mask)} aria-hidden>
      <div className={cn("absolute -left-16 top-[-12%] h-[150%] w-24 rotate-6 bg-gradient-to-b", shapes[0])} />
      <div className={cn("absolute left-6 top-[-10%] h-[150%] w-28 -rotate-3 bg-gradient-to-b", shapes[1])} />
      <div className={cn("absolute left-32 top-[-8%] h-[150%] w-24 rotate-12 bg-gradient-to-b", shapes[2])} />
      <div
        className={cn(
          "absolute left-[-8%] top-8 h-56 w-72 bg-gradient-to-br opacity-70",
          shapes[1],
          "[clip-path:polygon(0%_0%,70%_0%,100%_50%,30%_100%,0%_100%)]"
        )}
      />
      <div className="absolute left-0 top-0 h-full w-2/5 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

export function HeroSlider({
  slides,
  className,
  aspect = "compact",
  layout = "split",
  contentPlacement = "left",
  overlay = true,
  autoPlay = true,
  intervalMs = 6000,
  pauseOnHover = true,
  reduceMotion,
  showIndicators = true,
  showArrows = true,
  imageFit = "contain",
  hideImageOnMobile = true,
  hideArrowsOnMobile = true,
  bottomContent,
}: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hovering = useRef(false);

  const current = slides[index] ?? null;
  const tone = useMemo(() => toneToClasses(current?.tone), [current?.tone]);
  const shapes = useMemo(() => toneToShapes(current?.tone), [current?.tone]);
  const prefersRM = usePrefersReducedMotion(reduceMotion);
  const typo = useMemo(() => typographyByAspect(aspect), [aspect]);
  

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // autoplay (sin barra de progreso)
  useEffect(() => {
    if (!autoPlay || count <= 1 || prefersRM) return;
    if (pauseOnHover && hovering.current) return;

    if (timerRef.current) clearInterval(timerRef.current);
    const duration = Math.max(2500, intervalMs);
    timerRef.current = setInterval(next, duration);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, intervalMs, next, count, pauseOnHover, prefersRM, index]);

  // hover pause
  useEffect(() => {
    if (!pauseOnHover) return;
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => {
      hovering.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
    };
    const onLeave = () => {
      hovering.current = false;
      if (autoPlay && count > 1 && !prefersRM) {
        const duration = Math.max(2500, intervalMs);
        timerRef.current = setInterval(next, duration);
      }
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseOnHover, autoPlay, count, prefersRM, intervalMs, next]);

  if (!count) return null;

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [next, prev]
  );

  const heights = useMemo(() => aspectHeights(aspect), [aspect]);

  return (
    <section
      ref={containerRef}
      className={cn("relative w-full isolate overflow-hidden bg-white", heights, className)}
      aria-roledescription="carousel"
      aria-label="Hero announcements"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      {/* Progress bar removed per request */}

      {layout === "overlay" ? (
        <div className="absolute inset-0">
          {/* Cross-fade background images */}
          {slides.map((s, i) => (
            <div
              key={s.id ?? i}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-out",
                i === index ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={s.image || "/wex_default.png"}
                alt={s.title}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/10" />
          )}
          {!prefersRM && <DecorativeShapes side={"full"} shapes={shapes} />}
        </div>
      ) : (
        <div className="absolute inset-0">
          <div className="absolute right-[-6rem] top-[-6rem] h-80 w-80 rounded-[40%] bg-gradient-to-br from-orange-50 to-rose-100" />
          {!prefersRM && <DecorativeShapes side={contentPlacement} shapes={shapes} />}
        </div>
      )}

      {/* Content */}
      {layout === "split" ? (
        <div className={cn("relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-6 sm:gap-8 lg:gap-12 px-6 md:grid-cols-2 md:px-10 lg:px-16")}>
          {/* Left content */}
          <div className={cn("h-full flex items-center", contentPlacement === "left" ? "order-1" : "order-2")}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative max-w-2xl"
              >
                {current?.badge && (
                  <span
                    className={cn(
                      "inline-block mb-3 rounded-full px-3.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
                      "bg-white text-neutral-900",
                      tone.ring
                    )}
                  >
                    {current.badge}
                  </span>
                )}
                <h1 className={cn(typo.title, "font-bold tracking-tight leading-tight", typo.titleMargin, "text-neutral-900")}>
                  {current?.title}
                </h1>
                {current?.description && (
                  <p className={cn(typo.desc, typo.descMargin, "text-neutral-600 leading-relaxed")}>
                    {current.description}
                  </p>
                )}
                {current?.cta && <CtaButton cta={current.cta} classes={tone.accent} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right image */}
          <div
            className={cn(
              "relative h-full items-center",
              // Hide the image on small screens if requested
              hideImageOnMobile ? "hidden sm:flex" : "flex",
              contentPlacement === "left" ? "order-2" : "order-1"
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className={typo.imageWrap}
                initial={{ opacity: 0, scale: 1.02, x: 16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -16 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Image
                  src={current?.image || "/wex_default.png"}
                  alt={current?.title || "Hero image"}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 480px, (min-width: 640px) 50vw, 90vw"
                  // Only preload when the image column is visible on initial viewport
                  // to avoid browser warnings about unused preloads on mobile.
                  priority={!hideImageOnMobile && index === 0}
                  // Prefer contain on mobile to avoid awkward crops
                  className={cn(
                    imageFit === "cover"
                      ? "object-contain sm:object-cover"
                      : "object-contain"
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 md:px-10 lg:px-16",
            contentPlacement === "left" ? "justify-start" : "justify-end"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="relative max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className={cn("relative overflow-hidden rounded-2xl p-5 sm:p-6 md:p-8", tone.text)}>
                <div
                  className={cn(
                    "absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br",
                    tonePresets.indigo.bg,
                    tone.text
                  )}
                  aria-hidden
                />
                <div
                  className={cn(
                    "absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r",
                    tonePresets.indigo.bg
                  )}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.08]"
                  style={{
                    backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                    color: "#0f172a",
                  }}
                  aria-hidden
                />
                {current?.badge && (
                  <span
                    className={cn(
                      "relative inline-block mb-3 rounded-full px-3.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
                      "bg-white text-neutral-900",
                      tone.ring
                    )}
                  >
                    {current.badge}
                  </span>
                )}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-3">
                  {current?.title}
                </h1>
                {current?.description && (
                  <p className="text-sm md:text-base lg:text-lg mb-6 text-neutral-700 leading-relaxed">
                    {current.description}
                  </p>
                )}
                {current?.cta && <CtaButton cta={current.cta} classes={tone.accent} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Controls */}
      {count > 1 && (
        <>
          {showArrows && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className={cn(
                  "z-30 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 items-center justify-center rounded-full p-2.5 sm:p-3 shadow-md ring-1 ring-black/10 bg-white/85 text-neutral-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800/30 backdrop-blur-sm",
                  hideArrowsOnMobile ? "hidden sm:inline-flex" : "inline-flex"
                )}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className={cn(
                  "z-30 absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 items-center justify-center rounded-full p-2.5 sm:p-3 shadow-md ring-1 ring-black/10 bg-white/85 text-neutral-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800/30 backdrop-blur-sm",
                  hideArrowsOnMobile ? "hidden sm:inline-flex" : "inline-flex"
                )}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {showIndicators && (
            <div className="z-30 absolute bottom-3 sm:bottom-4 inset-x-0 flex flex-col items-center gap-2 px-6">
              <div className="flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "h-2.5 w-2.5 sm:h-2 sm:w-2 rounded-full border border-black/20 transition-all",
                      i === index ? "bg-neutral-900" : "bg-neutral-400 hover:bg-neutral-500"
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Optional bottom content */}
      {bottomContent && (
        <div className="absolute inset-x-0 bottom-0 z-20 w-full">
          {bottomContent}
        </div>
      )}
    </section>
  );
}

function CtaButton({ cta, classes }: { cta: NonNullable<HeroSlide["cta"]>; classes: string }) {
  const { label, href, external } = cta;
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold shadow-lg",
    "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]",
    classes
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
      {label}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M8 16l8-8M12 8h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  ) : (
    <Link href={href} className={base}>
      {label}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M8 16l8-8M12 8h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
