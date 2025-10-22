// presentation/web-ui/about/MissionVisionValues.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import type { MissionVisionValues as MVVType } from '@/domain/entities/About';
import { cn } from '@/shared/cn';

interface MissionVisionValuesProps {
  data: MVVType;
}

const iconMap: Record<string, any> = {
  Target,
  Eye,
  Heart,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function MissionVisionValues({ data }: MissionVisionValuesProps) {
  const MissionIcon = iconMap[data.mission.icon || 'Target'] || Target;
  const VisionIcon = iconMap[data.vision.icon || 'Eye'] || Eye;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Misión y Visión */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Misión */}
          <motion.div
            variants={item}
            className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8 md:p-10 border border-brand-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-brand-500 rounded-xl flex items-center justify-center">
                <MissionIcon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-900">
                {data.mission.title}
              </h2>
            </div>
            <p className="text-neutral-700 leading-relaxed text-lg">
              {data.mission.description}
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            variants={item}
            className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 md:p-10 border border-accent-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center">
                <VisionIcon className="w-7 h-7 text-neutral-900" strokeWidth={2} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {data.vision.title}
              </h2>
            </div>
            <p className="text-neutral-700 leading-relaxed text-lg">
              {data.vision.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Valores */}
        {data.values && data.values.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Nuestros Valores
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                Principios que guían nuestro actuar y nos definen como cooperativa
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.values.map((value) => {
                const ValueIcon = iconMap[value.icon || 'Heart'] || Heart;

                return (
                  <motion.div
                    key={value.id}
                    variants={item}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-brand-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                      <ValueIcon className="w-6 h-6 text-brand-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {value.name}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
