import type { Announcement } from "@/domain/entities/Announcement";
import type { AnnouncementRepository } from "@/application/ports/AnnouncementRepository";
export class ListAnnouncements {
  constructor(private repo: AnnouncementRepository) {}
  exec(limit = 20): Promise<Announcement[]> { return this.repo.listActive(limit); }
}
