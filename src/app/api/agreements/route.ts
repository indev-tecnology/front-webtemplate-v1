// src/app/api/agreements/route.ts
import { NextResponse } from "next/server";
import { MongoAgreementRepository } from "@/infrastructure/repositories/MongoAgreementRepository";

export async function GET() {
  const repo = new MongoAgreementRepository();
  const list = await repo.listAll();
  return NextResponse.json(list);
}
