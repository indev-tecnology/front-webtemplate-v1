import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import { env } from '@/config/env';
import { TAGS } from '@/shared/cacheTags';

import { GetFeedLimit } from '@/application/use-cases/Services/GetFeedLimit';
import { MongoServiceRepository } from '@/infrastructure/repositories/MongoServiceRepository';
import { ListServices } from '../use-cases/Services/ListServices';
import { GetServiceBySlug } from '../use-cases/Services/GetServiceBySlug';
// TTL por defecto (ISR de datos)
const ttl = env.NEXT_REVALIDATE_SECONDS;

export async function getCachedServices() {
  // Backwards compatible: no-arg call returns full list (default projection applied in repo)
  const fn = cache(
    async () => new ListServices(new MongoServiceRepository()).exec(),
    [TAGS.SERVICES, 'all'],
    { tags: [TAGS.SERVICES] }, // revalidate: false no es válido aquí
  );
  return fn();
}

// New helper that accepts limit and keys the cache accordingly
export async function getCachedServicesWithLimit(limit?: number) {
  const key = [TAGS.SERVICES, `limit:${limit ?? 'all'}`];
  const fn = cache(
    async () => new ListServices(new MongoServiceRepository()).exec(),
    key,
    { tags: [TAGS.SERVICES] },
  );
  return fn();
}

export async function getCachedServiceBySlug(slug: string) {
  const fn = cache(
    async () => new GetServiceBySlug(new MongoServiceRepository()).exec(slug),
    [TAGS.SERVICES, `slug:${slug}`],
    { tags: [TAGS.SERVICES] },
  );
  return fn();
}

export async function getCachedServicesFeed(limit: number) {
  const fn = cache(
    async () => new GetFeedLimit(new MongoServiceRepository()).exec(limit),
    [TAGS.SERVICES, `limit:${limit}`],
    { tags: [TAGS.SERVICES] },
  );
  return fn();
}



