'use client';

import { SignInForm } from '@/features/auth/sign-in/SignInForm';
import { useSignIn } from '@/features/auth/sign-in/useSignIn';

export default function SignInPage() {
  const { signInUser, serverError } = useSignIn();

  return <SignInForm onSubmit={signInUser} serverError={serverError} />;
}
