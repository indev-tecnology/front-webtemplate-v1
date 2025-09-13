import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Recommendation } from "@/domain/entities/Recommendation";

const map = (d: any): Recommendation => ({
  id: String(d._id),
  slug: d.slug,
  title: d.title,
  description: d.description,
  image: d.image,
  cta: d.cta,
  badge: d.badge,
  kind: d.kind,
  tone: d.tone,
  dateLabel: d.dateLabel,
  publishedAt: d.publishedAt,
  visible: d.visible !== false,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt,
});

export class MongoRecommendationRepository {
  async listLatest(limit = 6): Promise<Recommendation[]> {
    const c = await col(COL.RECS);
    const docs = await c
      .find({ visible: { $ne: false } })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map(map);
  }
}

