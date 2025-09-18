import { COL,col } from "../db/mongodb/collections";
import { Feature } from "@/domain/entities/Feature";
import { FeatureRepository } from "@/application/ports/FeatureRepository";

const map = (d:any): Feature => ({
  id: String(d._id),
  image: d.image,
  label: d.label,
  cta: d.cta,
  brand: d.brand,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt,
});

export class MongoFeatureRepository implements FeatureRepository {
    async list(limit = 20): Promise<Feature[]> {
    const c = await col(COL.FEATURES);
    const docs = await c
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map(map);
  }
}