'use client';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { SignInFormData } from './signIn.schema';

export const useSignIn = (
  passedCallbackUrl?: string,
): {
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

    // Get the callback URL from search params or passed through props or use default
    const defaultUrl = '/products';
    const callbackUrl =
      searchParams.get('callbackUrl') || passedCallbackUrl || defaultUrl;
    const res = await signIn('credentials', {
      redirect: false,
      identifier: data.email,
      password: data.password,
      remember: data.remember,
      callbackUrl,
    });

    if (res?.error) {
      if (res.error.toLowerCase().includes('not confirmed')) {
        setServerError('Please confirm your email before signing in.');
      } else {
        setServerError('Invalid email or password.');
      }
      return false;
    } else {
      setSuccess(true);
      const redirectUrl =
        res?.url || callbackUrl || passedCallbackUrl || defaultUrl;
      router.push(redirectUrl);
      return true;
    }
  };

  return { signInUser, serverError, success };
};
