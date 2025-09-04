// src/domain/entities/Attachment.ts
import type { BaseDoc } from "./common";
export type Attachment = BaseDoc & {
  title: string;
  fileUrl: string;          // URL pública o firmada
  fileType?: string;        // "application/pdf"
  fileSizeBytes?: number;   // para mostrar MB
  version?: string;         // "v1.2"
  category?: string;        // ej: "reglamentos", "formularios"
  tags?: string[];          // búsqueda
};
