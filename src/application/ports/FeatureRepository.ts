import { Feature } from "@/domain/entities/Feature";
export interface FeatureRepository {
  list(limit?: number): Promise<Feature[]>;
}