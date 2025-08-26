import { useSession } from 'next-auth/react';
import type { SessionContextValue } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function useUser(): {
  session: Session | null;
  status: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  update: SessionContextValue['update'];
} {
  const { data: session, status, update } = useSession();

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    update,
  };
}