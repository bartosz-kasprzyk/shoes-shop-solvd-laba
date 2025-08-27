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
  '/checkout/cart',
];

// Logged in user cannot go here
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

    const now = Math.floor(Date.now() / 1000);
    const isExpired =
      token?.loginAt &&
      token.maxAge &&
      now > Number(token.loginAt) + token.maxAge;

    if (isExpired && isProtectedPage) {
      const res = NextResponse.redirect(new URL('/sign-in', req.url));
      res.cookies.delete('next-auth.session-token');
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

    // Add the pathname to headers for server components
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);

    return response;
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
