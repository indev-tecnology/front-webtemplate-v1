import type { ToneKey } from '@/domain/shared/ToneKey';

export interface HighlightSlide {
  title: string;
  description: string;
  image: string;
  cta: {
    label: string;
    href: string;
  };
  badge?: string;
  tone: ToneKey; // Color principal del item basado en paleta corporativa
}

export interface HighlightSliderProps {
  slides: HighlightSlide[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}
