"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

type ToneKey =
  | 'blue'
  | 'teal'
  | 'green'
  | 'violet'
  | 'coral'
  | 'sun'
  | 'warm'
  | 'muted';

const toneClasses: Record<ToneKey, { text: string; bg: string; fill: string; stroke: string }> = {
  blue: { text: 'text-tone-blue-500', bg: 'bg-tone-blue-500', fill: 'fill-tone-blue-500', stroke: 'stroke-tone-blue-500' },
  teal: { text: 'text-tone-teal-500', bg: 'bg-tone-teal-500', fill: 'fill-tone-teal-500', stroke: 'stroke-tone-teal-500' },
  green: { text: 'text-tone-green-500', bg: 'bg-tone-green-500', fill: 'fill-tone-green-500', stroke: 'stroke-tone-green-500' },
  violet: { text: 'text-tone-violet-500', bg: 'bg-tone-violet-500', fill: 'fill-tone-violet-500', stroke: 'stroke-tone-violet-500' },
  coral: { text: 'text-tone-coral-500', bg: 'bg-tone-coral-500', fill: 'fill-tone-coral-500', stroke: 'stroke-tone-coral-500' },
  sun: { text: 'text-tone-sun-500', bg: 'bg-tone-sun-500', fill: 'fill-tone-sun-500', stroke: 'stroke-tone-sun-500' },
  warm: { text: 'text-tone-warm-500', bg: 'bg-tone-warm-500', fill: 'fill-tone-warm-500', stroke: 'stroke-tone-warm-500' },
  muted: { text: 'text-tone-muted-500', bg: 'bg-tone-muted-500', fill: 'fill-tone-muted-500', stroke: 'stroke-tone-muted-500' },
};

const getTone = (key?: string) => toneClasses[(key as ToneKey) || 'green'] || toneClasses.green;

export interface HeroFullSlide {
  title: string;
  description: string;
  image: string;
  badge?: string;
  cta?: {label:string, href:string};
  contact?: string;
  tone?: ToneKey | string;
}

export interface HeroFullProps {
  slides: HeroFullSlide[];
  autoSlide?: boolean;
  slideInterval?: number;
  className?: string;
}

const HeroFull = ({
  slides = [],
  autoSlide = true,
  slideInterval = 5000,
  className = '',
}: HeroFullProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoSlide || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoSlide, slideInterval]);

  if (!slides.length) return null;

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const current = slides[currentSlide];
  const tone = getTone(current.tone as string | undefined);
  const isFirstSlide = currentSlide === 0;

  return (
    <div className={`bg-white overflow-hidden ${className}`}>
      {/* Main Hero Section */}
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={current.image}
            alt={current.title}
            fill
            priority={isFirstSlide}
            loading={isFirstSlide ? 'eager' : 'lazy'}
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover object-center"
          />
          {/* Neutral overlay + tone accents */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        </div>

        {/* Tone decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute left-0 top-0 w-96 h-96 lg:w-[500px] lg:h-[500px] ${tone.bg} rounded-full -translate-x-32 -translate-y-32 opacity-30`} />
          <div className={`absolute right-0 top-1/2 w-64 h-64 lg:w-80 lg:h-80 ${tone.bg} opacity-30 translate-x-20 -translate-y-1/2`} style={{ clipPath: 'polygon(0% 0%, 80% 0%, 100% 100%, 20% 100%)' }} />
          <div className={`absolute top-20 right-20 w-16 h-16 ${tone.bg} rounded-full opacity-20`} />
          <div className={`absolute bottom-32 left-20 w-12 h-12 ${tone.bg} rounded-full opacity-20`} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex">
          <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-8">
            {current.badge && (
              <div className="mb-4">
                <span className={`inline-block ${tone.bg} text-white px-4 py-2 rounded-lg text-sm font-bold transform -skew-x-12 shadow-lg`}>
                  <span className="block transform skew-x-12">{current.badge}</span>
                </span>
              </div>
            )}

            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight drop-shadow-lg">{current.title}</h1>
            <p className="text-white/90 text-lg lg:text-xl mb-6 lg:mb-8 max-w-lg leading-relaxed drop-shadow-md">{current.description}</p>

            {current.cta && (
              <div className="mb-4">
                <a className={`inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-white ${tone.bg}`} href={`${current.cta.href}`}>
                  {current.cta.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            )}

            {current.contact && (
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3">
                  <div className={`w-8 h-8 ${tone.bg} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">📱</span>
                  </div>
                  <span className="text-white font-bold text-lg">{current.contact}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Controls + Indicators (bottom, non-overlapping text) */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 z-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevSlide}
                  aria-label="Anterior"
                  className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      aria-label={`Ir al slide ${index + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? `w-8 ${tone.bg}` : 'w-2 bg-white/50 hover:bg-white/75'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  aria-label="Siguiente"
                  className={`p-2.5 rounded-full ${tone.bg} text-white hover:opacity-90 transition-opacity`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroFull;
