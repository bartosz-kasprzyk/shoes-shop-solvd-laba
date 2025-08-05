'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useSignOut = (): void => {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    });
  }, [router]);
};
