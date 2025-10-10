import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import { env } from '@/config/env';
import { TAGS } from '@/shared/cacheTags';

import { GetNavigation } from '@/application/use-cases/GetNavigation';
import { MongoNavigationRepository } from '@/infrastructure/repositories/MongoNavigationRepository';
import { GetFooter } from '@/application/use-cases/GetFooter';
import { MongoFooterRepository } from '@/infrastructure/repositories/MongoFooterRepository';
import { ListAnnouncements } from '@/application/use-cases/Announcements/ListAnnouncements';
import { MongoAnnouncementRepository } from '@/infrastructure/repositories/MongoAnnouncementRepository';
import { ListEvents } from '@/application/use-cases/ListEvents';
import { MongoEventRepository } from '@/infrastructure/repositories/MongoEventRepository';
import { ListFeatures } from '@/application/use-cases/Feature/GetFeatures';
import { MongoFeatureRepository } from '@/infrastructure/repositories/MongoFeatureRepository';
import { MongoRecommendationRepository } from '@/infrastructure/repositories/MongoRecommendationRepository';
import { MongoAgreementRepository } from '@/infrastructure/repositories/MongoAgreementRepository';
import type { Agreement } from '@/domain/entities/Agreement';
import { ListAttachments } from '@/application/use-cases/ListAttachments';
import { MongoAttachmentRepository } from '@/infrastructure/repositories/MongoAttachmentRepository';
import { ListAnnouncementsActives } from './use-cases/Announcements/ListAnnouncementsActives';

// TTL por defecto (ISR de datos)
const ttl = env.NEXT_REVALIDATE_SECONDS;

export const getCachedNav = cache(
  async () => new GetNavigation(new MongoNavigationRepository()).exec(),
  [TAGS.NAV],
  { tags: [TAGS.NAV] },
);

export const getCachedFooter = cache(
  async () => new GetFooter(new MongoFooterRepository()).exec(),
  [TAGS.FOOTER],
  { tags: [TAGS.FOOTER] },
);

export async function getCachedEventsUpcoming(limit: number) {
  const fn = cache(
    async () => new ListEvents(new MongoEventRepository()).exec(limit),
    [TAGS.EVENTS, `limit:${limit}`],
    { tags: [TAGS.EVENTS] },
  );
  return fn();
}

export async function getCachedFeatures(limit: number) {
  const fn = cache(
    async () => new ListFeatures(new MongoFeatureRepository()).exec(limit),
    [TAGS.FEATURES, `limit:${limit}`],
    { tags: [TAGS.FEATURES] },
  );
  return fn();
}

export async function getCachedRecommendationsLatest(limit: number) {
  const fn = cache(
    async () => new MongoRecommendationRepository().listLatest(limit),
    [TAGS.RECOMMENDATIONS, `limit:${limit}`],
    { tags: [TAGS.RECOMMENDATIONS] },
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
    { tags: [TAGS.ATTACHMENTS] },
  );
  return fn();
}

export async function getCachedAgreements(): Promise<Agreement[]> {
  const fn = cache(
    async () => new MongoAgreementRepository().listAll(),
    [TAGS.AGREEMENTS],
    { tags: [TAGS.AGREEMENTS] },
  );
  return fn();
}

export async function getCachedAgreementBySlug(slug: string): Promise<Agreement | null> {
  const fn = cache(
    async () => new MongoAgreementRepository().getBySlug(slug),
    [TAGS.AGREEMENTS, `slug:${slug}`],
    { tags: [TAGS.AGREEMENTS] },
  );
  return fn();
}
