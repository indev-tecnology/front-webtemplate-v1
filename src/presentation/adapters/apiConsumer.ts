// src/presentation/adapters/api.ts
import { env } from "@/config/env";
import { TAGS } from "@/shared/cacheTags";
import type { Service } from "@/domain/entities/Service";
import type { Agreement } from "@/domain/entities/Agreement";
import type { Attachment } from "@/domain/entities/Attachment";
import { Announcement } from "@/domain/entities/Announcement";

type GetOpts = {
  tag?: string;
  revalidate?: number;
  search?: Record<string, string | number | undefined>;
};

function withQS(path: string, search?: GetOpts["search"]) {
  if (!search) return path;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(search)) if (v != null) qs.set(k, String(v));
  return `${path}?${qs.toString()}`;
}

// 👉 Retorna Promise<T> tipado
export async function getJSON<T>(path: string, opts: GetOpts = {}): Promise<T> {
  const url = `${env.NEXT_PUBLIC_BASE_URL}${withQS(path, opts.search)}`;
  const revalidate = opts.revalidate ?? env.NEXT_REVALIDATE_SECONDS;
  const res = await fetch(url, { next: { revalidate, tags: opts.tag ? [opts.tag] : undefined } });
  if (!res.ok) throw new Error(`HTTP_${res.status}`);
  return res.json() as Promise<T>;
}

export const apiConsumer = {
  nav: () => getJSON<any>(`/api/nav`, { tag: TAGS.NAV }),
  footer: () => getJSON<any>(`/api/footer`, { tag: TAGS.FOOTER }),

  announcements: () => getJSON<Announcement[]>(`/api/announcements`, { tag: TAGS.ANNOUNCEMENTS }),
  announcement: (slug: string) => getJSON<Announcement>(`/api/announcements/${slug}`, { tag: TAGS.ANNOUNCEMENTS }),
  
  events: () => getJSON<any[]>(`/api/events`, { tag: TAGS.EVENTS }),

  attachments: (p?: { category?: string; q?: string; page?: number; pageSize?: number }) =>
    getJSON<{ items: Attachment[]; total: number }>(`/api/attachments`, { tag: TAGS.ATTACHMENTS, search: p }),

  services: () => getJSON<Service[]>(`/api/services`, { tag: TAGS.SERVICES }),
  service: (slug: string) => getJSON<Service>(`/api/services/${slug}`, { tag: TAGS.SERVICES }),

  agreements: () => getJSON<Agreement[]>(`/api/agreements`, { tag: TAGS.AGREEMENTS }),
  agreement: (slug: string) => getJSON<Agreement>(`/api/agreements/${slug}`, { tag: TAGS.AGREEMENTS }),
};
