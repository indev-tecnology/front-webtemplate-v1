import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Announcement } from "@/domain/entities/Announcement";
import { s } from "framer-motion/client";

const map = (d:any): Announcement => ({
  id: String(d._id),
  slug: d.slug,
  title: d.title,
  description: d.description,
  bodyHTML: d.bodyHTML,
  image: d.image,
  cta: d.cta,
  tags: d.tags || [],
  priority: d.priority ?? 0,
  pinned: !!d.pinned,
  publishedAt: d.publishedAt,
  expiresAt: d.expiresAt ?? null,
  visible: d.visible !== false,
  tone: d.tone || 'neutral',
  createdAt: d.createdAt,
  updatedAt: d.updatedAt,
});

function activeFilter(now = new Date()) {
  return {
    visible: { $ne: false },
    $and: [
      { $or: [{ publishedAt: { $exists: false } }, { publishedAt: { $lte: now } }] },
      { $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gt: now } }] },
    ],
  };
}

export class MongoAnnouncementRepository {
  async listActive(limit = 10): Promise<Announcement[]> {
    const c = await col(COL.ANNS);
    const docs = await c
      .find(activeFilter())
      .sort({ pinned: -1, priority: -1, publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map(map);
  }

  async listLatest(limit = 5): Promise<Announcement[]> {
    const c = await col(COL.ANNS);
    const docs = await c
      // Mostrar aunque la fecha sea vieja o esté expirada; sólo respetar visibilidad
      .find({ visible: { $ne: false } })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map(map);
  }

  async getBySlug(slug: string): Promise<Announcement | null> {
    const c = await col(COL.ANNS);
    const d = await c.findOne({ slug });
    return d ? map(d) : null;
  }
}
