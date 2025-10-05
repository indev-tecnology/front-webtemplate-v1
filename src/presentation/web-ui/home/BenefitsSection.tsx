'use client';

import { motion } from 'framer-motion';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { Check } from 'lucide-react';

export interface Benefit {
  title: string;
  description: string;
  image?: string;
}

export interface BenefitsSectionProps {
  benefits: Benefit[];
}

export const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  return (
    <div>
      <SectionHeader
        subtitle="Convenios y beneficios"
        title="Ventajas exclusivas para asociados"
        description="Disfruta de convenios especiales con comercios, instituciones educativas y aliados estratégicos en todo el país."
        align="center"
        className="mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card variant="outlined" padding="lg" className="h-full">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/20 rounded-full flex-shrink-0">
                  <Check className="w-5 h-5 text-brand" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
