import type { BaseDoc, SEO } from "./common";

export type Page = BaseDoc & {
  slug: string;
  title: string;
  blocks?: any[];
  seo?: SEO;
};

