import { NextResponse } from "next/server";
import { MongoEventRepository } from "@/infrastructure/repositories/MongoEventRepository";

export const runtime = "nodejs";

export async function GET() {
  const repo = new MongoEventRepository();
  const list = await repo.listUpcoming(12);
  return NextResponse.json(list);
}
