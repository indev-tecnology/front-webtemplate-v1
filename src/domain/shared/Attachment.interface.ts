interface Attachment {
  id: string;
  filename: string;
  url: string;             // S3 signed or public
  contentType: string;
  size: number;
  uploadedAt: Date;
  tags?: string[];
  createdBy?: String;
}