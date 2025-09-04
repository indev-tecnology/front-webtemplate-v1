import { NextResponse } from "next/server";
import { MongoFooterRepository } from "@/infrastructure/repositories/MongoFooterRepository";

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  const repo = new MongoFooterRepository();
  const data = await repo.get();
  return NextResponse.json(data);
}
