import type { Announcement } from "@/domain/entities/Announcement";

export interface AnnouncementRepository {
  listActive(limit?: number): Promise<Announcement[]>;
  getBySlug(slug: string): Promise<Announcement | null>;
}
