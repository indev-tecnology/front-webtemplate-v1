'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { clsx } from 'clsx';

export interface HeroSlide {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: 'primary' | 'secondary';
}

export interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export const HeroSlider = ({ slides, autoPlayInterval = 6000 }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-neutral-900">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center h-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentSlide.subtitle && (
                  <p className="text-accent text-sm md:text-base font-semibold uppercase tracking-wider mb-3">
                    {currentSlide.subtitle}
                  </p>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {currentSlide.title}
                </h1>
                <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
                  {currentSlide.description}
                </p>
                {currentSlide.ctaLabel && currentSlide.ctaHref && (
                  <Button
                    variant={currentSlide.ctaVariant || 'secondary'}
                    size="lg"
                    asChild
                  >
                    <a href={currentSlide.ctaHref}>{currentSlide.ctaLabel}</a>
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Diapositiva siguiente"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={clsx(
                'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent',
                index === currentIndex
                  ? 'bg-accent w-8 md:w-10'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Ir a diapositiva ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};
