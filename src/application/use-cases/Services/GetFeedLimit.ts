import type { ServiceRepository } from "@/application/ports/ServiceRepository";
import type { Service } from "@/domain/entities/Service";
export class GetFeedLimit {
  constructor(private repo: ServiceRepository) {}
  exec(limit: number): Promise<Service[]> { return this.repo.getFeedLimit(limit); }
}