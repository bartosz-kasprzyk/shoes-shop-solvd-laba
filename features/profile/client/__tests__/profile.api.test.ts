import endpoints from '../endpoints';
import { profileSchema } from '../../schemas/profile.schema';
import type { Profile } from '../../types';
import {
  updateProfile,
  getProfile,
  updateProfileAvatar,
  deleteProfileAvatar,
} from '../profile.api';

const token = 'test-token';
const profileResponse = {
  id: 1,
  firstName: 'testName',
  lastName: 'testSurname',
  email: 'example@email.com',
  phoneNumber: '123456789',
  avatar: {
    id: 1,
    url: 'https://example.com/avatar.jpg',
  },
};

describe('profile.api with fetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getProfile should return parsed profile data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => profileResponse,
    });

    const profile = await getProfile(token);
    expect(profile).toEqual(profileSchema.parse(profileResponse));

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoints.baseURL}${endpoints.getProfile}?populate[avatar]=true`,
      expect.objectContaining({
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
  });

  it('updateProfile should return updated profile data', async () => {
    const id = 1;
    const profile: Profile = profileSchema.parse(profileResponse);

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => profileResponse,
    });

    const result = await updateProfile({ profile, id, token });
    expect(result).toEqual(profile);

    expect(global.fetch).toHaveBeenCalledWith(
      `${endpoints.baseURL}${endpoints.updateProfile}/${id}`,
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
      }),
    );
  });

  it('updateProfileAvatar should return id', async () => {
    const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });
    const response = [{ id: 1 }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => response,
    });

    const result = await updateProfileAvatar(file, token);
    expect(result).toBe(1);
  });

  it('deleteProfileAvatar should return success object', async () => {
    const id = 1;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id }),
    });

    const result = await deleteProfileAvatar(id, token);
    expect(result).toEqual({ success: true, id });
  });
});
