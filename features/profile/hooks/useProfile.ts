import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as profileClient from '../client/profile.api';
import type { OnSubmitPayload } from '../types';
import { handleProfileUpdate } from '../services/profile.service';
import { useServerSession } from '@/shared/hooks/useServerSession';

export default function useProfile() {
  // const { session, status } = useUser();
  const session = useServerSession();
  const queryClient = useQueryClient();

  const id = session.user.id as number;
  const token = session.user.accessToken as string;
  // const isSessionReady = status === 'authenticated' && !!id && !!token;

  const profile = useQuery({
    queryKey: ['profile', id],
    queryFn: () => profileClient.getProfile(token),
    // enabled: isSessionReady,
  });

  const mutation = useMutation({
    mutationFn: (data: OnSubmitPayload) =>
      handleProfileUpdate({
        profile: data.profile,
        avatarOperation: data.avatarOperation,
        avatarFile: data.avatarFile,
        id: id,
        token: token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const onSubmit = (data: OnSubmitPayload) => {
    // if (!isSessionReady) {
    //   return;
    // }
    mutation.mutate(data);
  };

  return {
    profile,
    onSubmit,
    isSubmitting: mutation.isPending,
    // isLoadingSession: status === 'loading',
    // isAuthenticated: status === 'authenticated',
  };
}
