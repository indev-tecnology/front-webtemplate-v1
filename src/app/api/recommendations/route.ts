import { NextRequest, NextResponse } from "next/server";
import { MongoRecommendationRepository } from "@/infrastructure/repositories/MongoRecommendationRepository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const repo = new MongoRecommendationRepository();
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get('limit');
  const limit = Number.isFinite(Number(limitParam)) && Number(limitParam) > 0 ? Number(limitParam) : 6;
  const list = await repo.listLatest(limit);
  return NextResponse.json(list);
}

