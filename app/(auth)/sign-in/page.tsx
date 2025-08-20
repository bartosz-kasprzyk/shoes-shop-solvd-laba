import SignInPage from '@/features/auth/sign-in/SignInPage';
import { Suspense } from 'react';

export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
}
