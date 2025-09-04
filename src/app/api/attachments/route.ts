// src/app/api/attachments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoAttachmentRepository } from "@/infrastructure/repositories/MongoAttachmentRepository";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category") ?? undefined;
  const q = url.searchParams.get("q") ?? undefined;
  const page = Number(url.searchParams.get("page") || "1");
  const pageSize = Math.min(100, Number(url.searchParams.get("pageSize") || "24"));

  const repo = new MongoAttachmentRepository();
  const data = await repo.list({ category, q, page, pageSize });
  return NextResponse.json(data, { headers: { "Cache-Control":"public, s-maxage=60, stale-while-revalidate=300" }});
}
