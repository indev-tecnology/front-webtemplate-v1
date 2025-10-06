'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  suffix?: string;
}

export interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="inline-flex p-4 bg-accent/20 rounded-full mb-4">
              <Icon className="w-8 h-8 text-brand" strokeWidth={2} />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-brand mb-2">
              {stat.value}
              {stat.suffix && (
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              )}
            </div>
            <p className="text-neutral-600 font-medium">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
