'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/cn'
import { Section } from '@/presentation/components/ui/SectionPage'
import { SectionHeader } from '@/presentation/components/ui/SectionHeader'
import { Card, CardMedia, CardBody, CardLink, CardBadge } from '@/presentation/components/ui/Card'
import { CalendarDays, MapPin, PlayCircle } from 'lucide-react'

export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
}

export type EventGalleryItem = {
  id: string
  title: string
  description: string
  imageCover: string
  dateISO?: string
  location?: string
  media?: MediaItem[] // solo en detalle
  href?: string // opcional: ver detalle en página
  badge?: string
  ctaLabel?: string // "Ver detalle" por defecto
}

export type EventGalleryProps = {
  title?: string
  items: EventGalleryItem[]
  density?: 'compact' | 'comfortable'
  columns?: { base?: 1 | 2; sm?: 1 | 2 | 3; lg?: 1 | 2 | 3 | 4 }
  className?: string
  placeholderImage?: string
  openInModal?: boolean
}

export default function Gallery({
  title,
  items,
  density = 'comfortable',
  columns = { base: 1, sm: 2, lg: 3 },
  className,
  placeholderImage = '/images/wcs_default.png',
  openInModal = true,
}: EventGalleryProps) {
  const ratio = density === 'compact' ? 'h-44' : 'h-56'
  const [selected, setSelected] = useState<EventGalleryItem | null>(null)

  return (
    <Section>
      {title && <SectionHeader title={title} />}

      <div
        className={cn(
          'grid gap-6',
          `grid-cols-${columns.base ?? 1}`,
          columns.sm ? `sm:grid-cols-${columns.sm}` : '',
          columns.lg ? `lg:grid-cols-${columns.lg}` : '',
          className,
        )}
      >
        {items.map((it) => (
          <article key={it.id} className="group">
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              clickable
              onClick={() => openInModal && setSelected(it)}
            >
              {/* Cover */}
              <CardMedia ratio={ratio}>
                <Image
                  src={it.imageCover || placeholderImage}
                  alt={it.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                {it.badge && <CardBadge>{it.badge}</CardBadge>}
                <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow">
                  {/* meta */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] opacity-90">
                    {it.dateISO && (
                      <span className="inline-flex items-center gap-1"><CalendarDays size={12} /><time dateTime={it.dateISO}>{formatDate(it.dateISO)}</time></span>
                    )}
                    {it.location && (
                      <span className="inline-flex items-center gap-1"><MapPin size={12} />{it.location}</span>
                    )}
                  </div>
                  <h3 className={cn('mt-1 font-semibold', density === 'compact' ? 'text-sm' : 'text-base')}>{it.title}</h3>
                </div>
              </CardMedia>

              {/* Body */}
              <CardBody className={cn(density === 'compact' ? 'p-3' : 'p-4')}>
                <p className={cn('text-gray-700', density === 'compact' ? 'text-[13px] line-clamp-2' : 'text-sm line-clamp-3')}>
                  {it.description}
                </p>
                {Boolean(it.media?.length) && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <PlayCircle size={14} />
                    <span>{it.media!.length} elemento(s) multimedia</span>
                  </div>
                )}

                {(it.href || openInModal) && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/60"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (openInModal) setSelected(it)
                      }}
                    >
                      {it.ctaLabel}
                    </button>
                  </div>
                )}
              </CardBody>

              {/* Si no usamos modal, permitimos navegar */}
              {!openInModal && it.href && <CardLink href={it.href} ariaLabel={it.title} />}
            </Card>
          </article>
        ))}
      </div>

      {/* Modal detalle */}
      {openInModal && selected && (
        <LightModal onClose={() => setSelected(null)}>
          <DetailCard item={selected} placeholderImage={placeholderImage} />
        </LightModal>
      )}
    </Section>
  )
}

function DetailCard({ item, placeholderImage }: { item: EventGalleryItem; placeholderImage: string }) {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
      {/* Media principal */}
      <div className="relative h-64 w-full">
        <Image src={item.imageCover || placeholderImage} alt={item.title} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {item.dateISO && (
                <span className="inline-flex items-center gap-1"><CalendarDays size={14} /><time dateTime={item.dateISO}>{formatDate(item.dateISO)}</time></span>
              )}
              {item.location && (
                <span className="inline-flex items-center gap-1"><MapPin size={14} />{item.location}</span>
              )}
            </div>
            <h3 className="mt-1 text-lg font-semibold text-gray-900">{item.title}</h3>
          </div>
          {item.href && (
            <Link href={item.href} className="shrink-0 rounded-full border px-3 py-1 text-sm font-medium text-primary hover:underline">
              Abrir en página
            </Link>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-700">{item.description}</p>

        {/* Galería multimedia opcional */}
        {Boolean(item.media?.length) && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-gray-900">Galería</h4>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {item.media!.map((m, i) => (
                <div key={i} className="relative h-24 w-full overflow-hidden rounded-md border">
                  {m.type === 'image' ? (
                    <Image src={m.src} alt={m.alt ?? item.title} fill sizes="33vw" className="object-cover" />
                  ) : (
                    <video className="h-full w-full object-cover" controls preload="metadata">
                      <source src={m.src} />
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function LightModal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === ref.current) onClose() }
  return (
    <div ref={ref} onMouseDown={onBackdrop} aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <button onClick={onClose} aria-label="Cerrar" className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-sm shadow">Cerrar</button>
      {children}
    </div>
  )
}

function formatDate(dateISO: string) {
  try {
    return new Date(dateISO).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return dateISO }
}
