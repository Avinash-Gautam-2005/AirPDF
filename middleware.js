/**
 * Middleware for Route Protection (Edge Runtime)
 * 
 * Minimal middleware - no external imports except Next.js built-ins.
 * Full auth & RBAC handled at page/API level.
 */

import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isSecure = request.url.startsWith('https');
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: isSecure,
    cookieName: isSecure
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token',
  });

  const role = token?.role;

  // Check for NextAuth session cookie
  const hasSession = request.cookies.has('authjs.session-token') ||
    request.cookies.has('__Secure-authjs.session-token');

  // Public routes
  const publicPaths = ['/', '/login', '/register', '/unauthorized', '/select'];
  if (publicPaths.includes(pathname) || pathname.startsWith('/api') || pathname.startsWith('/shop')) {
    return NextResponse.next();
  }

  // Static files - skip
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Protected routes - require session cookie
  const protectedPaths = ['/upload', '/orders', '/dashboard', '/shop'];
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  if (
    pathname.startsWith('/dashboard/shopkeeper') &&
    role !== 'SHOPKEEPER'
  ) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
   if (
    pathname.startsWith('/dashboard/student') &&
    role !== 'CUSTOMER'
  ) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};