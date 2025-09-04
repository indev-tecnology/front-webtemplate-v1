// src/app/api/services/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoServiceRepository } from "@/infrastructure/repositories/MongoServiceRepository";

export const runtime = "nodejs";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const repo = new MongoServiceRepository();
  const { slug } = await params;
  const s = await repo.getBySlug(slug);
  if (!s) return NextResponse.json({ message: "not-found" }, { status: 404 });
  return NextResponse.json(s);
}
