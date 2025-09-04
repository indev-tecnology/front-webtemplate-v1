// src/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const url = new URL(req.url);
  const isMaintenance = process.env.MAINTENANCE === 'hard';
  const isMaintenancePage = url.pathname === '/maintenance';

  if (isMaintenance && !isMaintenancePage && !url.pathname.startsWith('/api')) {
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|assets).*)'],
};
