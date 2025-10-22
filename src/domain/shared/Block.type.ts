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
 * Bloque: Image
 */
export interface ImageBlock {
  type: 'image';
  attachmentId: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
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
 * Union Type de todos los bloques
 */
export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | ImageBlock
  | AttachmentBlock
  | CTABlock;