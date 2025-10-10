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
  // Opcionales para mejora de gestión
  topic?: string;           // agrupación explícita (ej: "Normas internas")
  storageKey?: string;      // clave interna en S3/MinIO
  uploadedAt?: Date;        // fecha de subida
  publicUrl?: string;       // url pública redundante si aplica
  createdBy?: string;       // usuario que subió
  archived?: boolean;       // marcado para archivar
};
