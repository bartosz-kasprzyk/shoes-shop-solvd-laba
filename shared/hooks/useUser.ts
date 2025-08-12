import { useSession } from 'next-auth/react';

export default function useUser() {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}
