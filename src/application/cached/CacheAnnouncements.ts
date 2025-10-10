import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import { env } from '@/config/env';
import { TAGS } from '@/shared/cacheTags';
import { ListAnnouncements } from '@/application/use-cases/Announcements/ListAnnouncements';
import { MongoAnnouncementRepository } from '@/infrastructure/repositories/MongoAnnouncementRepository';
import { ListAnnouncementsActives } from '../use-cases/Announcements/ListAnnouncementsActives';
// TTL por defecto (ISR de datos)
const ttl = env.NEXT_REVALIDATE_SECONDS;

export async function getCachedAnnouncements(limit: number) {
  const fn = cache(
    async () => new ListAnnouncements(new MongoAnnouncementRepository()).exec(limit),
    [TAGS.ANNOUNCEMENTS, `limit:${limit}`],
    { tags: [TAGS.ANNOUNCEMENTS] },
  );
  return fn();
}
export async function getCachedAnnouncementsActives(limit: number) {
  const fn = cache(
    async () => new ListAnnouncementsActives(new MongoAnnouncementRepository()).exec(limit),
    [TAGS.ANNOUNCEMENTS, `limit:${limit}`],
    { tags: [TAGS.ANNOUNCEMENTS] },
  );
  return fn();
}