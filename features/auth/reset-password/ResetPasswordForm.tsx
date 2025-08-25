'use client';

import { Box, Typography, Collapse, Link, Fade } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@/shared/components/ui';
import type { ResetPasswordFormData } from './resetPassword.schema';
import { resetPasswordSchema } from './resetPassword.schema';
import { useResetPassword } from './useResetPassword';

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { resetPassword, status, serverError } = useResetPassword();
  const success = status === 'success';
  return (
    <form onSubmit={handleSubmit(resetPassword)}>
      <Box display='flex' flexDirection='column'>
        <Input
          title='Password'
          id='password'
          type='password'
          placeholder='At least 8 characters'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          required
        />
        <Input
          title='Confirm Password'
          id='confirmPassword'
          type='password'
          placeholder='At least 8 characters'
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          required
        />
      </Box>

      <Box>
        <Typography
          position={'absolute'}
          sx={{ lineHeight: '1em' }}
          color='error'
          mb={2}
          height={'line'}
          role={serverError ? 'alert' : undefined}
        >
          {serverError && !success ? serverError : '\u00A0'}
        </Typography>
        <Fade in={success}>
          <Typography textAlign='center' color='success.main'>
            Password reset! Redirecting...
          </Typography>
        </Fade>
      </Box>

      <Button sx={{ my: 2, width: '100%' }} type='submit'>
        {status === 'loading' ? 'Resetting...' : 'Reset password'}
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
