import type { AttachmentRepository } from "@/application/ports/AttachmentRepository";
export class ListAttachments {
  constructor(private repo: AttachmentRepository) {}
  exec(params?: { category?: string; q?: string; page?: number; pageSize?: number }) {
    return this.repo.list(params);
  }
}