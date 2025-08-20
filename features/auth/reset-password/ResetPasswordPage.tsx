import { ResetPasswordForm } from '@/features/auth/reset-password/ResetPasswordForm';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  return (
    <AuthPagesWrapper
      title='Reset password'
      description='Please create new password here'
      form={
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      }
    />
  );
}
