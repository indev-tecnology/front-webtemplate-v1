import { cn } from "@/shared/cn";

type Tone = "none" | "surface" | "muted" | "brand";
type Pad = "none" | "sm" | "md" | "lg";
type Width = "narrow" | "default" | "wide";

const toneMap: Record<Tone, string> = {
  none: "",
  surface: "bg-white",
  muted: "bg-surface-50",
  brand: "bg-brand-50",
};
const padMap: Record<Pad, string> = {
  none: "",
  sm: "py-6",
  md: "py-10",
  lg: "py-16",
};
const widthMap: Record<Width, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
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
  pad = "sm",
  width = "default",
  container = true,
  className,
  children,
}: BaseProps) {
  return (
    <Tag id={id} aria-label={ariaLabel} className={cn(toneMap[tone], padMap[pad], className)}>
      <div className={cn(container ? "mx-auto px-6" : "", container && widthMap[width])}>
        {children}
      </div>
    </Tag>
  );
}

// Subcabecera opcional para título + subtítulo
export function SectionHeader({
  title,
  subtitle,
  center = false,
}: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <header className={cn("space-y-2", center && "text-center")}>
      <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </header>
  );
}
