// MosaicCards.tsx
// Componente de mosaico responsive para Next.js + Tailwind.
// Soporta: título, descripción, badge opcional, CTA opcional, imagen/cover opcional,
// overlay con degradado, variantes de color, y accesibilidad.

import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export type MosaicItem = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  href?: string; // si existe renderiza <Link>
  ctaLabel?: string; // texto del botón/ícono
  onClick?: () => void; // alternativa a href
  imageUrl?: string; // cover opcional
  imageAlt?: string;
  dateLabel?: string; // por si se requiere etiqueta de fecha/breve metadato
  tone?:
    | "brand"
    | "neutral"
    | "emerald"
    | "sky"
    | "violet"
    | "amber"
    | "rose";
};

export type MosaicCardsProps = {
  items: MosaicItem[];
  columns?: 1 | 2 | 3 | 4; // en desktop
  aspect?: "square" | "landscape" | "video"; // controla alto visual del cover
  className?: string;
  // Cuando se requiera colocar algo arriba o abajo del grid
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

const aspectMap = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  video: "aspect-[16/9]",
} as const;

export function MosaicCards({
  items,
  columns = 3,
  aspect = "square",
  className,
  headerSlot,
  footerSlot,
  ...props
}: MosaicCardsProps) {
  return (
    <section
      aria-label="Mosaic cards"
      className={[
        "w-full",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {headerSlot}
      <div
        className={[
          "grid gap-4 sm:gap-6",
          // columnas responsivas
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {items.map((item) => (
          <MosaicCard key={item.id} item={item} aspect={aspect} />
        ))}
      </div>
      {footerSlot}
    </section>
  );
}

function MosaicCard({ item, aspect }: { item: MosaicItem; aspect: MosaicCardsProps["aspect"] }) {
  const Wrapper: any = item.href ? Link : item.onClick ? "button" : "div";
  const clickable = !!(item.href || item.onClick);

  return (
    <Wrapper
      href={item.href as any}
      onClick={item.onClick}
      className={[
        "group relative isolate overflow-hidden rounded-2xl",
        "border border-token-border/50 bg-surface",
        // Hover animation añadida aquí:
        "shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]",
        clickable &&
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand/70",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={item.title}
    >
      <div className={["relative w-full", aspectMap[aspect!]].join(" ")}>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted/40 to-muted/10" />
        )}
        <div
          className={[
            "absolute inset-0",
            gradientByTone(item.tone ?? "neutral"),
            "opacity-80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90",
          ].join(" ")}
        />
        {(item.href || item.onClick) && (
          <span
            aria-hidden
            className={[
              "absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-xl",
              bgTone(item.tone ?? "brand"),
              "text-white/95 shadow-sm transition-transform duration-300 group-hover:scale-105",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </span>
        )}
      </div>

      <div className="relative z-10 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          {item.badge && (
            <span
              className={[
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                bgToneSoft(item.tone ?? "brand"),
              ].join(" ")}
            >
              {item.badge}
            </span>
          )}
          {item.dateLabel && (
            <span className="ml-auto text-xs text-muted-foreground">{item.dateLabel}</span>
          )}
        </div>

        <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-foreground">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
            {item.description}
          </p>
        )}

        {(item.href || item.onClick || item.ctaLabel) && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              {item.ctaLabel ?? "Ver más"}
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                fill="currentColor"
                aria-hidden
              >
                <path
                  d="M5 12h12m0 0-5-5m5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

function gradientByTone(tone: NonNullable<MosaicItem["tone"]>) {
  const byTone: Record<string, string> = {
    brand: "bg-gradient-to-tr from-brand/80 via-brand-600/60 to-brand-400/40",
    neutral: "bg-gradient-to-tr from-black/50 via-neutral-700/40 to-neutral-500/20",
    emerald: "bg-gradient-to-tr from-emerald-900/70 via-emerald-700/50 to-emerald-500/30",
    sky: "bg-gradient-to-tr from-sky-900/70 via-sky-700/50 to-sky-500/30",
    violet: "bg-gradient-to-tr from-violet-900/70 via-violet-700/50 to-violet-500/30",
    amber: "bg-gradient-to-tr from-amber-900/70 via-amber-700/50 to-amber-500/30",
    rose: "bg-gradient-to-tr from-rose-900/70 via-rose-700/50 to-rose-500/30",
  };
  return byTone[tone] || byTone.neutral;
}

function bgTone(tone: NonNullable<MosaicItem["tone"]>) {
  const byTone: Record<string, string> = {
    brand: "bg-brand",
    neutral: "bg-foreground",
    emerald: "bg-emerald-600",
    sky: "bg-sky-600",
    violet: "bg-violet-600",
    amber: "bg-amber-600",
    rose: "bg-rose-600",
  };
  return byTone[tone] || byTone.neutral;
}

function bgToneSoft(tone: NonNullable<MosaicItem["tone"]>) {
  const byTone: Record<string, string> = {
    brand: "bg-brand/10 text-brand-900 dark:text-brand-50",
    neutral: "bg-muted text-foreground",
    emerald: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-50",
    sky: "bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-50",
    violet: "bg-violet-100 text-violet-900 dark:bg-violet-950/50 dark:text-violet-50",
    amber: "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-50",
    rose: "bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-50",
  };
  return byTone[tone] || byTone.neutral;
}