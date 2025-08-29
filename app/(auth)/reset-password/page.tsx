import ResetPasswordPage from '@/features/auth/reset-password/ResetPasswordPage';
import Spinner from '@/shared/components/ui/Loading';
import { Suspense } from 'react';

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<Spinner />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
