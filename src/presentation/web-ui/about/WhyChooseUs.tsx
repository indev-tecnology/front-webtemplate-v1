// presentation/web-ui/about/WhyChooseUs.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Users, Award, TrendingUp, Zap, Gift } from 'lucide-react';
import type { WhyChooseUs as WhyChooseUsType } from '@/domain/entities/About';

interface WhyChooseUsProps {
  data: WhyChooseUsType;
}

const iconMap: Record<string, any> = {
  Shield,
  Heart,
  Users,
  Award,
  TrendingUp,
  Zap,
  Gift,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {data.title}
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Razones */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon || 'Shield'] || Shield;

            return (
              <motion.div
                key={reason.id}
                variants={item}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Número */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-brand-100 group-hover:text-brand-200 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Ícono */}
                  <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>

                  {/* Contenido */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 relative z-10">
                    {reason.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed relative z-10">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
