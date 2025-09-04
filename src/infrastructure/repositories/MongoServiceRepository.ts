// src/infrastructure/repositories/MongoServiceRepository.ts
import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Service } from "@/domain/entities/Service";

function map(d: any): Service {
  return {
    id: String(d._id),
    slug: d.slug,
    name: d.name,
    description: d.description,
    icon: d.icon,
    subservices: d.subservices || [],
    highlights: d.highlights || [],
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

export class MongoServiceRepository {
  async listAll(): Promise<Service[]> {
    const c = await col(COL.SERVICES);
    const docs = await c.find().sort({ name: 1 }).toArray();
    return docs.map(map);
  }
  async getBySlug(slug: string): Promise<Service | null> {
    const c = await col(COL.SERVICES);
    const d = await c.findOne({ slug });
    return d ? map(d) : null;
  }
}
