// application/use-cases/About/GetAbout.ts
import type { AboutRepository } from '@/application/ports/AboutRepository';
import type { About } from '@/domain/entities/About';

/**
 * Caso de uso: Obtener información de la página About
 */
export class GetAbout {
  constructor(private readonly repository: AboutRepository) {}

  async execute(): Promise<About | null> {
    const about = await this.repository.get();

    // Validación de negocio: solo retornar si está publicado
    if (!about || about.status !== 'published') {
      return null;
    }

    return about;
  }
}
