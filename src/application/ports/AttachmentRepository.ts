import type { Attachment } from "@/domain/entities/Attachment";
export interface AttachmentRepository {
  list(params?: { category?: string; q?: string; page?: number; pageSize?: number }): Promise<{ items: Attachment[]; total: number }>;
}