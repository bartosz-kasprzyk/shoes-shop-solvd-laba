import { useSession } from 'next-auth/react';

export default function useUser() {
  const { data: session, status, update } = useSession();

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    update,
  };
}
