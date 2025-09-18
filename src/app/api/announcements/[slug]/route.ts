import { NextRequest, NextResponse } from "next/server";
import { MongoAnnouncementRepository } from "@/infrastructure/repositories/MongoAnnouncementRepository";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repo = new MongoAnnouncementRepository();
  const item = await repo.getBySlug(slug);
  if (!item) return NextResponse.json({ message: "not-found" }, { status: 404 });
  return NextResponse.json(item);
}
