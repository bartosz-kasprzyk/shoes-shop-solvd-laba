'use client';

import { useContext } from 'react';
import { ServerSessionContext } from '../contexts/ServerSessionContext';
import type { Session } from 'next-auth';

export const useServerSession = (): Session => {
  const session = useContext(ServerSessionContext);
  if (!session) {
    throw new Error(
      'useServerSession should be used within ServerSessionContext',
    );
  }

  return session;
};
