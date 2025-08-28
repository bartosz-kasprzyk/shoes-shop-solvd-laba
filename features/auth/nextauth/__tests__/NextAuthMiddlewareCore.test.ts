import { handleMiddleware } from '../middlewareCore';
import type { NextRequestWithAuth } from 'next-auth/middleware';

interface Token {
  loginAt?: number;
  maxAge?: number;
}

export function mkReq(url: string, token: Token | null): NextRequestWithAuth {
  const parsedUrl = new URL(url);

  return {
    url,
    nextUrl: {
      pathname: parsedUrl.pathname,
      search: parsedUrl.search,
      origin: parsedUrl.origin,
      toString: () => url,
    } as NextRequestWithAuth['nextUrl'],
    nextauth: { token },
    cookies: {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      has: jest.fn(),
      entries: jest.fn(),
      [Symbol.iterator]: jest.fn(),
      size: 0,
      getAll: jest.fn(),
      clear: jest.fn(),
    } as NextRequestWithAuth['cookies'],
  } as NextRequestWithAuth;
}

describe('middleware core', () => {
  it('redirects unauthenticated user to sign-in with callback', () => {
    const req = mkReq('http://localhost/my-products', null);
    const res = handleMiddleware(req);

    const location = res.headers.get('location');
    if (!location) throw new Error('Expected redirect location, got null');

    const redirectUrl = new URL(location);
    expect(redirectUrl.pathname).toBe('/sign-in');
    expect(redirectUrl.searchParams.get('callbackUrl')).toBe('/my-products');
  });

  it('redirects authenticated user away from /sign-in', () => {
    const req = mkReq('http://localhost/sign-in', {
      loginAt: 1,
      maxAge: 10000,
    });
    const res = handleMiddleware(req);

    expect(res.headers.get('location')).toBe('http://localhost/');
  });

  it('redirects expired session on protected route to /sign-in (no callback param)', () => {
    const now = Math.floor(Date.now() / 1000);
    const expiredToken = { loginAt: now - 3600, maxAge: 60 };
    const req = mkReq('http://localhost/my-products', expiredToken);

    const res = handleMiddleware(req);

    const location = res.headers.get('location');
    if (!location) throw new Error('Expected redirect location, got null');

    const redirectUrl = new URL(location);
    expect(redirectUrl.pathname).toBe('/sign-in');
    expect(redirectUrl.searchParams.get('callbackUrl')).toBeNull();
  });

  it('does NOT redirect expired session on a public route (returns next & sets x-pathname)', () => {
    const now = Math.floor(Date.now() / 1000);
    const expiredToken = { loginAt: now - 3600, maxAge: 60 };
    const req = mkReq('http://localhost/', expiredToken);

    const res = handleMiddleware(req);

    expect(res.headers.get('location')).toBeNull();
    expect(res.headers.get('x-pathname')).toBe('/');
  });
});
