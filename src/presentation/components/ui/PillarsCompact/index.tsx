import React from "react";
import { cn } from "@/shared/cn";
import type { ToneKey } from "@/shared/tone";

export interface PillarItem {
  title: string;
  description?: string;
  icon?: React.ElementType<{ className?: string }>; // p. ej. lucide-react
  href?: string; // opcional: convierte la tarjeta en clickeable
  tone?: ToneKey; // tono del item (override del tono por defecto)
}

export interface PillarsCompactProps {
  items: PillarItem[];
  columns?: 2 | 3 | 4; // columnas en desktop
  tone?: ToneKey; // tono por defecto para todos los items
  className?: string;
  dense?: boolean; // reduce paddings
}

// Paleta de clases por tono (explicit mapping para evitar purge de Tailwind)
const tonePalette: Record<
  ToneKey,
  {
    iconBg: string;
    iconText: string;
    ring: string;
    accent: string; // decorativo sutil
    titleText?: string;
    descText?: string;
    hoverBorder?: string;
  }
> = {
  brand: {
    iconBg: "bg-brand-50",
    iconText: "text-brand-700",
    ring: "ring-brand-100/60",
    accent: "bg-brand-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-brand-200/80",
  },
  blue: {
    iconBg: "bg-tone-blue-50",
    iconText: "text-tone-blue-700",
    ring: "ring-tone-blue-100/60",
    accent: "bg-tone-blue-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-tone-blue-200/80",
  },
  teal: {
    iconBg: "bg-tone-teal-50",
    iconText: "text-tone-teal-700",
    ring: "ring-tone-teal-100/60",
    accent: "bg-tone-teal-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-tone-teal-200/80",
  },
  green: {
    iconBg: "bg-tone-green-50",
    iconText: "text-tone-green-700",
    ring: "ring-tone-green-100/60",
    accent: "bg-tone-green-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-tone-green-200/80",
  },
  violet: {
    iconBg: "bg-tone-violet-50",
    iconText: "text-tone-violet-700",
    ring: "ring-tone-violet-100/60",
    accent: "bg-tone-violet-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-tone-violet-200/80",
  },
  coral: {
    iconBg: "bg-tone-coral-50",
    iconText: "text-tone-coral-700",
    ring: "ring-tone-coral-100/60",
    accent: "bg-tone-coral-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-tone-coral-200/80",
  },
  sun: {
    iconBg: "bg-tone-sun-50",
    iconText: "text-tone-sun-700",
    ring: "ring-tone-sun-100/60",
    accent: "bg-tone-sun-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-700",
    hoverBorder: "hover:border-tone-sun-200/80",
  },
  warm: {
    iconBg: "bg-tone-warm-50",
    iconText: "text-tone-warm-700",
    ring: "ring-tone-warm-100/60",
    accent: "bg-tone-warm-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-tone-warm-200/80",
  },
  muted: {
    iconBg: "bg-tone-muted-50",
    iconText: "text-tone-muted-700",
    ring: "ring-tone-muted-100/60",
    accent: "bg-tone-muted-500/10",
    titleText: "text-slate-900",
    descText: "text-slate-600",
    hoverBorder: "hover:border-tone-muted-200/80",
  },
};

const getTone = (key?: ToneKey) => tonePalette[key || "green"] || tonePalette.green;

const gridByColumns: Record<Required<PillarsCompactProps>["columns"], string> = {
  2: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export const PillarsCompact: React.FC<PillarsCompactProps> = ({
  items,
  columns = 3,
  tone = "green",
  className = "",
  dense = true,
}) => {
  if (!items || !items.length) return null;

  return (
    <section className={cn("w-full", className)} aria-label="Pilares de identidad">
      <div className={cn("grid gap-4", gridByColumns[columns])}>
        {items.map((item, idx) => {
          const TIcon = item.icon;
          const palette = getTone(item.tone || tone);
          const content = (
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border bg-white/90 shadow-[0_16px_50px_-30px_rgba(15,23,42,0.35)]",
                "transition-transform duration-300 hover:-translate-y-[2px]",
                palette.hoverBorder,
              )}
            >
              {/* Glow/acento sutil */}
              <div className={cn("pointer-events-none absolute inset-0 blur-2xl opacity-70", palette.accent)} aria-hidden />
              <div className={cn("relative flex gap-4", dense ? "p-4" : "p-6")}> 
                {/* Icono */}
                <div
                  className={cn(
                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border bg-white/80 ring-1",
                    palette.iconBg,
                    palette.ring,
                  )}
                >
                  {TIcon ? (
                    <TIcon className={cn("h-6 w-6", palette.iconText)} />
                  ) : (
                    <span className={cn("h-2.5 w-2.5 rounded-full", palette.iconText)} />
                  )}
                </div>

                {/* Texto */}
                <div className="min-w-0 flex-1">
                  <h3 className={cn("text-base font-semibold tracking-tight", palette.titleText)}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className={cn("mt-1 text-sm leading-relaxed line-clamp-3", palette.descText)}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );

          // Tarjeta clickeable completa si viene href
          if (item.href) {
            return (
              <a
                key={idx}
                href={item.href}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 rounded-2xl"
                aria-label={item.title}
              >
                {content}
              </a>
            );
          }
          return (
            <div key={idx} className="group">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PillarsCompact;

/**
 * Uso sugerido (Home):
 *
 * import { PillarsCompact, type PillarItem } from "@/presentation/components/ui/PillarsCompact";
 * import { Target, Lightbulb, Users } from "lucide-react";
 *
 * const pillars: PillarItem[] = [
 *   {
 *     title: "Misión",
 *     description: "Impulsar el desarrollo sostenible a través de soluciones tecnológicas y humanas.",
 *     icon: Target,
 *     tone: "green",
 *   },
 *   {
 *     title: "Visión",
 *     description: "Ser referente en innovación y en el impacto positivo en la sociedad.",
 *     icon: Lightbulb,
 *     tone: "sun",
 *   },
 *   {
 *     title: "Valores",
 *     description: "Compromiso, transparencia, colaboración y excelencia.",
 *     icon: Users,
 *     tone: "blue",
 *   },
 * ];
 *
 * <PillarsCompact items={pillars} columns={3} tone="green" />
 */
