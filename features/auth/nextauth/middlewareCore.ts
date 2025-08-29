import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

export const protectedRoutes = [
  // profile
  '/my-products',
  '/add-product',
  '/edit-product',
  '/order-history',
  '/my-wishlist',
  '/recently-viewed',
  '/settings',
  // other
  '/checkout/summary',
  '/checkout',
  '/checkout/cart',
];

// Logged in user cannot go here
export const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
];

export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.includes(route));
}

export function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.includes(route));
}

export function handleMiddleware(req: NextRequestWithAuth): NextResponse {
  const token = req.nextauth.token;
  const { pathname } = req.nextUrl;

  const isAuthPage = isAuthRoute(pathname);
  const isProtectedPage = isProtectedRoute(pathname);

  const now = Math.floor(Date.now() / 1000);
  const isExpired =
    token?.loginAt &&
    token.maxAge &&
    now > Number(token.loginAt) + token.maxAge;

  if (isExpired && isProtectedPage) {
    const res = NextResponse.redirect(new URL('/sign-in', req.url));
    res.cookies.delete('next-auth.session-token');
    res.cookies.delete('__Secure-next-auth.session-token');
    return res;
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && isProtectedPage) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set(
      'callbackUrl',
      req.nextUrl.pathname + req.nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  return response;
}
