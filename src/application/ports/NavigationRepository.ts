import type { Navigation } from "@/domain/entities/Navigation";
export interface NavigationRepository {
  get(): Promise<Navigation>;
}
