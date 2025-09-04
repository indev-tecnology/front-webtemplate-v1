// src/app/api/agreements/[slug]/route.ts
import { NextResponse } from "next/server";
import { MongoAgreementRepository } from "@/infrastructure/repositories/MongoAgreementRepository";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const repo = new MongoAgreementRepository();
  const ag = await repo.getBySlug(params.slug);
  if (!ag) return NextResponse.json({ message: "not-found" }, { status: 404 });
  return NextResponse.json(ag);
}
