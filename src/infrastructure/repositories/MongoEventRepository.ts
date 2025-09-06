import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Event } from "@/domain/entities/Event";

function map(d: any): Event {
  return { id: String(d._id), title: d.title, description: d.description, image: d.image, location: d.location, startsAt: d.startsAt, endsAt: d.endsAt, createdAt: d.createdAt, updatedAt: d.updatedAt };
}

export class MongoEventRepository {
  async listUpcoming(limit = 12): Promise<Event[]> {
    const c = await col(COL.EVENTS);
  const now = new Date();

  // base: todos publicados
  let filter: any = {};

    filter = { startsAt: { $gte: now } };

  const docs = await c
    .find(filter)
    .sort({ startsAt: 1 })
    .limit(limit)
    .toArray();

  return docs.map(map);
  }

  async listLatest(limit = 10): Promise<Event[]> {
    const c = await col(COL.EVENTS);
    const docs = await c
      .find({})
      .sort({ startsAt: -1, createdAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map(map);
  }
}
