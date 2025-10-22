// application/cached/CacheAbout.ts
import { unstable_cache as cache } from 'next/cache';
import { TAGS } from '@/shared/cacheTags';
import { GetAbout } from '@/application/use-cases/About/GetAbout';
import { MongoAboutRepository } from '@/infrastructure/repositories/MongoAboutRepository';
import type { About } from '@/domain/entities/About';

/**
 * Obtiene los datos de About cacheados con fallback
 *
 * Estrategia de caching:
 * - TTL: 24 horas (contenido singleton de baja frecuencia de cambio)
 * - Tag: 'about' para revalidación on-demand
 * - Fallback: Contenido estático en caso de error de MongoDB
 */
export async function getCachedAbout(): Promise<About | null> {
  const fn = cache(
    async () => {
      try {
        const useCase = new GetAbout(new MongoAboutRepository());
        return await useCase.execute();
      } catch (error) {
        console.error('[CacheAbout] Error fetching from MongoDB:', error);
        // Importación dinámica del fallback para evitar bundles innecesarios
        const { aboutFallback } = await import('@/config/aboutFallback');
        return aboutFallback;
      }
    },
    [TAGS.ABOUT, 'page'],
    {
      tags: [TAGS.ABOUT],
      revalidate: 86400, // 24 horas (60 * 60 * 24)
    }
  );

  return fn();
}
