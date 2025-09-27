import { ArrowUpRight, FileDown, Sparkles } from "lucide-react";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Card } from "@/presentation/components/ui/Card";
import { getCachedServiceBySlug } from "@/application/cached";
import type { ServiceAttachment } from "@/domain/entities/Service";
import { fmtMB } from "@/shared/bytes";

export const revalidate = 86400;

export async function generateMetadata({ params }:{ params: Promise<{slug:string}> }){
  const { slug } = await params; 
  const s = await getCachedServiceBySlug(slug);
  
  return { title: s?.name || "Servicio" };
}

function formatFileType(fileType?: string) {
  if (!fileType) return "Documento";
  const [type, subtype] = fileType.split("/");
  if (!subtype) return fileType.toUpperCase();
  if (type === "application") return subtype.toUpperCase();
  return `${type}/${subtype}`.toUpperCase();
}

function AttachmentsBlock({ attachments }: { attachments: ServiceAttachment[] }) {
  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_35px_80px_-60px_rgba(15,23,42,0.45)]">
      <Card.Header
        title="Recursos descargables"
        subtitle="Documentos clave y material de apoyo para iniciar con el servicio."
        className="border-b border-slate-100/80"
      />
      <Card.Body className="space-y-3 text-sm text-slate-600">
        {attachments.map((attachment) => {
          const metaParts = [formatFileType(attachment.fileType)];
          const sizeLabel = fmtMB(attachment.fileSizeBytes);
          if (sizeLabel) metaParts.push(sizeLabel);
          if (attachment.version) metaParts.push(`v${attachment.version}`);
          const meta = metaParts.join(" · ");

          return (
            <div
              key={attachment.id ?? attachment.fileUrl}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-800">{attachment.title}</p>
                {meta && <p className="text-xs text-slate-500">{meta}</p>}
              </div>
              <a
                href={attachment.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                <FileDown className="h-4 w-4" />
                Descargar
              </a>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default async function ServiceDetail({ params }:{ params: Promise<{slug:string}> }){
  const { slug } = await params;
  const service = await getCachedServiceBySlug(slug);

  if (!service) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-slate-600">
        Servicio no disponible.
      </div>
    );
  }

  const hasHighlights = Array.isArray(service.highlights) && service.highlights.length > 0;
  const hasSubservices = Array.isArray(service.subservices) && service.subservices.length > 0;
  const hasAttachments = Array.isArray(service.attachments) && service.attachments.length > 0;

  return (
    <div className="relative mx-auto max-w-6xl space-y-10 px-6 pb-16 pt-12">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white/90 p-10 shadow-[0_45px_90px_-55px_rgba(15,23,42,0.45)]">
        <div className="pointer-events-none absolute -left-24 top-12 hidden h-72 w-72 rounded-full bg-brand-100 blur-3xl md:block" />
        <div className="pointer-events-none absolute -right-32 bottom-0 hidden h-72 w-72 rounded-full bg-slate-200/60 blur-3xl md:block" />
        <div className="relative space-y-6">
          <SectionHeader
            title={service.name}
            description={service.description}
            align="left"
            tone="muted"
          />
          {hasHighlights && (
            <ul className="flex flex-wrap gap-2">
              {service.highlights!.map((highlight, index) => (
                <li
                  key={`highlight-${index}`}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)]">
        {hasSubservices ? (
          <Card className="border-slate-200/80 bg-white/95 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.45)]">
            <Card.Header
              title="Subservicios y entregables"
              subtitle="Selecciona el módulo que necesitas o combínalos para una solución completa."
              className="border-b border-slate-100/80"
            />
            <Card.Body className="grid gap-4 text-sm text-slate-600 lg:grid-cols-2">
              {service.subservices!.map((subservice, index) => (
                <div key={`subservice-${index}`} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <div className="flex items-start gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-semibold text-slate-800">{subservice.name}</div>
                      {subservice.links?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {subservice.links.map((link, linkIndex) => (
                            <a
                              key={`subservice-${index}-link-${linkIndex}`}
                              href={link.href}
                              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-brand-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        ) : (
          <Card className="border-slate-200/80 bg-white/95 p-6 text-sm text-slate-600 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.45)]">
            <p>
              Este servicio se configura a medida según los objetivos del proyecto. Nuestro equipo consultivo diseña el plan
              de trabajo y los entregables en conjunto contigo.
            </p>
          </Card>
        )}

        <div className="space-y-6">
          {hasAttachments && <AttachmentsBlock attachments={service.attachments!} />}
          <Card className="border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.45)]">
            <Card.Header
              title="¿Listo para dar el siguiente paso?"
              subtitle="Conversemos y co-creemos el alcance que mejor se adapte a tu organización."
              className="pb-0"
            />
            <Card.Body className="flex items-center justify-between gap-4 pt-4 text-sm text-slate-600">
              <p className="max-w-xs">
                Podemos agendar una sesión exploratoria o compartirte una propuesta de implementación en menos de 48 horas.
              </p>
              <a
                href="#sectionContact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                Contáctanos
              </a>
            </Card.Body>
          </Card>
        </div>
      </section>
    </div>
  );
}
