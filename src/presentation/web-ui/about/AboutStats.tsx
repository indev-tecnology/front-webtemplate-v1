// presentation/web-ui/about/AboutStats.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Target } from 'lucide-react';
import type { AboutStat } from '@/domain/entities/About';

interface AboutStatsProps {
  stats: AboutStat[];
}

const iconMap: Record<string, any> = {
  Users,
  Award,
  TrendingUp,
  Target,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export function AboutStats({ stats }: AboutStatsProps) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-600 text-white relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon || 'Target'] || Target;

            return (
              <motion.div
                key={stat.id}
                variants={item}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                {/* Ícono */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Número */}
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-3xl md:text-4xl font-bold text-accent-300">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p className="text-brand-50 font-medium text-sm md:text-base">
                  {stat.label}
                </p>

                {/* Descripción (opcional) */}
                {stat.description && (
                  <p className="text-brand-100 text-xs mt-2 max-w-[200px] mx-auto">
                    {stat.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
