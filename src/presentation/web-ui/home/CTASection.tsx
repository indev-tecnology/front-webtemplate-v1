'use client';

import { motion } from 'framer-motion';
import { Button } from '../Button';
import { ArrowRight } from 'lucide-react';

export interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
}

export const CTASection = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage
}: CTASectionProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/95 to-brand/80" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-600 to-brand-700" />
      )}

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Content */}
      <div className="relative px-8 py-16 md:px-12 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Button variant="secondary" size="lg" asChild>
                <a href={primaryCTA.href} className="flex items-center gap-2">
                  {primaryCTA.label} <ArrowRight size={20} />
                </a>
              </Button>
            )}
            {secondaryCTA && (
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white/20"
              >
                <a href={secondaryCTA.href}>{secondaryCTA.label}</a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
