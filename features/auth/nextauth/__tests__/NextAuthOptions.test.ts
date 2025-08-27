import { authOptions } from '../authOptions';

describe('NextAuth Configuration', () => {
  it('has session strategy set to jwt', () => {
    expect(authOptions.session?.strategy).toBe('jwt');
  });

  it('includes the credentials provider', () => {
    expect(authOptions.providers).toHaveLength(1);
    expect(authOptions.providers[0]).toHaveProperty('id', 'credentials');
    expect(authOptions.providers[0]).toHaveProperty('name', 'Credentials');
  });

  it('defines jwt and session callbacks', () => {
    expect(authOptions.callbacks?.jwt).toBeDefined();
    expect(authOptions.callbacks?.session).toBeDefined();
    expect(authOptions.callbacks?.redirect).toBeDefined();
  });

  it('has a secret defined', () => {
    expect(authOptions.secret).toBe(process.env.NEXTAUTH_SECRET);
  });

  it('sets the sign-in page path', () => {
    expect(authOptions.pages?.signIn).toBe('/sign-in');
  });

  describe('redirect callback', () => {
    const baseUrl = 'http://localhost:3000';

    it('prepends baseUrl for relative paths', () => {
      const url = '/some-path';
      const result = authOptions.callbacks?.redirect?.({ url, baseUrl });
      expect(result).toBe(`${baseUrl}${url}`);
    });

    it('allows URLs on the same origin', () => {
      const url = 'http://localhost:3000/another-path';
      const result = authOptions.callbacks?.redirect?.({ url, baseUrl });
      expect(result).toBe(url);
    });

    it('returns baseUrl for URLs on a different origin', () => {
      const url = 'http://external.com/some-path';
      const result = authOptions.callbacks?.redirect?.({ url, baseUrl });
      expect(result).toBe(baseUrl);
    });
  });
});
