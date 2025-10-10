'use client';

import { motion } from 'framer-motion';
import mapIcon from '../icons/mapIcon';
import type { LucideIcon } from 'lucide-react';

export interface Stat {
  // Accept either a LucideIcon component or the icon name string to be resolved client-side
  icon: LucideIcon | string;
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
  // Resolve icon: if a string name was provided, map it to the lucide-react icon component
  const Icon = typeof stat.icon === 'string' ? mapIcon(stat.icon) : (stat.icon as LucideIcon);
        return (
          <motion.div
            key={`${stat.label ?? 'stat'}-${index}`}
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
