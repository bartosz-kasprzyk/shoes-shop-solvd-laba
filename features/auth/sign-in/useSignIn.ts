'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SignInFormData } from './signIn.schema';

export const useSignIn = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const signInUser = async (data: SignInFormData) => {
    setServerError('');
    const res = await signIn('credentials', {
      redirect: false,
      identifier: data.email,
      password: data.password,
      remember: data.remember,
      callbackUrl: '/',
    });
    if (res?.error) {
      setServerError('Invalid email or password.');
      return false;
    } else {
      router.push('/');
      return true;
    }
  };

  return { signInUser, serverError };
};
