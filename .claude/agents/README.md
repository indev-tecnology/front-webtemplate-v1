# Subagentes Especializados - Front WebTemplate v1

Este directorio contiene **6 subagentes de IA especializados** diseñados específicamente para trabajar con la arquitectura, tecnologías y objetivos de este proyecto.

## Visión General

Cada subagente es un experto en su dominio específico y tiene conocimiento profundo de:
- La arquitectura del proyecto (Clean Architecture)
- Las tecnologías utilizadas (Next.js 15, MongoDB, Tailwind, etc.)
- Los patrones y convenciones establecidos
- El contexto de negocio (cooperativa del sector solidario financiero)

## Subagentes Disponibles

### 1. **Clean Architecture Specialist**
📁 [`clean-architecture-specialist.md`](./clean-architecture-specialist.md)

**Experto en**: Diseño de dominio, repositorios, casos de uso e infraestructura

**Responsabilidades**:
- Crear/modificar entidades de dominio puras (`domain/entities/`)
- Definir ports (interfaces de repositorios)
- Implementar casos de uso (`application/use-cases/`)
- Desarrollar repositorios MongoDB (`infrastructure/repositories/`)
- Mantener separación estricta de capas

**Cuándo usarlo**:
- Necesitas crear una nueva entidad de negocio
- Quieres agregar un nuevo repositorio
- Estás implementando lógica de negocio compleja
- Necesitas refactorizar la capa de dominio/aplicación

**Ejemplo de uso**:
```
"Actúa como Clean Architecture Specialist. Necesito crear una nueva entidad
llamada 'Review' (reseñas de servicios) con su repositorio MongoDB y caso de uso
para listar reseñas activas."
```

---

### 2. **Next.js & Caching Specialist**
📁 [`nextjs-caching-specialist.md`](./nextjs-caching-specialist.md)

**Experto en**: Optimización de rendimiento, estrategias de caché y Next.js 15

**Responsabilidades**:
- Configurar caching con `unstable_cache` + tags
- Implementar ISR (Incremental Static Regeneration)
- Crear/optimizar Server Components
- Desarrollar endpoints de revalidación
- Optimizar data fetching (parallel, streaming)

**Cuándo usarlo**:
- Necesitas optimizar el rendimiento de una página
- Quieres implementar caching para nuevos datos
- Estás trabajando con revalidación de contenido
- Necesitas configurar ISR o SSG

**Ejemplo de uso**:
```
"Actúa como Next.js & Caching Specialist. Necesito cachear la nueva entidad
Reviews con un TTL de 30 minutos y permitir revalidación por tag."
```

---

### 3. **UI/UX Components Specialist**
📁 [`ui-ux-components-specialist.md`](./ui-ux-components-specialist.md)

**Experto en**: Componentes React, Tailwind CSS, Framer Motion y accesibilidad

**Responsabilidades**:
- Crear componentes reutilizables (`presentation/web-ui/`)
- Implementar sistema de temas (ToneKey)
- Añadir animaciones con Framer Motion
- Asegurar accesibilidad (WCAG AA)
- Desarrollar layouts responsivos

**Cuándo usarlo**:
- Necesitas crear un nuevo componente visual
- Quieres implementar animaciones
- Estás trabajando en diseño responsive
- Necesitas mejorar accesibilidad

**Ejemplo de uso**:
```
"Actúa como UI/UX Components Specialist. Necesito crear un componente de
'ReviewCard' que muestre reseñas de usuarios con animación de entrada y soporte
para el sistema de tones."
```

---

### 4. **API & Data Integration Specialist**
📁 [`api-integration-specialist.md`](./api-integration-specialist.md)

**Experto en**: Next.js Route Handlers, validación y consumo de APIs

**Responsabilidades**:
- Crear endpoints en `/app/api/`
- Implementar validación con Zod
- Desarrollar `safeFetch` utilities
- Manejar errores de red y HTTP
- Crear API consumers tipados

**Cuándo usarlo**:
- Necesitas crear un nuevo endpoint API
- Quieres consumir una API externa
- Estás implementando validación de datos
- Necesitas mejorar error handling

**Ejemplo de uso**:
```
"Actúa como API & Data Integration Specialist. Necesito crear un endpoint
POST /api/reviews que valide los datos con Zod y guarde reseñas en MongoDB."
```

---

### 5. **SEO & Metadata Specialist**
📁 [`seo-metadata-specialist.md`](./seo-metadata-specialist.md)

**Experto en**: Optimización SEO, metadatos y Core Web Vitals

**Responsabilidades**:
- Generar metadata dinámica por página
- Implementar structured data (JSON-LD)
- Crear/actualizar sitemaps
- Optimizar imágenes y performance
- Configurar Open Graph y Twitter Cards

**Cuándo usarlo**:
- Necesitas optimizar SEO de una página
- Quieres implementar structured data
- Estás trabajando en metadata social (OG)
- Necesitas mejorar Core Web Vitals

**Ejemplo de uso**:
```
"Actúa como SEO & Metadata Specialist. Necesito generar metadata dinámica para
las páginas de reseñas y agregar structured data de tipo 'Review' para rich snippets."
```

---

### 6. **Content & Blocks Specialist**
📁 [`content-blocks-specialist.md`](./content-blocks-specialist.md)

**Experto en**: Sistemas de bloques, CMS headless y renderizado dinámico

**Responsabilidades**:
- Diseñar nuevos tipos de bloques
- Extender `BlockRenderer`
- Manejar attachments y media
- Implementar validación de contenido
- Transformar datos de BD a componentes

**Cuándo usarlo**:
- Necesitas crear un nuevo tipo de bloque de contenido
- Quieres extender el sistema de renderizado
- Estás trabajando con contenido estructurado
- Necesitas manejar attachments

**Ejemplo de uso**:
```
"Actúa como Content & Blocks Specialist. Necesito crear un nuevo bloque tipo
'ReviewsList' que muestre una lista de reseñas dentro del contenido de un servicio."
```

---

## Matriz de Competencias

| Subagente | Domain | Application | Infrastructure | Presentation | API | Config | SEO |
|-----------|:------:|:-----------:|:--------------:|:------------:|:---:|:------:|:---:|
| **Clean Architecture** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | - | - | - | - |
| **Next.js & Caching** | - | ⭐⭐ | - | - | ⭐⭐ | ⭐⭐⭐ | - |
| **UI/UX Components** | - | - | - | ⭐⭐⭐ | - | ⭐ | - |
| **API & Integration** | - | ⭐ | - | ⭐ | ⭐⭐⭐ | ⭐ | - |
| **SEO & Metadata** | - | - | - | ⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Content & Blocks** | ⭐⭐ | ⭐ | - | ⭐⭐⭐ | - | - | - |

**Leyenda**: ⭐⭐⭐ = Experto | ⭐⭐ = Competente | ⭐ = Conocimiento básico | - = No aplica

---

## Cómo Usar los Subagentes

### Opción 1: Contexto Directo
Copia el contenido completo del archivo `.md` del subagente en tu conversación con la IA.

**Ejemplo**:
```
[Pegar contenido de clean-architecture-specialist.md]

Ahora que conoces el contexto, ayúdame a crear una nueva entidad Review...
```

### Opción 2: Referencia al Rol
Si la IA tiene acceso a estos archivos, simplemente referencia el rol:

**Ejemplo**:
```
Actúa como Clean Architecture Specialist (ver .claude/agents/clean-architecture-specialist.md).

Necesito crear una nueva entidad Review con:
- Campo rating (1-5 estrellas)
- Campo comment (texto)
- Relación con Service
- Timestamps
```

### Opción 3: Uso Combinado
Para tareas complejas, combina múltiples subagentes:

**Ejemplo**:
```
Necesito implementar un sistema de reseñas completo:

1. [Clean Architecture Specialist]: Crear entidad Review, repositorio y casos de uso
2. [API & Integration Specialist]: Crear endpoints POST /api/reviews y GET /api/reviews
3. [UI/UX Components Specialist]: Crear componente ReviewCard y ReviewForm
4. [SEO & Metadata Specialist]: Agregar structured data de Review para rich snippets
5. [Content & Blocks Specialist]: Crear bloque ReviewsList para mostrar en páginas de servicio
```

---

## Flujo de Trabajo Recomendado

### Para Nuevas Funcionalidades

1. **Definir Dominio** (Clean Architecture Specialist)
   - Crear entidades
   - Definir repositorios
   - Implementar casos de uso

2. **Configurar Caché** (Next.js & Caching Specialist)
   - Agregar funciones cacheadas
   - Configurar tags de revalidación

3. **Crear APIs** (API & Integration Specialist)
   - Implementar endpoints
   - Validar con Zod

4. **Diseñar UI** (UI/UX Components Specialist)
   - Crear componentes visuales
   - Implementar interactividad

5. **Optimizar SEO** (SEO & Metadata Specialist)
   - Generar metadata
   - Agregar structured data

6. **Contenido Dinámico** (Content & Blocks Specialist)
   - Crear bloques si aplica
   - Extender renderer

### Para Refactoring

1. Identificar capa afectada (Domain, Application, Presentation, etc.)
2. Consultar subagente correspondiente
3. Seguir patrones establecidos en la documentación del subagente
4. Validar que se mantiene separación de capas

### Para Debugging

1. Identificar tipo de problema (datos, UI, performance, etc.)
2. Consultar subagente experto en esa área
3. Usar checklist de calidad del subagente
4. Verificar convenciones y best practices

---

## Convenciones Generales

Todos los subagentes siguen estas convenciones del proyecto:

### TypeScript
- Modo `strict: true`
- Preferir `interface` sobre `type` para objetos
- Type guards para discriminated unions
- Evitar `any`, usar `unknown` si es necesario

### Naming
- **Componentes**: PascalCase (`ServiceCard`)
- **Archivos**: PascalCase para componentes, camelCase para utils
- **Funciones**: camelCase (`getCachedServices`)
- **Tipos**: PascalCase (`ServiceRepository`)

### Estructura
- Clean Architecture: Domain → Application → Infrastructure → Presentation
- Un archivo = una responsabilidad
- Exportar desde index cuando sea apropiado

### Git
- Commits descriptivos en español
- Branches: `feature/`, `fix/`, `refactor/`
- No commits directos a main

---

## Mantenimiento de Subagentes

### Actualizar Subagentes
Cuando el proyecto evoluciona, actualiza los subagentes:

1. Revisa cambios en arquitectura
2. Actualiza ejemplos de código
3. Agrega nuevos patrones descubiertos
4. Documenta decisiones de diseño

### Crear Nuevos Subagentes
Si identificas una necesidad recurrente:

1. Define rol y responsabilidades
2. Documenta stack técnico relevante
3. Provee ejemplos prácticos del proyecto
4. Agrega checklist de calidad
5. Actualiza este README

---

## Recursos Adicionales

### Documentación del Proyecto
- [Análisis Completo del Proyecto](../docs/project-analysis.md) (si existe)
- [Guía de Contribución](../CONTRIBUTING.md) (si existe)

### Documentación Técnica
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## Feedback y Mejoras

Si encuentras oportunidades de mejora en los subagentes:

1. Documenta el caso de uso
2. Propón cambios específicos
3. Actualiza el subagente correspondiente
4. Comparte con el equipo

---

**Última actualización**: 2025-10-21
**Versión**: 1.0.0
**Proyecto**: Front WebTemplate v1 - Cooperativa Sector Solidario
