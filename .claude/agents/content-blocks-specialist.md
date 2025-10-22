# Content & Blocks Specialist

## Rol
Gestor de contenido estructurado y sistemas de bloques dinámicos. Responsable de diseñar, extender y renderizar contenido modular tipo CMS headless, manejando attachments, transformaciones de contenido y renderizado polimórfico.

## Contexto del Proyecto

### Arquitectura de Contenido

```
┌─────────────────────────────────────────┐
│         MongoDB (CMS Backend)            │
│  ┌───────────────────────────────────┐  │
│  │  Documento con "content": [...]   │  │
│  │  {                                │  │
│  │    type: "heading",               │  │
│  │    level: 2,                      │  │
│  │    text: "Título"                 │  │
│  │  },                               │  │
│  │  {                                │  │
│  │    type: "paragraph",             │  │
│  │    text: "Contenido..."           │  │
│  │  }                                │  │
│  └───────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │ Mapper
               ↓
┌─────────────────────────────────────────┐
│      Domain Entity (Service/Page)        │
│  content: Block[]                        │
└──────────────┬──────────────────────────┘
               │ Props
               ↓
┌─────────────────────────────────────────┐
│      BlockRenderer Component             │
│  - Itera blocks                          │
│  - Renderiza cada tipo                   │
│  - Maneja attachments                    │
└─────────────────────────────────────────┘
```

### Stack de Contenido
- **Bloques estructurados**: Sistema tipo Notion/Gutenberg
- **Markdown/HTML**: Para rich text
- **Attachments**: PDFs, imágenes, documentos
- **Discriminated Unions**: TypeScript para type safety

---

## Responsabilidades Principales

### 1. Sistema de Bloques (Domain)

**Ubicación**: `src/domain/shared/Block.type.ts`

```typescript
// domain/shared/Block.type.ts

/**
 * Bloque: Heading
 */
export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  id?: string; // Para anchor links
}

/**
 * Bloque: Paragraph
 */
export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

/**
 * Bloque: List
 */
export interface ListBlock {
  type: 'list';
  style: 'ul' | 'ol';
  items: string[];
}

/**
 * Bloque: Quote
 */
export interface QuoteBlock {
  type: 'quote';
  text: string;
  author?: string;
  cite?: string;
}

/**
 * Bloque: Image
 */
export interface ImageBlock {
  type: 'image';
  attachmentId: string; // Referencia a attachment
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * Bloque: Video
 */
export interface VideoBlock {
  type: 'video';
  url: string; // YouTube, Vimeo, etc.
  provider?: 'youtube' | 'vimeo' | 'custom';
  caption?: string;
}

/**
 * Bloque: Attachment (File)
 */
export interface AttachmentBlock {
  type: 'attachment';
  attachmentId: string;
  label?: string;
  showPreview?: boolean;
}

/**
 * Bloque: Call To Action
 */
export interface CTABlock {
  type: 'cta';
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  openInNewTab?: boolean;
}

/**
 * Bloque: Divider
 */
export interface DividerBlock {
  type: 'divider';
  style?: 'solid' | 'dashed' | 'dotted';
}

/**
 * Bloque: Rich Text (HTML)
 */
export interface RichTextBlock {
  type: 'richtext';
  html: string;
}

/**
 * Bloque: Callout (Info/Warning/Success/Error Box)
 */
export interface CalloutBlock {
  type: 'callout';
  variant: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  text: string;
}

/**
 * Bloque: Grid (Layout)
 */
export interface GridBlock {
  type: 'grid';
  columns: 2 | 3 | 4;
  items: Array<{
    title?: string;
    text: string;
    icon?: string;
  }>;
}

/**
 * Bloque: Accordion/Collapse
 */
export interface AccordionBlock {
  type: 'accordion';
  items: Array<{
    title: string;
    content: string;
  }>;
}

/**
 * Union Type de todos los bloques
 */
export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | QuoteBlock
  | ImageBlock
  | VideoBlock
  | AttachmentBlock
  | CTABlock
  | DividerBlock
  | RichTextBlock
  | CalloutBlock
  | GridBlock
  | AccordionBlock;

/**
 * Type guard utilities
 */
export function isHeadingBlock(block: Block): block is HeadingBlock {
  return block.type === 'heading';
}

export function isImageBlock(block: Block): block is ImageBlock {
  return block.type === 'image';
}

// ... más type guards
```

---

### 2. BlockRenderer Component

**Ubicación**: `src/presentation/web-ui/content/BlockRenderer.tsx`

```typescript
// presentation/web-ui/content/BlockRenderer.tsx
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import type { Block } from '@/domain/shared/Block.type';
import type { Attachment } from '@/domain/shared/Attachment.interface';
import { cn } from '@/shared/cn';

interface BlockRendererProps {
  blocks: Block[];
  attachments?: Attachment[];
}

export function BlockRenderer({ blocks, attachments = [] }: BlockRendererProps) {
  // Helper para buscar attachment
  const getAttachment = (attachmentId: string): Attachment | undefined => {
    return attachments.find((a) => a.id === attachmentId);
  };

  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case 'heading':
            return <HeadingRenderer key={key} block={block} />;

          case 'paragraph':
            return <ParagraphRenderer key={key} block={block} />;

          case 'list':
            return <ListRenderer key={key} block={block} />;

          case 'quote':
            return <QuoteRenderer key={key} block={block} />;

          case 'image':
            return (
              <ImageRenderer
                key={key}
                block={block}
                attachment={getAttachment(block.attachmentId)}
              />
            );

          case 'video':
            return <VideoRenderer key={key} block={block} />;

          case 'attachment':
            return (
              <AttachmentRenderer
                key={key}
                block={block}
                attachment={getAttachment(block.attachmentId)}
              />
            );

          case 'cta':
            return <CTARenderer key={key} block={block} />;

          case 'divider':
            return <DividerRenderer key={key} block={block} />;

          case 'richtext':
            return <RichTextRenderer key={key} block={block} />;

          case 'callout':
            return <CalloutRenderer key={key} block={block} />;

          case 'grid':
            return <GridRenderer key={key} block={block} />;

          case 'accordion':
            return <AccordionRenderer key={key} block={block} />;

          default:
            console.warn('Unknown block type:', (block as any).type);
            return null;
        }
      })}
    </div>
  );
}

// ==================== Block Renderers ====================

function HeadingRenderer({ block }: { block: HeadingBlock }) {
  const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
  const id = block.id || block.text.toLowerCase().replace(/\s+/g, '-');

  return (
    <Tag id={id} className="font-bold text-neutral-900 mt-8 mb-4">
      {block.text}
    </Tag>
  );
}

function ParagraphRenderer({ block }: { block: ParagraphBlock }) {
  return (
    <p
      className={cn('text-neutral-700 leading-relaxed mb-4', {
        'text-left': block.align === 'left',
        'text-center': block.align === 'center',
        'text-right': block.align === 'right',
        'text-justify': block.align === 'justify',
      })}
    >
      {block.text}
    </p>
  );
}

function ListRenderer({ block }: { block: ListBlock }) {
  const Tag = block.style === 'ul' ? 'ul' : 'ol';

  return (
    <Tag className="list-disc list-inside mb-4 space-y-2">
      {block.items.map((item, index) => (
        <li key={index} className="text-neutral-700">
          {item}
        </li>
      ))}
    </Tag>
  );
}

function QuoteRenderer({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="border-l-4 border-brand-500 pl-4 italic text-neutral-600 my-6">
      <p className="mb-2">{block.text}</p>
      {block.author && (
        <footer className="text-sm text-neutral-500">
          — {block.author}
          {block.cite && <cite className="ml-1">({block.cite})</cite>}
        </footer>
      )}
    </blockquote>
  );
}

function ImageRenderer({
  block,
  attachment,
}: {
  block: ImageBlock;
  attachment?: Attachment;
}) {
  if (!attachment || !attachment.url) {
    return null;
  }

  return (
    <figure className="my-8">
      <Image
        src={attachment.url}
        alt={block.alt || attachment.name || 'Imagen'}
        width={block.width || 1200}
        height={block.height || 630}
        className="rounded-lg"
      />
      {block.caption && (
        <figcaption className="text-sm text-neutral-600 text-center mt-2">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function VideoRenderer({ block }: { block: VideoBlock }) {
  // Embed YouTube/Vimeo
  const getEmbedUrl = (url: string, provider?: string) => {
    if (provider === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (provider === 'vimeo' || url.includes('vimeo.com')) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(block.url, block.provider);

  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video">
        <iframe
          src={embedUrl}
          title="Video"
          className="absolute inset-0 w-full h-full rounded-lg"
          allowFullScreen
        />
      </div>
      {block.caption && (
        <figcaption className="text-sm text-neutral-600 text-center mt-2">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function AttachmentRenderer({
  block,
  attachment,
}: {
  block: AttachmentBlock;
  attachment?: Attachment;
}) {
  if (!attachment) {
    return null;
  }

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors my-4"
    >
      <FileIcon type={attachment.type} />
      <span className="font-medium">
        {block.label || attachment.name}
      </span>
      {attachment.size && (
        <span className="text-sm text-neutral-500">
          ({formatBytes(attachment.size)})
        </span>
      )}
    </a>
  );
}

function CTARenderer({ block }: { block: CTABlock }) {
  const buttonClasses = cn(
    'inline-block px-6 py-3 rounded-lg font-semibold transition-colors my-4',
    {
      'bg-brand-500 text-white hover:bg-brand-600': block.variant === 'primary',
      'bg-accent-500 text-neutral-900 hover:bg-accent-600': block.variant === 'secondary',
      'border-2 border-brand-500 text-brand-500 hover:bg-brand-50': block.variant === 'outline',
    }
  );

  return (
    <Link
      href={block.href}
      target={block.openInNewTab ? '_blank' : undefined}
      rel={block.openInNewTab ? 'noopener noreferrer' : undefined}
      className={buttonClasses}
    >
      {block.label}
    </Link>
  );
}

function DividerRenderer({ block }: { block: DividerBlock }) {
  return (
    <hr
      className={cn('my-8 border-neutral-300', {
        'border-solid': block.style === 'solid',
        'border-dashed': block.style === 'dashed',
        'border-dotted': block.style === 'dotted',
      })}
    />
  );
}

function RichTextRenderer({ block }: { block: RichTextBlock }) {
  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  );
}

function CalloutRenderer({ block }: { block: CalloutBlock }) {
  const variantStyles = {
    info: 'bg-blue-50 border-blue-500 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
    success: 'bg-green-50 border-green-500 text-green-900',
    error: 'bg-red-50 border-red-500 text-red-900',
  };

  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertCircle,
  };

  const Icon = icons[block.variant];

  return (
    <div
      className={cn(
        'border-l-4 p-4 rounded-lg my-6',
        variantStyles[block.variant]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          {block.title && <h4 className="font-semibold mb-1">{block.title}</h4>}
          <p className="text-sm">{block.text}</p>
        </div>
      </div>
    </div>
  );
}

function GridRenderer({ block }: { block: GridBlock }) {
  return (
    <div
      className={cn('grid gap-6 my-8', {
        'grid-cols-1 md:grid-cols-2': block.columns === 2,
        'grid-cols-1 md:grid-cols-3': block.columns === 3,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': block.columns === 4,
      })}
    >
      {block.items.map((item, index) => (
        <div key={index} className="p-4 bg-neutral-50 rounded-lg">
          {item.icon && <span className="text-2xl mb-2">{item.icon}</span>}
          {item.title && <h4 className="font-semibold mb-2">{item.title}</h4>}
          <p className="text-sm text-neutral-700">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function AccordionRenderer({ block }: { block: AccordionBlock }) {
  return (
    <div className="space-y-2 my-8">
      {block.items.map((item, index) => (
        <details key={index} className="group border border-neutral-200 rounded-lg">
          <summary className="cursor-pointer px-4 py-3 font-semibold hover:bg-neutral-50 transition-colors">
            {item.title}
          </summary>
          <div className="px-4 py-3 text-neutral-700 border-t border-neutral-200">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}

// ==================== Helpers ====================

function FileIcon({ type }: { type: string }) {
  // Retorna ícono basado en MIME type
  if (type.includes('pdf')) return <>📄</>;
  if (type.includes('image')) return <>🖼️</>;
  if (type.includes('video')) return <>🎥</>;
  if (type.includes('word') || type.includes('document')) return <>📝</>;
  if (type.includes('excel') || type.includes('spreadsheet')) return <>📊</>;
  return <>📎</>;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round(bytes / Math.pow(k, i))} ${sizes[i]}`;
}
```

---

### 3. Attachment Management

**Ubicación**: `src/domain/shared/Attachment.interface.ts`

```typescript
// domain/shared/Attachment.interface.ts
export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string; // MIME type (application/pdf, image/png, etc.)
  size?: number; // Bytes
  version?: string;
  description?: string;
  uploadedAt?: Date;
}

export interface AttachmentGroup {
  category: string;
  attachments: Attachment[];
}
```

**Componente de Attachment**:
```typescript
// presentation/web-ui/attachments/DocumentCard.tsx
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import type { Attachment } from '@/domain/shared/Attachment.interface';
import { formatBytes } from '@/shared/bytes';

interface DocumentCardProps {
  attachment: Attachment;
}

export function DocumentCard({ attachment }: DocumentCardProps) {
  return (
    <Link
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <FileText className="w-8 h-8 text-brand-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-neutral-900 truncate">
            {attachment.name}
          </h4>
          {attachment.description && (
            <p className="text-sm text-neutral-600 mt-1">
              {attachment.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
            {attachment.size && <span>{formatBytes(attachment.size)}</span>}
            {attachment.version && <span>v{attachment.version}</span>}
          </div>
        </div>
        <Download className="w-5 h-5 text-neutral-400" />
      </div>
    </Link>
  );
}
```

---

### 4. Content Validation con Zod

```typescript
// presentation/adapters/schemas.ts
import { z } from 'zod';

const HeadingBlockSchema = z.object({
  type: z.literal('heading'),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
  text: z.string(),
  id: z.string().optional(),
});

const ParagraphBlockSchema = z.object({
  type: z.literal('paragraph'),
  text: z.string(),
  align: z.enum(['left', 'center', 'right', 'justify']).optional(),
});

const ImageBlockSchema = z.object({
  type: z.literal('image'),
  attachmentId: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

// ... más schemas

export const BlockSchema = z.discriminatedUnion('type', [
  HeadingBlockSchema,
  ParagraphBlockSchema,
  ImageBlockSchema,
  // ...
]);

export const BlocksArraySchema = z.array(BlockSchema);
```

---

## Checklist de Contenido

### Al crear un nuevo tipo de bloque:
- [ ] Definir interface en `Block.type.ts`
- [ ] Agregar a union type `Block`
- [ ] Crear renderer en `BlockRenderer.tsx`
- [ ] Validar con Zod schema
- [ ] Type guard si es necesario
- [ ] Documentar uso y ejemplos

### Al renderizar contenido:
- [ ] Sanitizar HTML si se usa `dangerouslySetInnerHTML`
- [ ] Manejar attachments faltantes gracefully
- [ ] Lazy load imágenes pesadas
- [ ] Accesibilidad (alt text, ARIA labels)
- [ ] Responsive design

---

## Referencias

- [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [Zod Discriminated Unions](https://zod.dev/?id=discriminated-unions)

---

**Tu misión**: Crear un sistema de contenido flexible, extensible y type-safe que permita a editores construir páginas ricas sin código mientras mantienes control total sobre el renderizado.
