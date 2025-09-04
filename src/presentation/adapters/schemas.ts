// src/presentation/adapters/schemas.ts
import { z } from 'zod';

export const NavSchema = z.object({
  id: z.string(),
  items: z.array(z.object({
    label: z.string(),
    href: z.string(),
    children: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  })),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const FooterSchema = z.object({
  id: z.string(),
  text: z.string(),
  links: z.array(z.object({ label: z.string(), href: z.string() })),
  social: z.array(z.object({ name: z.string(), href: z.string() })).optional(),
  note: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const PageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  blocks: z.array(z.union([
    z.object({ kind: z.literal('hero'), title: z.string(), subtitle: z.string().optional(),
               image: z.object({ url: z.string().url(), alt: z.string().optional() }).optional() }),
    z.object({ kind: z.literal('richtext'), html: z.string() }),
    z.object({ kind: z.literal('gallery'),
               images: z.array(z.object({ url: z.string().url(), alt: z.string().optional() })) }),
  ])),
  seo: z.any().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
