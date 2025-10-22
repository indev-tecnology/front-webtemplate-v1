// infrastructure/repositories/MongoAboutRepository.ts
import { col, COL } from '@/infrastructure/db/mongodb/collections';
import type { AboutRepository } from '@/application/ports/AboutRepository';
import type { About, Milestone, TeamMember, Certification, AboutStat, Value, Reason } from '@/domain/entities/About';

/**
 * Implementación MongoDB del repositorio About
 *
 * Soporta versionado: si existen múltiples documentos publicados,
 * retorna el de mayor versión (más reciente).
 */
export class MongoAboutRepository implements AboutRepository {
  async get(): Promise<About | null> {
    const collection = await col(COL.ABOUT);

    // Buscar el documento publicado con la versión más alta
    const doc = await collection
      .find({ status: 'published' })
      .sort({ version: -1 }) // Mayor versión primero
      .limit(1)
      .next();

    return doc ? mapToAbout(doc) : null;
  }

  async update(data: Partial<About>): Promise<About> {
    const collection = await col(COL.ABOUT);

    const result = await collection.findOneAndUpdate(
      { status: 'published' },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after', upsert: true }
    );

    if (!result) {
      throw new Error('Failed to update About page');
    }

    return mapToAbout(result);
  }
}

/**
 * Mapper: MongoDB Document → Domain Entity
 */
function mapToAbout(doc: any): About {
  return {
    id: String(doc._id),

    hero: {
      title: doc.hero?.title || 'Sobre Nosotros',
      subtitle: doc.hero?.subtitle,
      description: doc.hero?.description || '',
      image: doc.hero?.image ? {
        url: doc.hero.image.url,
        alt: doc.hero.image.alt,
        width: doc.hero.image.width,
        height: doc.hero.image.height,
      } : undefined,
      video: doc.hero?.video,
    },

    introduction: {
      title: doc.introduction?.title || 'Nuestra Historia',
      content: doc.introduction?.content || '',
    },

    history: doc.history ? {
      title: doc.history.title || 'Nuestra Trayectoria',
      description: doc.history.description || '',
      milestones: (doc.history.milestones || []).map((m: any): Milestone => ({
        year: m.year,
        title: m.title,
        description: m.description,
        icon: m.icon,
        image: m.image ? {
          url: m.image.url,
          alt: m.image.alt,
        } : undefined,
      })),
    } : undefined,

    missionVisionValues: {
      mission: {
        title: doc.missionVisionValues?.mission?.title || 'Misión',
        description: doc.missionVisionValues?.mission?.description || '',
        icon: doc.missionVisionValues?.mission?.icon || 'Target',
      },
      vision: {
        title: doc.missionVisionValues?.vision?.title || 'Visión',
        description: doc.missionVisionValues?.vision?.description || '',
        icon: doc.missionVisionValues?.vision?.icon || 'Eye',
      },
      values: (doc.missionVisionValues?.values || []).map((v: any): Value => ({
        id: String(v.id || v._id),
        name: v.name,
        description: v.description,
        icon: v.icon,
      })),
    },

    stats: (doc.stats || []).map((s: any): AboutStat => ({
      id: String(s.id || s._id),
      value: s.value,
      suffix: s.suffix,
      label: s.label,
      icon: s.icon,
      description: s.description,
    })),

    whyChooseUs: doc.whyChooseUs ? {
      title: doc.whyChooseUs.title || '¿Por qué elegirnos?',
      description: doc.whyChooseUs.description || '',
      reasons: (doc.whyChooseUs.reasons || []).map((r: any): Reason => ({
        id: String(r.id || r._id),
        title: r.title,
        description: r.description,
        icon: r.icon,
      })),
    } : undefined,

    team: doc.team ? {
      title: doc.team.title || 'Nuestro Equipo',
      description: doc.team.description,
      members: (doc.team.members || []).map((m: any): TeamMember => ({
        id: String(m.id || m._id),
        name: m.name,
        position: m.position,
        bio: m.bio,
        photo: m.photo ? {
          url: m.photo.url,
          alt: m.photo.alt || m.name,
        } : undefined,
        email: m.email,
        phone: m.phone,
        linkedin: m.linkedin,
        order: m.order ?? 0,
      })).sort((a: TeamMember, b: TeamMember) => (a.order ?? 0) - (b.order ?? 0)),
    } : undefined,

    certifications: doc.certifications ? {
      title: doc.certifications.title || 'Certificaciones y Reconocimientos',
      description: doc.certifications.description,
      items: (doc.certifications.items || []).map((c: any): Certification => ({
        id: String(c.id || c._id),
        name: c.name,
        issuer: c.issuer,
        year: c.year,
        description: c.description,
        logo: c.logo ? {
          url: c.logo.url,
          alt: c.logo.alt || c.name,
        } : undefined,
        validUntil: c.validUntil ? new Date(c.validUntil) : undefined,
      })),
    } : undefined,

    additionalContent: doc.additionalContent || [],

    status: doc.status || 'draft',

    version: typeof doc.version === 'number' ? doc.version : 1,
    locale: doc.locale || 'es-CO',

    seo: doc.seo ? {
      title: doc.seo.title,
      description: doc.seo.description,
      ogImage: doc.seo.ogImage,
    } : undefined,

    createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
  };
}
