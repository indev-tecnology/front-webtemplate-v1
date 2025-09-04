import type { Footer } from "@/domain/entities/Footer";
import type { FooterRepository } from "@/application/ports/FooterRepository";
export class GetFooter {
  constructor(private repo: FooterRepository) {}
  exec(): Promise<Footer> { return this.repo.get(); }
}
