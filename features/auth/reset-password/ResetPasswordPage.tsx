'use client';

import { ResetPasswordForm } from '@/features/auth/reset-password/ResetPasswordForm';
import { useResetPassword } from '@/features/auth/reset-password/useResetPassword';
import { Box, Typography } from '@mui/material';

export default function ResetPasswordPage() {
  const { resetPassword, status, serverError } = useResetPassword();

  return (
    <Box mx='auto' px={2} maxWidth='600px' width='100%' my={4}>
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
    </Box>
  );
}
