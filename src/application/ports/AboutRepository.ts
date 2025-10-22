// application/ports/AboutRepository.ts
import type { About } from '@/domain/entities/About';

/**
 * Port: About Repository
 * Define el contrato para acceder a los datos de la página About
 */
export interface AboutRepository {
  /**
   * Obtiene los datos de la página About
   */
  get(): Promise<About | null>;

  /**
   * Actualiza los datos de la página About (para admin)
   */
  update(data: Partial<About>): Promise<About>;
}
