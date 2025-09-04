import { NextResponse } from "next/server";
import { MongoAnnouncementRepository } from "@/infrastructure/repositories/MongoAnnouncementRepository";

export async function GET() {
  const repo = new MongoAnnouncementRepository();
  const list = await repo.listActive(12);
  return NextResponse.json(list);
}
