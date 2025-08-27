import { authorizeUser } from '../providers';
import type { User } from 'next-auth';

process.env.SHOES_SHOP_BASE_API = 'http://localhost:3000/api';

const mockFetchResponse = <T>(data: T, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

describe('authorizeUser', () => {
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  it('returns user with 30-day maxAge when remember is true', async () => {
    mockFetch
      .mockResolvedValueOnce(mockFetchResponse({ jwt: 'mock-jwt-token' }))
      .mockResolvedValueOnce(
        mockFetchResponse({
          id: 1,
          firstName: 'test',
          lastName: 'user',
          email: 'test@example.com',
          avatar: { url: 'http://example.com/avatar.png' },
        }),
      );

    const user = (await authorizeUser({
      identifier: 'test@example.com',
      password: 'password123',
      remember: 'true',
    })) as User;

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(user).toEqual(
      expect.objectContaining({
        id: 1,
        firstName: 'test',
        lastName: 'user',
        email: 'test@example.com',
        maxAge: 30 * 24 * 60 * 60,
        accessToken: 'mock-jwt-token',
        image: 'http://example.com/avatar.png',
      }),
    );
  });

  it('returns user with 4-hour maxAge when remember is false', async () => {
    mockFetch
      .mockResolvedValueOnce(mockFetchResponse({ jwt: 'mock-jwt-token' }))
      .mockResolvedValueOnce(
        mockFetchResponse({
          id: 2,
          firstName: 'test',
          lastName: 'user',
          email: 'another@example.com',
          avatar: null,
        }),
      );

    const user = (await authorizeUser({
      identifier: 'another@example.com',
      password: 'anotherpassword',
      remember: 'false',
    })) as User;

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(user).toEqual(
      expect.objectContaining({
        id: 2,
        firstName: 'test',
        lastName: 'user',
        email: 'another@example.com',
        maxAge: 4 * 60 * 60,
        accessToken: 'mock-jwt-token',
        image: null,
      }),
    );
  });

  it('throws an error for missing credentials', async () => {
    await expect(authorizeUser(undefined)).rejects.toThrow(
      'Missing credentials',
    );
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('throws an error for invalid credentials', async () => {
    mockFetch.mockResolvedValueOnce(
      mockFetchResponse(
        { error: { message: 'Incorrect identifier or password' } },
        401,
      ),
    );

    await expect(
      authorizeUser({
        identifier: 'wrong@example.com',
        password: 'wrongpassword',
        remember: 'false',
      }),
    ).rejects.toThrow('Incorrect identifier or password');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error if no jwt returned', async () => {
    mockFetch.mockResolvedValueOnce(mockFetchResponse({ user: { id: 1 } }));

    await expect(
      authorizeUser({
        identifier: 'valid@example.com',
        password: 'password123',
        remember: 'false',
      }),
    ).rejects.toThrow("'Invalid email or password'");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error if profile fetch fails', async () => {
    mockFetch
      .mockResolvedValueOnce(mockFetchResponse({ jwt: 'mock-jwt-token' }))
      .mockResolvedValueOnce(
        mockFetchResponse({ message: 'User not found' }, 404),
      );

    await expect(
      authorizeUser({
        identifier: 'test@example.com',
        password: 'password123',
        remember: 'false',
      }),
    ).rejects.toThrow('Failed to fetch user profile');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
