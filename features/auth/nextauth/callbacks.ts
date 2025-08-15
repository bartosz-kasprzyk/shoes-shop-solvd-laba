import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

export async function jwtCallback({
  token,
  user,
}: {
  token: JWT;
  user?: any;
}): Promise<JWT> {
  const now = Math.floor(Date.now() / 1000);
  if (user) {
    token.id = user.id;
    token.name = user.name;
    token.email = user.email;
    token.accessToken = user.accessToken;
    token.maxAge = user.maxAge;
    token.loginAt = now;
  }
  return token;
}

export async function sessionCallback({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> {
  if (token) {
    session.user.id =
      typeof token.id === 'string' ? parseInt(token.id) : token.id;
    session.user.accessToken = token.accessToken as string;
  }

  return session;
}
