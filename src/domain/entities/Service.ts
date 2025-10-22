import { ToneKey } from "@/shared/tone";
import { Image } from "./common";
import type { Block } from "../shared/Block.type";
import type { Attachment } from "../shared/Attachment.interface";

export interface Service {
  id: string;
  title: string;
  slug: string;            // unique
  summary?: string;
  heroImage?: Image;
  content?: Block[];       // cuerpo estructurado
  subservices?: Array<{ title:string, slug?:string, summary?:string }>; // refs o embebido
  attachments?: Attachment[]; // referencias a collection Attachment
  categories?: string[];
  tags?: string[];
  seo?: { title?: string; description?: string; canonical?: string };
  status: "draft"|"review"|"published"|"archived";
  publishDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  author?: string;
  locale?: string;        // ej. 'es-CO'
  tone?: ToneKey;
}

