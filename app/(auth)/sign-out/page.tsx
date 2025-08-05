'use client';

import { useSignOut } from '@/features/auth/sign-out/useSignOut';
import { Box, Typography } from '@mui/material';

export default function SignOutPage() {
  useSignOut();

  return (
    <Box mx='auto' px={2} maxWidth='600px' width='100%' my={4}>
      <Typography variant='h3' fontWeight={500} mb={1}>
        Signing out...
      </Typography>
      <Typography
        variant='body1'
        mb={3}
        sx={{ color: 'color-mix(in srgb, black 60%, transparent)' }}
      >
        Redirecting to home page.
      </Typography>
    </Box>
  );
}
