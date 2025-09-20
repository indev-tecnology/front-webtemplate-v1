import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import { env } from '@/config/env';
import { TAGS } from '@/shared/cacheTags';

import { GetNavigation } from '@/application/use-cases/GetNavigation';
import { MongoNavigationRepository } from '@/infrastructure/repositories/MongoNavigationRepository';
import { GetFooter } from '@/application/use-cases/GetFooter';
import { MongoFooterRepository } from '@/infrastructure/repositories/MongoFooterRepository';
import { ListAnnouncements } from '@/application/use-cases/ListAnnouncements';
import { MongoAnnouncementRepository } from '@/infrastructure/repositories/MongoAnnouncementRepository';
import { ListEvents } from '@/application/use-cases/ListEvents';
import { MongoEventRepository } from '@/infrastructure/repositories/MongoEventRepository';
import { ListFeatures } from '@/application/use-cases/Feature/GetFeatures';
import { MongoFeatureRepository } from '@/infrastructure/repositories/MongoFeatureRepository';
import { MongoRecommendationRepository } from '@/infrastructure/repositories/MongoRecommendationRepository';
import { MongoAgreementRepository } from '@/infrastructure/repositories/MongoAgreementRepository';
import type { Agreement } from '@/domain/entities/Agreement';
import { ListServices } from '@/application/use-cases/Services/ListServices';
import { MongoServiceRepository } from '@/infrastructure/repositories/MongoServiceRepository';
import { GetServiceBySlug } from '@/application/use-cases/Services/GetServiceBySlug';
import { ListAttachments } from '@/application/use-cases/ListAttachments';
import { MongoAttachmentRepository } from '@/infrastructure/repositories/MongoAttachmentRepository';

// TTL por defecto (ISR de datos)
const ttl = env.NEXT_REVALIDATE_SECONDS;

export const getCachedNav = cache(
  async () => new GetNavigation(new MongoNavigationRepository()).exec(),
  [TAGS.NAV],
  { revalidate: false, tags: [TAGS.NAV] },
);

export const getCachedFooter = cache(
  async () => new GetFooter(new MongoFooterRepository()).exec(),
  [TAGS.FOOTER],
  { revalidate: false, tags: [TAGS.FOOTER] },
);

export async function getCachedAnnouncements(limit: number) {
  const fn = cache(
    async () => new ListAnnouncements(new MongoAnnouncementRepository()).exec(limit),
    [TAGS.ANNOUNCEMENTS, `limit:${limit}`],
    { revalidate: false, tags: [TAGS.ANNOUNCEMENTS] },
  );
  return fn();
}

export async function getCachedEventsUpcoming(limit: number) {
  const fn = cache(
    async () => new ListEvents(new MongoEventRepository()).exec(limit),
    [TAGS.EVENTS, `limit:${limit}`],
    { revalidate: false, tags: [TAGS.EVENTS] },
  );
  return fn();
}

export async function getCachedFeatures(limit: number) {
  const fn = cache(
    async () => new ListFeatures(new MongoFeatureRepository()).exec(limit),
    [TAGS.FEATURES, `limit:${limit}`],
    { revalidate: false, tags: [TAGS.FEATURES] },
  );
  return fn();
}

export async function getCachedRecommendationsLatest(limit: number) {
  const fn = cache(
    async () => new MongoRecommendationRepository().listLatest(limit),
    [TAGS.RECOMMENDATIONS, `limit:${limit}`],
    { revalidate: false, tags: [TAGS.RECOMMENDATIONS] },
  );
  return fn();
}

export async function getCachedServices() {
  const fn = cache(
    async () => new ListServices(new MongoServiceRepository()).exec(),
    [TAGS.SERVICES],
    { revalidate: false, tags: [TAGS.SERVICES] },
  );
  return fn();
}

export async function getCachedAttachments(params: { category?: string; q?: string; page?: number; pageSize?: number } = {}) {
  const key = JSON.stringify({
    category: params.category || '',
    q: params.q || '',
    page: params.page || 1,
    pageSize: params.pageSize || 24,
  });
  const fn = cache(
    async () => new ListAttachments(new MongoAttachmentRepository()).exec(params),
    [TAGS.ATTACHMENTS, key],
    { revalidate: false, tags: [TAGS.ATTACHMENTS] },
  );
  return fn();
}

export async function getCachedServiceBySlug(slug: string) {
  const fn = cache(
    async () => new GetServiceBySlug(new MongoServiceRepository()).exec(slug),
    [TAGS.SERVICES, `slug:${slug}`],
    { revalidate: false, tags: [TAGS.SERVICES] },
  );
  return fn();
}

export async function getCachedAgreements(): Promise<Agreement[]> {
  const fn = cache(
    async () => new MongoAgreementRepository().listAll(),
    [TAGS.AGREEMENTS],
    { revalidate: false, tags: [TAGS.AGREEMENTS] },
  );
  return fn();
}

export async function getCachedAgreementBySlug(slug: string): Promise<Agreement | null> {
  const fn = cache(
    async () => new MongoAgreementRepository().getBySlug(slug),
    [TAGS.AGREEMENTS, `slug:${slug}`],
    { revalidate: false, tags: [TAGS.AGREEMENTS] },
  );
  return fn();
}
