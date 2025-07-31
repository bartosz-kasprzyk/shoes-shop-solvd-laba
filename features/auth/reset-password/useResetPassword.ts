'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ResetPasswordFormData } from './resetPassword.schema';

export const useResetPassword = () => {
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
        const json = await res.json();
        setStatus('error');
        setServerError(json?.error?.message || 'Reset failed');
        return;
      }

      setStatus('success');
      setTimeout(() => router.push('/auth/sign-in'), 3000);
    } catch {
      setStatus('error');
      setServerError('Something went wrong. Please try again.');
    }
  };

  return { resetPassword, status, serverError };
};
