import type { Event } from "@/domain/entities/Event";
export interface EventRepository {
  listUpcoming(limit?: number): Promise<Event[]>;
}
