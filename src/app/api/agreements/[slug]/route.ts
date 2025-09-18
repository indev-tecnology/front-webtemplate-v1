// src/app/api/agreements/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoAgreementRepository } from "@/infrastructure/repositories/MongoAgreementRepository";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repo = new MongoAgreementRepository();
  const ag = await repo.getBySlug(slug);
  if (!ag) return NextResponse.json({ message: "not-found" }, { status: 404 });
  return NextResponse.json(ag);
}
