'use client';

import { signOut } from 'next-auth/react';
import { useSnackbar } from '@/shared/hooks/useSnackbar';

const PENDING_SNACKBAR_KEY = 'pendingSnackbar';

export const useSignOut = (): { handleSignOut: () => Promise<void> } => {
  const { showSnackbar } = useSnackbar();

  const handleSignOut = async (): Promise<void> => {
    try {
      // Store the success message to show after redirect
      const pendingMessage = {
        message: 'Successfully signed out',
        severity: 'success',
        duration: 3000,
      };
      localStorage.setItem(
        PENDING_SNACKBAR_KEY,
        JSON.stringify(pendingMessage),
      );

      await signOut({ callbackUrl: '/' });
    } catch {
      showSnackbar('Error signing out. Please try again.', 'error');
    }
  };

  return { handleSignOut };
};
