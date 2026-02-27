import { withAuth } from 'next-auth/middleware';
import {
  handleMiddleware,
  isAuthRoute,
  isProtectedRoute,
} from '@/features/auth/nextauth/middlewareCore';

export default withAuth(handleMiddleware, {
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
});

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
