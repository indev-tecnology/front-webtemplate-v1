import Image from "next/image";
import { ArrowUpRight, FileDown, FolderDown, Sparkles } from "lucide-react";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Card } from "@/presentation/components/ui/Card";
import TextLink from "@/presentation/components/ui/TextLink";
import { getCachedServices } from "@/application/cached";
import type { Service, ServiceAttachment } from "@/domain/entities/Service";
import { fmtMB } from "@/shared/bytes";

export const metadata = { title: "Servicios" };

export const revalidate = 86400;

function formatFileType(fileType?: string) {
  if (!fileType) return "Documento";
  const [type, subtype] = fileType.split("/");
  if (!subtype) return fileType.toUpperCase();
  if (type === "application") return subtype.toUpperCase();
  return `${type}/${subtype}`.toUpperCase();
}

function AttachmentList({ attachments }: { attachments: ServiceAttachment[] }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
        <FolderDown className="h-4 w-4 text-slate-400" />
        Recursos descargables
      </div>
      <ul className="mt-3 space-y-2">
        {attachments.map((attachment) => {
          const metaParts = [formatFileType(attachment.fileType)];
          const sizeLabel = fmtMB(attachment.fileSizeBytes);
          if (sizeLabel) metaParts.push(sizeLabel);
          if (attachment.version) metaParts.push(`v${attachment.version}`);
          const meta = metaParts.join(" · ");

          return (
            <li
              key={attachment.id ?? attachment.fileUrl}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/80 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{attachment.title}</p>
                {meta && <p className="text-xs text-slate-500">{meta}</p>}
              </div>
              <a
                href={attachment.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                <FileDown className="h-4 w-4" />
                Descargar
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default async function Services() {
  const services = await getCachedServices();

  return (
    <div className="relative mx-auto max-w-6xl space-y-12 px-6 pb-16 pt-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white/90 p-10 shadow-[0_45px_90px_-55px_rgba(15,23,42,0.45)] backdrop-blur">
        <div className="pointer-events-none absolute -left-24 top-12 hidden h-72 w-72 rounded-full bg-brand-100 blur-3xl md:block" />
        <div className="pointer-events-none absolute -right-32 bottom-0 hidden h-72 w-72 rounded-full bg-slate-200/60 blur-3xl md:block" />
        <div className="relative space-y-8">
          <SectionHeader
            title="Servicios a la medida"
            description="Integramos estrategia, diseño y tecnología para acompañar tus proyectos desde la definición hasta la operación."
            align="left"
            tone="muted"
          />
          <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                <Sparkles className="h-4 w-4 text-brand-500" />
                Enfoque consultivo
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Analizamos necesidades para transformar objetivos en hojas de ruta accionables.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                <Sparkles className="h-4 w-4 text-brand-500" />
                Implementación acompasada
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Equipos multidisciplinarios que integran diseño, contenido y desarrollo.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                <Sparkles className="h-4 w-4 text-brand-500" />
                Soporte continuo
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Mantenemos la evolución con medición de impacto y actualizaciones iterativas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {services.map((service: Service) => {
          const hasHighlights = Array.isArray(service.highlights) && service.highlights.length > 0;
          const hasSubservices = Array.isArray(service.subservices) && service.subservices.length > 0;
          const hasAttachments = Array.isArray(service.attachments) && service.attachments.length > 0;

          return (
            <Card
              key={service.id}
              className="flex h-full flex-col gap-6 overflow-hidden border-slate-200/70 bg-white/95 p-6 shadow-[0_30px_70px_-55px_rgba(15,23,42,0.4)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  {service.icon?.url ? (
                    <Image
                      src={service.icon.url}
                      alt={service.icon.alt || service.name}
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <Sparkles className="h-6 w-6" />
                  )}
                </div>
                <div className="min-w-0 space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
                  {service.description && (
                    <p className="text-sm text-slate-600">{service.description}</p>
                  )}
                  {hasHighlights && (
                    <ul className="flex flex-wrap gap-2">
                      {service.highlights!.slice(0, 4).map((highlight, index) => (
                        <li
                          key={`${service.id}-highlight-${index}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {hasSubservices && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Subservicios y entregables
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {service.subservices!.map((subservice, index) => (
                      <li key={`${service.id}-subservice-${index}`} className="rounded-2xl border border-slate-200/70 bg-white px-3 py-3">
                        <div className="font-medium text-slate-800">{subservice.name}</div>
                        {subservice.links?.length ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {subservice.links.map((link, linkIndex) => (
                              <a
                                key={`${service.id}-subservice-${index}-link-${linkIndex}`}
                                href={link.href}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                              >
                                <ArrowUpRight className="h-3.5 w-3.5" />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hasAttachments && <AttachmentList attachments={service.attachments!} />}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-500">
                  {hasSubservices ? `${service.subservices!.length} subservicios` : "Servicio personalizado"}
                </span>
                <TextLink href={`/services/${service.slug}`} prominent>
                  Ver detalle
                </TextLink>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
