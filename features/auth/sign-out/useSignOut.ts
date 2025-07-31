'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useSignOut = () => {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 2000);
    });
  }, [router]);
};
