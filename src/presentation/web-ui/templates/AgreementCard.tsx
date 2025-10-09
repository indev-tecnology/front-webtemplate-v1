import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import type { Agreement } from '@/domain/entities/Agreement';

export interface AgreementCardProps {
  agreement: Agreement;
  href: string;
}

export const AgreementCard = ({ agreement, href }: AgreementCardProps) => {
  return (
    <Link href={href} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-2xl bg-white border-2 border-neutral-200 hover:border-primary-300 transition-all duration-300 hover:shadow-lg">
        <div className="p-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
            {agreement.logo?.url ? (
              <Image src={agreement.logo.url} alt={agreement.logo.alt || agreement.name} width={80} height={80} className="object-contain" />
            ) : (
              <div className="text-xl font-bold text-neutral-700">{(agreement.name || 'C').charAt(0)}</div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">{agreement.name}</h3>
            {agreement.category && <p className="text-sm text-neutral-600 mb-2">{agreement.category}</p>}
            {agreement.description && <p className="text-sm text-neutral-700 line-clamp-2">{agreement.description}</p>}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default AgreementCard;
