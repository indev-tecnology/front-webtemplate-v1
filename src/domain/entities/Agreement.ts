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
};
