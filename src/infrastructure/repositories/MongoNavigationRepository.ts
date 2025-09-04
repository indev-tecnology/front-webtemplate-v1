import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Navigation } from "@/domain/entities/Navigation";

export class MongoNavigationRepository {
  async get(): Promise<Navigation> {
    const c = await col(COL.NAV);
    const doc = await c.findOne({}, { sort: { _id: 1 } });
    if (!doc) return { id: "na", items: [], createdAt: new Date(), updatedAt: new Date() };
    return { id: String(doc._id), items: doc.items || [], createdAt: doc.createdAt, updatedAt: doc.updatedAt };
  }
}
