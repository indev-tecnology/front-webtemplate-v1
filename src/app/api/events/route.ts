import { NextRequest, NextResponse } from "next/server";
import { MongoEventRepository } from "@/infrastructure/repositories/MongoEventRepository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const repo = new MongoEventRepository();
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get('limit');
  const latest = searchParams.get('latest');
  const useLatest = latest === '1' || latest === 'true';
  if (useLatest) {
    const limit = Number(limitParam ?? '10');
    const parsed = Number.isFinite(limit) && limit > 0 ? limit : 10;
    const list = await repo.listLatest(parsed);
    return NextResponse.json(list);
  }
  const limit = Number(limitParam ?? '12');
  const parsed = Number.isFinite(limit) && limit > 0 ? limit : 12;
  const list = await repo.listUpcoming(parsed);
  return NextResponse.json(list);
}
