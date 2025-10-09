import Image from 'next/image';
import { Download, ExternalLink, Calendar, Tag, FileText } from 'lucide-react';
import { clsx } from 'clsx';
import type { Agreement } from '@/domain/entities/Agreement';
import { BlockRenderer } from '@/presentation/web-ui/content/BlockRenderer';

export interface AgreementDetailTemplateProps {
  agreement: Agreement;
}

// Helper para mapear categorías a tonos de color
const getCategoryTone = (category?: string): string => {
  if (!category) return 'muted';
  const cat = category.toLowerCase();
  if (cat.includes('educación') || cat.includes('educacion')) return 'violet';
  if (cat.includes('salud')) return 'teal';
  if (cat.includes('tecnología') || cat.includes('tecnologia')) return 'blue';
  if (cat.includes('comercio')) return 'warm';
  if (cat.includes('recreación') || cat.includes('recreacion')) return 'coral';
  if (cat.includes('financiero')) return 'green';
  return 'muted';
};

export const AgreementDetailTemplate = ({ agreement }: AgreementDetailTemplateProps) => {
  const tone = getCategoryTone(agreement.category);

  const formatDate = (date?: Date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header Card - Logo + Info */}
      <div className="bg-white rounded-2xl border-2 border-neutral-100 p-8 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Logo grande */}
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-surface-100 flex items-center justify-center p-4 border-2 border-neutral-200 flex-shrink-0">
            {agreement.logo?.url ? (
              <Image
                src={agreement.logo.url}
                alt={agreement.logo.alt || agreement.name}
                width={128}
                height={128}
                className="object-contain"
              />
            ) : (
              <div className="text-4xl font-bold text-neutral-400">
                {(agreement.name || 'C').charAt(0)}
              </div>
            )}
          </div>

          {/* Info del convenio */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              {agreement.name}
            </h1>

            {/* Badges y metadata */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              {/* Badge de categoría */}
              {agreement.category && (
                <span className={clsx(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold",
                  tone === 'violet' && "bg-tone-violet-50 text-tone-violet-700",
                  tone === 'teal' && "bg-tone-teal-50 text-tone-teal-700",
                  tone === 'blue' && "bg-tone-blue-50 text-tone-blue-700",
                  tone === 'warm' && "bg-tone-warm-50 text-tone-warm-700",
                  tone === 'coral' && "bg-tone-coral-50 text-tone-coral-700",
                  tone === 'green' && "bg-tone-green-50 text-tone-green-700",
                  tone === 'muted' && "bg-tone-muted-50 text-tone-muted-700"
                )}>
                  <Tag size={16} />
                  {agreement.category}
                </span>
              )}

              {/* Badge de vigencia */}
              {agreement.endsAt && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 text-neutral-700">
                  <Calendar size={16} />
                  Vigente hasta {formatDate(agreement.endsAt)}
                </span>
              )}
            </div>

            {/* Descripción */}
            {agreement.description && (
              <p className="text-neutral-700 text-lg leading-relaxed">
                {agreement.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rich content blocks */}
      {agreement.content && agreement.content.length > 0 && (
        <section className="bg-white rounded-2xl border-2 border-neutral-100 p-8 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-700" />
            </span>
            Detalles del Convenio
          </h2>
          <BlockRenderer
            blocks={agreement.content}
            attachments={agreement.attachments?.map((a) => ({
              id: a.id,
              url: a.url,
              filename: a.filename,
              contentType: a.contentType
            }))}
          />
        </section>
      )}

      {/* Enlaces y recursos */}
      {agreement.links && agreement.links.length > 0 && (
        <section className="bg-white rounded-2xl border-2 border-neutral-100 p-8 shadow-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-accent-700" />
            </span>
            Enlaces y Recursos
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {agreement.links.map((link, idx) => (
              <a
                key={`${link.href}-${idx}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl border-2 border-neutral-200 hover:border-brand-500 hover:bg-brand-50/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors flex-shrink-0">
                  <ExternalLink className="w-6 h-6 text-brand-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors mb-1">
                    {link.label}
                  </div>
                  <div className="text-sm text-neutral-500 truncate">
                    {link.href}
                  </div>
                </div>
                <div className="flex-shrink-0 text-neutral-400 group-hover:text-brand-600 transition-colors">
                  →
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Archivos adjuntos */}
      {agreement.attachments && agreement.attachments.length > 0 && (
        <section className="bg-white rounded-2xl border-2 border-neutral-100 p-8 mt-8 shadow-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-tone-teal-50 flex items-center justify-center">
              <Download className="w-5 h-5 text-tone-teal-700" />
            </span>
            Documentos y Archivos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agreement.attachments.map((attachment, idx) => (
              <a
                key={attachment.id || idx}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl border-2 border-neutral-200 hover:border-tone-teal-500 hover:bg-tone-teal-50/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-tone-teal-50 flex items-center justify-center group-hover:bg-tone-teal-100 transition-colors flex-shrink-0">
                  <FileText className="w-6 h-6 text-tone-teal-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-neutral-900 group-hover:text-tone-teal-700 transition-colors truncate">
                    {attachment.filename}
                  </div>
                  {attachment.contentType && (
                    <div className="text-xs text-neutral-500 mt-1">
                      {attachment.contentType}
                    </div>
                  )}
                </div>
                <Download className="w-5 h-5 text-neutral-400 group-hover:text-tone-teal-600 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* CTA final */}
      <div className="mt-12 bg-gradient-to-br from-brand to-brand-700 rounded-2xl p-8 text-center shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-3">
          ¿Listo para aprovechar este convenio?
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Contacta con nosotros para más información sobre cómo acceder a estos beneficios exclusivos.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-700 font-bold rounded-lg hover:bg-neutral-50 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
          >
            Contactar
          </a>
          <a
            href="/agreements"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-900/50 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-brand-900/70 transition-all"
          >
            Ver más convenios
          </a>
        </div>
      </div>
    </article>
  );
};

export default AgreementDetailTemplate;
