export interface Attachment {
  id: string;
  name: string;
  filename?: string;
  url: string;             // S3 signed or public
  type: string;            // MIME type (contentType)
  contentType?: string;    // Alias for type
  size?: number;
  version?: string;
  description?: string;
  uploadedAt?: Date;
  tags?: string[];
  createdBy?: string;
}