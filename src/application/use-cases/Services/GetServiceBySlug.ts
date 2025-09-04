// src/application/use-cases/GetServiceBySlug.ts
import type { ServiceRepository } from "@/application/ports/ServiceRepository";
import type { Service } from "@/domain/entities/Service";
export class GetServiceBySlug {
  constructor(private repo: ServiceRepository) {}
  exec(slug: string): Promise<Service | null> { return this.repo.getBySlug(slug); }
}