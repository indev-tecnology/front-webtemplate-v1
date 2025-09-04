// src/application/ports/AgreementRepository.ts
import type { Agreement } from "@/domain/entities/Agreement";
export interface AgreementRepository {
  listAll(): Promise<Agreement[]>;
  getBySlug(slug: string): Promise<Agreement | null>;
}
