// src/infrastructure/repositories/MongoServiceRepository.ts
import { col, COL } from "@/infrastructure/db/mongodb/collections";
import type { Service } from "@/domain/entities/Service";

function map(d: any): Service {
  // Map attachments from Service domain definition
  const attachments = Array.isArray(d.attachments)
    ? d.attachments.map((a: any) => ({
        id: a.id ? String(a.id) : a._id ? String(a._id) : undefined,
        filename: a.filename ?? a.title ?? "Documento",
        url: a.url ?? a.fileUrl,
        contentType: a.contentType ?? a.fileType ?? "application/octet-stream",
        size: typeof a.size === "number" ? a.size : a.fileSizeBytes ?? 0,
        uploadedAt: a.uploadedAt ? new Date(a.uploadedAt) : new Date(),
        tags: a.tags ?? [],
        createdBy: a.createdBy,
      })).filter((a: any) => a.url)
    : [];

  // Map heroImage
  const heroImage = d.heroImage ? {
    url: d.heroImage.url,
    alt: d.heroImage.alt,
    width: d.heroImage.width,
    height: d.heroImage.height,
  } : undefined;

  // Map SEO
  const seo = d.seo ? {
    title: d.seo.title,
    description: d.seo.description,
    canonical: d.seo.canonical,
  } : undefined;

  return {
    id: String(d._id),
    title: d.title ?? d.name, // Backwards compatible with 'name' field
    slug: d.slug,
    summary: d.summary ?? d.description, // Backwards compatible
    heroImage,
    content: Array.isArray(d.content) ? d.content : [],
    subservices: d.subservices || [],
    attachments,
    categories: d.categories || [],
    tags: d.tags || d.highlights || [], // Backwards compatible with 'highlights'
    seo,
    status: d.status || "published",
    publishDate: d.publishDate ? new Date(d.publishDate) : undefined,
    createdAt: d.createdAt ? new Date(d.createdAt) : new Date(),
    updatedAt: d.updatedAt ? new Date(d.updatedAt) : new Date(),
    author: d.author,
    locale: d.locale ?? "es-CO",
  };
}

export class MongoServiceRepository {
  /**
   * List services with optional projection and limit.
   * By default returns ALL fields from the Service domain.
   */
  async listAll(opts: { limit?: number; projection?: any } = {}): Promise<Service[]> {
    const c = await col(COL.SERVICES);

    // Fetch ALL fields by default to match Service domain
    const proj = opts.projection ?? {
      // Core fields
      title: 1,
      name: 1, // Backwards compatibility
      slug: 1,
      summary: 1,
      description: 1, // Backwards compatibility
      heroImage: 1,
      content: 1,

      // Organization
      subservices: 1,
      attachments: 1,
      categories: 1,
      tags: 1,
      highlights: 1, // Backwards compatibility

      // SEO
      seo: 1,

      // Publishing
      status: 1,
      publishDate: 1,
      author: 1,
      locale: 1,

      // Metadata
      createdAt: 1,
      updatedAt: 1,
    };

    const cursor = c
      .find({ status: { $ne: "draft" } }) // Only published/review/archived
      .sort({ publishDate: -1, createdAt: -1 })
      .project(proj);

    if (opts.limit && Number(opts.limit) > 0) cursor.limit(Number(opts.limit));
    const docs = await cursor.toArray();
    return docs.map(map);
  }

  async getBySlug(slug: string): Promise<Service | null> {
    const c = await col(COL.SERVICES);
    const d = await c.findOne({ slug });
    return d ? map(d) : null;
  }
}
