// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '');
  const isAuthenticated = cookies.isAuthenticated === 'true';

  if (!isAuthenticated && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/tasks'],
};
