import { useSession } from 'next-auth/react';
import type { UseUserProps } from '../types';

export default function useUser(): UseUserProps {
  const { data: session, status, update } = useSession();

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    update,
  };
}
