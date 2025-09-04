import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Footer } from "@/domain/entities/Footer";

export class MongoFooterRepository {
  async get(): Promise<Footer> {
    const c = await col(COL.FOOTER);
    const doc = await c.findOne({}, { sort: { _id: 1 } });
    if (!doc) return { id: "na", columns: [], note: "", createdAt: new Date(), updatedAt: new Date() };
    return {
      id: String(doc._id),
      columns: doc.columns || [],
      socials: doc.socials || [],
      note: doc.note || "",
      createdAt: doc.createdAt, updatedAt: doc.updatedAt
    };
  }
}
