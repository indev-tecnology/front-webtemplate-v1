import type { Metadata } from "next";
import { PageLayout } from "@/presentation/web-ui/layouts/PageLayout";
import { DocumentLibrary } from "@/presentation/web-ui/attachments/DocumentLibrary";
import { CTABox } from "@/presentation/web-ui/shared/CTABox";
import { apiConsumer } from "@/presentation/adapters/apiConsumer";
import { toDate } from "@/shared/date";
import type { Attachment } from "@/domain/entities/Attachment";
import { FileText, FolderOpen, Calendar, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Anexos Institucionales | Cooperativa",
  description: "Accede a los anexos institucionales de la cooperativa: estatutos, reglamentos, políticas, normativas y documentación oficial del sector solidario.",
};

type SP = Record<string, string | string[] | undefined>;

function groupByTopic(items: Attachment[]) {
  const groups: Record<string, Attachment[]> = {};
  for (const it of items) {
    const key =
      (it.topic as string) ||
      (it.tags && it.tags.length ? String(it.tags[0]) : undefined) ||
      "Documentos Generales";
    if (!groups[key]) groups[key] = [];
    groups[key].push(it);
  }
  // ordenar los grupos por nombre para consistencia
  const ordered: Record<string, Attachment[]> = {};
  Object.keys(groups)
    .sort((a, b) => a.localeCompare(b))
    .forEach((k) => (ordered[k] = groups[k]));
  return ordered;
}

export default async function AnexosInstitucionales({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const get1 = (v: SP[keyof SP]) => (Array.isArray(v) ? v[0] : v);
  const q = get1(sp.q);
  const page = Number(get1(sp.page) || 1);
  const pageSize = 100;

  // Solicita attachments sin filtrar por category
  const { items, total } = await apiConsumer.attachments({ q, page, pageSize });

  const groups = groupByTopic(items as Attachment[]);

  // Ordenar items por fecha dentro de cada grupo
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => {
      const aDate = toDate((a as any).uploadedAt || a.createdAt || new Date(0));
      const bDate = toDate((b as any).uploadedAt || b.createdAt || new Date(0));
      return bDate.getTime() - aDate.getTime();
    });
  }

  // Obtener el documento más reciente
  const mostRecent = items.length > 0 ? items.reduce((prev, current) => {
    const prevDate = toDate((prev as any).uploadedAt || prev.createdAt || new Date(0));
    const currDate = toDate((current as any).uploadedAt || current.createdAt || new Date(0));
    return currDate > prevDate ? current : prev;
  }) : null;

  const lastUpdated = mostRecent
    ? toDate((mostRecent as any).uploadedAt || mostRecent.createdAt || new Date())
    : new Date();

  // Mapear items a AttachmentItem para DocumentLibrary
  const mappedItems = items.map((it) => ({
    id: it.id,
    title: it.title,
    fileUrl: it.fileUrl,
    fileType: it.fileType,
    fileSizeBytes: it.fileSizeBytes,
    version: it.version,
    tags: it.tags,
    uploadedAt: (it as any).uploadedAt,
    createdAt: it.createdAt,
  }));

  const mappedGroups: Record<string, any[]> = {};
  Object.entries(groups).forEach(([key, docs]) => {
    mappedGroups[key] = docs.map((it) => ({
      id: it.id,
      title: it.title,
      fileUrl: it.fileUrl,
      fileType: it.fileType,
      fileSizeBytes: it.fileSizeBytes,
      version: it.version,
      tags: it.tags,
      uploadedAt: (it as any).uploadedAt,
      createdAt: it.createdAt,
    }));
  });

  return (
    <PageLayout
      hero={{
        title: "Anexos Institucionales",
        subtitle: "Documentación Oficial",
        description:
          "Accede a la documentación oficial de la cooperativa: estatutos, reglamentos, políticas y normativas vigentes del sector solidario.",
        tone: "green",
        align: "center",
      }}
      breadcrumbs={[{ label: "Anexos Institucionales", href: "/attachments" }]}
    >
      {/* Banner informativo institucional */}
      <div className="bg-gradient-to-br from-brand-50 via-white to-brand-50/30 border border-brand-200 rounded-xl p-6 mb-8 -mt-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0 border border-brand-200">
            <Shield className="w-6 h-6 text-brand-700" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-brand-900 mb-2">
              Marco Normativo y Regulatorio
            </h3>
            <p className="text-neutral-600 leading-relaxed text-sm">
              En cumplimiento de las disposiciones del sector solidario y con el compromiso de transparencia institucional,
              ponemos a disposición de nuestros asociados y público en general toda la documentación oficial vigente.
              Estos anexos contienen información relevante sobre nuestra estructura organizacional, normativas internas
              y procedimientos operativos.
            </p>
          </div>
        </div>
      </div>

      {/* Indicadores institucionales con acentos de color */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-brand-100 p-5 rounded-lg hover:border-brand-200 hover:shadow-sm transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center border border-brand-200">
              <FileText className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-brand-600 uppercase tracking-wide mb-0.5">
                Total Anexos
              </p>
              <p className="text-2xl font-bold text-neutral-900">{total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-accent-100 p-5 rounded-lg hover:border-accent-200 hover:shadow-sm transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-accent-50 flex items-center justify-center border border-accent-200">
              <FolderOpen className="w-6 h-6 text-accent-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-accent-700 uppercase tracking-wide mb-0.5">
                Categorías
              </p>
              <p className="text-2xl font-bold text-neutral-900">{Object.keys(groups).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-tone-teal-100 p-5 rounded-lg hover:border-tone-teal-200 hover:shadow-sm transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-tone-teal-50 flex items-center justify-center border border-tone-teal-200">
              <Calendar className="w-6 h-6 text-tone-teal-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-tone-teal-700 uppercase tracking-wide mb-0.5">
                Última Actualización
              </p>
              <p className="text-sm font-semibold text-neutral-900">
                {lastUpdated.toLocaleDateString("es-CO", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Biblioteca de anexos institucionales */}
      <DocumentLibrary documents={mappedItems} groupedByTopic={mappedGroups} />

      {/* CTA Estandarizado */}
      <div className="mt-16">
        <CTABox
          icon="Shield"
          title="Información Adicional"
          description="Si requiere información adicional sobre algún anexo institucional, certificaciones oficiales o tiene consultas relacionadas con nuestra normativa interna, nuestro equipo de atención está disponible para asistirle."
          variant="green"
          primaryButton={{
            label: "Contáctanos",
            href: "/contacto",
          }}
          secondaryButton={{
            label: "Conocer servicios",
            href: "/services",
          }}
          infoBoxes={[
            {
              label: "Atención al Asociado",
              value: "Lun - Vie: 8:00 AM - 5:00 PM",
            },
            {
              label: "Consultas Normativas",
              value: "contacto@cooperativa.com",
            },
          ]}
        />
      </div>
    </PageLayout>
  );
}
