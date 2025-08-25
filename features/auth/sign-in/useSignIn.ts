'use client';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { SignInFormData } from './signIn.schema';

export const useSignIn = (): {
  signInUser: (data: SignInFormData) => Promise<boolean>;
  serverError: string;
  success: boolean;
} => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState<boolean>(false);
  const signInUser = async (data: SignInFormData) => {
    setServerError('');

    // Get the callback URL from search params or default to '/products'
    const callbackUrl = searchParams.get('callbackUrl') || '/products';

    const res = await signIn('credentials', {
      redirect: false,
      identifier: data.email,
      password: data.password,
      remember: data.remember,
      callbackUrl,
    });
    if (res?.error) {
      setServerError('Invalid email or password.');
      return false;
    } else {
      setSuccess(true);
      // Use the NextAuth response URL or fall back to the callback URL
      const redirectUrl = res?.url || callbackUrl;
      router.push(redirectUrl);
      return true;
    }
  };

  return { signInUser, serverError, success };
};
