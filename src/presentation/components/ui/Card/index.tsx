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

export function Card({
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

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0 text-sm text-gray-600", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0", className)} {...props} />
}

export function CardBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-800 backdrop-blur",
        className,
      )}
      {...props}
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
