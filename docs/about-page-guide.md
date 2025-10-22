# Guía de la Página "Nosotros" (About Us)

## Descripción General

La página "Nosotros" es una página moderna y dinámica que presenta la información institucional de la cooperativa. Está construida siguiendo **Clean Architecture** y permite gestión dinámica del contenido desde MongoDB.

## Arquitectura

### Capas Implementadas

```
┌─────────────────────────────────────────┐
│  PRESENTACIÓN (/app/(site)/nosotros)    │
│  - AboutHero, Timeline, TeamGrid, etc.  │
└────────────────┬────────────────────────┘
                 │ usa
                 ↓
┌─────────────────────────────────────────┐
│  APPLICATION (cached/use-cases)         │
│  - getCachedAbout()                     │
│  - GetAbout (use case)                  │
└────────────────┬────────────────────────┘
                 │ depende de
                 ↓
┌─────────────────────────────────────────┐
│  INFRASTRUCTURE (repositories)          │
│  - MongoAboutRepository                 │
└────────────────┬────────────────────────┘
                 │ accede a
                 ↓
┌─────────────────────────────────────────┐
│  DOMAIN (entities)                      │
│  - About, TeamMember, Milestone, etc.   │
└─────────────────────────────────────────┘
```

---

## Componentes Visuales

### 1. AboutHero
**Ubicación**: `src/presentation/web-ui/about/AboutHero.tsx`

Hero section con gradiente de marca, patrón de fondo y wave separator.

**Props**:
```typescript
interface AboutHeroProps {
  hero: {
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    video?: string;
  };
}
```

**Características**:
- Animaciones de entrada con Framer Motion
- Gradiente brand dinámico
- Soporte para imagen o video
- Separador SVG wave
- Responsive (mobile-first)

---

### 2. MissionVisionValues
**Ubicación**: `src/presentation/web-ui/about/MissionVisionValues.tsx`

Sección que muestra Misión, Visión y Valores corporativos.

**Props**:
```typescript
interface MissionVisionValuesProps {
  data: MissionVisionValues;
}
```

**Características**:
- Grid 2 columnas para Misión y Visión
- Grid 3 columnas para Valores
- Iconos dinámicos de Lucide React
- Hover effects suaves
- Staggered animations

---

### 3. Timeline
**Ubicación**: `src/presentation/web-ui/about/Timeline.tsx`

Línea de tiempo vertical con hitos históricos.

**Props**:
```typescript
interface TimelineProps {
  history: HistorySection;
}
```

**Características**:
- Línea vertical gradiente
- Layout alternado (zigzag en desktop)
- Soporte para imágenes en milestones
- Animaciones de entrada secuenciales
- Responsive (stack en mobile)

---

### 4. AboutStats
**Ubicación**: `src/presentation/web-ui/about/AboutStats.tsx`

Estadísticas destacadas con gradiente de fondo.

**Props**:
```typescript
interface AboutStatsProps {
  stats: AboutStat[];
}
```

**Características**:
- Gradiente brand de fondo
- Grid responsive (2 cols mobile, 4 desktop)
- Iconos dinámicos
- Hover scale effect
- Patrón de puntos en background

---

### 5. WhyChooseUs
**Ubicación**: `src/presentation/web-ui/about/WhyChooseUs.tsx`

Razones para elegir la cooperativa.

**Props**:
```typescript
interface WhyChooseUsProps {
  data: WhyChooseUs;
}
```

**Características**:
- Grid 3 columnas
- Números decorativos grandes
- Hover lift effect
- Iconos con gradiente

---

### 6. TeamGrid
**Ubicación**: `src/presentation/web-ui/about/TeamGrid.tsx`

Grid de miembros del equipo directivo.

**Props**:
```typescript
interface TeamGridProps {
  title: string;
  description?: string;
  members: TeamMember[];
}
```

**Características**:
- Grid 4 columnas
- Foto con aspect ratio 3:4
- Overlay con contacto en hover
- Iconos de email, teléfono, LinkedIn
- Fallback con iniciales si no hay foto

---

## Estructura de Datos (MongoDB)

### Colección: `about`

```javascript
{
  _id: ObjectId,
  status: "published" | "draft",

  hero: {
    title: String,
    subtitle: String?,
    description: String,
    image: { url, alt, width, height }?,
    video: String?  // URL de YouTube/Vimeo
  },

  introduction: {
    title: String,
    content: String  // Texto plano o HTML
  },

  history: {
    title: String,
    description: String,
    milestones: [
      {
        year: String,
        title: String,
        description: String,
        icon: String?,  // Nombre del ícono Lucide
        image: { url, alt }?
      }
    ]
  },

  missionVisionValues: {
    mission: {
      title: String,
      description: String,
      icon: String?
    },
    vision: {
      title: String,
      description: String,
      icon: String?
    },
    values: [
      {
        id: String,
        name: String,
        description: String,
        icon: String?
      }
    ]
  },

  stats: [
    {
      id: String,
      value: String,
      suffix: String?,
      label: String,
      icon: String?,
      description: String?
    }
  ],

  whyChooseUs: {
    title: String,
    description: String,
    reasons: [
      {
        id: String,
        title: String,
        description: String,
        icon: String?
      }
    ]
  },

  team: {
    title: String,
    description: String?,
    members: [
      {
        id: String,
        name: String,
        position: String,
        bio: String?,
        photo: { url, alt }?,
        email: String?,
        phone: String?,
        linkedin: String?,
        order: Number?
      }
    ]
  },

  certifications: {
    title: String,
    description: String?,
    items: [
      {
        id: String,
        name: String,
        issuer: String,
        year: Number?,
        description: String?,
        logo: { url, alt }?,
        validUntil: Date?
      }
    ]
  },

  seo: {
    title: String?,
    description: String?,
    ogImage: { url, alt }?
  },

  createdAt: Date,
  updatedAt: Date
}
```

---

## Instalación y Configuración

### 1. Ejecutar el Seed

```bash
# Asegúrate de tener MONGODB_URI en .env
npx tsx scripts/seed-about.ts
```

Esto poblará la colección `about` con datos de ejemplo.

### 2. Verificar la Página

Navega a: `http://localhost:3000/nosotros`

### 3. Revalidación de Caché

Para actualizar el contenido sin reiniciar el servidor:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_SECRET","tag":"about"}'
```

---

## Personalización

### Cambiar Iconos

Los iconos se mapean dinámicamente desde Lucide React. Para usar un ícono diferente:

1. Ve al archivo del componente correspondiente
2. Agrega el ícono al `iconMap`:

```typescript
import { Target, Eye, Heart, NewIcon } from 'lucide-react';

const iconMap: Record<string, any> = {
  Target,
  Eye,
  Heart,
  NewIcon,  // Agregar aquí
};
```

3. En MongoDB, usa el nombre del ícono: `"icon": "NewIcon"`

### Cambiar Colores

Los colores se definen en `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    500: '#43a973',  // Color principal
    600: '#3c9a68',  // Hover
    // ...
  }
}
```

### Agregar Nuevas Secciones

1. Crear componente en `src/presentation/web-ui/about/`
2. Agregar al tipo `About` en `src/domain/entities/About.ts`
3. Actualizar mapper en `MongoAboutRepository`
4. Renderizar en `src/app/(site)/nosotros/page.tsx`

---

## Optimizaciones Implementadas

### SEO
- ✅ Metadata dinámica con `generateMetadata()`
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Keywords relevantes

### Performance
- ✅ Server Components (data fetching en servidor)
- ✅ Caching con `unstable_cache` (1 hora TTL)
- ✅ next/image para optimización de imágenes
- ✅ Revalidación on-demand via webhook
- ✅ Lazy animations (whileInView)

### Accesibilidad
- ✅ ARIA labels en botones
- ✅ Alt text en imágenes
- ✅ Focus states visibles
- ✅ Keyboard navigation
- ✅ Semantic HTML

---

## API de Revalidación

### Endpoint
`POST /api/revalidate`

### Body
```json
{
  "secret": "REVALIDATE_SECRET",
  "tag": "about"
}
```

### Respuesta
```json
{
  "revalidated": true,
  "type": "tag",
  "tag": "about",
  "timestamp": "2025-10-21T12:00:00.000Z"
}
```

---

## Troubleshooting

### La página muestra 404
- Verifica que exista un documento con `status: "published"` en la colección `about`
- Ejecuta el seed: `npx tsx scripts/seed-about.ts`

### Las imágenes no cargan
- Verifica las URLs en MongoDB
- Asegúrate de que las imágenes existan en `/public/images/`
- Para imágenes remotas, agrégalas a `next.config.mjs`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'tu-cdn.com',
    }
  ]
}
```

### El caché no se invalida
- Verifica la variable `REVALIDATE_SECRET` en `.env`
- Usa el secret correcto en la petición POST
- Comprueba que el tag sea exactamente `"about"`

---

## Mejoras Futuras

- [ ] Internacionalización (i18n)
- [ ] Modo oscuro
- [ ] Animaciones más complejas (parallax)
- [ ] Video embed en hero
- [ ] Filtros para timeline
- [ ] Paginación para equipo
- [ ] Testimonios de asociados
- [ ] Galería de fotos institucionales

---

## Referencias

- [Clean Architecture Specialist](.claude/agents/clean-architecture-specialist.md)
- [UI/UX Components Specialist](.claude/agents/ui-ux-components-specialist.md)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
