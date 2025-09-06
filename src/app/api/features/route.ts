import { NextResponse } from "next/server";
import { MongoFeatureRepository } from "@/infrastructure/repositories/MongoFeatureRepository";

export async function GET() {
  const repo = new MongoFeatureRepository();
  const list = await repo.list(12);
  return NextResponse.json(list);
}