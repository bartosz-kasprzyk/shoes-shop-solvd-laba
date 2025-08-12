import * as profileClient from '../../client/profile.api';
import { Profile } from '../../types';
import { handleProfileUpdate } from '../profile.service';

jest.mock('../../client/profile.api');

const token = 'test-token';
const id = 1;

const profile = {
  id: 1,
  firstName: 'testName',
  lastName: 'testSurname',
  email: 'example@email.com',
  phoneNumber: '123456789',
  avatar: {
    id: 1,
    url: 'https://example.com/avatar.png',
  },
};

describe('handleProfileUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates avatar and profile when avatarOperation is "update"', async () => {
    const avatarFile = new File(['test file'], 'avatar.png', {
      type: 'image/png',
    });

    (profileClient.updateProfileAvatar as jest.Mock).mockResolvedValue(1);
    (profileClient.updateProfile as jest.Mock).mockResolvedValue({
      ...profile,
      avatar: { ...profile.avatar, id: 1 },
    });

    const result = await handleProfileUpdate({
      profile: { ...profile },
      avatarOperation: 'update',
      avatarFile,
      id,
      token,
    });

    expect(profileClient.updateProfileAvatar).toHaveBeenCalledWith(
      avatarFile,
      token,
    );
    expect(profileClient.updateProfile).toHaveBeenCalledWith({
      profile: { ...profile, avatar: { ...profile.avatar, id: 1 } },
      id,
      token,
    });
    expect(result).toEqual({
      ...profile,
      avatar: { ...profile.avatar, id: 1 },
    });
  });

  it('deletes avatar and updates profile when avatarOperation is "delete"', async () => {
    (profileClient.deleteProfileAvatar as jest.Mock).mockResolvedValue({
      success: true,
      id: profile.avatar.id,
    });
    (profileClient.updateProfile as jest.Mock).mockResolvedValue({
      ...profile,
      avatar: null,
    });

    const result = await handleProfileUpdate({
      profile: { ...profile },
      avatarOperation: 'delete',
      avatarFile: undefined,
      id,
      token,
    });

    expect(profileClient.deleteProfileAvatar).toHaveBeenCalledWith(
      profile.avatar.id,
      token,
    );
    expect(profileClient.updateProfile).toHaveBeenCalledWith({
      profile: { ...profile, avatar: null },
      id,
      token,
    });
    expect(result).toEqual({ ...profile, avatar: null });
  });

  it('updates profile without avatar operations', async () => {
    (profileClient.updateProfile as jest.Mock).mockResolvedValue(profile);

    const result = await handleProfileUpdate({
      profile: { ...profile },
      avatarOperation: 'none',
      avatarFile: undefined,
      id,
      token,
    });

    expect(profileClient.updateProfileAvatar).not.toHaveBeenCalled();
    expect(profileClient.deleteProfileAvatar).not.toHaveBeenCalled();
    expect(profileClient.updateProfile).toHaveBeenCalledWith({
      profile,
      id,
      token,
    });
    expect(result).toEqual(profile);
  });

  it('sets avatar to new id if profile.avatar is null', async () => {
    const avatarFile = new File(['test file'], 'avatar.png', {
      type: 'image/png',
    });

    (profileClient.updateProfileAvatar as jest.Mock).mockResolvedValue(99);
    (profileClient.updateProfile as jest.Mock).mockResolvedValue({
      ...profile,
      avatar: { id: 99 },
    });

    const profileWithoutAvatar = { ...profile, avatar: null };

    const result = await handleProfileUpdate({
      profile: profileWithoutAvatar,
      avatarOperation: 'update',
      avatarFile,
      id,
      token,
    });

    expect(profileClient.updateProfileAvatar).toHaveBeenCalledWith(
      avatarFile,
      token,
    );
    expect(profileClient.updateProfile).toHaveBeenCalledWith({
      profile: { ...profileWithoutAvatar, avatar: { id: 99 } },
      id,
      token,
    });
    expect(result).toEqual({ ...profileWithoutAvatar, avatar: { id: 99 } });
  });
});
