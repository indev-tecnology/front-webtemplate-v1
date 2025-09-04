// src/app/api/services/route.ts
import { NextResponse } from "next/server";
import { MongoServiceRepository } from "@/infrastructure/repositories/MongoServiceRepository";

export const runtime = "nodejs";

export async function GET() {
  const repo = new MongoServiceRepository();
  const list = await repo.listAll();
  return NextResponse.json(list);
}
