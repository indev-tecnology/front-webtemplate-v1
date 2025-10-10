// src/domain/entities/Agreement.ts
import type { BaseDoc, Image } from "./common";

export type Agreement = BaseDoc & {
  slug: string;
  name: string;
  description?: string;
  logo?: Image;
  category?: string; // ej: Educación, Salud, Tecnología
  startsAt?: Date;
  endsAt?: Date;
  links?: { label: string; href: string }[];
  // Optional rich content blocks to render on the detail page
  content?: Block[];
  attachments?: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  author?: string;
  locale?: string; // ej. 'es-CO'
};
