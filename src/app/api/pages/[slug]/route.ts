import { NextRequest, NextResponse } from "next/server";
import { MongoPageRepository } from "@/infrastructure/repositories/MongoPageRepository";

export const runtime = "nodejs";

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const repo = new MongoPageRepository();
  const page = await repo.getBySlug(params.slug);
  if (!page) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}
