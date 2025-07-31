'use client';

import { Box, Typography, Collapse, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@/shared/components/ui';
import type {
  ResetPasswordFormData} from './resetPassword.schema';
import {
  resetPasswordSchema
} from './resetPassword.schema';

type Props = {
  onSubmit: (data: ResetPasswordFormData) => void;
  status: 'idle' | 'loading' | 'success' | 'error';
  serverError: string;
};

export const ResetPasswordForm = ({ onSubmit, status, serverError }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={1} display='flex' flexDirection='column' gap={2}>
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

      <Collapse in={status === 'success'}>
        <Typography textAlign='center' color='success.main'>
          Password reset! Redirecting...
        </Typography>
      </Collapse>
      {serverError && <Typography color='error'>{serverError}</Typography>}

      <Button sx={{ my: 2, width: '100%' }} type='submit'>
        {status === 'loading' ? 'Resetting...' : 'Reset password'}
      </Button>

      <Typography textAlign='center'>
        <Link underline='hover' color='inherit' href='/auth/sign-in'>
          Back to log in
        </Link>
      </Typography>
    </form>
  );
};
