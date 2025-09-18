import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/shared/cn"

/**
 * UI Card kit minimal y corporativo para el proyecto de referencia.
 * Piezas: Card, CardMedia, CardHeader, CardBody, CardFooter, CardBadge, CardLink, CardSkeleton
 *
 * Principios:
 * - Sin dependencias externas (solo Tailwind + cn)
 * - Soporta modo "clickable" con foco accesible
 * - Slots simples sin imponer tipografías del proyecto
 */

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  clickable?: boolean
  density?: "compact" | "comfortable"
}

function BaseCard({
  className,
  clickable,
  density = "comfortable",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border bg-white shadow-sm transition-shadow",
        clickable && "hover:shadow-md focus-within:shadow-md",
        density === "compact" ? "" : "",
        className,
      )}
      {...props}
    />
  )
}

// Compound API typings
export type CardCompound = React.FC<CardProps> & {
  Media: typeof CardMedia;
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Badge: typeof CardBadge;
  Link: typeof CardLink;
  Skeleton: typeof CardSkeleton;
};

const CardCompoundImpl = Object.assign(BaseCard as React.FC<CardProps>, {
  Media: CardMedia,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Badge: CardBadge,
  Link: CardLink,
  Skeleton: CardSkeleton,
}) as CardCompound;

export const Card = CardCompoundImpl;
export default CardCompoundImpl;

export function CardMedia({
  className,
  children,
  ratio = "h-48",
}: React.HTMLAttributes<HTMLDivElement> & { ratio?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden", ratio, className)}>
      {children}
    </div>
  )
}

export function CardHeader({ className, title, subtitle, right, children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { title?: string; subtitle?: string; right?: React.ReactNode }) {
  if (title || subtitle || right) {
    return (
      <div className={cn("p-4 flex items-start justify-between gap-3", className)} {...rest}>
        <div className="min-w-0">
          {title && <h3 className="text-base font-semibold text-gray-900 truncate">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 line-clamp-2">{subtitle}</p>}
          {!title && !subtitle && children}
        </div>
        {right && <div className="flex-shrink-0">{right}</div>}
      </div>
    );
  }
  return (
    <div className={cn("p-4", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0 text-sm text-gray-600", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0", className)} {...props} />
}

export function CardBadge({ className, tone, ...rest }: React.HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'success' | 'danger' }) {
  const toneCls = tone === 'success'
    ? 'bg-green-100 text-green-700'
    : tone === 'danger'
      ? 'bg-red-100 text-red-700'
      : 'bg-gray-100 text-gray-700';
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        toneCls,
        className,
      )}
      {...rest}
    />
  )
}

export function CardLink({ href, ariaLabel }: { href: string; ariaLabel: string }) {
  return <Link href={href} aria-label={ariaLabel} className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/60" />
}

export function CardSkeleton({
  className,
  ratio = "h-48",
}: {
  className?: string
  ratio?: string
}) {
  return (
    <div className={cn("animate-pulse rounded-2xl border bg-white", className)}>
      <div className={cn("w-full bg-gray-200", ratio)} />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 bg-gray-200" />
        <div className="h-3 w-full bg-gray-200" />
        <div className="h-3 w-5/6 bg-gray-200" />
      </div>
    </div>
  )
}

/** Ejemplos de uso

// 1) Card con imagen y overlay
<Card clickable className="overflow-hidden">
  <CardMedia>
    <Image src={img} alt={title} fill className="object-cover transition-transform group-hover:scale-[1.03]" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
    <CardBadge>Nuevo</CardBadge>
    <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow">
      <span className="block text-[11px] opacity-90">Meta o fecha</span>
      <h3 className="text-base font-semibold">{title}</h3>
    </div>
  </CardMedia>
  <CardBody>
    <p className="line-clamp-3">Descripción corta.</p>
  </CardBody>
  <CardLink href="/detalle" ariaLabel={title} />
</Card>

// 2) Card sin imagen (solo contenido)
<Card>
  <CardHeader>
    <h3 className="text-base font-semibold">Título</h3>
    <p className="text-sm text-gray-500">Subtítulo</p>
  </CardHeader>
  <CardBody>Contenido descriptivo</CardBody>
  <CardFooter>
    <a className="text-primary hover:underline" href="#">Ver más</a>
  </CardFooter>
</Card>

*/
