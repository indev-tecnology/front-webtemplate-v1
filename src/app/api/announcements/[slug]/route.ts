import { NextResponse } from "next/server";
import { MongoAnnouncementRepository } from "@/infrastructure/repositories/MongoAnnouncementRepository";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const repo = new MongoAnnouncementRepository();
  const item = await repo.getBySlug(params.slug);
  if (!item) return NextResponse.json({ message: "not-found" }, { status: 404 });
  return NextResponse.json(item);
}
