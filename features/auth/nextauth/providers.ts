import CredentialsProvider from 'next-auth/providers/credentials';
import type { User } from 'next-auth';

export const credentialsProvider = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    identifier: {
      label: 'Identifier',
      type: 'text',
      placeholder: 'jsmith',
    },
    password: { label: 'Password', type: 'password' },
    remember: { label: 'Remember me', type: 'checkbox' },
  },
  async authorize(credentials): Promise<User | null> {
    const url = `${process.env.SHOES_SHOP_BASE_API}/auth/local`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (res.ok && data.user) {
      return {
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        remember: credentials?.remember,
        accessToken: data.jwt,
      } as User;
    }

    return null;
  },
});
