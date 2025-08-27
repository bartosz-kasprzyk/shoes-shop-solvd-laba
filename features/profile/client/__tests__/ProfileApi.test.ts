import endpoints from '../endpoints';
import {
  profileSchema,
  profileUpdateSchema,
} from '../../schemas/profile.schema';
import type { Profile } from '../../types';
import {
  getProfile,
  updateProfile,
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

describe('Profile API', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('getProfile', () => {
    it('fetches and parses profile data correctly', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => profileResponse,
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

    it('throws an error if the request fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
      });

      await expect(getProfile(token)).rejects.toThrow(
        'Failed to get profile: Unauthorized',
      );
    });
  });

  describe('updateProfile', () => {
    const id = 1;
    const profile: Profile = profileSchema.parse(profileResponse);

    it('successfully updates profile data', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => profileResponse,
      });

      const result = await updateProfile({ profile, id, token });

      expect(result).toEqual(profile);
      expect(global.fetch).toHaveBeenCalledWith(
        `${endpoints.baseURL}${endpoints.updateProfile}/${id}`,
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(profileUpdateSchema.parse(profile)),
        }),
      );
    });

    it('throws an error if the update fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
      });

      await expect(updateProfile({ profile, id, token })).rejects.toThrow(
        'Failed to update profile: Bad Request',
      );
    });
  });

  describe('updateProfileAvatar', () => {
    const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });

    it('uploads avatar and returns ID', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => [{ id: 1 }],
      });

      const result = await updateProfileAvatar(file, token);
      expect(result).toBe(1);

      expect(global.fetch).toHaveBeenCalledWith(
        `${endpoints.baseURL}${endpoints.updateProfileAvatar}`,
        expect.objectContaining({
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: expect.any(FormData),
        }),
      );
    });

    it('throws an error if upload fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Upload failed',
      });

      await expect(updateProfileAvatar(file, token)).rejects.toThrow(
        'Failed to upload avatar: Upload failed',
      );
    });
  });

  describe('deleteProfileAvatar', () => {
    const avatarId = 1;

    it('deletes avatar and returns success', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => ({ id: avatarId }),
      });

      const result = await deleteProfileAvatar(avatarId, token);
      expect(result).toEqual({ success: true, id: avatarId });

      expect(global.fetch).toHaveBeenCalledWith(
        `${endpoints.baseURL}${endpoints.deleteProfileAvatar}/${avatarId}`,
        expect.objectContaining({
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
    });

    it('throws an error if deletion fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Delete failed',
      });

      await expect(deleteProfileAvatar(avatarId, token)).rejects.toThrow(
        'Failed to delete avatar: Delete failed',
      );
    });
  });
});
