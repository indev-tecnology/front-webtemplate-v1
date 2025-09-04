// src/application/ports/ServiceRepository.ts
import type { Service } from "@/domain/entities/Service";
export interface ServiceRepository {
  listAll(): Promise<Service[]>;
  getBySlug(slug: string): Promise<Service | null>;
}
