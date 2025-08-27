import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

import { jwtCallback, sessionCallback } from '../callbacks';
process.env.NEXTAUTH_SECRET = 'test_nextauth_secret';
process.env.SHOES_SHOP_BASE_API = 'http://localhost:3000/api';

describe('NextAuth Callbacks', () => {
  describe('jwtCallback', () => {
    it('populates token with user data and sets loginAt when user is provided', async () => {
      const now = Math.floor(Date.now() / 1000);
      const exp = now + 3600;

      const initialToken: JWT = {
        id: 0,
        accessToken: '',
        exp: exp,
        maxAge: 0,
      };
      const user = {
        id: 123,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        accessToken: 'mock-access-token',
        maxAge: 3600,
        image: 'http://example.com/avatar.jpg',
      };

      const resultToken = await jwtCallback({ token: initialToken, user });

      expect(resultToken.id).toBe(user.id);
      expect(resultToken.name).toBe(`${user.firstName} ${user.lastName}`);
      expect(resultToken.email).toBe(user.email);
      expect(resultToken.accessToken).toBe(user.accessToken);
      expect(resultToken.maxAge).toBe(user.maxAge);
      expect(resultToken.loginAt).toBeGreaterThanOrEqual(now);
      expect(resultToken.loginAt).toBeLessThanOrEqual(
        Math.floor(Date.now() / 1000) + 1,
      );
    });

    it('returns token unchanged (except loginAt if user exists) when user is not provided', async () => {
      const now = Math.floor(Date.now() / 1000);
      const exp = now + 3600;
      const initialToken: JWT = {
        id: 999,
        name: 'Existing Name',
        accessToken: 'existing-access-token',
        exp: exp,
        maxAge: 7200,
      };
      const resultToken = await jwtCallback({ token: initialToken });
      expect(resultToken.id).toBe(999);
      expect(resultToken.name).toBe('Existing Name');
      expect(resultToken.email).toBeUndefined();
      expect(resultToken.accessToken).toBe('existing-access-token');
      expect(resultToken.loginAt).toBeUndefined();
      expect(resultToken.maxAge).toBe(7200);
      expect(resultToken.exp).toBe(exp);
    });

    it('updates token with name and image from session on client update', async () => {
      const initialToken: JWT = {
        id: 123,
        name: 'Old Name',
        email: 'test@example.com',
        accessToken: 'old-access-token',
        image: 'http://example.com/old_avatar.jpg',
        maxAge: 3600,
        exp: Math.floor(Date.now() / 1000) + 3600,
      };
      const session = {
        expires: '2025-01-01T00:00:00.000Z',
        user: {
          id: initialToken.id,
          accessToken: initialToken.accessToken,
          name: 'New Name from Session',
          image: 'http://example.com/new_avatar.png',
        },
      };
      const trigger = 'update';

      const resultToken = await jwtCallback({
        token: initialToken,
        session,
        trigger,
      });

      expect(resultToken.name).toBe(session.user.name);
      expect(resultToken.image).toBe(session.user.image);
      expect(resultToken.id).toBe(initialToken.id);
      expect(resultToken.accessToken).toBe(initialToken.accessToken);
      expect(resultToken.email).toBe(initialToken.email);
      expect(resultToken.maxAge).toBe(initialToken.maxAge);
    });
  });

  describe('sessionCallback', () => {
    it('populates session with user id and accessToken from token', async () => {
      const initialSession: Session = {
        expires: '2025-01-01T00:00:00.000Z',
        user: {
          id: 0,
          accessToken: '',
          image: null,
        },
      };
      const token: JWT = {
        id: 456,
        accessToken: 'mock-session-access-token',
        name: 'Token Name',
        image: 'http://example.com/token_avatar.jpg',
        email: 'token@example.com',
        exp: Math.floor(Date.now() / 1000) + 3600,
        maxAge: 3600,
      };

      const resultSession = await sessionCallback({
        session: initialSession,
        token,
      });

      expect(resultSession.user.id).toBe(456);
      expect(resultSession.user.accessToken).toBe('mock-session-access-token');
      expect(resultSession.user.name).toBe('Token Name');
      expect(resultSession.user.image).toBe(
        'http://example.com/token_avatar.jpg',
      );
    });

    it('handles token.id as number correctly', async () => {
      const initialSession: Session = {
        expires: '2025-01-01T00:00:00.000Z',
        user: {
          id: 0,
          accessToken: '',
        },
      };
      const token: JWT = {
        id: 789,
        accessToken: 'numeric-id-token',
        exp: Math.floor(Date.now() / 1000) + 3600,
        maxAge: 3600,
      };

      const resultSession = await sessionCallback({
        session: initialSession,
        token,
      });
      expect(resultSession.user.id).toBe(789);
    });

    it('returns session unchanged if token is empty (or has minimal properties)', async () => {
      const initialSession: Session = {
        expires: '2025-01-01T00:00:00.000Z',
        user: {
          id: 1,
          name: 'Initial User',
          email: 'initial@example.com',
          accessToken: 'initial-access-token',
        },
      };
      const token: JWT = {
        id: 0,
        accessToken: '',
        exp: Math.floor(Date.now() / 1000) + 1,
        maxAge: 0,
      };

      const resultSession = await sessionCallback({
        session: initialSession,
        token,
      });

      expect(resultSession.user.id).toBe(1);
      expect(resultSession.user.accessToken).toBe('initial-access-token');
      expect(resultSession.user.name).toBe('Initial User');
      expect(resultSession.user.email).toBe('initial@example.com');
    });
  });
});
