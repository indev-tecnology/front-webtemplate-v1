import type { Footer } from "@/domain/entities/Footer";
export interface FooterRepository {
  get(): Promise<Footer>;
}
