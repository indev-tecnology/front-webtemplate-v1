type SectionHeaderAlign = 'left' | 'center' | 'right';
type SectionHeaderTone =
  | 'blue'
  | 'teal'
  | 'green'
  | 'violet'
  | 'coral'
  | 'sun'
  | 'warm'
  | 'muted';

export interface SectionHeaderProps {
  title: string;
  badge?: string;
  description?: string;
  align?: SectionHeaderAlign;
  tone?: SectionHeaderTone;
  className?: string;
}

const alignClasses: Record<SectionHeaderAlign, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

const descriptionAlign: Record<SectionHeaderAlign, string> = {
  left: '',
  center: 'mx-auto',
  right: 'ml-auto',
};

const badgeAlign: Record<SectionHeaderAlign, string> = {
  left: 'self-start',
  center: 'self-center',
  right: 'self-end',
};

const toneVariants: Record<SectionHeaderTone, { title: string; badgeBg: string; badgeBorder: string; badgeText: string; accent: string; description: string }> = {
  blue: {
    title: 'text-tone-blue-600',
    badgeBg: 'bg-tone-blue-50/80',
    badgeBorder: 'border-tone-blue-200/80',
    badgeText: 'text-tone-blue-600',
    accent: 'bg-tone-blue-500/40',
    description: 'text-tone-blue-700/80',
  },
  teal: {
    title: 'text-tone-teal-600',
    badgeBg: 'bg-tone-teal-50/80',
    badgeBorder: 'border-tone-teal-200/80',
    badgeText: 'text-tone-teal-600',
    accent: 'bg-tone-teal-500/35',
    description: 'text-tone-teal-700/80',
  },
  green: {
    title: 'text-tone-green-600',
    badgeBg: 'bg-tone-green-50/80',
    badgeBorder: 'border-tone-green-200/80',
    badgeText: 'text-tone-green-600',
    accent: 'bg-tone-green-500/35',
    description: 'text-tone-green-700/80',
  },
  violet: {
    title: 'text-tone-violet-600',
    badgeBg: 'bg-tone-violet-50/80',
    badgeBorder: 'border-tone-violet-200/80',
    badgeText: 'text-tone-violet-600',
    accent: 'bg-tone-violet-500/40',
    description: 'text-tone-violet-700/80',
  },
  coral: {
    title: 'text-tone-coral-600',
    badgeBg: 'bg-tone-coral-50/80',
    badgeBorder: 'border-tone-coral-200/80',
    badgeText: 'text-tone-coral-600',
    accent: 'bg-tone-coral-500/35',
    description: 'text-tone-coral-700/80',
  },
  sun: {
    title: 'text-tone-sun-600',
    badgeBg: 'bg-tone-sun-50/80',
    badgeBorder: 'border-tone-sun-200/80',
    badgeText: 'text-tone-sun-700',
    accent: 'bg-tone-sun-500/35',
    description: 'text-tone-sun-700/85',
  },
  warm: {
    title: 'text-tone-warm-600',
    badgeBg: 'bg-tone-warm-50/80',
    badgeBorder: 'border-tone-warm-200/80',
    badgeText: 'text-tone-warm-600',
    accent: 'bg-tone-warm-500/35',
    description: 'text-tone-warm-700/80',
  },
  muted: {
    title: 'text-tone-muted-600',
    badgeBg: 'bg-tone-muted-50/80',
    badgeBorder: 'border-tone-muted-200/80',
    badgeText: 'text-tone-muted-700',
    accent: 'bg-tone-muted-500/35',
    description: 'text-tone-muted-700/80',
  },
};

export function SectionHeader({
  title,
  badge,
  description,
  align = 'left',
  tone,
  className = '',
}: SectionHeaderProps) {
  const alignment = alignClasses[align] || alignClasses.left;
  const toneStyle = tone ? toneVariants[tone] : undefined;
  const titleClasses = `text-3xl sm:text-4xl font-bold tracking-tight ${toneStyle ? toneStyle.title : 'text-slate-900'}`;
  const badgeClasses = toneStyle
    ? `${toneStyle.badgeBg} ${toneStyle.badgeBorder} ${toneStyle.badgeText}`
    : 'border-slate-200/70 bg-white/70 text-slate-600';
  const descriptionClasses = toneStyle ? toneStyle.description : 'text-slate-600';

  return (
    <header className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] shadow-sm ${badgeAlign[align]} ${badgeClasses}`}
        >
          {badge}
        </span>
      )}
      {!badge && toneStyle && (
        <span className={`h-1 w-12 rounded-full ${toneStyle.accent}`} aria-hidden />
      )}
      <h2 className={titleClasses}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${descriptionClasses} ${descriptionAlign[align]}`}>
          {description}
        </p>
      )}
    </header>
  );
}
