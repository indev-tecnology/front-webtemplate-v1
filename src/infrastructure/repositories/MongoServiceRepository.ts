// src/infrastructure/repositories/MongoServiceRepository.ts
import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Service, ServiceAttachment } from "@/domain/entities/Service";

function mapAttachment(a: any): ServiceAttachment | null {
  if (!a || !a.fileUrl) return null;
  return {
    id: a.id ? String(a.id) : a._id ? String(a._id) : undefined,
    title: a.title ?? "Documento",
    fileUrl: a.fileUrl,
    fileType: a.fileType,
    fileSizeBytes: typeof a.fileSizeBytes === "number" ? a.fileSizeBytes : undefined,
    version: a.version,
  };
}

function map(d: any): Service {
  const attachments = Array.isArray(d.attachments)
    ? d.attachments.map(mapAttachment).filter(Boolean) as ServiceAttachment[]
    : undefined;
  return {
    id: String(d._id),
    slug: d.slug,
    name: d.name,
    description: d.description,
    icon: d.icon,
    subservices: d.subservices || [],
    highlights: d.highlights || [],
    attachments,
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
