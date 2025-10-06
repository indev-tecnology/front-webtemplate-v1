import { Image } from "./common";

type Block =
  | { type: "heading"; level: 1|2|3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; style: "ul"|"ol"; items: string[] }
  | { type: "image"; attachmentId: string; alt?: string; caption?: string }
  | { type: "attachment"; attachmentId: String; label?: string }
  | { type: "cta"; label: string; href: string };

interface Attachment {
  id: String;
  filename: string;
  url: string;             // S3 signed or public
  contentType: string;
  size: number;
  uploadedAt: Date;
  tags?: string[];
  createdBy?: String;
}

export interface Service {
  id: String;
  title: string;
  slug: string;            // unique
  summary?: string;
  heroImage?: Image;
  content: Block[];       // cuerpo estructurado
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
}

