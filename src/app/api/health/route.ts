// src/app/api/health/route.ts
export async function GET() {
  const hard = process.env.MAINTENANCE === 'hard';
  return new Response(JSON.stringify({ ok: !hard, maintenance: process.env.MAINTENANCE || 'off' }),
    { status: hard ? 503 : 200 });
}
