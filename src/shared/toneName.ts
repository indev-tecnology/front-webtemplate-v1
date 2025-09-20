// Shared tone typings and safe Tailwind class maps

export type ToneName =
  | 'brand'
  | 'blue'
  | 'teal'
  | 'green'
  | 'violet'
  | 'coral'
  | 'sun'
  | 'warm'
  | 'muted';

// Minimal map used by components that import toneClasses
// Keys use explicit class strings to avoid Tailwind purge issues
export const toneClasses: Record<ToneName, { accent: string; cta: string }> = {
  brand: {
    accent: 'text-brand-600',
    cta: 'text-brand-600 hover:text-brand-700',
  },
  blue: {
    accent: 'text-tone-blue-600',
    cta: 'text-tone-blue-600 hover:text-tone-blue-700',
  },
  teal: {
    accent: 'text-tone-teal-600',
    cta: 'text-tone-teal-600 hover:text-tone-teal-700',
  },
  green: {
    accent: 'text-tone-green-600',
    cta: 'text-tone-green-600 hover:text-tone-green-700',
  },
  violet: {
    accent: 'text-tone-violet-600',
    cta: 'text-tone-violet-600 hover:text-tone-violet-700',
  },
  coral: {
    accent: 'text-tone-coral-600',
    cta: 'text-tone-coral-600 hover:text-tone-coral-700',
  },
  sun: {
    accent: 'text-tone-sun-600',
    cta: 'text-tone-sun-600 hover:text-tone-sun-700',
  },
  warm: {
    accent: 'text-tone-warm-600',
    cta: 'text-tone-warm-600 hover:text-tone-warm-700',
  },
  muted: {
    accent: 'text-tone-muted-700',
    cta: 'text-tone-muted-700 hover:text-tone-muted-600',
  },
};

