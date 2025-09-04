import type { Navigation } from "@/domain/entities/Navigation";
import type { NavigationRepository } from "@/application/ports/NavigationRepository";
export class GetNavigation {
  constructor(private repo: NavigationRepository) {}
  exec(): Promise<Navigation> { return this.repo.get(); }
}
