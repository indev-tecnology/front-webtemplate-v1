import { Download, ExternalLink, FileText, Award, Users, Calendar, User, Tag } from 'lucide-react';
import Image from 'next/image';
import type { Service } from '@/domain/entities/Service';
import { BlockRenderer } from '@/presentation/web-ui/content/BlockRenderer';

export interface ServiceDetailTemplateProps {
  service: Service;
}

export const ServiceDetailTemplate = ({ service }: ServiceDetailTemplateProps) => {
  const formatDate = (date?: Date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="max-w-5xl mx-auto space-y-12">
      {/* Header minimalista */}
      <header className="space-y-6">
        {/* Categories - Diseño minimalista */}
        {service.categories && service.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {service.categories.map((category, idx) => (
              <span
                key={`${category}-${idx}`}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-brand-100 text-brand-700 font-bold text-xs uppercase tracking-wide hover:bg-brand-200 transition-colors"
              >
                <Tag size={12} />
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Título principal - Más limpio */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
          {service.title}
        </h1>

        {/* Summary/Lead - Minimalista */}
        {service.summary && (
          <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed">
            {service.summary}
          </p>
        )}

        {/* Byline - Diseño más limpio */}
        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-200">
          {service.author && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-brand flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wide">Publicado por</p>
                <p className="font-bold text-neutral-900">{service.author}</p>
              </div>
            </div>
          )}
          {service.publishDate && (
            <div className="flex items-center gap-2 text-neutral-600">
              <Calendar size={18} className="text-brand" />
              <time className="text-sm font-medium">{formatDate(service.publishDate)}</time>
            </div>
          )}
        </div>
      </header>

      {/* Featured Image - Minimalista */}
      {service.heroImage?.url && (
        <figure className="relative aspect-video overflow-hidden rounded-xl shadow-lg border border-neutral-200">
          <Image
            src={service.heroImage.url}
            alt={service.heroImage.alt || service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </figure>
      )}

      {/* Layout estilo blog - Contenido centrado + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contenido principal - Estilo artículo */}
        <div className="lg:col-span-8 space-y-12">
          {/* Rich Content - Prosa minimalista */}
          {service.content && service.content.length > 0 && (
            <section className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-700 prose-strong:text-neutral-900 prose-img:rounded-xl">
              <BlockRenderer
                blocks={service.content}
                attachments={service.attachments?.map(a => ({
                  id: String(a.id),
                  name: a.filename || 'Archivo',
                  url: a.url,
                  type: a.contentType || 'application/octet-stream',
                  size: a.size
                }))}
              />
            </section>
          )}

          {/* Tags section - Minimalista */}
          {service.tags && service.tags.length > 0 && (
            <section className="pt-8 border-t border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 text-neutral-500 pt-1">
                  <Award size={18} className="text-accent" />
                  <span className="text-sm font-bold uppercase tracking-wide">Etiquetas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="inline-block px-3 py-1.5 rounded-md bg-accent-50 text-accent-700 text-sm font-semibold hover:bg-accent-100 border border-accent-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Modalidades/Subservicios - Diseño minimalista */}
          {service.subservices && service.subservices.length > 0 && (
            <section className="space-y-6 pt-8 border-t border-neutral-200">
              <h2 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                Modalidades disponibles
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {service.subservices.map((subservice, index) => (
                  <div
                    key={subservice.slug ?? `sub-${index}`}
                    className="group p-6 rounded-lg border border-neutral-200 bg-white hover:border-brand hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-xl text-neutral-900 mb-2 group-hover:text-brand-700 transition-colors">
                      {subservice.title}
                    </h3>
                    {subservice.summary && (
                      <p className="text-neutral-600 leading-relaxed mb-4">
                        {subservice.summary}
                      </p>
                    )}
                    {subservice.slug && (
                      <a
                        href={`/services/${subservice.slug}`}
                        className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold group-hover:gap-3 transition-all"
                      >
                        Ver detalles
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - Sticky */}
        <aside className="lg:col-span-4 space-y-6">
          {/* CTA Card - Minimalista y solidario */}
          <div className="sticky top-24 space-y-6">
            <div className="p-6 rounded-lg bg-gradient-to-br from-accent to-accent-600 shadow-lg">
              <h3 className="text-lg font-bold text-neutral-900 mb-3">
                ¿Te interesa este servicio?
              </h3>
              <p className="text-neutral-700 text-sm mb-6 leading-relaxed">
                Nuestros asesores están listos para ayudarte con información personalizada.
              </p>
              <div className="space-y-3">
                <a
                  href="/contacto"
                  className="block w-full px-5 py-3 rounded-lg font-bold bg-brand text-white text-center hover:bg-brand-700 transition-all shadow-md hover:shadow-xl"
                >
                  Solicitar información
                </a>
                <a
                  href="/services"
                  className="block w-full px-5 py-3 rounded-lg font-bold border-2 border-neutral-900 text-neutral-900 text-center bg-white hover:bg-neutral-50 transition-colors"
                >
                  Ver más servicios
                </a>
              </div>
            </div>

            {/* Documentos - Diseño minimalista */}
            {service.attachments && service.attachments.length > 0 && (
              <div className="p-6 rounded-lg border border-neutral-200 bg-white">
                <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Download size={18} className="text-brand" />
                  Documentos
                </h3>
                <div className="space-y-3">
                  {service.attachments.map((attachment, index) => (
                    <a
                      key={attachment.id ?? attachment.filename ?? index}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-3 rounded-lg border border-neutral-200 hover:border-brand hover:bg-brand-50 transition-all"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-neutral-100 group-hover:bg-brand flex items-center justify-center transition-colors">
                        <FileText size={16} className="text-neutral-600 group-hover:text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-neutral-900 line-clamp-2 leading-snug group-hover:text-brand-700">
                          {attachment.filename}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {attachment.contentType && (
                            <span className="uppercase font-medium">
                              {attachment.contentType.split('/')[1] || 'FILE'}
                            </span>
                          )}
                          {attachment.size && (
                            <span> · {(attachment.size / 1024 / 1024).toFixed(1)} MB</span>
                          )}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Compartir - Minimalista */}
            <div className="p-6 rounded-lg border border-neutral-200 bg-white">
              <h4 className="font-bold text-neutral-900 mb-4 text-sm uppercase tracking-wide">
                Compartir servicio
              </h4>
              <div className="flex gap-2">
                <button className="flex-1 p-3 rounded-lg border-2 border-neutral-200 hover:border-brand hover:bg-brand-50 transition-all group">
                  <svg className="w-5 h-5 mx-auto text-neutral-600 group-hover:text-brand" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="flex-1 p-3 rounded-lg border-2 border-neutral-200 hover:border-brand hover:bg-brand-50 transition-all group">
                  <svg className="w-5 h-5 mx-auto text-neutral-600 group-hover:text-brand" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="flex-1 p-3 rounded-lg border-2 border-neutral-200 hover:border-brand hover:bg-brand-50 transition-all group">
                  <svg className="w-5 h-5 mx-auto text-neutral-600 group-hover:text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};
