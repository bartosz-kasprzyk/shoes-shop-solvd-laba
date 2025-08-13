import type { NextAuthOptions } from 'next-auth';
import { credentialsProvider } from './providers';
import { jwtCallback, sessionCallback } from './callbacks';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [credentialsProvider],
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
    redirect: ({ url, baseUrl }) => {
      // If the url is a relative path, prepend the baseUrl
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // If the url is on the same origin, allow it
      if (new URL(url).origin === baseUrl) return url;

      // Otherwise, return the baseUrl
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    // error: '/auth/error',
  },
};
