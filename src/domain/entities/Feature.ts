import type { BaseDoc, Image } from "./common";
export type Feature = BaseDoc & {
  image: Image;
  label: string;
  cta?: string;
  brand: string;      // estilo/identidad del item
  tone?: string;      // color UI sugerido (opcional)
};
