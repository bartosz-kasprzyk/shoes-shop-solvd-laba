import SignInPage from '@/features/auth/sign-in/SignInPage';
import Spinner from '@/shared/components/ui/Loading';
import { Suspense } from 'react';

export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignInPage />
    </Suspense>
  );
}
