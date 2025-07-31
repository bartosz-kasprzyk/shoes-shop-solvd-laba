'use client';

import { Box, Typography } from '@mui/material';
import { useForgotPassword } from './useForgotPassword';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const { requestReset, status, serverError } = useForgotPassword();

  return (
    <Box mx='auto' px={2} maxWidth='600px' width='100%' my={4}>
      <Typography variant='h3' fontWeight={500} mb={1}>
        Forgot Password
      </Typography>
      <Typography
        variant='body1'
        mb={5}
        color='color-mix(in srgb, black 60%, transparent)'
      >
        Don’t worry, we’ll send you reset instructions.
      </Typography>

      <ForgotPasswordForm
        onSubmit={requestReset}
        status={status}
        serverError={serverError}
      />
    </Box>
  );
}
