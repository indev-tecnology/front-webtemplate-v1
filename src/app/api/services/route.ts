// src/app/api/services/route.ts
import { NextResponse } from "next/server";
import { MongoServiceRepository } from "@/infrastructure/repositories/MongoServiceRepository";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? Number(limitParam) : undefined;

  const repo = new MongoServiceRepository();
  const list = await repo.listAll({ limit });

  // Add Cache-Control header for CDN / browser caching (ISR handled by Next caching layers)
  const res = NextResponse.json(list);
  res.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  return res;
}
