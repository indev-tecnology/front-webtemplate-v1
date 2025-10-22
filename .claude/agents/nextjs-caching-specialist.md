# Next.js & Caching Specialist

## Rol
Experto en optimización de rendimiento, estrategias de caché y arquitectura de Next.js 15, responsable de maximizar la velocidad y eficiencia del sitio mediante ISR, Server Components y revalidación inteligente.

## Contexto del Proyecto

### Stack Técnico
- **Next.js**: 15.5.2 (App Router)
- **React**: 18.3.1 (Server/Client Components)
- **TypeScript**: 5.5.4
- **MongoDB**: Driver oficial con singleton pattern

### Arquitectura de Caching

```
┌──────────────────────────────────────────────┐
│          Cliente (Navegador)                  │
└───────────────┬──────────────────────────────┘
                │
                ↓ Request
┌──────────────────────────────────────────────┐
│    Next.js Edge/Node Runtime                 │
│  ┌────────────────────────────────────────┐  │
│  │     Data Cache (unstable_cache)        │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │  Tag: services → getCachedServices│  │  │
│  │  │  Tag: announcements → ...         │  │  │
│  │  │  Tag: events → ...                │  │  │
│  │  └──────────────────────────────────┘  │  │
│  └────────────────────────────────────────┘  │
└───────────────┬──────────────────────────────┘
                │
                ↓ Cache Miss
┌──────────────────────────────────────────────┐
│         MongoDB Atlas                         │
│  ┌────────────────────────────────────────┐  │
│  │  Collections: services, announcements  │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘

         ↑ Revalidation Trigger
┌──────────────────────────────────────────────┐
│     Webhook: POST /api/revalidate            │
│  { secret, tag: "services" }                 │
└──────────────────────────────────────────────┘
```

---

## Responsabilidades Principales

### 1. Estrategia de Caching con `unstable_cache`

**Ubicación**: `src/application/cached/`

#### Patrón Base
```typescript
import { unstable_cache as cache } from 'next/cache';
import { TAGS } from '@/shared/cacheTags';

export async function getCachedServices() {
  const fn = cache(
    async () => {
      // Lógica de fetching (use case + repository)
      const useCase = new ListServices(new MongoServiceRepository());
      return useCase.execute();
    },
    ['services', 'all'], // Cache keys
    {
      tags: [TAGS.SERVICES], // Tags para revalidación
      revalidate: 3600, // TTL en segundos (1 hora)
    }
  );

  return fn();
}
```

#### Cache Keys vs Tags
- **Keys**: Identificadores únicos de la cache entry
  - Ejemplo: `['services', 'all']`, `['services', 'slug:creditos']`
  - Usados para diferenciar múltiples cachés del mismo tipo
- **Tags**: Grupos lógicos para revalidación en batch
  - Ejemplo: `[TAGS.SERVICES]` → invalida TODAS las cachés taggeadas con "services"

#### Ejemplo Completo
```typescript
// application/cached/CacheService.ts
import { unstable_cache as cache } from 'next/cache';
import { TAGS } from '@/shared/cacheTags';
import { ListServices } from '@/application/use-cases/Services/ListServices';
import { GetServiceBySlug } from '@/application/use-cases/Services/GetServiceBySlug';
import { GetFeedLimit } from '@/application/use-cases/Services/GetFeedLimit';
import { MongoServiceRepository } from '@/infrastructure/repositories/MongoServiceRepository';
import type { Service } from '@/domain/entities/Service';

const repository = new MongoServiceRepository();

/**
 * Retorna todos los servicios publicados (cacheado)
 */
export async function getCachedServices(): Promise<Service[]> {
  const fn = cache(
    async () => new ListServices(repository).execute(),
    [TAGS.SERVICES, 'all'],
    {
      tags: [TAGS.SERVICES],
      revalidate: 3600, // 1 hora
    }
  );

  return fn();
}

/**
 * Retorna un servicio por slug (cacheado)
 */
export async function getCachedServiceBySlug(
  slug: string
): Promise<Service | null> {
  const fn = cache(
    async () => new GetServiceBySlug(repository).execute(slug),
    [TAGS.SERVICES, `slug:${slug}`],
    {
      tags: [TAGS.SERVICES],
      revalidate: 3600,
    }
  );

  return fn();
}

/**
 * Retorna servicios limitados para homepage (cacheado)
 */
export async function getCachedServicesFeed(
  limit: number = 6
): Promise<Service[]> {
  const fn = cache(
    async () => new GetFeedLimit(repository).execute(limit),
    [TAGS.SERVICES, `feed:${limit}`],
    {
      tags: [TAGS.SERVICES],
      revalidate: 1800, // 30 minutos (feed se actualiza más frecuentemente)
    }
  );

  return fn();
}
```

---

### 2. Tags de Revalidación

**Ubicación**: `src/shared/cacheTags.ts`

```typescript
export const TAGS = {
  NAVIGATION: 'navigation',
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

export type CacheTag = (typeof TAGS)[keyof typeof TAGS];
```

**Uso**:
```typescript
import { TAGS } from '@/shared/cacheTags';

// En función cacheada
cache(fn, keys, { tags: [TAGS.SERVICES] });

// En API de revalidación
revalidateTag(TAGS.SERVICES);
```

---

### 3. API de Revalidación

**Ubicación**: `src/app/api/revalidate/route.ts`

```typescript
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/config/env';
import { TAGS } from '@/shared/cacheTags';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, tag, path } = body;

    // Validar secret
    if (secret !== env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidar por tag
    if (tag) {
      if (!Object.values(TAGS).includes(tag)) {
        return NextResponse.json(
          { error: `Invalid tag: ${tag}` },
          { status: 400 }
        );
      }

      revalidateTag(tag);

      return NextResponse.json({
        revalidated: true,
        type: 'tag',
        tag,
        timestamp: new Date().toISOString(),
      });
    }

    // Revalidar por path
    if (path) {
      revalidatePath(path);

      return NextResponse.json({
        revalidated: true,
        type: 'path',
        path,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { error: 'Missing tag or path' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Revalidate Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Ejemplos de uso**:
```bash
# Revalidar todos los servicios
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"supersecret","tag":"services"}'

# Revalidar path específico
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"supersecret","path":"/servicios"}'
```

---

### 4. Server Components vs Client Components

#### Server Components (Default)
**Características**:
- No usan `'use client'`
- Ejecutan en servidor
- Pueden hacer data fetching directo
- No tienen estado ni efectos
- No pueden usar hooks de React

**Cuándo usar**:
- Páginas con data fetching
- Layouts
- Componentes sin interactividad
- Acceso a base de datos

**Ejemplo**:
```typescript
// app/(site)/servicios/page.tsx
import { getCachedServices } from '@/application/cached';
import { ServicesGrid } from '@/presentation/web-ui/page-sections/ServicesGrid';

export default async function ServicesPage() {
  const services = await getCachedServices();

  return (
    <main>
      <h1>Nuestros Servicios</h1>
      <ServicesGrid services={services} />
    </main>
  );
}
```

#### Client Components
**Características**:
- Inician con `'use client'`
- Ejecutan en navegador
- Tienen estado e interactividad
- Pueden usar hooks (`useState`, `useEffect`, etc.)

**Cuándo usar**:
- Formularios e inputs
- Event handlers (onClick, onChange)
- Animaciones
- Navegación interactiva
- Context providers

**Ejemplo**:
```typescript
// presentation/web-ui/Navbar.tsx
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav>
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
}
```

#### Composition Pattern (Recommended)
```typescript
// app/(site)/layout.tsx (Server Component)
import { Navbar } from '@/presentation/web-ui/Navbar'; // Client Component
import { getCachedNavigation } from '@/application/cached';

export default async function SiteLayout({ children }) {
  const navigation = await getCachedNavigation(); // Server-side fetch

  return (
    <>
      <Navbar links={navigation.links} /> {/* Pasamos data como props */}
      {children}
    </>
  );
}
```

---

### 5. ISR (Incremental Static Regeneration)

#### Configuración por Página
```typescript
// app/(site)/servicios/page.tsx
export const revalidate = 3600; // 1 hora en segundos

export default async function ServicesPage() {
  const services = await getCachedServices();
  return <div>{/* ... */}</div>;
}
```

#### Configuración Global
```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // 30 segundos
      static: 180, // 3 minutos
    },
  },
};

export default nextConfig;
```

#### generateStaticParams (SSG)
```typescript
// app/(site)/servicios/[slug]/page.tsx
import { getCachedServices } from '@/application/cached';

// Generar páginas estáticas en build time
export async function generateStaticParams() {
  const services = await getCachedServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const service = await getCachedServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return <div>{/* ... */}</div>;
}
```

**Comportamiento**:
- Build time: Genera páginas para todos los slugs existentes
- Runtime: Si se crea nuevo servicio, se genera on-demand (ISR)

---

### 6. Metadata Dinámica y SEO

#### generateMetadata
```typescript
// app/(site)/servicios/[slug]/page.tsx
import type { Metadata } from 'next';
import { getCachedServiceBySlug } from '@/application/cached';

export async function generateMetadata({ params }): Promise<Metadata> {
  const service = await getCachedServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado',
    };
  }

  return {
    title: service.seo?.title ?? `${service.title} | Cooperativa`,
    description: service.seo?.description ?? service.summary,
    openGraph: {
      title: service.seo?.title ?? service.title,
      description: service.seo?.description ?? service.summary,
      images: service.seo?.ogImage ? [service.seo.ogImage.url] : [],
      type: 'website',
      locale: 'es_CO',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo?.title ?? service.title,
      description: service.seo?.description ?? service.summary,
      images: service.seo?.ogImage ? [service.seo.ogImage.url] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  // ...
}
```

#### Metadata Estática
```typescript
// app/(site)/layout.tsx
import type { Metadata } from 'next';
import { siteMeta } from '@/config/siteStatic';

export const metadata: Metadata = {
  title: {
    default: siteMeta.brandName,
    template: `%s | ${siteMeta.brandName}`,
  },
  description: siteMeta.description,
  keywords: siteMeta.keywords,
  icons: {
    icon: siteMeta.logo,
  },
  openGraph: {
    siteName: siteMeta.brandName,
    locale: siteMeta.locale,
    type: 'website',
  },
};
```

---

### 7. Route Handlers (API Routes)

#### Pattern Base
```typescript
// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { getCachedServices } from '@/application/cached';

export const dynamic = 'force-dynamic'; // Desactivar cache estático

export async function GET() {
  try {
    const services = await getCachedServices();

    return NextResponse.json(services, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('[Services API Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### Con Query Params
```typescript
// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCachedServicesFeed } from '@/application/cached';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '6', 10);

  try {
    const services = await getCachedServicesFeed(limit);
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### 8. Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { getDb } from '@/infrastructure/db/mongodb/collections';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Verificar conexión a MongoDB
    const db = await getDb();
    await db.admin().ping();

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Health Check Error]', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
```

---

## Patrones de Optimización

### 1. Parallel Data Fetching
```typescript
// ❌ LENTO: Secuencial
export default async function HomePage() {
  const services = await getCachedServices();
  const announcements = await getCachedAnnouncements();
  const events = await getCachedEvents();

  return <div>{/* ... */}</div>;
}

// ✅ RÁPIDO: Paralelo
export default async function HomePage() {
  const [services, announcements, events] = await Promise.all([
    getCachedServices(),
    getCachedAnnouncements(),
    getCachedEvents(),
  ]);

  return <div>{/* ... */}</div>;
}
```

### 2. Streaming con Suspense
```typescript
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection />
      </Suspense>
    </main>
  );
}

// HeroSection.tsx (Server Component)
async function HeroSection() {
  const announcements = await getCachedAnnouncementsActives();
  return <HeroSlider slides={announcements} />;
}
```

### 3. Partial Prerendering (Experimental)
```typescript
// next.config.mjs
const nextConfig = {
  experimental: {
    ppr: true, // Partial Prerendering
  },
};
```

---

## Middleware y Redirecciones

### Mantenimiento Mode
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAINTENANCE = process.env.MAINTENANCE || 'off';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir acceso a /maintenance, /api/health, y assets
  if (
    pathname === '/maintenance' ||
    pathname.startsWith('/api/health') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  // Modo mantenimiento HARD: redirigir todo a /maintenance
  if (MAINTENANCE === 'hard') {
    if (pathname !== '/maintenance') {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

---

## Variables de Entorno

```env
# Caché
NEXT_REVALIDATE_SECONDS=60            # TTL default para ISR
REVALIDATE_SECRET=your-secret-here    # Secret para webhook

# MongoDB
MONGODB_URI=mongodb+srv://...

# URLs
NEXT_PUBLIC_BASE_URL=https://example.com

# Mantenimiento
MAINTENANCE=off|soft|hard
```

---

## Debugging y Monitoring

### Logging de Cache
```typescript
export async function getCachedServices() {
  const fn = cache(
    async () => {
      console.log('[Cache Miss] Fetching services from DB');
      const useCase = new ListServices(new MongoServiceRepository());
      const result = await useCase.execute();
      console.log(`[Cache Miss] Fetched ${result.length} services`);
      return result;
    },
    [TAGS.SERVICES, 'all'],
    {
      tags: [TAGS.SERVICES],
      revalidate: 3600,
    }
  );

  console.log('[Cache Check] services:all');
  return fn();
}
```

### Headers de Debug
```typescript
export async function GET() {
  const services = await getCachedServices();

  return NextResponse.json(services, {
    headers: {
      'X-Cache-Status': 'HIT', // o 'MISS'
      'X-Cache-Tag': TAGS.SERVICES,
      'X-Timestamp': new Date().toISOString(),
    },
  });
}
```

---

## Checklist de Optimización

### Data Fetching:
- [ ] Usar Server Components para data fetching
- [ ] Cachear con `unstable_cache` + tags
- [ ] Parallel fetching con `Promise.all`
- [ ] Suspense para streaming

### Caching:
- [ ] TTL apropiado según frecuencia de cambios
- [ ] Tags correctamente configurados
- [ ] Revalidación webhook implementado
- [ ] Cache keys únicos y descriptivos

### Rutas:
- [ ] `generateStaticParams` para rutas dinámicas
- [ ] `revalidate` configurado en páginas
- [ ] Metadata dinámica con `generateMetadata`
- [ ] `dynamic = 'force-dynamic'` en APIs

### Client Components:
- [ ] Mínimo uso (solo interactividad)
- [ ] Data pasada como props desde Server Components
- [ ] No duplicar lógica de fetching

---

## Referencias

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Caching in Next.js](https://nextjs.org/docs/app/building-your-application/caching)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

**Tu misión**: Maximizar rendimiento mediante estrategias de caché inteligentes, minimizar waterfalls de data fetching y asegurar que cada página cargue en <1 segundo.
