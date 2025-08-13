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
    const loginUrl = `${process.env.SHOES_SHOP_BASE_API}/auth/local`;
    const loginResponse = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!loginResponse) {
      return null;
    }

    const loginData = await loginResponse.json();

    const profileUrl = `${process.env.SHOES_SHOP_BASE_API}/users/me?populate=avatar`;
    const profileResponse = await fetch(profileUrl, {
      headers: {
        Authorization: `Bearer ${loginData.jwt}`,
      },
    });

    if (!profileResponse) {
      return null;
    }

    const profileData = await profileResponse.json();
    const user = profileData;

    const avatarUrl = user.avatar?.url ? user.avatar.url : null;

    return {
      id: user.id,
      name: user.username,
      email: user.email,
      remember: credentials?.remember,
      accessToken: loginData.jwt,
      image: avatarUrl,
    } as User;
  },
});
