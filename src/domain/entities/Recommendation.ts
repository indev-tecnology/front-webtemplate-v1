import type { BaseDoc, Image } from "./common";

export type Recommendation = BaseDoc & {
  slug?: string;
  title: string;
  description?: string;
  image?: Image;
  cta?: { label: string; href: string };
  badge?: string;
  kind?: 'info' | 'success' | 'warning' | 'note';
  tone?: string;
  dateLabel?: string;
  publishedAt?: Date;
  visible?: boolean;
};

