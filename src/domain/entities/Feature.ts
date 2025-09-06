import type { BaseDoc, Image } from "./common";
export type Feature = BaseDoc & {       // contenido largo enriquecido (detalle)
  image: Image;
  label: string;          // texto breve para hero y listados
  cta?: string;           // para búsqueda/filtrado
  brand: string;// estilo visual
};