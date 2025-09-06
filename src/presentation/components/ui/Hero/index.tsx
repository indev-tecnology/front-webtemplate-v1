"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle, PauseCircle } from 'lucide-react';

// Tipos para TypeScript
export interface SlideData {
  title: string;
  description: string;
  image: string;
  brand?: string;
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  // Use one of the configured tone keys (tailwind.config.ts -> theme.extend.colors.tone)
  tone?:
    | 'blue'
    | 'teal'
    | 'green'
    | 'violet'
    | 'coral'
    | 'sun'
    | 'warm'
    | 'muted'
    | (string & {});
}

interface HeroSliderProps {
  slides: SlideData[];
  autoPlayInterval?: number;
  enableAutoPlay?: boolean;
}

// Mapa seguro de clases para tonos (evita clases dinámicas purgadas por Tailwind)
const toneClasses = {
  blue: {
    text: 'text-tone-blue-500',
    bg: 'bg-tone-blue-500',
    fill: 'fill-tone-blue-500',
    stroke: 'stroke-tone-blue-500',
  },
  teal: {
    text: 'text-tone-teal-500',
    bg: 'bg-tone-teal-500',
    fill: 'fill-tone-teal-500',
    stroke: 'stroke-tone-teal-500',
  },
  green: {
    text: 'text-tone-green-500',
    bg: 'bg-tone-green-500',
    fill: 'fill-tone-green-500',
    stroke: 'stroke-tone-green-500',
  },
  violet: {
    text: 'text-tone-violet-500',
    bg: 'bg-tone-violet-500',
    fill: 'fill-tone-violet-500',
    stroke: 'stroke-tone-violet-500',
  },
  coral: {
    text: 'text-tone-coral-500',
    bg: 'bg-tone-coral-500',
    fill: 'fill-tone-coral-500',
    stroke: 'stroke-tone-coral-500',
  },
  sun: {
    text: 'text-tone-sun-500',
    bg: 'bg-tone-sun-500',
    fill: 'fill-tone-sun-500',
    stroke: 'stroke-tone-sun-500',
  },
  warm: {
    text: 'text-tone-warm-500',
    bg: 'bg-tone-warm-500',
    fill: 'fill-tone-warm-500',
    stroke: 'stroke-tone-warm-500',
  },
  muted: {
    text: 'text-tone-muted-500',
    bg: 'bg-tone-muted-500',
    fill: 'fill-tone-muted-500',
    stroke: 'stroke-tone-muted-500',
  },
} as const;

type ToneKey = keyof typeof toneClasses;

const getTone = (key?: string) => {
  const fallback: ToneKey = 'green';
  if (!key) return toneClasses[fallback];
  const k = key as ToneKey;
  return toneClasses[k] ?? toneClasses[fallback];
};

// Componente de formas decorativas
const DecorativeShapes: React.FC<{ toneKey?: string }> = ({ toneKey }) => {
  const tone = getTone(toneKey);
  return (
  <>
    {/* Triángulo superior izquierdo */}
    <div className="absolute top-10 left-6 md:left-10 animate-float">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 20h20L12 2z" className={`${tone.stroke}`} strokeWidth="2" fill="none" />
      </svg>
    </div>
    
    {/* Cruz superior */}
    <div className="absolute top-8 left-1/3 animate-pulse">
      <svg width="16" height="16" viewBox="0 0 20 20">
        <path d="M10 0v20M0 10h20" className={`${tone.stroke} ${tone.fill}`} strokeWidth="2" />
      </svg>
    </div>
    
    {/* Círculo decorativo derecho */}
    <div className="absolute top-1/4 right-10 md:right-20 animate-float-delayed">
      <svg width="14" height="14" viewBox="0 0 16 16" className={`opacity-50 ${tone.fill}`}>
        <circle cx="8" cy="8" r="8" />
      </svg>
    </div>
    
    {/* Espiral decorativa */}
    <div className="absolute bottom-10 left-10 md:left-20 animate-spin-slow">
      <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
        <path 
          d="M15 15c0-5.5 4.5-10 10-10" 
          className={tone.stroke}
          strokeWidth="2" 
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
    
    {/* Puntos decorativos */}
    <div className="absolute top-1/3 right-1/3 hidden lg:block">
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full opacity-20 ${tone.bg}`}
          />
        ))}
      </div>
    </div>
    
    {/* Círculo grande de fondo */}
    <div 
      className={`absolute -right-10 top-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full opacity-10 ${tone.bg}`}
    />
  </>
  );
};

export const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides, 
  autoPlayInterval = 8000,
  enableAutoPlay = true 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navegación de slides
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval, slides.length]);

  if (!slides || slides.length === 0) {
    return <div className="h-96 flex items-center justify-center bg-gray-50">No slides provided</div>;
  }

  const currentData = slides[currentSlide];
  const tone = getTone(currentData.tone);

  return (
    <section className="relative overflow-hidden">
      {/* Altura estándar: 500px en desktop, 600px en mobile para acomodar el contenido */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[450px]">
        {/* Formas decorativas */}
        <DecorativeShapes toneKey={currentData.tone} />
        
        {/* Contenido principal */}
        <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="h-full grid lg:grid-cols-2 gap-6 lg:gap-12 items-center py-12 md:py-16">
            
            {/* Columna izquierda - Contenido */}
            <div className={`space-y-4 md:space-y-6 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
              {/* Brand */}
              {currentData.brand && (
                <div 
                  className={`text-xs md:text-sm font-semibold tracking-wider uppercase ${tone.text}`}
                >
                  {currentData.brand}
                </div>
              )}
              
              {/* Título */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {currentData.title.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === 2 || i === 5 ? (
                      <span className={tone.text}>{word} </span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </h1>
              
              {/* Descripción */}
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-lg">
                {currentData.description}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-3 items-center pt-2">
                {currentData.cta && (
                  <a
                    href={currentData.cta.href}
                    className={`
                      px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 
                      inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1
                      ${currentData.cta.variant === 'secondary' 
                        ? 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300' 
                        : `text-white hover:opacity-90 ${tone.bg}`
                      }
                    `}
                  >
                    {currentData.cta.label}
                  </a>
                )}
              </div>
              
              {/* Indicador "Scroll Down" - Solo en desktop */}
              <div className="pt-4 hidden md:block">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-xs">Scroll Down</span>
                  <div className="animate-bounce">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3v14m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Imagen */}
            <div className="relative h-[250px] md:h-[350px] lg:h-full hidden sm:block">
              <div className={`
                absolute inset-0 transition-all duration-700
                ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              `}>
                {/* Contenedor de imagen con formas */}
                <div className="relative h-full">
                  {/* Forma circular de fondo */}
                  <div 
                    className={`absolute top-5 right-5 lg:top-10 lg:right-10 w-48 h-48 lg:w-56 lg:h-56 rounded-full opacity-20 ${tone.bg}`}
                  />
                  
                  {/* Imagen principal */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <img
                      src={currentData.image}
                      alt={currentData.title}
                      className="relative z-10 max-h-full w-auto object-contain rounded-2xl"
                    />
                  </div>
                  
                  {/* Forma rectangular decorativa */}
                  <div 
                    className={`absolute bottom-5 right-0 w-32 h-32 lg:w-40 lg:h-40 rounded-3xl opacity-30 ${tone.bg}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Controles del slider - Posicionados absolutamente */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex items-center justify-between">
                {/* Indicadores */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`
                        h-1.5 md:h-2 rounded-full transition-all duration-300
                        ${index === currentSlide ? `w-8 md:w-10 ${tone.bg}` : 'w-1.5 md:w-2 bg-gray-200'}
                      `}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Controles de navegación */}
                <div className="flex items-center gap-2 md:gap-4">
                  {/* Auto-play toggle */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
                  >
                    {isAutoPlaying ? (
                      <PauseCircle size={20} className={tone.text} />
                    ) : (
                      <PlayCircle size={20} className={tone.text} />
                    )}
                  </button>
                  
                  {/* Navegación manual */}
                  <button
                    onClick={prevSlide}
                    className="p-2 md:p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className={`p-2 md:p-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 text-white ${tone.bg}`}
                    aria-label="Next slide"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* CSS para animaciones personalizadas */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};
