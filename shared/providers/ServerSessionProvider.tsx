'use client';

import type { Session } from 'next-auth';
import { ServerSessionContext } from '../contexts/ServerSessionContext';

export default function ServerSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <ServerSessionContext.Provider value={session}>
      {children}
    </ServerSessionContext.Provider>
  );
}
