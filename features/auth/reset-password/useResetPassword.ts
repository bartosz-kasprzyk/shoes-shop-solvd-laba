'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ResetPasswordFormData } from './resetPassword.schema';

export const useResetPassword = (): {
  resetPassword: (data: ResetPasswordFormData) => Promise<void>;
  status: 'idle' | 'loading' | 'success' | 'error';
  serverError: string;
} => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [serverError, setServerError] = useState('');

  const resetPassword = async (data: ResetPasswordFormData) => {
    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            password: data.password,
            passwordConfirmation: data.confirmPassword,
          }),
        },
      );

      if (!res.ok) {
        setStatus('error');
        setServerError(
          'The reset password link is invalid or has expired. Please try again.',
        );
        return;
      }

      setStatus('success');
      setTimeout(() => router.push('/sign-in'), 3000);
    } catch {
      setStatus('error');
      setServerError('Something went wrong. Please try again.');
    }
  };

  return { resetPassword, status, serverError };
};
