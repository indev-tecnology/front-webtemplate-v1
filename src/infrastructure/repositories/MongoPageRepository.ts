import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Page } from "@/domain/entities/Page";

function map(d: any): Page {
  return {
    id: String(d._id),
    slug: d.slug,
    title: d.title,
    blocks: d.blocks || [],
    seo: d.seo,
    createdAt: d.createdAt, updatedAt: d.updatedAt
  };
}

export class MongoPageRepository {
  async getBySlug(slug: string): Promise<Page | null> {
    const c = await col(COL.PAGES);
    const d = await c.findOne({ slug });
    return d ? map(d) : null;
  }
}
