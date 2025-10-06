'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className={clsx(
        align === 'center' && 'text-center mx-auto max-w-3xl',
        className
      )}
    >
      {subtitle && (
        <motion.p
          variants={item}
          className="text-sm font-bold text-brand uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
        >
          <span className="w-8 h-0.5 bg-gradient-to-r from-brand to-brand/50 rounded-full"></span>
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        variants={item}
        className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-neutral-900 to-neutral-700 bg-clip-text text-transparent mb-5 leading-[1.15]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-neutral-600 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};
