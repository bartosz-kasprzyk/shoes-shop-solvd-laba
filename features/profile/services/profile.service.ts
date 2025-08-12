import type { Profile, UpdateProfileOptions } from '../types';
import * as profileClient from '../client/profile.api';

export async function handleProfileUpdate({
  profile,
  avatarOperation,
  avatarFile,
  id,
  token,
}: UpdateProfileOptions): Promise<Profile> {
  if (avatarOperation === 'update' && avatarFile) {
    const newAvatarId = await profileClient.updateProfileAvatar(
      avatarFile,
      token,
    );
    profile.avatar = { ...(profile.avatar || {}), id: newAvatarId };
  } else if (avatarOperation === 'delete' && profile.avatar) {
    await profileClient.deleteProfileAvatar(profile.avatar.id, token);
    profile.avatar = null;
  }

  return profileClient.updateProfile({ profile, id, token });
}
