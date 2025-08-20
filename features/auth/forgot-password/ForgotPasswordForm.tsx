'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Collapse, Link } from '@mui/material';
import { Input, Button } from '@/shared/components/ui';

import type { ForgotPasswordFormData } from './forgotPassword.schema';
import { forgotPasswordSchema } from './forgotPassword.schema';
import { useForgotPassword } from './useForgotPassword';

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { requestReset, status, serverError } = useForgotPassword();

  return (
    <form onSubmit={handleSubmit(requestReset)}>
      <Box mb={1}>
        <Input
          title='Email'
          id='email'
          placeholder='Enter your email'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          required
        />
      </Box>

      <Collapse in={status === 'sent'}>
        <Typography textAlign='center' color='success.main'>
          Email sent. Check your inbox!
        </Typography>
      </Collapse>

      {serverError && <Typography color='error'>{serverError}</Typography>}

      <Button sx={{ my: 2, width: '100%' }} type='submit'>
        {status === 'loading' ? 'Sending...' : 'Reset password'}
      </Button>

      <Typography
        textAlign='center'
        sx={{
          fontSize: { xs: '10px', sm: '15px' },
          transition:
            'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
        }}
      >
        <Link underline='hover' color='inherit' href='/sign-in'>
          Back to log in
        </Link>
      </Typography>
    </form>
  );
};
