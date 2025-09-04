// src/infrastructure/repositories/MongoAgreementRepository.ts
import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Agreement } from "@/domain/entities/Agreement";

function map(d: any): Agreement {
  return {
    id: String(d._id),
    slug: d.slug,
    name: d.name,
    description: d.description,
    logo: d.logo,
    category: d.category,
    startsAt: d.startsAt,
    endsAt: d.endsAt,
    links: d.links || [],
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

export class MongoAgreementRepository {
  async listAll(): Promise<Agreement[]> {
    const c = await col(COL.AGREEMENTS);
    const docs = await c.find().sort({ createdAt: -1 }).toArray();
    return docs.map(map);
  }
  async getBySlug(slug: string): Promise<Agreement | null> {
    const c = await col(COL.AGREEMENTS);
    const d = await c.findOne({ slug });
    return d ? map(d) : null;
  }
}
