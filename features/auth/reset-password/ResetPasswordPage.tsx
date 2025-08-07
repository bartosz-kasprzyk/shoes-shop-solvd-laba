'use client';

import { ResetPasswordForm } from '@/features/auth/reset-password/ResetPasswordForm';
import { useResetPassword } from '@/features/auth/reset-password/useResetPassword';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';
import { Typography } from '@mui/material';

export default function ResetPasswordPage() {
  const { resetPassword, status, serverError } = useResetPassword();

  return (
    <AuthPagesWrapper>
      <Typography variant='h3' fontWeight={500} mb={1}>
        Reset password
      </Typography>
      <Typography
        variant='body1'
        mb={3}
        color='color-mix(in srgb, black 60%, transparent)'
      >
        Please create new password here
      </Typography>

      <ResetPasswordForm
        onSubmit={resetPassword}
        status={status}
        serverError={serverError}
      />
    </AuthPagesWrapper>
  );
}
