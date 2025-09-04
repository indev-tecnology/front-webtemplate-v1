// src/application/use-cases/ListServices.ts
import type { ServiceRepository } from "@/application/ports/ServiceRepository";
import type { Service } from "@/domain/entities/Service";
export class ListServices {
  constructor(private repo: ServiceRepository) {}
  exec(): Promise<Service[]> { return this.repo.listAll(); }
}
