import type { Event } from "@/domain/entities/Event";
import type { EventRepository } from "@/application/ports/EventRepository";
export class ListEvents {
  constructor(private repo: EventRepository) {}
  exec(limit = 12): Promise<Event[]> { return this.repo.listUpcoming(limit); }
}
