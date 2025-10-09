import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import type { Agreement } from '@/domain/entities/Agreement';
import { BlockRenderer } from '@/presentation/web-ui/content/BlockRenderer';

export interface AgreementDetailTemplateProps {
  agreement: Agreement;
}

export const AgreementDetailTemplate = ({ agreement }: AgreementDetailTemplateProps) => {
  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
          {agreement.logo?.url ? (
            <Image src={agreement.logo.url} alt={agreement.logo.alt || agreement.name} width={96} height={96} className="object-contain" />
          ) : (
            <div className="text-2xl font-bold text-neutral-700">{(agreement.name || 'C').charAt(0)}</div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{agreement.name}</h1>
          {agreement.category && <p className="text-sm text-neutral-600">{agreement.category}</p>}
          {agreement.startsAt && <p className="text-sm text-neutral-500">Vigencia: {new Date(agreement.startsAt).toLocaleDateString('es-CO')} {agreement.endsAt ? ` - ${new Date(agreement.endsAt).toLocaleDateString('es-CO')}` : ''}</p>}
        </div>
      </header>

      {agreement.description && (
        <section className="prose prose-lg prose-neutral">
          <p>{agreement.description}</p>
        </section>
      )}

      {/* Rich content blocks if available */}
      {agreement.content && agreement.content.length > 0 && (
        <section className="space-y-6">
          <BlockRenderer blocks={agreement.content} attachments={agreement.links?.map((l, i) => ({ id: String(i), url: l.href, filename: l.label }))} />
        </section>
      )}

      {/* Links / resources */}
      {agreement.links && agreement.links.length > 0 && (
        <section className="pt-4 border-t border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Enlaces y recursos</h3>
          <div className="grid grid-cols-1 gap-3">
            {agreement.links.map((link, idx) => (
              <a key={`${link.href}-${idx}`} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                <ExternalLink className="w-5 h-5 text-primary-600" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-neutral-900">{link.label}</div>
                  <div className="text-xs text-neutral-500">{link.href}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default AgreementDetailTemplate;
