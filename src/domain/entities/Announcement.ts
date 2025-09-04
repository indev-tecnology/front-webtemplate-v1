import type { BaseDoc } from "./common";

export type AnnImage = { url: string; alt?: string };
export type AnnCTA = { label: string; href: string };

export type Announcement = BaseDoc & {
  slug: string;              // opcionalmente página de detalle
  title: string;
  description?: string;      // texto breve para hero y listados
  bodyHTML?: string;         // contenido largo enriquecido (detalle)
  image?: AnnImage;
  cta?: AnnCTA;              // botón opcional
  tags?: string[];           // para búsqueda/filtrado
  priority?: number;         // mayor = primero
  pinned?: boolean;          // anclar arriba
  publishedAt?: Date;        // inicio de visibilidad
  expiresAt?: Date | null;   // fin de visibilidad
  visible?: boolean;         // ocultar sin borrar
  tone?: string; // estilo visual
};
