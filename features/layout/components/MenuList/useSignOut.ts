'use client';

import { signOut } from 'next-auth/react';
import { useSnackbar } from '@/shared/hooks/useSnackbar';

export const useSignOut = (): { handleSignOut: () => Promise<void> } => {
  const { showSnackbar } = useSnackbar();

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut({ callbackUrl: '/?signedOut=true' });
    } catch {
      showSnackbar('Error signing out. Please try again.', 'error');
    }
  };

  return { handleSignOut };
};
