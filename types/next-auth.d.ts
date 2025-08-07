import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      accessToken: string;
    } & DefaultSession['user'];
    remember?: boolean;
    expires: string;
  }

  interface User extends DefaultUser {
    id: number;
    remember?: boolean;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    accessToken: string;
    remember?: boolean;
    exp: number;
  }
}
