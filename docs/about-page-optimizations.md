# Optimizaciones Implementadas - Página About

## Resumen de Mejoras

Se han implementado las siguientes optimizaciones siguiendo los estándares de Clean Architecture y las mejores prácticas de Next.js:

### 1. Versionado y Localización ✅

**Cambios en la Entidad**:
- Agregados campos `version: number` y `locale: string` a la interfaz `About`
- Permite auditoría, rollback y preparación para i18n futuro

**Ubicación**: [src/domain/entities/About.ts](../src/domain/entities/About.ts)

```typescript
// Versionado y localización
version: number; // Versión del contenido (para auditoría y rollback)
locale: string; // Código de idioma (ej: 'es-CO', 'en-US') para i18n futuro
```

---

### 2. Caché Optimizado (24 horas) ✅

**Cambios**:
- TTL aumentado de 1 hora (3600s) a 24 horas (86400s)
- Justificación: contenido singleton que cambia con poca frecuencia
- Revalidación on-demand mediante tag `about` se mantiene

**Ubicación**: [src/application/cached/CacheAbout.ts](../src/application/cached/CacheAbout.ts)

```typescript
{
  tags: [TAGS.ABOUT],
  revalidate: 86400, // 24 horas (60 * 60 * 24)
}
```

**Beneficios**:
- Reducción de consultas MongoDB en ~96% (24 vs 1 hora)
- Menor latencia para usuarios
- Menor carga en base de datos
- Revalidación manual sigue disponible vía API

---

### 3. Fallback Estático ✅

**Cambios**:
- Creado archivo `aboutFallback.ts` con contenido de respaldo
- Try/catch en `getCachedAbout()` con fallback automático
- Importación dinámica para evitar bundles innecesarios

**Ubicación**: [src/config/aboutFallback.ts](../src/config/aboutFallback.ts)

```typescript
try {
  const useCase = new GetAbout(new MongoAboutRepository());
  return await useCase.execute();
} catch (error) {
  console.error('[CacheAbout] Error fetching from MongoDB:', error);
  const { aboutFallback } = await import('@/config/aboutFallback');
  return aboutFallback;
}
```

**Beneficios**:
- Resiliencia ante fallos de MongoDB
- La página nunca retorna 404 por problemas de BD
- Contenido mínimo garantizado para SEO

---

### 4. Soporte de Versionado en Repositorio ✅

**Cambios**:
- Query modificada para ordenar por `version DESC`
- Retorna siempre la versión más reciente publicada
- Mapper actualizado para extraer campos `version` y `locale`

**Ubicación**: [src/infrastructure/repositories/MongoAboutRepository.ts](../src/infrastructure/repositories/MongoAboutRepository.ts)

```typescript
const doc = await collection
  .find({ status: 'published' })
  .sort({ version: -1 }) // Mayor versión primero
  .limit(1)
  .next();
```

**Beneficios**:
- Permite mantener historial de versiones
- Rollback fácil cambiando `status` de versiones anteriores
- Preparado para A/B testing de contenido

---

## Cómo Usar el Versionado

### Crear Nueva Versión

```javascript
// En MongoDB Compass o CLI
db.about.insertOne({
  ...contenidoExistente,
  version: 2,  // Incrementar versión
  status: "draft",  // Empezar como borrador
  updatedAt: new Date()
})

// Cuando esté listo para publicar:
db.about.updateOne(
  { version: 2 },
  { $set: { status: "published" } }
)

// Despublicar versión anterior (opcional):
db.about.updateOne(
  { version: 1 },
  { $set: { status: "archived" } }
)
```

### Rollback a Versión Anterior

```javascript
// Archivar versión actual
db.about.updateOne(
  { version: 2, status: "published" },
  { $set: { status: "archived" } }
)

// Restaurar versión anterior
db.about.updateOne(
  { version: 1, status: "archived" },
  { $set: { status: "published" } }
)

// Revalidar caché
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_SECRET","tag":"about"}'
```

---

## Insertar Datos de Ejemplo en MongoDB

### Opción 1: Usar el Script de Seed (Recomendado)

```bash
# Asegúrate de tener MONGODB_URI en .env
npx tsx scripts/seed-about.ts
```

El script automáticamente:
- Elimina datos anteriores
- Inserta el documento de ejemplo con `version: 1` y `locale: 'es-CO'`
- Confirma inserción exitosa

### Opción 2: Importar JSON Directamente

**MongoDB Compass**:
1. Abre MongoDB Compass
2. Conecta a tu base de datos
3. Selecciona la colección `about` (créala si no existe)
4. Click en "ADD DATA" → "Import JSON or CSV file"
5. Selecciona el archivo [docs/mongodb-about-example.json](./mongodb-about-example.json)
6. Click "Import"

**MongoDB CLI**:
```bash
mongoimport --uri="mongodb://localhost:27017/webtemplate" \
  --collection=about \
  --file=docs/mongodb-about-example.json \
  --jsonArray
```

**Nota**: Si importas el JSON, envuélvelo en un array `[...]` para usar `--jsonArray`, o importa sin el flag para un solo documento.

### Opción 3: Copiar/Pegar en Mongo Shell

```javascript
// Conéctate a tu MongoDB
use webtemplate

// Eliminar datos anteriores (opcional)
db.about.deleteMany({})

// Insertar documento
db.about.insertOne({
  // Copia el contenido completo de mongodb-about-example.json aquí
})
```

---

## Verificar la Implementación

### 1. Revisar el Documento en MongoDB

```javascript
// Verificar que exista el documento
db.about.findOne({ status: "published" })

// Debe retornar un documento con:
// - version: 1
// - locale: "es-CO"
// - status: "published"
```

### 2. Probar la Página

```bash
npm run dev
```

Navega a: `http://localhost:3000/nosotros`

### 3. Probar el Fallback

Para probar el contenido de fallback, temporalmente modifica MongoDB URI a una inválida:

```bash
# .env.local
MONGODB_URI=mongodb://invalid-host:27017/test
```

Reinicia el servidor y verifica que la página sigue funcionando con el contenido de fallback.

### 4. Verificar el Caché

```bash
# Primera carga (genera caché)
time curl http://localhost:3000/nosotros

# Segunda carga (usa caché - debe ser más rápida)
time curl http://localhost:3000/nosotros
```

### 5. Revalidar el Caché

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_REVALIDATE_SECRET","tag":"about"}'
```

Respuesta esperada:
```json
{
  "revalidated": true,
  "type": "tag",
  "tag": "about",
  "timestamp": "2025-10-21T..."
}
```

---

## Estructura del Documento MongoDB

```javascript
{
  "_id": ObjectId("..."),
  "status": "published",        // 'draft' | 'published' | 'archived'
  "version": 1,                  // Número de versión
  "locale": "es-CO",             // Código de idioma

  "hero": { ... },               // Sección hero
  "introduction": { ... },       // Introducción
  "history": { ... },            // Timeline de historia
  "missionVisionValues": { ... }, // Misión, visión, valores
  "stats": [ ... ],              // Estadísticas
  "whyChooseUs": { ... },        // Razones para elegir
  "team": { ... },               // Equipo directivo
  "certifications": { ... },     // Certificaciones
  "seo": { ... },                // Metadata SEO

  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

Ver [mongodb-about-example.json](./mongodb-about-example.json) para estructura completa.

---

## Índices Recomendados (Opcional)

Para optimizar queries con múltiples versiones:

```javascript
// Índice compuesto para buscar versión publicada más reciente
db.about.createIndex({ "status": 1, "version": -1 })

// Índice para búsquedas por locale (preparación i18n)
db.about.createIndex({ "locale": 1, "status": 1, "version": -1 })
```

---

## Métricas de Mejora

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| TTL Caché | 1 hora | 24 horas | +2300% |
| Consultas MongoDB/día* | ~24 | ~1 | -96% |
| Resiliencia ante fallos | ❌ | ✅ | 100% |
| Soporte versionado | ❌ | ✅ | N/A |
| Preparado para i18n | ❌ | ✅ | N/A |

\* Asumiendo tráfico distribuido uniformemente

---

## Próximos Pasos Opcionales

### Internacionalización (i18n)

```typescript
// Modificar getCachedAbout para aceptar locale
export async function getCachedAbout(locale = 'es-CO'): Promise<About | null> {
  const fn = cache(
    async () => {
      // Query con locale
      const doc = await collection
        .find({ status: 'published', locale })
        .sort({ version: -1 })
        .limit(1)
        .next();
      // ...
    },
    [TAGS.ABOUT, 'page', locale],
    {
      tags: [TAGS.ABOUT, `about:${locale}`],
      revalidate: 86400,
    }
  );
  return fn();
}
```

### A/B Testing de Contenido

```typescript
// Mantener 2 versiones publicadas con diferentes audiencias
db.about.find({ status: "published", version: { $in: [1, 2] } })

// Lógica de selección en aplicación
const version = Math.random() > 0.5 ? 1 : 2;
```

### Auditoría de Cambios

```javascript
// Crear colección de auditoría
db.about_history.insertOne({
  aboutId: ObjectId("..."),
  version: 2,
  changedBy: "admin@cooperativa.com",
  changes: { hero: { title: "Nuevo título" } },
  timestamp: new Date()
})
```

---

## Troubleshooting

### La página muestra contenido de fallback en producción

**Causa**: MongoDB no está disponible o hay error de conexión

**Solución**:
1. Verificar `MONGODB_URI` en variables de entorno
2. Revisar logs del servidor: `[CacheAbout] Error fetching from MongoDB`
3. Verificar conectividad a MongoDB
4. Revisar que exista documento con `status: "published"`

### El caché no se revalida

**Causa**: Tag o secret incorrecto

**Solución**:
1. Verificar `REVALIDATE_SECRET` en `.env`
2. Usar exactamente `"tag": "about"` (no "ABOUT" ni "About")
3. Reiniciar servidor después de cambios en `.env`

### Multiple versiones publicadas

**Causa**: Olvidaste cambiar status de versión anterior a "archived"

**Solución**:
```javascript
// Solo debe haber 1 documento con status "published"
db.about.find({ status: "published" }).count() // Debe ser 1

// Archivar duplicados
db.about.updateMany(
  { status: "published", version: { $lt: CURRENT_VERSION } },
  { $set: { status: "archived" } }
)
```

---

## Referencias

- [Documento Principal](./about-page-guide.md)
- [Ejemplo MongoDB JSON](./mongodb-about-example.json)
- [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching)
- [MongoDB Versioning Patterns](https://www.mongodb.com/blog/post/building-with-patterns-the-document-versioning-pattern)
