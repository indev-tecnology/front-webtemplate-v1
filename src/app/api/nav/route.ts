import { NextResponse } from "next/server";
import { MongoNavigationRepository } from "@/infrastructure/repositories/MongoNavigationRepository";

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  const repo = new MongoNavigationRepository();
  const data = await repo.get();
  return NextResponse.json(data);
}
