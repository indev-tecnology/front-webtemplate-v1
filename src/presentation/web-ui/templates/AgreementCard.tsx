import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import type { Agreement } from '@/domain/entities/Agreement';

export interface AgreementCardProps {
  agreement: Agreement;
  href: string;
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

// Helper para formatear fechas
const formatDate = (date?: Date): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-CO', { year: 'numeric', month: 'short' });
};

// Helper para calcular si está próximo a vencer (menos de 30 días)
const isExpiringSoon = (endsAt?: Date): boolean => {
  if (!endsAt) return false;
  const now = new Date();
  const end = new Date(endsAt);
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 && diffDays <= 30;
};

export const AgreementCard = ({ agreement, href }: AgreementCardProps) => {
  const tone = getCategoryTone(agreement.category);
  const expiresText = agreement.endsAt ? formatDate(agreement.endsAt) : null;
  const expiringSoon = isExpiringSoon(agreement.endsAt);

  return (
    <Link href={href} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-2xl bg-white border-2 border-neutral-100 hover:border-accent-500 hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center">

        {/* Badge de estado (si está próximo a vencer) */}
        {expiringSoon && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-neutral-900 text-xs font-bold shadow-sm">
              ⏰ Próximo a vencer
            </span>
          </div>
        )}

        {/* Logo prominente */}
        <div className="w-28 h-28 mb-4 rounded-xl bg-surface-100 p-4 border border-neutral-200 flex items-center justify-center transition-transform group-hover:scale-105">
          {agreement.logo?.url ? (
            <Image
              src={agreement.logo.url}
              alt={agreement.logo.alt || agreement.name}
              width={112}
              height={112}
              className="object-contain"
            />
          ) : (
            <div className="text-4xl font-bold text-neutral-400">
              {(agreement.name || 'C').charAt(0)}
            </div>
          )}
        </div>

        {/* Nombre del convenio */}
        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-700 transition-colors">
          {agreement.name}
        </h3>

        {/* Badge de categoría con color temático */}
        {agreement.category && (
          <span className={clsx(
            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-3 transition-colors",
            tone === 'violet' && "bg-tone-violet-50 text-tone-violet-700 group-hover:bg-tone-violet-100",
            tone === 'teal' && "bg-tone-teal-50 text-tone-teal-700 group-hover:bg-tone-teal-100",
            tone === 'blue' && "bg-tone-blue-50 text-tone-blue-700 group-hover:bg-tone-blue-100",
            tone === 'warm' && "bg-tone-warm-50 text-tone-warm-700 group-hover:bg-tone-warm-100",
            tone === 'coral' && "bg-tone-coral-50 text-tone-coral-700 group-hover:bg-tone-coral-100",
            tone === 'green' && "bg-tone-green-50 text-tone-green-700 group-hover:bg-tone-green-100",
            tone === 'muted' && "bg-tone-muted-50 text-tone-muted-700 group-hover:bg-tone-muted-100"
          )}>
            {agreement.category}
          </span>
        )}

        {/* Descripción */}
        {agreement.description && (
          <p className="text-neutral-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {agreement.description}
          </p>
        )}

        {/* Footer: Vigencia + CTA */}
        <div className="mt-auto w-full flex items-center justify-between pt-4 border-t border-neutral-100">
          {expiresText ? (
            <span className="text-xs text-neutral-500 font-medium">
              Vigente hasta {expiresText}
            </span>
          ) : (
            <span className="text-xs text-neutral-400">Sin fecha límite</span>
          )}
          <span className="text-brand-600 text-sm font-semibold group-hover:text-accent-600 transition-colors flex items-center gap-1">
            Ver más
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default AgreementCard;
