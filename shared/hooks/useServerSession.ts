'use client';

import { useContext } from 'react';
import { ServerSessionContext } from '../contexts/ServerSessionContext';

export const useServerSession = () => {
  const session = useContext(ServerSessionContext);
  if (!session) {
    throw new Error(
      'useServerSession should be used within ServerSessionContext',
    );
  }

  return session;
};
