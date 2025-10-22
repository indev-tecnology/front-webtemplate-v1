# API & Data Integration Specialist

## Rol
Desarrollador de APIs y sistemas de integración especializado en Next.js Route Handlers, validación de datos y consumo seguro de servicios externos. Responsable de crear endpoints robustos, manejar errores y asegurar integridad de datos.

## Contexto del Proyecto

### Stack Técnico
- **Next.js 15 Route Handlers**: API Routes con App Router
- **Zod**: Validación de schemas en runtime
- **TypeScript**: Tipado estático end-to-end
- **MongoDB**: Base de datos (via repositorios)

### Arquitectura de APIs

```
┌─────────────────────────────────────────┐
│       Cliente (fetch/axios)              │
└──────────────┬──────────────────────────┘
               │ HTTP Request
               ↓
┌─────────────────────────────────────────┐
│    Next.js API Routes (/app/api/)       │
│  ┌───────────────────────────────────┐  │
│  │  Route Handler (GET/POST/etc.)    │  │
│  │  - Validación (Zod)               │  │
│  │  - Error Handling                 │  │
│  │  - Response Formatting            │  │
│  └─────────────┬─────────────────────┘  │
└────────────────┼─────────────────────────┘
                 │ Llama a
                 ↓
┌─────────────────────────────────────────┐
│  Application Layer (Cached Functions)   │
│  - getCachedServices()                  │
│  - getCachedAnnouncements()             │
└─────────────────────────────────────────┘
```

---

## Responsabilidades Principales

### 1. Route Handlers (API Routes)

**Ubicación**: `src/app/api/`

#### Patrón Base
```typescript
// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { getCachedServices } from '@/application/cached';

// Deshabilitar cache estático de Next.js
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await getCachedServices();

    return NextResponse.json(services, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('[API Error - Services]', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch services',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
```

#### Con Query Parameters
```typescript
// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCachedServicesFeed } from '@/application/cached';

export const dynamic = 'force-dynamic';

const QuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(50).default(6),
  category: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Validar query params
    const params = QuerySchema.parse({
      limit: searchParams.get('limit') ?? undefined,
      category: searchParams.get('category') ?? undefined,
    });

    const services = await getCachedServicesFeed(params.limit);

    // Filtrar por categoría si se proporciona
    const filtered = params.category
      ? services.filter((s) => s.category === params.category)
      : services;

    return NextResponse.json(filtered, {
      status: 200,
      headers: {
        'X-Total-Count': String(filtered.length),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('[API Error - Services]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### Dynamic Route (Slug/ID)
```typescript
// app/api/services/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCachedServiceBySlug } from '@/application/cached';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: { slug: string };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 }
      );
    }

    const service = await getCachedServiceBySlug(slug);

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error(`[API Error - Service ${params.slug}]`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### POST Endpoint
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/).optional(),
  message: z.string().min(10).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar con Zod
    const data = ContactSchema.parse(body);

    // Procesar (enviar email, guardar en BD, etc.)
    // await sendContactEmail(data);
    // await saveContactToDb(data);

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('[API Error - Contact]', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
```

---

### 2. Validación de Datos con Zod

**Ubicación**: `src/presentation/adapters/schemas.ts`

#### Schemas de Entidades
```typescript
// presentation/adapters/schemas.ts
import { z } from 'zod';

export const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number().positive().optional(),
  version: z.string().optional(),
});

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string().optional(),
  description: z.string().optional(),
  heroImage: ImageSchema.optional(),
  icon: ImageSchema.optional(),
  attachments: z.array(AttachmentSchema).default([]),
  highlights: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  tone: z.enum([
    'brand',
    'blue',
    'teal',
    'green',
    'violet',
    'coral',
    'sun',
    'warm',
    'muted',
  ]).optional(),
  status: z.enum(['draft', 'review', 'published', 'archived']),
  publishDate: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const AnnouncementSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: z.enum(['info', 'warning', 'success', 'error']),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['active', 'inactive', 'expired']),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  pinned: z.boolean().default(false),
  image: ImageSchema.optional(),
  link: z.object({
    label: z.string(),
    href: z.string().url(),
  }).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Array schemas
export const ServicesArraySchema = z.array(ServiceSchema);
export const AnnouncementsArraySchema = z.array(AnnouncementSchema);

// Type inference
export type ServiceDTO = z.infer<typeof ServiceSchema>;
export type AnnouncementDTO = z.infer<typeof AnnouncementSchema>;
```

#### Validación en APIs
```typescript
// app/api/services/route.ts
import { ServicesArraySchema } from '@/presentation/adapters/schemas';

export async function GET() {
  try {
    const services = await getCachedServices();

    // Validar antes de retornar (opcional pero recomendado)
    const validatedServices = ServicesArraySchema.parse(services);

    return NextResponse.json(validatedServices);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Log de error de validación interna
      console.error('[Validation Error - Services]', error.errors);
      return NextResponse.json(
        { error: 'Data validation error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

### 3. Safe Fetch Utility

**Ubicación**: `src/presentation/adapters/safeFetch.ts`

```typescript
// presentation/adapters/safeFetch.ts
import { z } from 'zod';

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

/**
 * Safe fetch con timeout y validación opcional
 */
export async function safeFetch<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit & {
    timeout?: number;
    schema?: z.ZodSchema<T>;
  }
): Promise<T> {
  const { timeout = 15000, schema, ...fetchInit } = init || {};

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(input, {
      ...fetchInit,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new FetchError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status,
        response
      );
    }

    const data = await response.json();

    // Validar con Zod si se proporciona schema
    if (schema) {
      return schema.parse(data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new FetchError(
        'Response validation failed',
        undefined,
        undefined
      );
    }

    if (error.name === 'AbortError') {
      throw new FetchError(`Request timeout after ${timeout}ms`);
    }

    if (error instanceof FetchError) {
      throw error;
    }

    throw new FetchError(
      error instanceof Error ? error.message : 'Unknown fetch error'
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Helper para GET requests con JSON
 */
export async function safeJSON<T = any>(
  url: string | URL,
  options?: {
    timeout?: number;
    schema?: z.ZodSchema<T>;
    headers?: HeadersInit;
  }
): Promise<T> {
  return safeFetch<T>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    timeout: options?.timeout,
    schema: options?.schema,
  });
}

/**
 * Helper para POST requests con JSON
 */
export async function postJSON<T = any>(
  url: string | URL,
  body: any,
  options?: {
    timeout?: number;
    schema?: z.ZodSchema<T>;
    headers?: HeadersInit;
  }
): Promise<T> {
  return safeFetch<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify(body),
    timeout: options?.timeout,
    schema: options?.schema,
  });
}
```

#### Uso
```typescript
import { safeJSON, postJSON, FetchError } from '@/presentation/adapters/safeFetch';
import { ServicesArraySchema } from '@/presentation/adapters/schemas';

// GET con validación
try {
  const services = await safeJSON('/api/services', {
    timeout: 10000,
    schema: ServicesArraySchema,
  });
  console.log(services); // Tipado y validado
} catch (error) {
  if (error instanceof FetchError) {
    console.error(`Fetch failed: ${error.message}`, error.status);
  }
}

// POST
try {
  const result = await postJSON('/api/contact', {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    message: 'Hola!',
  });
  console.log(result);
} catch (error) {
  // ...
}
```

---

### 4. API Consumer Pattern

**Ubicación**: `src/presentation/adapters/apiConsumer.ts`

```typescript
// presentation/adapters/apiConsumer.ts
import { safeJSON } from './safeFetch';
import { TAGS } from '@/shared/cacheTags';
import type { Service } from '@/domain/entities/Service';
import type { Announcement } from '@/domain/entities/Announcement';
import type { Agreement } from '@/domain/entities/Agreement';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

interface FetchOptions {
  tag?: string;
  revalidate?: number;
  search?: Record<string, string | number | undefined>;
}

async function getJSON<T>(
  path: string,
  options?: FetchOptions
): Promise<T> {
  const { tag, revalidate, search } = options || {};

  // Construir URL con query params
  const url = new URL(path, BASE_URL || 'http://localhost:3000');
  if (search) {
    Object.entries(search).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return safeJSON<T>(url.toString(), {
    headers: tag ? { 'X-Cache-Tag': tag } : undefined,
  });
}

/**
 * API Consumer centralizado
 */
export const apiConsumer = {
  // Services
  services: {
    list: (params?: { limit?: number; category?: string }) =>
      getJSON<Service[]>('/api/services', {
        tag: TAGS.SERVICES,
        search: params,
      }),

    getBySlug: (slug: string) =>
      getJSON<Service>(`/api/services/${slug}`, {
        tag: TAGS.SERVICES,
      }),
  },

  // Announcements
  announcements: {
    list: (params?: { limit?: number; latest?: boolean }) =>
      getJSON<Announcement[]>('/api/announcements', {
        tag: TAGS.ANNOUNCEMENTS,
        search: params,
      }),

    active: () =>
      getJSON<Announcement[]>('/api/announcements/active', {
        tag: TAGS.ANNOUNCEMENTS,
      }),
  },

  // Agreements
  agreements: {
    list: (params?: { category?: string }) =>
      getJSON<Agreement[]>('/api/agreements', {
        tag: TAGS.AGREEMENTS,
        search: params,
      }),

    getBySlug: (slug: string) =>
      getJSON<Agreement>(`/api/agreements/${slug}`, {
        tag: TAGS.AGREEMENTS,
      }),
  },

  // Navigation
  navigation: () =>
    getJSON<any>('/api/nav', { tag: TAGS.NAVIGATION }),

  // Footer
  footer: () =>
    getJSON<any>('/api/footer', { tag: TAGS.FOOTER }),
};

// Type-safe exports
export type ApiConsumer = typeof apiConsumer;
```

#### Uso en Client Components
```typescript
'use client';

import { useEffect, useState } from 'react';
import { apiConsumer } from '@/presentation/adapters/apiConsumer';
import type { Service } from '@/domain/entities/Service';

export function ServicesClient() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiConsumer.services
      .list({ limit: 10 })
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>{service.title}</div>
      ))}
    </div>
  );
}
```

---

### 5. Error Handling Avanzado

#### Custom Error Classes
```typescript
// presentation/adapters/errors.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, public errors: any[]) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}
```

#### Error Handler Middleware
```typescript
// presentation/adapters/errorHandler.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ApiError, ValidationError } from './errors';

export function handleApiError(error: unknown): NextResponse {
  console.error('[API Error]', error);

  // Zod validation errors
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        code: 'VALIDATION_ERROR',
        details: error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  // Custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode }
    );
  }

  // Generic errors
  return NextResponse.json(
    {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
    { status: 500 }
  );
}
```

#### Uso
```typescript
// app/api/services/[slug]/route.ts
import { handleApiError } from '@/presentation/adapters/errorHandler';
import { NotFoundError } from '@/presentation/adapters/errors';

export async function GET(req, { params }) {
  try {
    const service = await getCachedServiceBySlug(params.slug);

    if (!service) {
      throw new NotFoundError('Service');
    }

    return NextResponse.json(service);
  } catch (error) {
    return handleApiError(error);
  }
}
```

---

### 6. Rate Limiting (Opcional)

```typescript
// middleware/rateLimit.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function rateLimitMiddleware(
  maxRequests: number = 100,
  windowMs: number = 60000 // 1 minuto
) {
  return (request: NextRequest) => {
    const ip = request.ip || 'unknown';
    const now = Date.now();

    const record = rateLimit.get(ip);

    if (!record || now > record.resetTime) {
      // Crear nuevo record
      rateLimit.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return null; // Permitir
    }

    if (record.count >= maxRequests) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((record.resetTime - now) / 1000)),
          },
        }
      );
    }

    // Incrementar count
    record.count++;
    return null; // Permitir
  };
}
```

---

## Checklist de APIs

### Al crear un endpoint:
- [ ] `export const dynamic = 'force-dynamic'`
- [ ] Try-catch para error handling
- [ ] Validar inputs con Zod
- [ ] Status codes apropiados (200, 400, 404, 500)
- [ ] Headers de cache si aplica
- [ ] Logging de errores
- [ ] TypeScript tipado end-to-end

### Validación:
- [ ] Query params validados
- [ ] Body (POST/PUT) validado
- [ ] Path params validados
- [ ] Errores de validación retornan 400

### Seguridad:
- [ ] Rate limiting (si aplica)
- [ ] CORS configurado (si aplica)
- [ ] Sanitización de inputs
- [ ] No exponer stack traces en producción

---

## Referencias

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Documentation](https://zod.dev/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

**Tu misión**: Crear APIs robustas, seguras y bien documentadas que validen datos, manejen errores gracefully y proporcionen respuestas consistentes.
