import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

const protectedRoutes = [
  // profile
  '/my-products',
  '/add-product',
  '/edit-product',
  '/order-history',
  '/my-wishlist',
  '/recently-viewed',
  '/settings',
  // other
  '/cart',
  '/checkout',
];

const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.includes(route));
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.includes(route));
}

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const isAuthPage = isAuthRoute(pathname);
    const isProtectedPage = isProtectedRoute(pathname);

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

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (isAuthRoute(pathname)) return true;

        if (pathname.startsWith('/')) {
          if (isProtectedRoute(pathname)) return !!token;
          return true;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
};
