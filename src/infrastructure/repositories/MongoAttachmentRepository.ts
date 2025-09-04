// src/infrastructure/repositories/MongoAttachmentRepository.ts
import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Attachment } from "@/domain/entities/Attachment";

const map = (d:any): Attachment => ({
  id: String(d._id),
  title: d.title,
  fileUrl: d.fileUrl,
  fileType: d.fileType,
  fileSizeBytes: d.fileSizeBytes,
  version: d.version,
  category: d.category,
  tags: d.tags || [],
  createdAt: d.createdAt, updatedAt: d.updatedAt,
});

export class MongoAttachmentRepository {
  async list(params: { category?: string; q?: string; page?: number; pageSize?: number } = {}) {
    const { category, q, page = 1, pageSize = 24 } = params;
    const c = await col(COL.ATTS);
    const filter: any = {};
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };

    const cursor = c.find(filter).sort({ createdAt: -1 }).skip((page-1)*pageSize).limit(pageSize);
    const [docs, total] = await Promise.all([cursor.toArray(), c.countDocuments(filter)]);
    return { items: docs.map(map), total };
  }
}
