import { clsx } from 'clsx';
import type { ToneKey } from '@/shared/tone';

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  tone?: ToneKey;
  align?: 'left' | 'center';
  size?: 'default' | 'large';
  className?: string;
}

export const PageHero = ({
  title,
  subtitle,
  description,
  tone = 'green',
  align = 'left',
  size = 'default',
  className,
}: PageHeroProps) => {
  const toneStyles = {
    blue: {
      gradient: 'from-tone-blue-50 via-white to-tone-blue-50/30',
      accent: 'bg-tone-blue-500',
      text: 'text-tone-blue-600',
    },
    teal: {
      gradient: 'from-tone-teal-50 via-white to-tone-teal-50/30',
      accent: 'bg-tone-teal-500',
      text: 'text-tone-teal-600',
    },
    green: {
      gradient: 'from-tone-green-50 via-white to-tone-green-50/30',
      accent: 'bg-tone-green-500',
      text: 'text-tone-green-600',
    },
    violet: {
      gradient: 'from-tone-violet-50 via-white to-tone-violet-50/30',
      accent: 'bg-tone-violet-500',
      text: 'text-tone-violet-600',
    },
    coral: {
      gradient: 'from-tone-coral-50 via-white to-tone-coral-50/30',
      accent: 'bg-tone-coral-500',
      text: 'text-tone-coral-600',
    },
    sun: {
      gradient: 'from-tone-sun-50 via-white to-tone-sun-50/30',
      accent: 'bg-tone-sun-500',
      text: 'text-tone-sun-600',
    },
    warm: {
      gradient: 'from-tone-warm-50 via-white to-tone-warm-50/30',
      accent: 'bg-tone-warm-500',
      text: 'text-tone-warm-600',
    },
    muted: {
      gradient: 'from-tone-muted-50 via-white to-tone-muted-50/30',
      accent: 'bg-tone-muted-500',
      text: 'text-tone-muted-600',
    },
  };

  const colors = toneStyles[tone];

  return (
    <section
      className={clsx(
        'relative overflow-hidden bg-gradient-to-b',
        colors.gradient,
        size === 'large' ? 'py-16 md:py-24 lg:py-32' : 'py-12 md:py-16 lg:py-20',
        className
      )}
    >
      {/* Patrón decorativo minimalista */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute top-0 right-0 w-96 h-96 -mr-48 -mt-48" viewBox="0 0 200 200">
          <defs>
            <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className={colors.text} opacity="0.2" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div
          className={clsx(
            align === 'center' && 'text-center mx-auto',
            size === 'large' ? 'max-w-4xl' : 'max-w-3xl'
          )}
        >
          {/* Subtitle/Badge */}
          {subtitle && (
            <div className={clsx('mb-6', align === 'center' && 'flex justify-center')}>
              <span className={clsx(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider',
                'bg-white border-2 shadow-sm',
                colors.text
              )}>
                <span className={clsx('w-2 h-2 rounded-full', colors.accent)} />
                {subtitle}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className={clsx(
              'font-bold text-neutral-900 leading-[1.1] mb-6',
              size === 'large'
                ? 'text-4xl md:text-5xl lg:text-6xl'
                : 'text-3xl md:text-4xl lg:text-5xl'
            )}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={clsx(
                'text-neutral-600 leading-relaxed max-w-2xl',
                align === 'center' && 'mx-auto',
                size === 'large'
                  ? 'text-lg md:text-xl'
                  : 'text-base md:text-lg'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
