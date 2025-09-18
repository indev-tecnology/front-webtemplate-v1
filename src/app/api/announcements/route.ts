import { NextRequest, NextResponse } from "next/server";
import { MongoAnnouncementRepository } from "@/infrastructure/repositories/MongoAnnouncementRepository";

export async function GET(req: NextRequest) {
  const repo = new MongoAnnouncementRepository();
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get('limit');
  const latest = searchParams.get('latest');
  const useLatest = latest === '1' || latest === 'true';
  if (useLatest) {
    const limit = Number(limitParam ?? '5');
    const parsed = Number.isFinite(limit) && limit > 0 ? limit : 5;
    const list = await repo.listLatest(parsed);
    return NextResponse.json(list);
  }
  // comportamiento por defecto existente: activos, 12 elementos ordenados por pinned/priority
  const limit = Number(limitParam ?? '12');
  const parsed = Number.isFinite(limit) && limit > 0 ? limit : 12;
  const list = await repo.listActive(parsed);
  return NextResponse.json(list);
}
