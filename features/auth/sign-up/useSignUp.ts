'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SignUpFormData } from './signUp.schema';

export const useSignUp = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerUser = async (data: SignUpFormData) => {
    setServerError(null);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
        }),
      },
    );

    const json = await res.json();

    if (!res.ok) {
      setServerError(json?.error?.message || 'Registration failed');
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push('/auth/sign-in'), 3000);
  };

  return { registerUser, serverError, success };
};
