export type Image = { url: string; alt?: string; width?: number; height?: number };
export type SEO = { title?: string; description?: string; ogImage?: Image };
export type BaseDoc = { id: string; createdAt: Date; updatedAt: Date };
