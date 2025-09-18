import { NextRequest, NextResponse } from "next/server";
import { MongoPageRepository } from "@/infrastructure/repositories/MongoPageRepository";

export const runtime = "nodejs";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repo = new MongoPageRepository();
  const page = await repo.getBySlug(slug);
  if (!page) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}
