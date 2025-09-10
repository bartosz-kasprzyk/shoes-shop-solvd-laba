import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

export async function jwtCallback({
  token,
  user,
  trigger,
  session,
}: {
  token: JWT;
  user?: any;
  trigger?: 'update' | 'signIn' | 'signUp';
  session?: Session;
}): Promise<JWT> {
  const now = Math.floor(Date.now() / 1000);

  // On sign-in
  if (user) {
    token.id = user.id;
    token.name = `${user.firstName} ${user.lastName}`;
    token.email = user.email;
    token.accessToken = user.accessToken;
    token.maxAge = user.maxAge;
    token.loginAt = now;
    token.image = user.image;
  }

  // On client update()
  if (trigger === 'update' && session?.user) {
    if (session.user.name) token.name = session.user.name;
    token.image = session.user.image;
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
  if (token.id !== undefined && token.id !== null && token.id !== 0) {
    session.user.id = token.id;
  }

  if (token.accessToken) {
    session.user.accessToken = token.accessToken as string;
    session.user.name = token.name as string;
    session.user.image = token.image as string;
  }

  return session;
}
