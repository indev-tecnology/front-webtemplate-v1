# 🚀 Sitio Web Dinámico con Next.js + MongoDB (Arquitectura Limpia)

## 📌 Descripción
Este proyecto implementa un **sitio web dinámico** basado en **Next.js (App Router)** y **MongoDB** siguiendo principios de **arquitectura limpia**.  

El código de las **secciones/páginas está en TSX** dentro del proyecto, mientras que el contenido dinámico (navbar, footer, anuncios, eventos, anexos) se gestiona desde MongoDB.  

No incluye un dashboard de administración. Las mutaciones de datos se manejan desde un proyecto externo que puede invocar el endpoint de revalidación.

---

## 🗂️ Estructura de Carpetas

```
src/
  app/                      # App Router (presentación)
    (site)/
      layout.tsx
      page.tsx              # Home (anuncios + eventos)
      sobre-nosotros/page.tsx
      servicios/page.tsx
      convenios/page.tsx
      anexos/page.tsx
    api/                    # Endpoints solo de lectura
      nav/route.ts
      footer/route.ts
      announcements/route.ts
      events/route.ts
      attachments/route.ts
      revalidate/route.ts
  presentation/
    components/             # Navbar, Footer, Cards, Hero, etc.
    sections/               # Secciones TSX (SobreNosotros, Servicios, etc.)
    adapters/               # Validadores (Zod), helpers fetch
  application/
    use-cases/              # Casos de uso (GetNav, ListEvents, etc.)
    ports/                  # Interfaces de repositorios
  domain/
    entities/               # Entidades puras (Nav, Footer, Announcement, Event, Attachment)
  infrastructure/
    db/mongodb/             # Conexión y colecciones
    repositories/           # Implementaciones Mongo*
  shared/                   # Utilidades, tags de caché
  config/                   # Variables de entorno (Zod)
scripts/
  seed.ts                   # Script inicial de carga
```

---

## ⚙️ Stack

- **Framework:** Next.js 14/15 (App Router, Server Components, Route Handlers)
- **Lenguaje:** TypeScript
- **Base de datos:** MongoDB (driver oficial)
- **UI:** Tailwind CSS
- **Validación:** Zod
- **Arquitectura:** Clean Architecture (domain → application → infrastructure → presentation)
- **Cache:** Tags + `revalidateTag` / `revalidatePath`

---

## 🚧 Flujo de Datos

- **MongoDB**: Almacena solo lo dinámico (nav, footer, anuncios, eventos, anexos).
- **Next.js**: Renderiza páginas TSX estáticas + obtiene datos de Mongo vía API interna.
- **Revalidación**: Proyecto admin externo llama `/api/revalidate` con `REVALIDATE_SECRET`.

---

## 🛠️ Instalación

```bash
# 1. Clonar proyecto
git clone <repo-url>
cd next-mongo-clean-site

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.local.example .env.local
# editar .env.local con MONGODB_URI y NEXT_PUBLIC_BASE_URL

# 4. Ejecutar seed inicial
npm run seed

# 5. Levantar entorno local
npm run dev
```

---

## 🔑 Variables de entorno

Archivo `.env.local`:

```env
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
REVALIDATE_SECRET=supersecret
MAINTENANCE=off    # off | soft | hard
MAINTENANCE_MSG="Estamos en mantenimiento, vuelve pronto."
```

---

## 📖 Secciones / Rutas

- `/` → Home (anuncios + eventos desde Mongo)
- `/sobre-nosotros` → Página estática en TSX
- `/servicios` (+ subrutas) → TSX
- `/convenios` → TSX
- `/anexos` → TSX con listado de documentos dinámicos desde Mongo
- `/maintenance` → Página de mantenimiento
- `/api/*` → Endpoints de solo de lectura

---

## 📡 Endpoints API

| Endpoint             | Descripción                        |
|----------------------|------------------------------------|
| `/api/nav`           | Configuración de navbar            |
| `/api/footer`        | Configuración de footer            |
| `/api/announcements` | Anuncios dinámicos                 |
| `/api/events`        | Eventos próximos                   |
| `/api/attachments`   | Documentos / anexos                |
| `/api/revalidate`    | Webhook de revalidación (POST)     |
| `/api/health`        | Healthcheck (200 u 503 en hard)    |

---

## 🧩 Mantenimiento

- `MAINTENANCE=soft`: muestra banner en todas las páginas.
- `MAINTENANCE=hard`: middleware redirige todo a `/maintenance` y APIs devuelven 503.

---

## ✅ Validaciones y Errores

- `safeFetch + Zod` para validar datos de Mongo antes de usarlos.
- `error.tsx` → página global de error.
- `not-found.tsx` → para rutas inexistentes.
- APIs devuelven 404 / 503 según el caso.

---

## 📦 Semillas iniciales

Ejecutar:

```bash
npm run seed
```

Esto crea:
- Nav y Footer por defecto
- Secciones básicas (referencias en nav)
- Un anuncio de bienvenida
- Un evento próximo
- Un anexo de ejemplo

---

## 🚀 Despliegue

- Hosting recomendado: **Vercel** (runtime `nodejs`)
- Mantener variables de entorno seguras
- Revalidación vía webhook externo desde proyecto admin

---

## 🗺️ Extensión futura

- Agregar más tipos de contenido (ej: blog, testimonios, proyectos) → crear entidad en `domain`, puerto en `application/ports`, repositorio en `infrastructure`, API y consumo en UI.
- Implementar búsqueda y paginación en listados.
- Agregar SEO avanzado por página (`metadata` en cada TSX).

---

## 📚 Referencias

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Arquitectura Limpia - Resumen](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Zod Docs](https://zod.dev/)