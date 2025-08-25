import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function useUser(): {
  session: Session | null;
  status: string;
  isLoading: boolean;
  isAuthenticated: boolean;
} {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}
