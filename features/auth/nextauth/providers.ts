import CredentialsProvider from 'next-auth/providers/credentials';
import type { User } from 'next-auth';

export const authorizeUser = async (
  credentials:
    | Record<'identifier' | 'password' | 'remember', string>
    | undefined,
): Promise<User | null> => {
  if (!credentials) {
    throw new Error('Missing credentials');
  }

  const loginUrl = `${process.env.SHOES_SHOP_BASE_API}/auth/local`;
  const loginResponse = await fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  });

  const loginData = await loginResponse.json();

  if (!loginResponse.ok || !loginData.jwt) {
    const errorMessage =
      loginData?.error?.message || "'Invalid email or password'";
    throw new Error(errorMessage);
  }

  const profileUrl = `${process.env.SHOES_SHOP_BASE_API}/users/me?populate=avatar`;
  const profileResponse = await fetch(profileUrl, {
    headers: { Authorization: `Bearer ${loginData.jwt}` },
  });

  if (!profileResponse.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const user = await profileResponse.json(); // profile data
  const avatarUrl = user.avatar?.url ?? null;
  const maxAge =
    credentials.remember === 'true' ? 30 * 24 * 60 * 60 : 4 * 60 * 60; // 30 days or 4 hours

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    maxAge,
    accessToken: loginData.jwt,
    image: avatarUrl,
  } as User;
};

export const credentialsProvider = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    identifier: { label: 'Identifier', type: 'text', placeholder: 'jsmith' },
    password: { label: 'Password', type: 'password' },
    remember: { label: 'Remember me', type: 'checkbox' },
  },
  authorize: authorizeUser,
});
