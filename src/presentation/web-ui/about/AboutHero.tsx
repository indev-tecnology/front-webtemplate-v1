// presentation/web-ui/about/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { About } from '@/domain/entities/About';

interface AboutHeroProps {
  hero: About['hero'];
}

export function AboutHero({ hero }: AboutHeroProps) {
  return (
    <section className="relative min-h-[45vh] lg:min-h-[50vh] flex items-center overflow-hidden bg-white">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 min-h-[45vh] lg:min-h-[50vh]">
          {/* Contenido - Lado izquierdo con color sólido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative bg-brand-500 text-white flex items-center overflow-hidden"
          >
            {/* Pattern decorativo */}
            <div className="absolute inset-0 opacity-[0.07]">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Blobs decorativos */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-600/30 rounded-full blur-3xl" />

            <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 py-16 max-w-xl lg:max-w-2xl">
              {hero.subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-accent-400/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                >
                  <div className="w-2 h-2 bg-accent-300 rounded-full animate-pulse" />
                  <span className="text-accent-200 font-semibold uppercase tracking-wider text-sm">
                    {hero.subtitle}
                  </span>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]"
              >
                {hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-brand-50 leading-relaxed font-light"
              >
                {hero.description}
              </motion.p>

              {/* Línea decorativa */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-8 w-24 h-1.5 bg-accent-400 rounded-full origin-left"
              />
            </div>
          </motion.div>

          {/* Imagen - Lado derecho */}
          {hero.image && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative overflow-hidden"
            >
              {/* Imagen principal */}
              <div className="absolute inset-0">
                <Image
                  src={hero.image.url}
                  alt={hero.image.alt || hero.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradiente para depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 via-transparent to-accent-900/10" />
              </div>

              {/* Acento de color flotante */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-accent-400 to-brand-500 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-1">
                      Sobre Nosotros
                    </p>
                    <p className="text-neutral-700 font-medium">
                      Comprometidos con tu bienestar financiero
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
