// src/app/api/health/route.ts
import clientPromise from "@/infrastructure/db/mongodb/client";

export async function GET() {
  const hard = process.env.MAINTENANCE === 'hard';
  if (hard) {
    return new Response(JSON.stringify({ ok: false, maintenance: 'hard' }), { status: 503 });
  }
  try {
    const client = await clientPromise;
    const admin = client.db().admin();
    const ping = await admin.ping();
    return new Response(JSON.stringify({ ok: true, mongo: ping?.ok === 1, maintenance: process.env.MAINTENANCE || 'off' }), { status: 200 });
  } catch (e: any) {
    const code = e?.codeName || e?.name || 'Error';
    return new Response(JSON.stringify({ ok: false, mongo: false, error: code }), { status: 500 });
  }
}
