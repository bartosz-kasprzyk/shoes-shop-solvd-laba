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
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    // error: '/auth/error',
  },
};
