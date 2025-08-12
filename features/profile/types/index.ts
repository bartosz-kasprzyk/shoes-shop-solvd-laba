import type z from 'zod';
import type { profileSchema } from '../schemas/profile.schema';

export type Profile = z.infer<typeof profileSchema>;

export type AvatarOperation = 'none' | 'update' | 'delete';

export interface UpdateProfileOptions {
  profile: Profile;
  avatarOperation: AvatarOperation;
  avatarFile?: File;
  id: number;
  token: string;
}

export interface OnSubmitPayload {
  profile: Profile;
  avatarOperation: AvatarOperation;
  avatarFile?: File;
}
