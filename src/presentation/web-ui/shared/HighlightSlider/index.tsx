'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HighlightSliderProps } from './types';
import type { ToneKey } from '@/domain/shared/ToneKey';

// Mapa de colores corporativos basados en ToneKey
const TONE_COLORS: Record<ToneKey, { primary: string; secondary: string; accent: string }> = {
  brand: { primary: '#16633f', secondary: '#208644', accent: '#0f492e' },
  blue: { primary: '#004f5d', secondary: '#3cb8b4', accent: '#00313a' },
  teal: { primary: '#3cb8b4', secondary: '#95e5e2', accent: '#297f7d' },
  green: { primary: '#208644', secondary: '#99d7bd', accent: '#175f33' },
  violet: { primary: '#8b5cf6', secondary: '#ddd6fe', accent: '#6d28d9' },
  coral: { primary: '#ff6b6b', secondary: '#ffb3b3', accent: '#be3f3f' },
  sun: { primary: '#e1c79b', secondary: '#f5e6cc', accent: '#a98556' },
  warm: { primary: '#fb923c', secondary: '#fed7aa', accent: '#ea580c' },
  muted: { primary: '#9ca3af', secondary: '#cfd3d9', accent: '#616775' },
};

export default function HighlightSlider({
  slides,
  autoplay = true,
  autoplayInterval = 5000,
  className = '',
}: HighlightSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, currentIndex]
  );

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;
    const interval = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, nextSlide, slides.length]);

  const currentSlide = slides[currentIndex];
  const toneColors = TONE_COLORS[currentSlide.tone];

  // Alternar posición de imagen (derecha/izquierda)
  const imageOnRight = currentIndex % 2 === 0;

  return (
    <section className={`relative w-full min-h-[360px] lg:h-[420px] overflow-hidden ${className}`}>
      {/* Background con gradiente basado en tone más brillante */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `linear-gradient(135deg, ${toneColors.primary}35 0%, ${toneColors.secondary}28 50%, ${toneColors.primary}20 100%)`,
        }}
      />

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full opacity-20 blur-3xl animate-float-slow"
          style={{ backgroundColor: toneColors.primary }}
        />
        <div
          className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full opacity-15 blur-[120px] animate-float-slower"
          style={{ backgroundColor: toneColors.secondary }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className={`flex flex-col ${imageOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 lg:gap-8 h-full`}>

          {/* Columna de contenido */}
          <div className="w-full lg:w-1/2 space-y-4 animate-slide-in-up">
            {/* Badge */}
            {currentSlide.badge && (
              <div className="inline-block animate-fade-in-down">
                <span
                  className="px-3 py-1.5 rounded-full text-white text-xs font-medium shadow-lg"
                  style={{ backgroundColor: toneColors.primary }}
                >
                  {currentSlide.badge}
                </span>
              </div>
            )}

            {/* Título */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in-up"
              style={{ color: toneColors.primary }}
            >
              {currentSlide.title}
            </h2>

            {/* Descripción */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed animate-fade-in-up animation-delay-200">
              {currentSlide.description}
            </p>

            {/* CTA Button */}
            <div className="pt-2 animate-fade-in-up animation-delay-400">
              <Link
                href={currentSlide.cta.href}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:gap-3 text-white"
                style={{ backgroundColor: toneColors.primary }}
              >
                <span>{currentSlide.cta.label}</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Columna de imagen con efectos 3D y glass */}
          <div className="w-full lg:w-1/2 relative animate-fade-in-right">
            <div className="relative group">
              {/* Contenedor de imagen principal con efecto glass */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Imagen principal */}
                <div className="relative aspect-[5/3] lg:aspect-[4/3]">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    fill
                    priority
                    quality={90}
                    className="object-cover"
                  />
                  {/* Overlay glass/vidrio sutil */}
                  <div
                    className="absolute inset-0 backdrop-blur-[0.5px]"
                    style={{
                      background: `linear-gradient(135deg, ${toneColors.primary}08 0%, transparent 50%, ${toneColors.secondary}06 100%)`,
                    }}
                  />
                  {/* Borde interior glass */}
                  <div className="absolute inset-0 rounded-2xl border border-white/20" />
                  {/* Reflejo glass superior */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Sombras 3D múltiples con efecto de profundidad mejorado */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-50 -z-10 translate-x-6 translate-y-6"
                style={{
                  backgroundColor: toneColors.primary,
                  boxShadow: `0 20px 40px -10px ${toneColors.primary}60`
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl blur-3xl opacity-30 -z-20 translate-x-12 translate-y-12"
                style={{
                  backgroundColor: toneColors.accent,
                  boxShadow: `0 30px 50px -12px ${toneColors.accent}40`
                }}
              />

              {/* Ilustraciones abstractas delgadas (4 principales) */}

              {/* Curva superior derecha - más abstracta y delgada */}
              <svg
                className="absolute -top-4 -right-3 w-44 h-48 lg:w-52 lg:h-60 pointer-events-none z-20 opacity-35"
                viewBox="0 0 180 240"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`abstract1-${currentIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={toneColors.primary} stopOpacity="0.85" />
                    <stop offset="50%" stopColor={toneColors.secondary} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={toneColors.accent} stopOpacity="0.35" />
                  </linearGradient>
                  <filter id="soft-glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -8" result="glow" />
                  </filter>
                </defs>
                <path
                  d="M 160 5 Q 130 40, 145 80 Q 160 120, 175 160 Q 180 190, 175 225"
                  stroke={`url(#abstract1-${currentIndex})`}
                  strokeWidth="7"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#soft-glow)"
                  style={{
                    filter: `drop-shadow(3px 6px 12px ${toneColors.primary}40)`
                  }}
                />
              </svg>

              {/* Arco inferior izquierda - forma orgánica */}
              <svg
                className="absolute -bottom-5 -left-3 w-48 h-44 lg:w-60 lg:h-56 pointer-events-none z-20 opacity-32"
                viewBox="0 0 220 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`abstract2-${currentIndex}`} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={toneColors.accent} stopOpacity="0.8" />
                    <stop offset="50%" stopColor={toneColors.primary} stopOpacity="0.65" />
                    <stop offset="100%" stopColor={toneColors.secondary} stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5 185 Q 40 145, 85 160 Q 130 175, 170 150 Q 200 130, 215 145"
                  stroke={`url(#abstract2-${currentIndex})`}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#soft-glow)"
                  style={{
                    filter: `drop-shadow(4px 7px 14px ${toneColors.primary}35)`
                  }}
                />
              </svg>

              {/* Curva superior izquierda - minimalista */}
              <svg
                className="absolute top-4 -left-3 w-40 h-40 lg:w-48 lg:h-52 pointer-events-none z-20 opacity-28"
                viewBox="0 0 180 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`abstract3-${currentIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={toneColors.primary} stopOpacity="0.75" />
                    <stop offset="50%" stopColor={toneColors.secondary} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={toneColors.accent} stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path
                  d="M 8 15 Q 45 45, 28 90 Q 15 135, 35 175"
                  stroke={`url(#abstract3-${currentIndex})`}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#soft-glow)"
                  style={{
                    filter: `drop-shadow(3px 5px 10px ${toneColors.primary}38)`
                  }}
                />
              </svg>

              {/* Trazo lateral derecho - sutil */}
              <svg
                className="absolute top-1/3 -right-2 w-32 h-40 lg:w-40 lg:h-52 pointer-events-none z-20 opacity-25"
                viewBox="0 0 150 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id={`abstract4-${currentIndex}`} x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor={toneColors.secondary} stopOpacity="0.7" />
                    <stop offset="50%" stopColor={toneColors.primary} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={toneColors.accent} stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M 145 12 Q 115 60, 140 105 Q 150 140, 135 180"
                  stroke={`url(#abstract4-${currentIndex})`}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#soft-glow)"
                  style={{
                    filter: `drop-shadow(2px 4px 8px ${toneColors.secondary}35)`
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación - Flechas */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 bg-white backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border border-gray-200"
            aria-label="Anterior"
            style={{ color: toneColors.primary }}
          >
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 bg-white backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border border-gray-200"
            aria-label="Siguiente"
            style={{ color: toneColors.primary }}
          >
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicadores de posición */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((slide, index) => (
            <button
              key={`highlight-dot-${index}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                index === currentIndex ? 'w-12' : 'w-2 opacity-50 hover:opacity-70'
              }`}
              style={{ backgroundColor: index === currentIndex ? toneColors.primary : TONE_COLORS[slide.tone].primary }}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress bar automático */}
      {autoplay && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 z-20">
          <div
            className="h-full transition-all"
            style={{
              backgroundColor: toneColors.primary,
              width: '100%',
              animation: `progress ${autoplayInterval}ms linear infinite`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
