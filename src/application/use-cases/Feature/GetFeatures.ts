import { Feature } from "@/domain/entities/Feature";
import { FeatureRepository } from "@/application/ports/FeatureRepository";

export class ListFeatures {
  constructor(private repo: FeatureRepository) {}
  exec(limit = 20): Promise<Feature[]> { return this.repo.list(limit); }
}