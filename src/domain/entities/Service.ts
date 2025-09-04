// src/domain/entities/Service.ts
import type { BaseDoc, Image } from "./common";

export type Subservice = { name: string; links?: { label: string; href: string }[] };

export type Service = BaseDoc & {
  slug: string;           // para URLs limpias
  name: string;
  description?: string;
  icon?: Image;           // o { url } si usas imágenes
  subservices?: Subservice[];
  highlights?: string[];  // bullets opcionales
};
