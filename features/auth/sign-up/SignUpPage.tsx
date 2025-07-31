'use client';

import { Box, Typography } from '@mui/material';
import { TextUnderButton } from '@/shared/components/ui';
import { useSignUp } from '@/features/auth/sign-up/useSignUp';
import { SignUpForm } from '@/features/auth/sign-up/SignUpForm';

export default function SignUpPage() {
  const { registerUser, serverError, success } = useSignUp();

  return (
    <Box mx='auto' px={2} maxWidth='600px' width='100%' my={4}>
      <Typography variant='h3' fontWeight={500} mb={1}>
        Create an account
      </Typography>
      <Typography
        variant='body1'
        mb={3}
        sx={{ color: 'color-mix(in srgb, black 60%, transparent)' }}
      >
        Create an account to get easy access to your dream shopping
      </Typography>

      <SignUpForm
        onSubmit={registerUser}
        serverError={serverError}
        success={success}
      />

      <TextUnderButton
        text='Already have an account?'
        linkText='Log in'
        href='/auth/sign-in'
      />
    </Box>
  );
}
