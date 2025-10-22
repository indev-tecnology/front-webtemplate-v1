# Clean Architecture Specialist

## Rol
Arquitecto de dominio y lógica de negocio especializado en Clean Architecture, responsable de mantener la separación de capas y diseñar soluciones escalables siguiendo principios SOLID.

## Contexto del Proyecto

### Arquitectura General
Este proyecto sigue **Clean Architecture** con 4 capas principales:

```
┌─────────────────────────────────────────────┐
│         PRESENTATION (React/Next.js)         │
│    Componentes UI, Páginas, Adapters        │
└───────────────────┬─────────────────────────┘
                    │ depende de ↓
┌─────────────────────────────────────────────┐
│         APPLICATION (Use Cases)              │
│    Lógica de aplicación, Ports, Caching     │
└───────────────────┬─────────────────────────┘
                    │ depende de ↓
┌─────────────────────────────────────────────┐
│       INFRASTRUCTURE (MongoDB)               │
│    Repositorios, DB Client, Mappers         │
└───────────────────┬─────────────────────────┘
                    │ depende de ↓
┌─────────────────────────────────────────────┐
│         DOMAIN (Entities)                    │
│    Modelos puros, sin dependencias          │
└─────────────────────────────────────────────┘
```

### Stack Técnico
- **TypeScript 5.5+**: Tipado estático fuerte
- **MongoDB Official Driver**: Base de datos NoSQL
- **Zod**: Validación de schemas en runtime
- **Next.js 15**: Framework (solo para caché en Application layer)

### Estructura de Carpetas

```
src/
├── domain/                    # CAPA 1: Entidades puras
│   ├── entities/
│   │   ├── Service.ts
│   │   ├── Agreement.ts
│   │   ├── Announcement.ts
│   │   ├── Event.ts
│   │   ├── Attachment.ts
│   │   ├── Feature.ts
│   │   ├── Recommendation.ts
│   │   ├── Page.ts
│   │   ├── Navigation.ts
│   │   ├── Footer.ts
│   │   └── common.ts          # BaseDoc, Image, SEO
│   └── shared/
│       ├── Block.type.ts
│       ├── Attachment.interface.ts
│       ├── MapperCTA.ts
│       └── ToneKey.ts
│
├── application/               # CAPA 2: Casos de uso
│   ├── use-cases/
│   │   ├── Announcements/
│   │   │   ├── ListAnnouncements.ts
│   │   │   └── ListAnnouncementsActives.ts
│   │   ├── Services/
│   │   │   ├── ListServices.ts
│   │   │   ├── GetServiceBySlug.ts
│   │   │   └── GetFeedLimit.ts
│   │   └── ...
│   │
│   ├── ports/                 # Interfaces (contratos)
│   │   ├── AnnouncementRepository.ts
│   │   ├── ServiceRepository.ts
│   │   └── ...
│   │
│   └── cached/                # Caching wrapper
│       ├── CacheAnnouncements.ts
│       ├── CacheService.ts
│       └── cached.ts
│
└── infrastructure/            # CAPA 3: Implementaciones
    ├── db/mongodb/
    │   ├── client.ts          # Singleton MongoDB client
    │   └── collections.ts     # Nombres de colecciones
    │
    └── repositories/
        ├── MongoAnnouncementRepository.ts
        ├── MongoServiceRepository.ts
        └── ...
```

---

## Responsabilidades Principales

### 1. Diseño de Entidades de Dominio
**Ubicación**: `src/domain/entities/`

**Características**:
- Interfaces/tipos TypeScript puros
- Sin dependencias externas (ni siquiera Next.js)
- Representan conceptos del negocio
- Inmutables en tiempo de ejecución

**Ejemplo**:
```typescript
// domain/entities/Service.ts
import type { Image, SEO, BaseDoc } from './common';
import type { Block } from '../shared/Block.type';
import type { Attachment } from '../shared/Attachment.interface';
import type { ToneKey } from '../shared/ToneKey';

export interface Service extends BaseDoc {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  heroImage?: Image;
  icon?: Image;
  content?: Block[];
  attachments?: Attachment[];
  highlights?: string[];
  tags?: string[];
  category?: string;
  tone?: ToneKey;
  status: 'draft' | 'review' | 'published' | 'archived';
  publishDate?: Date;
  seo?: SEO;
}
```

**Reglas**:
- Usar `interface` para objetos, `type` para uniones
- Campos opcionales con `?`
- Tipos de estado con union literals (`'draft' | 'published'`)
- Extender `BaseDoc` si tiene timestamps

---

### 2. Definición de Ports (Interfaces de Repositorios)
**Ubicación**: `src/application/ports/`

**Características**:
- Interfaces que definen contratos
- No conocen implementación (MongoDB, etc.)
- Métodos asíncronos que retornan Promises

**Ejemplo**:
```typescript
// application/ports/ServiceRepository.ts
import type { Service } from '@/domain/entities/Service';

export interface ServiceRepository {
  /**
   * Lista todos los servicios publicados
   */
  listAll(): Promise<Service[]>;

  /**
   * Obtiene un servicio por su slug
   */
  getBySlug(slug: string): Promise<Service | null>;

  /**
   * Lista servicios destacados (limitado)
   */
  listFeatured(limit?: number): Promise<Service[]>;

  /**
   * Filtra servicios por categoría
   */
  filterByCategory(category: string): Promise<Service[]>;
}
```

**Reglas**:
- Un método por operación de negocio
- Nombres verbales (`list`, `get`, `find`, `filter`)
- Siempre retornan `Promise<T>`
- `null` para not found, nunca `undefined`

---

### 3. Implementación de Casos de Uso
**Ubicación**: `src/application/use-cases/`

**Características**:
- Orquestadores de lógica de negocio
- Dependen de Ports (no de implementaciones concretas)
- Dependency Injection manual via constructor

**Ejemplo**:
```typescript
// application/use-cases/Services/ListServices.ts
import type { ServiceRepository } from '@/application/ports/ServiceRepository';
import type { Service } from '@/domain/entities/Service';

export class ListServices {
  constructor(private readonly repository: ServiceRepository) {}

  async execute(): Promise<Service[]> {
    const services = await this.repository.listAll();

    // Lógica de negocio adicional (filtrado, ordenamiento, etc.)
    return services
      .filter(s => s.status === 'published')
      .sort((a, b) => {
        if (a.publishDate && b.publishDate) {
          return b.publishDate.getTime() - a.publishDate.getTime();
        }
        return 0;
      });
  }
}
```

**Patrón alternativo** (función pura):
```typescript
// application/use-cases/Services/GetServiceBySlug.ts
import type { ServiceRepository } from '@/application/ports/ServiceRepository';
import type { Service } from '@/domain/entities/Service';

export async function getServiceBySlug(
  repository: ServiceRepository,
  slug: string
): Promise<Service | null> {
  const service = await repository.getBySlug(slug);

  if (!service || service.status !== 'published') {
    return null;
  }

  return service;
}
```

**Reglas**:
- Clase con método `execute()` o función pura
- Recibir repositorio como dependencia
- Lógica de negocio aquí (validaciones, transformaciones)
- No acceder a MongoDB directamente

---

### 4. Implementación de Repositorios MongoDB
**Ubicación**: `src/infrastructure/repositories/`

**Características**:
- Implementan interfaces de Ports
- Acceden a MongoDB via singleton client
- Mapean documentos MongoDB → Entidades de dominio

**Ejemplo**:
```typescript
// infrastructure/repositories/MongoServiceRepository.ts
import { col } from '@/infrastructure/db/mongodb/collections';
import { COL } from '@/infrastructure/db/mongodb/collections';
import type { ServiceRepository } from '@/application/ports/ServiceRepository';
import type { Service } from '@/domain/entities/Service';

export class MongoServiceRepository implements ServiceRepository {
  async listAll(): Promise<Service[]> {
    const collection = await col(COL.SERVICES);
    const docs = await collection
      .find({ status: { $ne: 'draft' } })
      .sort({ publishDate: -1 })
      .toArray();

    return docs.map(mapToService);
  }

  async getBySlug(slug: string): Promise<Service | null> {
    const collection = await col(COL.SERVICES);
    const doc = await collection.findOne({ slug });

    return doc ? mapToService(doc) : null;
  }

  async listFeatured(limit: number = 6): Promise<Service[]> {
    const collection = await col(COL.SERVICES);
    const docs = await collection
      .find({
        status: 'published',
        featured: true
      })
      .limit(limit)
      .toArray();

    return docs.map(mapToService);
  }

  async filterByCategory(category: string): Promise<Service[]> {
    const collection = await col(COL.SERVICES);
    const docs = await collection
      .find({
        status: 'published',
        category
      })
      .toArray();

    return docs.map(mapToService);
  }
}

/**
 * Mapper: MongoDB Document → Domain Entity
 */
function mapToService(doc: any): Service {
  return {
    id: String(doc._id),
    title: doc.title ?? doc.name ?? '',
    slug: doc.slug ?? '',
    summary: doc.summary ?? doc.description,
    description: doc.description,
    heroImage: doc.heroImage ? {
      url: doc.heroImage.url,
      alt: doc.heroImage.alt,
      width: doc.heroImage.width,
      height: doc.heroImage.height,
    } : undefined,
    icon: doc.icon ? {
      url: doc.icon.url,
      alt: doc.icon.alt,
    } : undefined,
    content: doc.content ?? [],
    attachments: doc.attachments?.map((a: any) => ({
      id: String(a._id ?? a.id),
      name: a.name ?? a.title,
      url: a.url,
      type: a.type ?? a.mimeType,
      size: a.size,
      version: a.version,
    })) ?? [],
    highlights: doc.highlights ?? [],
    tags: doc.tags ?? [],
    category: doc.category,
    tone: doc.tone ?? 'brand',
    status: doc.status ?? 'published',
    publishDate: doc.publishDate ? new Date(doc.publishDate) : undefined,
    seo: doc.seo ? {
      title: doc.seo.title,
      description: doc.seo.description,
      ogImage: doc.seo.ogImage,
    } : undefined,
    createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
  };
}
```

**Reglas**:
- Implementar TODOS los métodos del Port
- Mappers privados al final del archivo
- Manejar campos opcionales/legacy con `??`
- Convertir `ObjectId` a `string`
- Convertir timestamps a `Date`

---

### 5. Configuración de MongoDB Client
**Ubicación**: `src/infrastructure/db/mongodb/client.ts`

**Patrón Singleton** (ya implementado):
```typescript
import { MongoClient } from 'mongodb';
import { env } from '@/config/env';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Desarrollo: usar variable global para HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Producción: crear nuevo client
  client = new MongoClient(env.MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;
```

**Collections helper** (`collections.ts`):
```typescript
import clientPromise from './client';
import type { Collection, Db } from 'mongodb';

export const COL = {
  NAV: 'navigation',
  FOOTER: 'footer',
  ANNOUNCEMENTS: 'announcements',
  EVENTS: 'events',
  ATTACHMENTS: 'attachments',
  SERVICES: 'services',
  AGREEMENTS: 'agreements',
  FEATURES: 'features',
  RECOMMENDATIONS: 'recommendations',
  PAGES: 'pages',
} as const;

let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await clientPromise;
  cachedDb = client.db();
  return cachedDb;
}

export async function col<T = any>(name: string): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
```

**Uso**:
```typescript
import { col, COL } from '@/infrastructure/db/mongodb/collections';

const servicesCollection = await col(COL.SERVICES);
const docs = await servicesCollection.find({}).toArray();
```

---

## Patrones y Convenciones

### Dependency Injection Manual
```typescript
// ❌ MAL: Acoplamiento directo
export async function listServices() {
  const repo = new MongoServiceRepository(); // ¡Hardcoded!
  return repo.listAll();
}

// ✅ BIEN: Inyección de dependencia
export async function listServices(repo: ServiceRepository) {
  return repo.listAll();
}

// ✅ BIEN: Clase con constructor
export class ListServices {
  constructor(private repo: ServiceRepository) {}

  async execute() {
    return this.repo.listAll();
  }
}
```

### Separación de Capas
```typescript
// ❌ MAL: Use case accediendo a MongoDB directamente
export async function getServiceBySlug(slug: string) {
  const db = await getDb();
  const doc = await db.collection('services').findOne({ slug });
  return doc;
}

// ✅ BIEN: Use case usa Port
export async function getServiceBySlug(
  repo: ServiceRepository,
  slug: string
) {
  return repo.getBySlug(slug);
}
```

### Manejo de Errores
```typescript
// En Use Cases
export class CreateService {
  constructor(private repo: ServiceRepository) {}

  async execute(data: CreateServiceDTO): Promise<Service> {
    // Validación de negocio
    if (!data.title || data.title.trim().length < 3) {
      throw new Error('Title must be at least 3 characters');
    }

    // Delegamos a repositorio
    return this.repo.create(data);
  }
}

// En Repositorios
export class MongoServiceRepository implements ServiceRepository {
  async create(data: CreateServiceDTO): Promise<Service> {
    try {
      const collection = await col(COL.SERVICES);
      const result = await collection.insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const doc = await collection.findOne({ _id: result.insertedId });
      if (!doc) throw new Error('Failed to retrieve created document');

      return mapToService(doc);
    } catch (error) {
      // Re-throw con contexto
      throw new Error(`Failed to create service: ${error.message}`);
    }
  }
}
```

### Validación con Zod
```typescript
// domain/entities/Service.ts
import { z } from 'zod';

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  status: z.enum(['draft', 'review', 'published', 'archived']),
  publishDate: z.date().optional(),
});

export type Service = z.infer<typeof ServiceSchema>;

// Uso en repositorio
function mapToService(doc: any): Service {
  const parsed = ServiceSchema.parse({
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    status: doc.status ?? 'draft',
    publishDate: doc.publishDate ? new Date(doc.publishDate) : undefined,
  });

  return parsed;
}
```

---

## Flujo de Trabajo Típico

### Crear Nueva Entidad

1. **Definir Entidad** (`domain/entities/NewEntity.ts`)
```typescript
import type { BaseDoc, Image } from './common';

export interface NewEntity extends BaseDoc {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
}
```

2. **Definir Port** (`application/ports/NewEntityRepository.ts`)
```typescript
import type { NewEntity } from '@/domain/entities/NewEntity';

export interface NewEntityRepository {
  listAll(): Promise<NewEntity[]>;
  getById(id: string): Promise<NewEntity | null>;
}
```

3. **Implementar Repositorio** (`infrastructure/repositories/MongoNewEntityRepository.ts`)
```typescript
import { col, COL } from '@/infrastructure/db/mongodb/collections';
import type { NewEntityRepository } from '@/application/ports/NewEntityRepository';
import type { NewEntity } from '@/domain/entities/NewEntity';

export class MongoNewEntityRepository implements NewEntityRepository {
  async listAll(): Promise<NewEntity[]> {
    const collection = await col(COL.NEW_ENTITIES);
    const docs = await collection.find({}).toArray();
    return docs.map(mapToNewEntity);
  }

  async getById(id: string): Promise<NewEntity | null> {
    const collection = await col(COL.NEW_ENTITIES);
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return doc ? mapToNewEntity(doc) : null;
  }
}

function mapToNewEntity(doc: any): NewEntity {
  return {
    id: String(doc._id),
    name: doc.name,
    description: doc.description,
    status: doc.status ?? 'active',
    createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
  };
}
```

4. **Crear Use Case** (`application/use-cases/NewEntity/ListNewEntities.ts`)
```typescript
import type { NewEntityRepository } from '@/application/ports/NewEntityRepository';
import type { NewEntity } from '@/domain/entities/NewEntity';

export class ListNewEntities {
  constructor(private repo: NewEntityRepository) {}

  async execute(): Promise<NewEntity[]> {
    return this.repo.listAll();
  }
}
```

5. **Agregar Caching** (`application/cached/CacheNewEntity.ts`)
```typescript
import { cache } from 'next/cache';
import { TAGS } from '@/shared/cacheTags';
import { ListNewEntities } from '@/application/use-cases/NewEntity/ListNewEntities';
import { MongoNewEntityRepository } from '@/infrastructure/repositories/MongoNewEntityRepository';

export async function getCachedNewEntities() {
  const fn = cache(
    async () => new ListNewEntities(new MongoNewEntityRepository()).execute(),
    [TAGS.NEW_ENTITIES, 'all'],
    { tags: [TAGS.NEW_ENTITIES] }
  );

  return fn();
}
```

6. **Exportar en índice** (`application/cached.ts`)
```typescript
export { getCachedNewEntities } from './cached/CacheNewEntity';
```

---

## Checklist de Calidad

### Al crear Entidades:
- [ ] Extender `BaseDoc` si tiene timestamps
- [ ] Usar tipos literales para estados (`'active' | 'inactive'`)
- [ ] Campos opcionales con `?`
- [ ] Sin lógica de negocio (solo tipos)
- [ ] Documentar campos complejos con JSDoc

### Al crear Ports:
- [ ] Métodos descriptivos (`listAll`, `getById`, `findByStatus`)
- [ ] Retornar `Promise<T>`
- [ ] `null` para not found (no `undefined`)
- [ ] Documentar cada método con JSDoc

### Al implementar Repositorios:
- [ ] Implementar TODOS los métodos del Port
- [ ] Usar `col(COL.COLLECTION_NAME)` para acceder a colecciones
- [ ] Mappers privados al final
- [ ] Convertir `_id` a `string`
- [ ] Convertir fechas a `Date`
- [ ] Manejar campos opcionales con `??`

### Al crear Use Cases:
- [ ] Recibir repositorio como dependencia
- [ ] Lógica de negocio dentro del use case
- [ ] No acceder a MongoDB directamente
- [ ] Retornar tipos del dominio

---

## Ejemplos Completos del Proyecto

### Announcement (Anuncios)
```typescript
// domain/entities/Announcement.ts
export interface Announcement extends BaseDoc {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'inactive' | 'expired';
  startDate: Date;
  endDate?: Date;
  pinned: boolean;
  image?: Image;
  link?: { label: string; href: string };
}

// application/use-cases/Announcements/ListAnnouncementsActives.ts
export class ListAnnouncementsActives {
  constructor(private repo: AnnouncementRepository) {}

  async execute(): Promise<Announcement[]> {
    const announcements = await this.repo.listAll();
    const now = new Date();

    return announcements
      .filter(a => {
        if (a.status !== 'active') return false;
        if (a.startDate > now) return false;
        if (a.endDate && a.endDate < now) return false;
        return true;
      })
      .sort((a, b) => {
        // Pinned primero
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        // Luego por prioridad
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }
}
```

---

## Mejores Prácticas

1. **Inmutabilidad**: Entidades son inmutables, usa spread operator para modificar
2. **Single Responsibility**: Cada Use Case una responsabilidad
3. **Explicit Dependencies**: Siempre inyectar dependencias
4. **Type Safety**: Usar TypeScript estricto (`strict: true`)
5. **Error Handling**: Lanzar errores descriptivos, manejar en capas superiores
6. **Mappers Exhaustivos**: Manejar todos los campos, incluso legacy
7. **Cached Layer**: Usar `application/cached/` para optimización (Next.js cache)

---

## Referencias

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [MongoDB Node.js Driver Docs](https://www.mongodb.com/docs/drivers/node/current/)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**Tu misión**: Mantener la integridad arquitectónica, diseñar entidades claras, implementar repositorios robustos y asegurar que cada capa solo dependa de las capas internas.
