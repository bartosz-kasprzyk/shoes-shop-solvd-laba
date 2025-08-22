import { profileSchema, profileUpdateSchema } from '../schemas/profile.schema';
import type { Profile } from '../types';
import endpoints from './endpoints';

export const apiBaseUrl = endpoints.baseURL;

export async function getProfile(token: string): Promise<Profile> {
  const url = `${apiBaseUrl}${endpoints.getProfile}?populate[avatar]=true`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to get profile: ${res.statusText}`);
  }

  const data = await res.json();

  return profileSchema.parse(data);
}

export async function updateProfile({
  profile,
  id,
  token,
}: {
  profile: Profile;
  id: number;
  token: string;
}) {
  const url = `${apiBaseUrl}${endpoints.updateProfile}/${id}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileUpdateSchema.parse(profile)),
  });

  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.statusText}`);
  }

  const data = await res.json();

  return profileSchema.parse(data);
}

export async function updateProfileAvatar(
  file: File,
  token: string,
): Promise<number> {
  const url = `${apiBaseUrl}${endpoints.updateProfileAvatar}`;

  const formData = new FormData();
  formData.append('files', file);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to upload avatar: ${res.statusText}`);
  }

  const data = await res.json();

  return data[0].id;
}

export async function deleteProfileAvatar(id: number, token: string) {
  const url = `${apiBaseUrl}${endpoints.deleteProfileAvatar}/${id}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete avatar: ${res.statusText}`);
  }

  const data = await res.json();

  return { success: true, id: data.id };
}
