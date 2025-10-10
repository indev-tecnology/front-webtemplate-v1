# 📚 Biblioteca de Documentos - Módulo de Attachments

Sistema completo para la gestión y visualización de documentos en la cooperativa. Diseño minimalista y estético enfocado en la experiencia del usuario del sector solidario.

## 🎨 Características del Diseño

### Minimalista y Profesional
- Grid responsive adaptado a dispositivos móviles, tablets y desktop
- Espaciado generoso con breathing room
- Tipografía clara y jerárquica
- Sombras sutiles sin efectos excesivos
- Animaciones fluidas con Framer Motion

### Código de Colores por Tipo de Documento
Cada tipo de documento tiene su propio color institucional:

- **PDF** → Rojo (`bg-red-50 border-red-200 text-red-700`)
- **DOC/DOCX** → Azul (`bg-blue-50 border-blue-200 text-blue-700`)
- **Excel** → Verde (`bg-green-50 border-green-200 text-green-700`)
- **PowerPoint** → Naranja (`bg-orange-50 border-orange-200 text-orange-700`)
- **CSV** → Teal (`bg-teal-50 border-teal-200 text-teal-700`)
- **Imágenes** → Ámbar (`bg-amber-50 border-amber-200 text-amber-700`)
- **Archivos ZIP** → Violeta (`bg-violet-50 border-violet-200 text-violet-700`)

### Estados de Documentos
- 🆕 **Nuevo**: Documentos subidos hace menos de 30 días
- 📝 **Actualizado**: Documentos actualizados hace menos de 7 días
- ✅ **Vigente**: Estado por defecto

---

## 📦 Componentes

### 1. `DocumentCard`
Card individual para mostrar un documento con toda su metadata.

**Props:**
```typescript
interface DocumentCardProps {
  document: AttachmentItem;
  index?: number; // Para animaciones escalonadas
}
```

**Características:**
- Badge de tipo de documento con código de color
- Badge de estado (Nuevo/Actualizado) si aplica
- Información de versión
- Tags/etiquetas
- Metadata: tamaño, fecha de última actualización
- Acciones: Descargar, Copiar enlace
- Animaciones hover y estados interactivos

---

### 2. `DocumentFilters`
Componente de filtrado avanzado con búsqueda, ordenamiento y filtros múltiples.

**Props:**
```typescript
interface DocumentFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableTypes: AttachmentKind[];
  availableTopics: string[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalResults: number;
}
```

**Características:**
- Búsqueda en tiempo real por título y etiquetas
- Filtros por tipo de documento (PDF, DOC, Excel, etc.)
- Filtros por categoría/tópico
- Ordenamiento: Más reciente, Nombre A-Z, Tamaño
- Toggle de vista: Grid / Lista
- Contador de resultados
- Indicador de filtros activos

---

### 3. `DocumentLibrary`
Contenedor principal que orquesta toda la biblioteca de documentos.

**Props:**
```typescript
interface DocumentLibraryProps {
  documents: AttachmentItem[];
  groupedByTopic?: Record<string, AttachmentItem[]>;
}
```

**Características:**
- Gestión de estado de filtros y ordenamiento
- Renderizado de documentos en grid o lista
- Agrupación opcional por tópicos
- Estado vacío con mensaje amigable
- Animaciones de entrada/salida

---

## 🛠️ Utilidades (attachmentUtils.tsx)

### Tipos Soportados
```typescript
type AttachmentKind =
  | 'pdf'
  | 'doc'
  | 'excel'
  | 'powerpoint'
  | 'csv'
  | 'image'
  | 'archive'
  | 'binary'
  | 'other';
```

### Funciones Principales

#### `guessKind(fileType?: string, fileUrl?: string): AttachmentKind`
Determina el tipo de documento basándose en el tipo MIME o la extensión del archivo.

#### `kindIcon(kind: AttachmentKind)`
Retorna el componente de icono de Lucide React apropiado para el tipo.

#### `kindTone(kind: AttachmentKind)`
Retorna las clases de Tailwind para el código de color del tipo.

#### `kindLabel(kind: AttachmentKind): string`
Retorna la etiqueta legible para el tipo (ej: "PDF", "Excel", "DOC").

#### `getDocumentStatus(uploadedAt?: Date | string, createdAt?: Date | string): DocumentStatus`
Calcula el estado del documento basándose en fechas:
- **"new"**: Subido hace menos de 30 días
- **"updated"**: Actualizado hace menos de 37 días
- **"vigente"**: Estado por defecto

#### `getDocumentBadge(status: DocumentStatus): DocumentBadge`
Retorna la configuración del badge visual según el estado.

---

## 📄 Uso en la Página

### Ejemplo: `/attachments/page.tsx`

```typescript
import { DocumentLibrary } from "@/presentation/web-ui/attachments";
import { apiConsumer } from "@/presentation/adapters/apiConsumer";

export default async function AttachmentsPage() {
  const { items } = await apiConsumer.attachments({ pageSize: 100 });

  const mappedItems = items.map((it) => ({
    id: it.id,
    title: it.title,
    fileUrl: it.fileUrl,
    fileType: it.fileType,
    fileSizeBytes: it.fileSizeBytes,
    version: it.version,
    tags: it.tags,
    uploadedAt: it.uploadedAt,
    createdAt: it.createdAt,
  }));

  return (
    <PageLayout hero={{ title: "Biblioteca de Documentos", tone: "green" }}>
      <DocumentLibrary documents={mappedItems} />
    </PageLayout>
  );
}
```

---

## 🎯 Accesibilidad

Todos los componentes cumplen con estándares de accesibilidad:

- ✅ ARIA labels completos
- ✅ Navegación por teclado
- ✅ Contraste WCAG AA mínimo
- ✅ Focus states visibles
- ✅ Semantic HTML
- ✅ Roles ARIA apropiados
- ✅ Mensajes de estado para lectores de pantalla

---

## 🚀 Rendimiento

- Server Components para data fetching
- Client Components solo donde se necesita interactividad
- Animaciones optimizadas con Framer Motion
- Lazy loading de imágenes (si aplica)
- Memoización de cálculos pesados
- Filtrado y búsqueda en cliente para UX instantánea

---

## 🎨 Diseño Responsive

### Mobile (< 640px)
- Grid de 1 columna
- Filtros colapsables
- Controles apilados verticalmente
- Cards optimizadas para touch

### Tablet (640px - 1024px)
- Grid de 2 columnas
- Filtros semi-expandidos
- Controles en fila

### Desktop (> 1024px)
- Grid de 3-4 columnas
- Filtros expandidos
- Controles completos
- Hover states avanzados

---

## 📝 Notas de Implementación

1. **Sector Solidario**: Los colores institucionales son verde cooperativo (#16633f) y amarillo accent (#f4d22c)
2. **Framer Motion**: Todas las animaciones son sutiles y no bloquean la interacción
3. **TypeScript**: Todo el código está completamente tipado
4. **Tailwind CSS**: Se usan solo las clases de la configuración del proyecto
5. **Iconografía**: Lucide React para consistencia visual

---

## 🔄 Migración desde Versión Anterior

Si estás migrando desde la versión anterior de `AttachmentGroup`:

```typescript
// Antes
<AttachmentGroup title="Reglamentos" items={items} compact />

// Ahora
<DocumentLibrary documents={items} />
```

El nuevo sistema incluye:
- ✅ Filtros avanzados
- ✅ Búsqueda integrada
- ✅ Múltiples vistas (grid/lista)
- ✅ Estados visuales de documentos
- ✅ Mejor UX general

---

## 🤝 Contribuir

Para agregar nuevos tipos de documentos:

1. Agregar el tipo a `AttachmentKind` en `attachmentUtils.tsx`
2. Actualizar `guessKind()` con las extensiones/MIME types
3. Agregar el icono en `kindIcon()`
4. Definir el código de color en `kindTone()`
5. Agregar la etiqueta en `kindLabel()`

---

## 📞 Soporte

Para dudas o sugerencias sobre este módulo, contacta al equipo de desarrollo.

**Versión**: 1.0.0
**Última actualización**: Octubre 2025
**Autor**: Equipo de Desarrollo Web
