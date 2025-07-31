'use client';

import { useState } from 'react';
import type { ForgotPasswordFormData } from './forgotPassword.schema';

export const useForgotPassword = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle',
  );
  const [serverError, setServerError] = useState('');

  const requestReset = async (data: ForgotPasswordFormData) => {
    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        },
      );

      if (!res.ok) {
        const json = await res.json();
        setServerError(json?.error?.message || 'Something went wrong');
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch (e) {
      setStatus('error');
      setServerError('Network error. Please try again.');
    }
  };

  return { requestReset, status, serverError };
};
