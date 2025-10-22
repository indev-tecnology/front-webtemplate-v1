// presentation/web-ui/about/Timeline.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import type { HistorySection } from '@/domain/entities/About';
import { cn } from '@/shared/cn';

interface TimelineProps {
  history: HistorySection;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

export function Timeline({ history }: TimelineProps) {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {history.title}
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            {history.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Línea vertical */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300 md:-translate-x-1/2" />

          {history.milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={`${milestone.year}-${index}`}
                variants={item}
                className={cn(
                  'relative mb-12 md:mb-16',
                  isEven ? 'md:pr-1/2' : 'md:pl-1/2'
                )}
              >
                <div className={cn(
                  'flex gap-6 items-start',
                  !isEven && 'md:flex-row-reverse'
                )}>
                  {/* Año con ícono */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {/* Círculo en la línea */}
                      <div className="absolute -left-[29px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 bg-white border-4 border-brand-500 rounded-full z-10" />

                      <div className="flex items-center gap-3 bg-brand-500 text-white px-4 py-2 rounded-full shadow-md">
                        <Calendar className="w-4 h-4" />
                        <span className="font-bold text-lg">{milestone.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200"
                  >
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {milestone.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                          src={milestone.image.url}
                          alt={milestone.image.alt || milestone.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
