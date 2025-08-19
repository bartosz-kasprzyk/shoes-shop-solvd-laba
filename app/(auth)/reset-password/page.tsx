import ResetPasswordPage from '@/features/auth/reset-password/ResetPasswordPage';
import { Suspense } from 'react';

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
