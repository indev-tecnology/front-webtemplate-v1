import { cn } from "@/shared/cn";

type Tone = "none" | "surface" | "muted" | "brand" | "blue" | "teal" | "green" | "violet" | "coral" | "sun" | "warm" | "muted";
type Pad = "none" | "sm" | "md" | "xl" | "standard";
type Width = "narrow" | "default" | "wide";

const toneMap: Record<Tone, string> = {
  none: "",
  surface: "bg-surface-50",
  brand: "bg-brand-100",
  blue: "bg-tone-blue-50",
  teal: "bg-tone-teal-50",
  green: "bg-tone-green-100",
  violet: "bg-tone-violet-50",
  coral: "bg-tone-coral-50",
  sun: "bg-tone-sun-50",
  warm: "bg-tone-warm-50",
  muted: "bg-tone-muted-50",
};
const padMap: Record<Pad, string> = {
  none: "",
  sm: "sm:py-4",
  md: "md:py-8",
  xl: "xl:py-8",
  standard: "px-4 py-8",
};
const widthMap: Record<Width, string> = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-6xl",
};

type BaseProps = {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  ariaLabel?: string;
  tone?: Tone;        // fondo opcional
  pad?: Pad;          // padding vertical
  width?: Width;      // ancho del contenedor
  container?: boolean;// centra y limita ancho (true por defecto)
  className?: string;
  children: React.ReactNode;
};

export function Section({
  as: Tag = "section",
  id,
  ariaLabel,
  tone = "none",
  pad = "none",
  width = "default",
  container = true,
  className,
  children,
}: BaseProps) {
  return (
    <Tag id={id} aria-label={ariaLabel} className={cn(toneMap[tone], padMap[pad], className)}>
      <div className={cn(container ? "mx-auto" : "", container && widthMap[width])}>
        {children}
      </div>
    </Tag>
  );
}
